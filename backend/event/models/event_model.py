from basis.constants import MAX_IMAGE_SIZE_750_650
from basis.models import DatesAbstract, SlugAbstractModel
from basis.settings.django_base_settings import IMAGE_QUALITY
from django.db import models
from django_ckeditor_5.fields import CKEditor5Field
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill, ResizeToFit

from .services.path.event_cover_path import event_cover_path
from .services.path.event_program_pdf_path import event_program_pdf_path


class Event(DatesAbstract, SlugAbstractModel):
    """Репертуар"""
    name = models.CharField(
        'Название спектакля',
        max_length=256,
        unique=True
    )
    short_description = models.CharField('Краткое описание')
    description = CKEditor5Field(
        'Подробное описание',
        default='',
        blank=True,
        config_name='extends'
    )
    dramatist = models.CharField('Драматург', default='', blank=True)
    producer = models.ForeignKey(
        to='people.People',
        on_delete=models.SET_NULL,
        verbose_name='Режиссер',
        null=True,
        blank=True,
        related_name='producer'
    )
    is_enable = models.BooleanField(
        'Показывать на сайте',
        help_text='При выключенном параметре спектакль будь скрыт на сайте',
        default=True
    )
    show_on_main_page = models.BooleanField(
        'Показывать на главной странице',
        help_text='При включенном параметре спектакль будет показан на слайдере главной страницы',
        default=True
    )
    is_archival = models.BooleanField(
        'Архив',
        help_text='Спектакль архивный, на текущий момент его не ставят',
        default=False
    )
    cover = models.ImageField(
        'Обложка спектакля на главной',
        upload_to=event_cover_path,
        help_text='Изображение в списке спектаклей в слайдере на главной',
        blank=True,
        null=True
    )
    cover_compressed = ImageSpecField(
        source='cover',
        processors=[ResizeToFill(*MAX_IMAGE_SIZE_750_650)],
        format='JPEG',
        options={
            'quality': IMAGE_QUALITY,
            'optimize': True,
            'progressive': True,
            'subsampling': 0,
        }
    )
    cover_in_list = models.ImageField(
        'Обложка спектакля в списке спектаклей',
        upload_to=event_cover_path,
        help_text='Изображение в списке спектаклей',
        blank=True,
        null=True
    )
    preview_cover = models.ImageField(
        'Обложка в афише',
        upload_to=event_cover_path,
        help_text='Изображение курсора при наведении на спектакль в афише',
        blank=True,
        null=True
    )
    detail_cover = models.ImageField(
        'Обложка спектакля в карточке спектакля',
        upload_to=event_cover_path,
        help_text='Главное изображение в карточке спектакля',
        blank=True,
        null=True
    )
    detail_cover_compressed = ImageSpecField(
        source='detail_cover',
        format='JPEG',
        options={'quality': IMAGE_QUALITY}
    )
    description_cover = models.ImageField(
        'Фотография напротив описания спектакля',
        upload_to=event_cover_path,
        help_text='Изображение в карточке спектакля',
        blank=True,
        null=True
    )
    description_cover_compressed = ImageSpecField(
        source='description_cover',
        processors=[ResizeToFit(1000, 1000)],
        format='JPEG',
        options={'quality': IMAGE_QUALITY}
    )
    actor_cover = models.ImageField(
        'Фотография напротив списка действующих лиц спектакля',
        upload_to=event_cover_path,
        help_text='Изображение в карточке спектакля',
        blank=True,
        null=True
    )
    actor_cover_compressed = ImageSpecField(
        source='actor_cover',
        processors=[ResizeToFit(1000, 1000)],
        format='JPEG',
        options={'quality': IMAGE_QUALITY}
    )
    min_age_limit = models.IntegerField(
        'Возрастное ограничение',
        help_text='Минимальный разрешенный возраст зрителя, например, 18 лет',
        default=0
    )
    premiere_at = models.DateField('Дата премьеры', null=True, blank=True)
    duration = models.DurationField(
        'Длительность спектакля',
        help_text='Формат: чч:мм:сс',
        null=True,
        blank=True
    )
    has_intermission = models.BooleanField('Есть антракт', default=False)
    program_pdf = models.FileField(
        'Программка спектакля',
        upload_to=event_program_pdf_path,
        help_text='PDF файл с программой спектакля',
        default='',
        null=True,
        blank=True
    )

    class Meta:
        verbose_name = 'Спектакль'
        verbose_name_plural = 'Спектакли'

    def __str__(self) -> str:
        return str(self.name)

    @property
    def cover_compressed_url(self) -> str | None:
        """Возвращает URL сжатого изображения"""
        if self.cover_compressed:
            return self.cover_compressed.url
        return None

    @property
    def detail_cover_compressed_url(self) -> str | None:
        """Возвращает URL сжатого изображения"""
        if self.detail_cover_compressed:
            return self.detail_cover_compressed.url
        return None

    @property
    def description_cover_compressed_url(self) -> str | None:
        """Возвращает URL сжатого изображения"""
        if self.description_cover_compressed:
            return self.description_cover_compressed.url
        return None

    @property
    def actor_cover_compressed_url(self) -> str | None:
        """Возвращает URL сжатого изображения"""
        if self.actor_cover_compressed:
            return self.actor_cover_compressed.url
        return None
