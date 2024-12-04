from django.db.models.base import ModelBase
from django.db.models.signals import pre_save
from django.dispatch import receiver

from slugify import slugify

from ..models import People


@receiver(pre_save, sender=People)
def people_slug(sender: ModelBase, instance: People, **kwargs):
    instance.slug = slugify(
        f'{instance.first_name} {instance.last_name} {instance.tag}'
    )

