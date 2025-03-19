from typing import List, Optional

from asgiref.sync import sync_to_async
from django.db.models.sql import Query

from ..event_model import Event
from ...schemes import EventFilterSchema


class EventDBService:

    async def get_list(self, filters: EventFilterSchema, order_by: str = '?') -> List[Event]:
        def query() -> Query:
            return filters.filter(
                Event.objects.all()
            ).select_related('producer').order_by(order_by)

        return await sync_to_async(list)(query())

    async def get_by_slug(self, slug: str) -> Optional[Event]:
        def query() -> Query:
            return Event.objects.filter(
                slug=slug
            ).select_related(
                'producer'
            ).prefetch_related(
                'images', 'peoples__people'
            ).first()

        return await sync_to_async(query)()


event_db_service = EventDBService()
