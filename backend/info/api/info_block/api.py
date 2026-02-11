from typing import List

from ninja import Router, Query

from .api_service import info_block_api_service
from .schemas import InfoBlockOutSchema, InfoBlockFilterSchema

router = Router(tags=['Инфо-блоки'])


@router.get(
    '/info-blocks/',
    response=List[InfoBlockOutSchema],
    summary='Получить список инфо-блоков'
)
async def get_info_block_list(request, params: InfoBlockFilterSchema = Query(...)):
    return await info_block_api_service.get_info_block_list(in_menu=params.in_menu)
