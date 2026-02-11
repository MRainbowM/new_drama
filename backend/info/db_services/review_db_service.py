from basis.services.abstract_db_service import AbstractDBService
from django.db.models import Q

from ..models import Review


class ReviewDbService(AbstractDBService[Review]):
    def __init__(self):
        self.model = Review

    async def _get_filters(
            self,
            is_enable_main: bool = None,
            is_enable_event: bool = None,
            event_id: int = None
    ) -> Q:
        """
        Получить фильтры для запроса.

        :param is_enable_main: Показывать на главной странице.
        :param is_enable_event: Показывать в карточке спектакля.
        :param event_id: ID спектакля.
        :return: Фильтры.
        """
        filters = Q()

        if is_enable_main is not None:
            filters &= Q(is_enable_main=is_enable_main)

        if is_enable_event is not None:
            filters &= Q(is_enable_event=is_enable_event)

        if event_id is not None:
            filters &= Q(event_id=event_id)

        return filters


review_db_service = ReviewDbService()
