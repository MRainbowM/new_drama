from typing import List

from ninja import Router, Query

from .api_service import review_api_service
from .schemas import ReviewOutSchema, ReviewFilterSchema

router = Router(tags=['Отзывы'])


@router.get(
    '/reviews/',
    response=List[ReviewOutSchema],
    summary='Получить список отзывов'
)
async def get_review_list(request, params: ReviewFilterSchema = Query(...)):
    return await review_api_service.get_review_list(
        is_enable_main=params.is_enable_main,
        is_enable_event=params.is_enable_event,
        event_id=params.event_id
    )
