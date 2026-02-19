from typing import Optional, List, Dict, Any

from basis.services.abstract_db_service import AbstractDBService
from django.db.models import Q
from people.models.people_model import People


class PeopleDBService(AbstractDBService):
    def __init__(self):
        self.model = People

    async def _get_filters(
            self,
            event_id: Optional[int] = None,
            **kwargs
    ) -> Q:
        """
        Получить фильтры для запроса.

        :param event_id: ID спектакля.
        :return: Фильтры
        """
        filters = Q()

        if event_id is not None:
            filters &= Q(events__event_id=event_id)

        return filters

    async def _get_annotations_fields(
            self,
            annotate_tag: Optional[bool] = None,
            return_fields: Optional[List[str]] = None,
            **kwargs
    ) -> Dict[str, Any]:
        """
        Получить annotations_fields для запроса.
        """
        annotations_fields = {}

        if annotate_tag:
            annotations_fields['tag'] = 'events__tag'

        if 'tag' not in return_fields:
            return_fields.remove('tag')

        return annotations_fields


people_db_service = PeopleDBService()
