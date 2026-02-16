from basis.services.abstract_db_service import AbstractDBService
from django.db.models import Q
from info.models import Partner


class PartnerDbService(AbstractDBService[Partner]):
    def __init__(self):
        self.model = Partner

    async def _get_filters(
            self,
            is_enable: bool = None,
    ) -> Q:
        """
        Получение фильтров для запроса.
        :param is_enable: Показывать на сайте.
        :return: Фильтры.
        """
        filters = Q()

        if is_enable is not None:
            filters &= Q(is_enable=is_enable)

        return filters


partner_db_service = PartnerDbService()
