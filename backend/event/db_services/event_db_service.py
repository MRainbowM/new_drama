from typing import List
from typing import Optional

from basis.services.abstract_db_service import AbstractDBService
from django.db.models import Q
from event.models.event_model import Event


class EventDBService(AbstractDBService):
    def __init__(self):
        self.model = Event

    async def _get_filters(
            self,
            show_on_main_page: Optional[bool] = None,
            is_enable: Optional[bool] = None,
            slug: Optional[str] = None,
            **kwargs
    ) -> Q:
        """
        Получить фильтры для запроса.

        :param show_on_main_page: Показывать на главной странице.
        :param is_enable: Показывать на сайте.
        :param slug: Slug спектакля.
        :return: Фильтры.
        """
        filters = Q()

        if show_on_main_page is not None:
            filters &= Q(show_on_main_page=show_on_main_page)

        if is_enable is not None:
            filters &= Q(is_enable=is_enable)

        if slug is not None:
            filters &= Q(slug=slug)

        return filters

    async def _get_select_related(
            self,
            join_producer: Optional[bool] = None,
            **kwargs
    ) -> List[str]:
        """
        Получить select_related для запроса.

        :param join_producer: Объединить с таблицей people.People
        :return: select_related
        """
        select_related = []

        if join_producer:
            select_related.append('producer')

        return select_related


event_db_service = EventDBService()
