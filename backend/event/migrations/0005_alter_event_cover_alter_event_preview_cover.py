# Generated by Django 5.1.1 on 2025-01-28 09:55

import event.models.services.path.event_cover_path
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0004_alter_event_duration'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='cover',
            field=models.ImageField(help_text='Изображение в списке спектаклей', upload_to=event.models.services.path.event_cover_path.event_cover_path, verbose_name='Обложка спектакля'),
        ),
        migrations.AlterField(
            model_name='event',
            name='preview_cover',
            field=models.ImageField(help_text='Изображение курсора при наведении на спектакль в афише', upload_to=event.models.services.path.event_cover_path.event_cover_path, verbose_name='Обложка в афише'),
        ),
    ]
