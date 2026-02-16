from ninja import Router

from .api_service import popup_api_service
from .schemas import PopupOutSchema

router = Router(tags=['Поп-апы'])


@router.get(
    '/popups/active/',
    response={200: PopupOutSchema, 404: None},
    summary='Получить активный поп-ап на текущий момент времени'
)
async def get_active_popup(request):
    return await popup_api_service.get_active_popup()
