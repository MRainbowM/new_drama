from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import gettext_lazy as _
from django_ckeditor_5.fields import CKEditor5Field
from slugify import slugify

from basis.models.dates_abstract_model import DatesAbstract
from .services.path.event_cover_path import event_cover_path
from .services.path.event_program_pdf_path import event_program_pdf_path
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFit
from basis.settings.django_base_settings import IMAGE_QUALITY


class Event(DatesAbstract):
    """Репертуар"""

    name = models.CharField(
        _('Название спектакля'),
        max_length=256,
        unique=True
    )
    slug = models.CharField(_('Слаг названия'), max_length=256, unique=True)
    short_description = models.CharField(_('Краткое описание'))
    description = CKEditor5Field(
        _('Подробное описание'),
        default='',
        blank=True,
        config_name='extends'
    )
    dramatist = models.CharField(_('Драматург'), default='', blank=True)
    producer = models.ForeignKey(
        to='people.People',
        on_delete=models.SET_NULL,
        verbose_name=_('Режиссер'),
        null=True,
        blank=True,
        related_name='producer'
    )
    is_enable = models.BooleanField(
        _('Показывать на сайте'),
        help_text='При выключенном параметре спектакль будь скрыт на сайте',
        default=True
    )
    show_on_main_page = models.BooleanField(
        _('Показывать на главной странице'),
        help_text='При включенном параметре спектакль будет показан на слайдере главной страницы',
        default=True
    )
    is_archival = models.BooleanField(
        _('Архив'),
        help_text='Спектакль архивный, на текущий момент его не ставят',
        default=False
    )
    cover = models.ImageField(
        _('Обложка спектакля на главной'),
        upload_to=event_cover_path,
        help_text='Изображение в списке спектаклей в слайдере на главной',
        blank=True,
        null=True
    )
    cover_compressed = ImageSpecField(
        source='cover',
        processors=[ResizeToFit(1000, 1000)],
        format='JPEG',
        options={'quality': IMAGE_QUALITY}
    )
    cover_in_list = models.ImageField(
        _('Обложка спектакля в списке спектаклей'),
        upload_to=event_cover_path,
        help_text='Изображение в списке спектаклей',
        blank=True,
        null=True
    )
    preview_cover = models.ImageField(
        _('Обложка в афише'),
        upload_to=event_cover_path,
        help_text='Изображение курсора при наведении на спектакль в афише',
        blank=True,
        null=True
    )
    detail_cover = models.ImageField(
        _('Обложка спектакля в карточке спектакля'),
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
        _('Фотография напротив описания спектакля'),
        upload_to=event_cover_path,
        help_text='Изображение в карточке спектакля',
        blank=True,
        null=True
    )
    actor_cover = models.ImageField(
        _('Фотография напротив списка действующих лиц спектакля'),
        upload_to=event_cover_path,
        help_text='Изображение в карточке спектакля',
        blank=True,
        null=True
    )
    min_age_limit = models.IntegerField(
        _('Возрастное ограничение'),
        help_text='Минимальный разрешенный возраст зрителя, например, 18 лет',
        default=0
    )
    premiere_at = models.DateField(_('Дата премьеры'), null=True, blank=True)
    duration = models.DurationField(
        _('Длительность спектакля'),
        help_text='Формат: чч:мм:сс',
        null=True,
        blank=True
    )
    has_intermission = models.BooleanField(_('Есть антракт'), default=False)
    program_pdf = models.FileField(
        _('Программка спектакля'),
        upload_to=event_program_pdf_path,
        help_text='PDF файл с программой спектакля',
        default='',
        null=True,
        blank=True
    )

    class Meta:
        verbose_name = _('Спектакль')
        verbose_name_plural = _('Спектакли')

    def __str__(self) -> str:
        return str(self.name)

    def clean(self) -> None:
        """Валидация для админки"""
        slug = slugify(self.name)
        is_exists = Event.objects.filter(
            slug=slug
        ).exclude(id=self.id).exists()
        if is_exists:
            raise ValidationError({
                'name': _('Спектакль с таким названием уже создан')
            })

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
