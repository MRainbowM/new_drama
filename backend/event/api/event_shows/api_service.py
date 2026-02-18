from typing import Optional, List

from django.utils import timezone
from event.db_services.event_show_db_service import event_show_db_service
from event.models.event_show_model import EventShow

from .schemas import EventShowOutSchema


class EventShowAPIService:
    async def get_list_by_month(self, event_id: Optional[int] = None) -> List[EventShow]:
        """
        Получить список спектаклей в афише c текущего месяца.
        Только те, которые доступны для просмотра в текущем месяце.

        :param event_id: ID спектакля
        :return: Список спектаклей в афише
        """
        today = timezone.now().date()
        start_date = today.replace(day=1)

        event_shows = await event_show_db_service.get_list(
            is_enable=True,
            event_id=event_id,
            start_at__date__gte=start_date
        )

        return [EventShowOutSchema(event_show) for event_show in event_shows]


event_show_api_service = EventShowAPIService()
