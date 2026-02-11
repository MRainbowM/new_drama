from typing import List

from ...db_services.info_block_db_service import info_block_db_service
from ...models import InfoBlock


class InfoBlockApiService:

    async def get_info_block_list(self, in_menu: bool = None) -> List[InfoBlock]:
        """
        Получить список инфо-блоков.
        Возвращается только те, у которых is_enable=True (включены для показа на сайте).

        :param in_menu: Добавить пункт в меню.
        :return: Список инфо-блоков.
        """
        return await info_block_db_service.get_list(
            is_enable=True,
            in_menu=in_menu,
            order_by='sort',
            return_fields=[
                'id', 'title', 'menu_title_slug', 'menu_title',
                'content', 'btn_text', 'btn_link', 'cover'
            ]
        )


info_block_api_service = InfoBlockApiService()
