from django.db import models

from slugify import slugify
from unidecode import unidecode


class SlugAbstractModel(models.Model):
    slug = models.CharField('Слаг', max_length=256, unique=True)

    class Meta:
        abstract = True

    def generate_unique_slug(self) -> str:
        """
        Генерирует уникальный slug на основе name.
        """
        base_slug = slugify(unidecode(self.name))[:75]
        slug = base_slug
        counter = 1

        # Проверка уникальности slug (исключая текущий объект)
        Model = self.__class__
        while Model.objects.filter(slug=slug).exclude(pk=self.pk).exists():
            counter += 1
            slug = f'{base_slug}-{counter}'
            if len(slug) > 95:  # защита от слишком длинных слагов
                slug = slug[:95].rsplit('-', 1)[0]

        return slug

    def save(self, *args, **kwargs):
        """
        При сохранении:
        - если slug пустой — генерируем
        - если name изменился — обновляем slug
        """
        if not self.slug:
            self.slug = self.generate_unique_slug()
        else:
            # обновляем slug при изменении name
            old = None
            if self.pk:
                try:
                    old = self.__class__.objects.get(pk=self.pk)
                except self.__class__.DoesNotExist:
                    pass
            if old and old.name != self.name:
                self.slug = self.generate_unique_slug()

        super().save(*args, **kwargs)
