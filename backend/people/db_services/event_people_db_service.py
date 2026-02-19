from basis.services.abstract_db_service import AbstractDBService
from people.models.event_people_model import EventPeople
from django.db.models import Q
from typing import Optional
from typing import List


class EventPeopleDBService(AbstractDBService):
    def __init__(self):
        self.model = EventPeople

    async def _get_filters(
        self,
        event_id: Optional[int] = None,
        **kwargs
    ) -> Q:
        filters = Q()

        if event_id is not None:
            filters &= Q(event_id=event_id)

        return filters

    async def _get_select_related(
        self,
        join_people: Optional[bool] = None,
        **kwargs
    ) -> List[str]:
        select_related = []

        if join_people:
            select_related.append('people')

        return select_related


event_people_db_service = EventPeopleDBService()
