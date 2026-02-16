from typing import List

from ninja import Router

from .api_service import partner_api_service
from .schemas import PartnerOutSchema

router = Router(tags=['Партнеры'])


@router.get(
    '/partners/',
    response={200: List[PartnerOutSchema]},
    summary='Получить список партнеров'
)
async def get_partner_list(request):
    return await partner_api_service.get_partner_list()
