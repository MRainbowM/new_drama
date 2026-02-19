from typing import Optional, List

from django.utils import timezone
from event.db_services.event_show_db_service import event_show_db_service

from .schemas import EventShowOutSchema


class EventShowAPIService:
    async def get_list_by_month(self, event_id: Optional[int] = None) -> List[EventShowOutSchema]:
        """
        Получить список спектаклей в афише c текущего месяца.
        Только те, которые доступны для просмотра в текущем месяце.

        :param event_id: ID спектакля.
        :return: Список спектаклей в афише.
        """
        today = timezone.now().date()
        start_date = today.replace(day=1)

        event_shows = await event_show_db_service.get_list(
            is_enable=True,
            event_id=event_id,
            start_at__date__gte=start_date,
            order_by='start_at',
            join_event=True,
            return_fields=[
                'id', 'start_at', 'is_premiere', 'link_to_buy_ticket',

                'event', 'event__name', 'event__slug',
                'event__short_description', 'event__preview_cover',
                'event__min_age_limit',
            ]
        )

        return [
            EventShowOutSchema.model_validate(event_show)
            for event_show in event_shows
        ]


event_show_api_service = EventShowAPIService()
