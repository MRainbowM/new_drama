
from django.db import models
from django.utils.translation import gettext_lazy as _


class DatesAbstract(models.Model):
    # Даты создания, обновления
    create_at = models.DateTimeField(_('Дата создания'), auto_now_add=True)
    update_at = models.DateTimeField(_('Дата обновления'), auto_now=True)

    class Meta:
        abstract = True
