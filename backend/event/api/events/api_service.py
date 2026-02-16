from typing import Optional

from .schemas import ORDER_BY_FIELDS
from ...db_services.event_db_service import event_db_service


class EventAPIService:

    async def get_events(
            self,
            show_on_main_page: Optional[bool] = None,
            order_by: Optional[ORDER_BY_FIELDS] = None
    ):
        """
        Получить список спектаклей: репертуар.
        Только разрешенные к показу на сайте.

        :param show_on_main_page: Показывать на главной странице
        :param order_by: Сортировка
        :return: Список спектаклей
        """
        return await event_db_service.get_list(
            show_on_main_page=show_on_main_page,
            order_by=order_by,
            is_enable=True,  # Только разрешенные к показу на сайте
            join_producer=True,
            return_fields=[
                'id', 'name', 'slug', 'dramatist', 'short_description', 'cover', 'preview_cover', 'min_age_limit',
                'is_archival', 'cover_in_list', 'producer',
                'cover_in_list', 'show_on_main_page', 'is_enable',

                'producer', 'producer__first_name', 'producer__last_name', 'producer__slug', 'producer__tag',
                'producer__photo',
            ],
        )


event_api_service = EventAPIService()
