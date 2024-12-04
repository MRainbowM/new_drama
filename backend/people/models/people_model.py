from django.db import models
from django.utils.translation import gettext_lazy as _

from basis.models.dates_abstract_model import DatesAbstract
from .services.photo_path import photo_path
from ..choices import PEOPLE_FILTER_TAG_LIST


class People(DatesAbstract):
    """Люди театра"""
    first_name = models.CharField(_('Имя'), max_length=512)
    last_name = models.CharField(_('Фамилия'), max_length=512)
    slug = models.CharField(_('Слаг имени'), max_length=256, unique=True)
    tag = models.CharField(
        _('Тег'),
        choices=PEOPLE_FILTER_TAG_LIST,
        max_length=128,
        help_text='Фильтр на странице "Коллектив"',
        null=True,
        blank=True
    )
    photo = models.ImageField(
        _('Фотография'),
        upload_to=photo_path,
        default='',
        null=True,
        blank=True
    )
    description = models.TextField(_('Описание'), default='', blank=True)
    birthday = models.DateField(_('Дата рождения'), null=True, blank=True)
    position = models.CharField(_('Должность'), max_length=256, default='', blank=True)
    education = models.CharField(_('Образование'), max_length=256, default='', blank=True)

    class Meta:
        verbose_name = _('Люди')
        verbose_name_plural = _('Люди')

    def __str__(self) -> str:
        return f'{self.first_name} {self.last_name}'
