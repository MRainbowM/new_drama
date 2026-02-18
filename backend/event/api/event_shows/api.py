from typing import List

from ninja import Router, Query

from .api_service import event_show_api_service
from .schemas import EventShowOutSchema, EventShowFilterSchema

router = Router(tags=['Афиша'])


@router.get(
    '/',
    response=List[EventShowOutSchema],
    summary='Получить список спектаклей в афише c текущего месяца'
)
async def get_event_shows(request, params: EventShowFilterSchema = Query(...)):
    return await event_show_api_service.get_list_by_month(
        **params.model_dump()
    )
