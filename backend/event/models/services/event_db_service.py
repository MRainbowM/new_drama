from typing import List, Optional

from asgiref.sync import sync_to_async
from django.db.models import Prefetch
from django.db.models import Q
from django.db.models.sql import Query

from people.models import EventPeople
from ..event_model import Event


class EventDBService:

    async def get_list(
            self,
            is_enable: bool = None,
            show_on_main_page: bool = None,
            order_by: str = None
    ) -> List[Event]:
        def query() -> Query:
            filters = Q()

            if is_enable is not None:
                filters &= Q(is_enable=is_enable)

            if show_on_main_page is not None:
                filters &= Q(is_enable=show_on_main_page)

            qs = Event.objects.filter(
                filters
            ).select_related('producer')

            if order_by is not None:
                qs = qs.order_by(order_by)

            return qs

        return await sync_to_async(list)(query())

    async def get_by_slug(self, slug: str) -> Optional[Event]:
        return await Event.objects.filter(
            slug=slug
        ).select_related(
            'producer'
        ).prefetch_related(
            'images',
            Prefetch(
                'peoples',
                queryset=EventPeople.objects.select_related('people').order_by('sort')
            )
        ).afirst()


event_db_service = EventDBService()
