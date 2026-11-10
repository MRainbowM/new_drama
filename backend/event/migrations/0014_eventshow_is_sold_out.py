from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0013_alter_event_cover_in_list'),
    ]

    operations = [
        migrations.AddField(
            model_name='eventshow',
            name='is_sold_out',
            field=models.BooleanField(default=False, verbose_name='Билетов нет'),
        ),
    ]
