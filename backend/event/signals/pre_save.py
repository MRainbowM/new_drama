from django.db.models.base import ModelBase
from django.db.models.signals import pre_save
from django.dispatch import receiver

from slugify import slugify

from ..models import Event


@receiver(pre_save, sender=Event)
def event_normalize(sender: ModelBase, instance: Event, **kwargs):
    instance.slug = slugify(instance.name)

