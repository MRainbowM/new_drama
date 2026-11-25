from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0014_eventshow_is_sold_out'),
    ]

    operations = [
        migrations.AddField(
            model_name='eventshow',
            name='is_promo',
            field=models.BooleanField(default=False, verbose_name='Акция'),
        ),
    ]
