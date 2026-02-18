from typing import Optional, List

from basis.services.abstract_db_service import AbstractDBService
from django.db.models import Q
from event.models.event_show_model import EventShow


class EventShowDBService(AbstractDBService):

    def __init__(self):
        self.model = EventShow

    async def _get_filters(
            self,
            is_enable: bool = None,
            event_id: int = None,
            start_at__date__gte: int = None,
            **kwargs
    ) -> Q:
        """
        Получить фильтры для запроса.

        :param is_enable: Показывать в афише
        :param event_id: ID спектакля
        :param start_at__date__gte: Дата и время начала спектакля
        :return: Фильтры
        """

        filters = Q()

        if is_enable is not None:
            filters &= Q(is_enable=is_enable)

        if event_id is not None:
            filters &= Q(event_id=event_id)

        if start_at__date__gte is not None:
            filters &= Q(start_at__date__gte=start_at__date__gte)

        return filters

    async def _get_select_related(
            self,
            join_event: Optional[bool] = None,
            **kwargs
    ) -> List[str]:
        """
        Получить select_related для запроса.

        :param join_event: Объединять с моделью Event
        :return: Select_related
        """
        select_related = []

        if join_event:
            select_related.append('event')

        return select_related


event_show_db_service = EventShowDBService()
