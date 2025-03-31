from datetime import date, datetime
from typing import List, Optional

from django.http import Http404
from django.shortcuts import redirect
from django.utils.translation import gettext_lazy as _
from ninja import Query, Router

from basis.settings import MEDIA_URL
from .models.services.event_db_service import event_db_service
from .models.services.event_show_db_service import event_show_db_service
from .schemes import (
    EventShowOutSchema,
    EventDetailSchema,
    EventFilterSchema,
    EventPreviewSchema,
    EventProgramSchema
)

router = Router()


@router.get(
    '/event_show/list',
    response=List[EventShowOutSchema],
    tags=[_('Афиша')],
    summary=_('Получить список спектаклей в афише c текущего месяца')
)
async def get_event_show_list(request, event_id: Optional[int] = None):
    today = datetime.today()
    return await event_show_db_service.get_list(
        is_enable=True,
        event_id=event_id,
        start_at__month__gte=today.month,
        start_at__year__gte=today.year
    )


@router.get(
    '/program',
    response=EventProgramSchema,
    tags=[_('Афиша')],
    summary=_('Получить программку спектакля по текущей дате')
)
async def get_event_program_by_date(request, event_date: date = date.today()):
    event_show = await event_show_db_service.get_first(
        is_enable=True,
        start_at__date__gte=event_date
    )

    if event_show is None:
        raise Http404

    if not event_show.event.program_pdf:
        raise Http404

    return redirect(f'{MEDIA_URL}{event_show.event.program_pdf}')


@router.get(
    '/event/list',
    response=List[EventPreviewSchema],
    tags=[_('Спектакли')],
    summary=_('Получить список всех спектаклей: репертуар'),
    url_name='get-event-list'
)
async def get_event_list(request, filters: EventFilterSchema = Query(...)):
    return await event_db_service.get_list(filters)


@router.get(
    '/event/{slug}',
    response=EventDetailSchema,
    tags=[_('Спектакли')],
    summary=_('Получить данные спектакля по slug')
)
async def get_event_by_slug(request, slug: str):
    event = await event_db_service.get_by_slug(slug=slug)
    if not event:
        raise Http404(_('Событие не найдено'))

    return event
