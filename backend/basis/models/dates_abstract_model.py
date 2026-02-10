from django.db import models


class DatesAbstract(models.Model):
    # Даты создания, обновления
    create_at = models.DateTimeField('Дата создания', auto_now_add=True)
    update_at = models.DateTimeField('Дата обновления', auto_now=True)

    class Meta:
        abstract = True
