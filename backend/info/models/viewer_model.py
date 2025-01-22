from django.db import models
from django.utils.translation import gettext_lazy as _

from basis.models.dates_abstract_model import DatesAbstract
from .services.viewer_image_path import viewer_image_path


class Viewer(DatesAbstract):
    image = models.ImageField(
        _('Фотография'),
        upload_to=viewer_image_path,
        help_text='Изображение на главной'
    )
    nickname = models.CharField(
        _('Никнейм'),
        default='',
        max_length=512,
        null=True,
        blank=True
    )

    class Meta:
        verbose_name = _('Зритель')
        verbose_name_plural = _('Зрители')
