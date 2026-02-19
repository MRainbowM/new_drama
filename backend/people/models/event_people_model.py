from basis.models.dates_abstract_model import DatesAbstract
from django.db import models
from event.models.event_model import Event

from .people_model import People
from ..choices import PEOPLE_TAG_LIST


class EventPeople(DatesAbstract):
    """Участники спектаклей"""

    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        verbose_name='Спектакль',
        related_name='peoples'
    )
    people = models.ForeignKey(
        People,
        on_delete=models.CASCADE,
        verbose_name='Участник',
        related_name='events'
    )

    tag = models.CharField(
        'Тег',
        choices=PEOPLE_TAG_LIST,
        max_length=128,
        help_text='Раздел в карточке спектакля, в котором будет отображаться участник'
    )

    role = models.CharField(
        'Роль участника в спектакле',
        max_length=256,
        default='',
        blank=True,
        help_text='Если участник - актер: указать имя персонажа. ' +
                  'Если участник выполняет другую роль, например, художник - нужно указать "художник"'
    )

    sort = models.IntegerField('Сортировка', default=0)

    class Meta:
        verbose_name = 'Участник спектакля'
        verbose_name_plural = 'Участники спектакля'

    def __str__(self) -> str:
        return f'{str(self.event.name)} - {str(self.people.first_name)} {str(self.people.last_name)}'
