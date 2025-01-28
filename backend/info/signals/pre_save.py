from django.db.models.base import ModelBase
from django.db.models.signals import pre_save
from django.dispatch import receiver
from slugify import slugify

from ..models import InfoBlock


@receiver(pre_save, sender=InfoBlock)
def menu_title_normalize(sender: ModelBase, instance: InfoBlock, **kwargs):
    instance.menu_title_slug = slugify(instance.menu_title)
