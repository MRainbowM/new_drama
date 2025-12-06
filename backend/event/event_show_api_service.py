from datetime import datetime
from typing import Optional

from django.utils import timezone

from .models.services.event_show_db_service import event_show_db_service


class EventShowApiService:

    async def get_event_show_list(
            self,
            event_id: Optional[int] = None,
            start_at__date__gte: Optional[datetime] = None
    ):
        """
        Получение списка спектаклей в афише c текущего месяца
        """
        if start_at__date__gte is None:
            today = timezone.localtime().date()
            start_at__date__gte = today.replace(day=1)

        return await event_show_db_service.get_list(
            is_enable=True,
            event_id=event_id,
            start_at__date__gte=start_at__date__gte
        )


event_show_api_service = EventShowApiService()
