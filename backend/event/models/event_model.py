from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import gettext_lazy as _
from slugify import slugify

from basis.models.dates_abstract_model import DatesAbstract
from .services.event_cover_path import event_cover_path
from .services.event_program_pdf_path import event_program_pdf_path


class Event(DatesAbstract):
    """Репертуар"""

    name = models.CharField(_('Название спектакля'), max_length=256, unique=True)
    slug = models.CharField(_('Слаг названия'), max_length=256, unique=True)
    short_description = models.TextField(_('Краткое описание'))
    description = models.TextField(_('Подробное описание'), default='', blank=True)
    dramatist = models.ForeignKey(
        to='people.People',
        on_delete=models.SET_NULL,
        verbose_name=_('Драматург'),
        null=True,
        blank=True,
        related_name='dramatist'
    )
    producer = models.ForeignKey(
        to='people.People',
        on_delete=models.SET_NULL,
        verbose_name=_('Режиссер'),
        null=True,
        blank=True,
        related_name='producer'
    )
    is_enable = models.BooleanField(_('Показывать в репертуаре'), default=True)
    cover = models.ImageField(
        _('Обложка спектакля'),
        upload_to=event_cover_path,
        help_text='Горизонтальное изображение в карточке спектакля'
    )
    preview_cover = models.ImageField(
        _('Обложка в афише'),
        upload_to=event_cover_path,
        help_text='Обложка спектакля в афише на главной странице'
    )
    min_age_limit = models.IntegerField(
        _('Возрастное ограничение'),
        help_text='Минимальный разрешенный возраст зрителя, например, 18 лет',
        default=0
    )
    premiere_at = models.DateField(_('Дата премьеры'))
    duration = models.TimeField(_('Длительность спектакля'))
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
