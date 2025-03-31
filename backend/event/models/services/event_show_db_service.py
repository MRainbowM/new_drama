from typing import List

from asgiref.sync import sync_to_async
from django.db.models import Q
from django.db.models.sql import Query

from ..event_show_model import EventShow


class EventShowDBService:
    async def get_list(
            self,
            is_enable: bool = None,
            event_id: int = None,
            start_at__month__gte: int = None,
            start_at__year__gte: int = None
    ) -> List[EventShow]:
        def query() -> Query:
            filters = Q()

            if is_enable is not None:
                filters &= Q(is_enable=is_enable)

            if event_id is not None:
                filters &= Q(event_id=event_id)

            if start_at__month__gte is not None:
                filters &= Q(start_at__month__gte=start_at__month__gte)

            if start_at__year__gte is not None:
                filters &= Q(start_at__year__gte=start_at__year__gte)

            return EventShow.objects.filter(
                filters
            ).select_related(
                'event', 'event__producer'
            ).order_by('start_at')

        return await sync_to_async(list)(query())


event_show_db_service = EventShowDBService()
