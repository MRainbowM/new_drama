from django.db import models
from django.utils.translation import gettext_lazy as _

from basis.models.dates_abstract_model import DatesAbstract
from .event_model import Event
from .services.path.event_image_path import event_image_path
from imagekit.models import ImageSpecField
# from imagekit.processors import ResizeToFit
from basis.settings.django_base_settings import IMAGE_QUALITY


class EventImage(DatesAbstract):
    """Фотографии спектакля"""

    image = models.ImageField(_('Фото'), upload_to=event_image_path)
    # Сжатая версия
    image_compressed = ImageSpecField(
        source='image',
        # processors=[ResizeToFit(*MAX_IMAGE_SIZE)],
        format='JPEG',
        options={'quality': IMAGE_QUALITY}
    )
    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        verbose_name=_('Спектакль'),
        related_name='images'
    )
    is_enable = models.BooleanField(_('Показывать на сайте'), default=True)

    class Meta:
        verbose_name = _('Фотография спектакля')
        verbose_name_plural = _('Фотографии спектаклей')

    @property
    def image_compressed_url(self) -> str | None:
        """Возвращает URL сжатого изображения"""
        if self.image_compressed:
            return self.image_compressed.url
        return None
