# Generated by Django 5.1.1 on 2024-12-26 09:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('info', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='infoblock',
            name='sort',
            field=models.IntegerField(default=0, help_text='Порядок отображения на сайте (от меньшего к большему)', verbose_name='Сортировка'),
        ),
    ]
