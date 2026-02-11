from basis.services.abstract_db_service import AbstractDBService
from django.db.models import Q

from ..models import InfoBlock


class InfoBlockDbService(AbstractDBService[InfoBlock]):
    """
    Сервис для работы с инфо-блоками.
    """

    def __init__(self):
        self.model = InfoBlock

    async def _get_filters(
            self,
            is_enable: bool = None,
            in_menu: bool = None,
            **kwargs
    ) -> Q:
        """
        Получить фильтры для запроса.

        :param is_enable: Показывать на сайте.
        :param in_menu: Добавить пункт в меню.
        :return: QuerySet инфо-блоков.
        """
        filters = Q()

        if is_enable is not None:
            filters &= Q(is_enable=is_enable)

        if in_menu is not None:
            filters &= Q(in_menu=in_menu)

        return filters


info_block_db_service = InfoBlockDbService()
