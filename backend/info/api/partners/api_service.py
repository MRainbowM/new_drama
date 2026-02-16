from typing import List

from info.db_services.partner_db_service import partner_db_service
from info.models import Partner


class PartnerApiService:
    async def get_partner_list(self) -> List[Partner]:
        """
        Получение списка партнеров.
        Возвращает только те записи, у которых is_enable=True (показываются на сайте).
        :return: Список партнеров.
        """
        return await partner_db_service.get_list(
            is_enable=True,
            order_by='sort',
            return_fields=['id', 'name', 'logo', 'link']
        )


partner_api_service = PartnerApiService()
