from basis.constants import MAX_IMAGE_SIZE_850_450
from basis.models.dates_abstract_model import DatesAbstract
from basis.settings.django_base_settings import IMAGE_QUALITY
from django.db import models
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill

from .event_model import Event
from .services.path.event_image_path import event_image_path


class EventImage(DatesAbstract):
    """Фотографии спектакля"""

    image = models.ImageField('Фото', upload_to=event_image_path)
    # Сжатая версия
    image_compressed = ImageSpecField(
        source='image',
        processors=[ResizeToFill(*MAX_IMAGE_SIZE_850_450)],
        format='JPEG',
        options={
            'quality': IMAGE_QUALITY,
            'optimize': True,
            'progressive': True,
            'subsampling': 0,
        }
    )
    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        verbose_name='Спектакль',
        related_name='images'
    )
    is_enable = models.BooleanField('Показывать на сайте', default=True)

    class Meta:
        verbose_name = 'Фотография спектакля'
        verbose_name_plural = 'Фотографии спектаклей'

    @property
    def image_compressed_url(self) -> str | None:
        """Возвращает URL сжатого изображения"""
        if self.image_compressed:
            return self.image_compressed.url
        return None
