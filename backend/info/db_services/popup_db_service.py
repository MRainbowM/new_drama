from datetime import datetime

from basis.services.abstract_db_service import AbstractDBService
from django.db.models import Q
from info.models import Popup


class PopupDbService(AbstractDBService[Popup]):
    def __init__(self):
        self.model = Popup

    async def _get_filters(
            self,
            is_enable: bool = None,
            start_at__lte: datetime = None,
            end_at__gte: datetime = None,
    ) -> Q:
        """
        Получение фильтров для запроса.

        :param is_enable: Показывать на сайте.
        :param start_at__lte: Дата и время начала показа.
        :param end_at__gte: Дата и время окончания показа.
        :return: Фильтры.
        """
        filters = Q()

        if is_enable is not None:
            filters &= Q(is_enable=is_enable)

        if start_at__lte is not None:
            filters &= Q(start_at__lte=start_at__lte)

        if end_at__gte is not None:
            filters &= Q(end_at__gte=end_at__gte)

        return filters


popup_db_service = PopupDbService()
