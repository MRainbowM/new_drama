from typing import Optional

from basis.services.abstract_db_service import AbstractDBService
from django.db.models import Q
from event.models.event_image_model import EventImage


class EventImageDBService(AbstractDBService):
    def __init__(self):
        self.model = EventImage

    async def _get_filters(
            self,
            event_id: Optional[int] = None,
            is_enable: Optional[bool] = None,
            **kwargs
    ) -> Q:
        """
        Получить фильтры для запроса.

        :param event_id: ID спектакля.
        :return: Фильтры
        """
        filters = Q()

        if event_id is not None:
            filters &= Q(event_id=event_id)

        if is_enable is not None:
            filters &= Q(is_enable=is_enable)

        return filters


event_image_db_service = EventImageDBService()
