from django.db import models
from django.utils.translation import gettext_lazy as _

from basis.models.dates_abstract_model import DatesAbstract
from .event_model import Event
from .services.path.event_image_path import event_image_path


class EventImage(DatesAbstract):
    """Фотографии спектакля"""

    image = models.ImageField(_('Фото'), upload_to=event_image_path)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, verbose_name=_('Спектакль'), related_name='images')
    is_enable = models.BooleanField(_('Показывать на сайте'), default=True)

    class Meta:
        verbose_name = _('Фотография спектакля')
        verbose_name_plural = _('Фотографии спектаклей')
