from typing import List

from ninja import Router, Query

from .api_service import event_api_service
from .schemas import (
    EventFilterSchema,
    EventPreviewSchema,
    EventDetailSchema,
)

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


@router.get(
    '/{slug}/',
    response={200: EventDetailSchema, 404: dict},
    summary='Получить данные спектакля по slug',
)
async def get_event_by_slug(request, slug: str):
    return await event_api_service.get_event_by_slug(
        slug=slug
    )
