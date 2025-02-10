from django.db import models
from django.utils.translation import gettext_lazy as _

from basis.models.dates_abstract_model import DatesAbstract
from event.models import Event
from .services.review_image_path import review_image_path


class Review(DatesAbstract):
    image = models.ImageField(
        _('Фотография'),
        upload_to=review_image_path,
        help_text='Фото/скрин отзыва'
    )
    nickname = models.CharField(
        _('Никнейм'),
        default='',
        max_length=512,
        null=True,
        blank=True
    )
    is_enable_main = models.BooleanField(_('Показывать на главной странице'), default=False)
    is_enable_event = models.BooleanField(_('Показывать в карточке спектакля'), default=False)
    event = models.ForeignKey(
        Event,
        on_delete=models.SET_NULL,
        verbose_name=_('Спектакль'),
        related_name='event_reviews',
        blank=True,
        null=True
    )
    sort = models.IntegerField(
        _('Сортировка'),
        default=0,
        help_text='Порядок отображения на сайте (от меньшего к большему)'
    )

    class Meta:
        verbose_name = _('Отзыв')
        verbose_name_plural = _('Отзывы')
