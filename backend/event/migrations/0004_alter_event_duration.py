# Generated by Django 5.1.1 on 2025-01-09 11:18

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('event', '0003_event_dramatist_event_producer_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='duration',
            field=models.DurationField(help_text='Формат: чч:мм:сс', verbose_name='Длительность спектакля', blank=True,
                                       null=True),
        ),
    ]
