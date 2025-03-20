from django.db import models
from django.utils.translation import gettext_lazy as _
from django_ckeditor_5.fields import CKEditor5Field

from basis.models.dates_abstract_model import DatesAbstract


class Popup(DatesAbstract):
    """Поп-ап на главной"""
    title = models.CharField(_('Заголовок'), max_length=512)
    content = CKEditor5Field(_('Текст'), config_name='extends')
    btn_text = models.CharField(
        _('Текст кнопки действия'),
        max_length=256,
        help_text='Текст будет отображаться внутри кнопки. ' +
                  'Примеры: "Купить билет", "Перейти на сайт"'
    )
    btn_link = models.CharField(
        _('Ссылка кнопки'),
        max_length=512,
        help_text='Ресурс, на который будет перенаправлен пользователь ' +
                  'при клике по кнопке'
    )

    start_at = models.DateTimeField(_('Дата и время начала показа'))
    end_at = models.DateTimeField(_('Дата и время окончания показа'))

    is_enable = models.BooleanField(_('Показывать на сайте'), default=True)

    class Meta:
        verbose_name = _('Поп-ап')
        verbose_name_plural = _('Поп-апы')

    def __str__(self) -> str:
        return f"{str(self.id)} - {str(self.title)}"
