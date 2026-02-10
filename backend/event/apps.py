from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class EventConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'event'
    verbose_name = _('Спектакли')
