from basis.constants import MAX_IMAGE_SIZE_500_500
from basis.models.dates_abstract_model import DatesAbstract
from basis.settings.django_base_settings import IMAGE_QUALITY
from django.db import models
from django_ckeditor_5.fields import CKEditor5Field
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFit

from .services.info_block_cover_path import info_block_cover_path


class InfoBlock(DatesAbstract):
    title = models.CharField('Заголовок', max_length=512, unique=True)
    content = CKEditor5Field('Текст', config_name='extends')
    btn_text = models.CharField(
        'Текст кнопки действия',
        max_length=256,
        help_text='Текст будет отображаться внутри кнопки. ' +
                  'Примеры: "написать в telegram", "перейти на сайт"'
    )
    btn_link = models.CharField(
        'Ссылка кнопки',
        max_length=512,
        help_text='Ресурс, на который будет перенаправлен пользователь ' +
                  'при клике по кнопке'
    )
    cover = models.ImageField(
        'Обложка',
        upload_to=info_block_cover_path,
        help_text='Картинка инфо-блока'
    )
    # Сжатая версия
    cover_compressed = ImageSpecField(
        source='cover',
        processors=[ResizeToFit(*MAX_IMAGE_SIZE_500_500)],
        format='JPEG',
        options={'quality': IMAGE_QUALITY}
    )
    is_enable = models.BooleanField('Показывать на сайте', default=True)
    in_menu = models.BooleanField(
        'Добавить пункт в меню',
        default=False,
        help_text='Добавляет якорную ссылку в меню (хедер)'
    )
    menu_title = models.CharField(
        'Заголовок в меню',
        max_length=256,
        help_text='Текст якорной ссылки, который будет отображаться в меню (хедере)'
    )
    menu_title_slug = models.CharField(
        'Якорная ссылка', max_length=256, unique=True)
    sort = models.IntegerField(
        'Сортировка',
        default=0,
        help_text='Порядок отображения на сайте (от меньшего к большему)'
    )

    class Meta:
        verbose_name = 'Инфо-блок'
        verbose_name_plural = 'Инфо-блоки'

    def __str__(self) -> str:
        return str(self.title)
