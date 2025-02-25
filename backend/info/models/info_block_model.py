from django.db import models
from django.utils.translation import gettext_lazy as _
from django_ckeditor_5.fields import CKEditor5Field

from basis.models.dates_abstract_model import DatesAbstract
from .services.info_block_cover_path import info_block_cover_path


class InfoBlock(DatesAbstract):
    title = models.CharField(_('Заголовок'), max_length=512, unique=True)
    content = CKEditor5Field(_('Текст'), config_name='extends')
    btn_text = models.CharField(
        _('Текст кнопки действия'),
        max_length=256,
        help_text='Текст будет отображаться внутри кнопки. ' +
                  'Примеры: "написать в telegram", "перейти на сайт"'
    )
    btn_link = models.CharField(
        _('Ссылка кнопки'),
        max_length=512,
        help_text='Ресурс, на который будет перенаправлен пользователь ' +
                  'при клике по кнопке'
    )
    cover = models.ImageField(
        _('Обложка'),
        upload_to=info_block_cover_path,
        help_text='Картинка инфо-блока'
    )
    is_enable = models.BooleanField(_('Показывать на сайте'), default=True)
    in_menu = models.BooleanField(
        _('Добавить пункт в меню'),
        default=False,
        help_text='Добавляет якорную ссылку в меню (хедер)'
    )
    menu_title = models.CharField(
        _('Заголовок в меню'),
        max_length=256,
        help_text='Текст якорной ссылки, который будет отображаться в меню (хедере)'
    )
    menu_title_slug = models.CharField(_('Якорная ссылка'), max_length=256, unique=True)
    sort = models.IntegerField(
        _('Сортировка'),
        default=0,
        help_text='Порядок отображения на сайте (от меньшего к большему)'
    )

    class Meta:
        verbose_name = _('Инфо-блок')
        verbose_name_plural = _('Инфо-блоки')

    def __str__(self) -> str:
        return str(self.title)
