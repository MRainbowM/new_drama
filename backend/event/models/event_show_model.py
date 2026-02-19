import re

from basis.models.dates_abstract_model import DatesAbstract
from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models

from .event_model import Event


class EventShow(DatesAbstract):
    """Афиша"""

    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        verbose_name='Спектакль',
        related_name='event_shows'
    )
    start_at = models.DateTimeField('Дата и время начала спектакля')

    is_enable = models.BooleanField('Показывать в афише', default=True)
    is_premiere = models.BooleanField('Премьера', default=False)

    link_to_buy_ticket = models.CharField(
        'Ссылка на покупку билетов',
        max_length=256,
        default='',
        help_text='По этой ссылке пользователь переходит ' +
                  'при клике на кнопку "Купить билет"'
    )

    class Meta:
        verbose_name = 'Спектакль в афише'
        verbose_name_plural = 'Спектакли в афише'

    def __str__(self) -> str:
        return f'{str(self.event.name)} {self.start_at.strftime("%d.%m.%Y")}'

    def clean(self) -> None:
        """Валидация для админки"""

        pattern = f'{settings.TICKET_SERVICE_BASE_URL}/.+'
        result = re.fullmatch(pattern=pattern, string=self.link_to_buy_ticket)
        if not result:
            raise ValidationError({
                'link_to_buy_ticket': (
                        'Ссылка на покупку билетов должна начинаться ' +
                        f'с "{settings.TICKET_SERVICE_BASE_URL}/"'
                )
            })

    @property
    def day_of_week(self) -> str:
        """
        День недели спектакля.
        """
        day_of_week_dict = {
            'Monday': 'ПН',
            'Tuesday': 'ВТ',
            'Wednesday': 'СР',
            'Thursday': 'ЧТ',
            'Friday': 'ПТ',
            'Saturday': 'СБ',
            'Sunday': 'ВС'
        }
        return day_of_week_dict[self.start_at.strftime('%A')]
