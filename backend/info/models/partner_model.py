import os

from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import gettext_lazy as _

from basis.models.dates_abstract_model import DatesAbstract
from .services.partner_logo_path import partner_logo_path


def validate_svg(file):
    # Проверяем расширение файла
    ext = os.path.splitext(file.name)[1].lower()
    if ext != '.svg':
        raise ValidationError(_('Поддерживаются только файлы в формате SVG.'))


class Partner(DatesAbstract):
    logo = models.FileField(
        _('Логотип'),
        upload_to=partner_logo_path,
        help_text='Логотип компании на главной',
        validators=[validate_svg]
    )
    name = models.CharField(_('Название'), max_length=256, unique=True)
    is_enable = models.BooleanField(_('Показывать на сайте'), default=True)
    sort = models.IntegerField(
        _('Сортировка'),
        default=0,
        help_text='Порядок отображения на сайте (от меньшего к большему)'
    )

    class Meta:
        verbose_name = _('Партнер')
        verbose_name_plural = _('Партнеры')

    def __str__(self):
        return self.name
