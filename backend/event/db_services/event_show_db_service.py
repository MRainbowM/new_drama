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


event_show_db_service = EventShowDBService()
