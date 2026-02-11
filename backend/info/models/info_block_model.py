from basis.constants import MAX_IMAGE_SIZE_500_500
from basis.models.dates_abstract_model import DatesAbstract
from basis.settings.django_base_settings import IMAGE_QUALITY
from django.db import models
from django_ckeditor_5.fields import CKEditor5Field
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill

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
        # ResizeToFill делает кроп под точный размер (в отличие от ResizeToFit)
        processors=[ResizeToFill(*MAX_IMAGE_SIZE_500_500)],
        format='JPEG',
        # Pillow-опции при сохранении JPEG:
        # - quality: основной рычаг "вес/качество" (обычно 80-90 достаточно хорошо)
        # - optimize: чуть дольше сохраняет, но уменьшает размер
        # - progressive: прогрессивный JPEG (часто меньше и быстрее грузится "визуально")
        # - subsampling=0: 4:4:4 (меньше потерь на цвете, но чуть больше размер)
        options={
            'quality': IMAGE_QUALITY,
            'optimize': True,
            'progressive': True,
            'subsampling': 0,
        },
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

    @property
    def cover_compressed_url(self) -> str | None:
        """Возвращает URL сжатого изображения"""
        if self.cover_compressed:
            return self.cover_compressed.url
        return None
