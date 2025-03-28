# Generated by Django 5.1.1 on 2025-03-24 06:54

import django_ckeditor_5.fields
import info.models.services.path.popup_cover_path
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('info', '0008_partner_link'),
    ]

    operations = [
        migrations.CreateModel(
            name='Popup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create_at', models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')),
                ('update_at', models.DateTimeField(auto_now=True, verbose_name='Дата обновления')),
                ('subtitle', models.CharField(blank=True, default='', help_text='Будет отображаться в развернутом пап-апе', max_length=512, null=True, verbose_name='Подзаголовок')),
                ('title', models.CharField(help_text='Будет отображаться в развернутом пап-апе', max_length=512, verbose_name='Заголовок')),
                ('short_title', models.CharField(help_text='Будет отображаться в свернутом пап-апе', max_length=256, verbose_name='Короткий заголовок')),
                ('content', django_ckeditor_5.fields.CKEditor5Field(verbose_name='Текст')),
                ('btn_text', models.CharField(help_text='Текст будет отображаться внутри кнопки. Примеры: "Купить билет", "Перейти на сайт"', max_length=256, verbose_name='Текст кнопки действия')),
                ('btn_link', models.CharField(help_text='Ресурс, на который будет перенаправлен пользователь при клике по кнопке', max_length=512, verbose_name='Ссылка кнопки')),
                ('start_at', models.DateTimeField(verbose_name='Дата и время начала показа')),
                ('end_at', models.DateTimeField(verbose_name='Дата и время окончания показа')),
                ('is_enable', models.BooleanField(default=True, verbose_name='Показывать на сайте')),
                ('cover', models.FileField(help_text='Картинка в поп-апе', upload_to=info.models.services.path.popup_cover_path.popup_cover_path, verbose_name='Обложка')),
            ],
            options={
                'verbose_name': 'Поп-ап',
                'verbose_name_plural': 'Поп-апы',
            },
        ),
    ]
