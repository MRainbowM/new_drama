from typing import List

from ninja import Router, Query

from .api_service import event_api_service
from .schemas import EventFilterSchema, EventPreviewSchema

router = Router(tags=['Спектакли'])


@router.get(
    '/',
    response={200: List[EventPreviewSchema]},
    summary='Получить список всех спектаклей: репертуар',
)
async def get_events(request, params: EventFilterSchema = Query(...)):
    return await event_api_service.get_events(
        **params.model_dump()
    )
