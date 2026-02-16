from basis.constants import MAX_IMAGE_SIZE_250_350
from basis.models.dates_abstract_model import DatesAbstract
from basis.settings.django_base_settings import IMAGE_QUALITY
from django.db import models
from event.models import Event
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill

from .services.review_image_path import review_image_path


class Review(DatesAbstract):
    image = models.ImageField(
        'Фотография',
        upload_to=review_image_path,
        help_text='Фото/скрин отзыва'
    )
    image_compressed = ImageSpecField(
        source='image',
        format='JPEG',
        options={
            'quality': IMAGE_QUALITY,
            'optimize': True,
            'progressive': True,
            'subsampling': 0,
        },
        processors=[ResizeToFill(*MAX_IMAGE_SIZE_250_350)]
    )
    nickname = models.CharField(
        'Никнейм',
        default='',
        max_length=512,
        null=True,
        blank=True
    )
    is_enable_main = models.BooleanField(
        'Показывать на главной странице', default=False)
    is_enable_event = models.BooleanField(
        'Показывать в карточке спектакля', default=False)
    event = models.ForeignKey(
        Event,
        on_delete=models.SET_NULL,
        verbose_name='Спектакль',
        related_name='event_reviews',
        blank=True,
        null=True
    )
    sort = models.IntegerField(
        'Сортировка',
        default=0,
        help_text='Порядок отображения на сайте (от меньшего к большему)'
    )

    class Meta:
        verbose_name = 'Отзыв'
        verbose_name_plural = 'Отзывы'

    @property
    def image_compressed_url(self) -> str | None:
        """Возвращает URL сжатого изображения"""
        if self.image_compressed:
            return self.image_compressed.url
        return None
