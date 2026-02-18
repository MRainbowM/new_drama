import os
from datetime import date
from typing import List, Optional
from typing import Literal

from django.conf import settings
from django.http import Http404, FileResponse
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from ninja import Router

from ..models.services.event_db_service import event_db_service
from ..models.services.event_show_db_service import event_show_db_service
from ..schemes import (
    EventShowOutSchema,
    EventDetailSchema,
    EventPreviewSchema
)

router = Router()


@router.get(
    '/event_show/list',
    response=List[EventShowOutSchema],
    tags=[_('Афиша')],
    summary=_('Получить список спектаклей в афише c текущего месяца')
)
async def get_event_show_list(request, event_id: Optional[int] = None):
    today = timezone.localtime().date()
    start_date = today.replace(day=1)
    return await event_show_db_service.get_list(
        is_enable=True,
        event_id=event_id,
        start_at__date__gte=start_date
    )


@router.get(
    '/program',
    response=None,
    tags=[_('Афиша')],
    summary=_('Получить программку спектакля по текущей дате')
)
async def get_event_program_by_date(request, event_date: date = timezone.localtime().date()):
    event_show = await event_show_db_service.get_first(
        is_enable=True,
        start_at__date__gte=event_date,
        order_by='start_at'
    )

    if event_show is None:
        # Нет подходящего спектакля в афише
        raise Http404(_("Спектакль не найден"))

    if not event_show.event.program_pdf:
        # Спектакль найден, но у него нет файла с программкой
        raise Http404(
            _(f"Программка не найдена, event_id={event_show.event.id}"))

    file_path = os.path.join(
        settings.MEDIA_ROOT, str(event_show.event.program_pdf))

    if not os.path.exists(file_path):
        # Файл физически не существует на сервере
        raise Http404(_("Файл не найден"))

    response = FileResponse(open(file_path, "rb"),
                            content_type="application/pdf")
    # response["Content-Disposition"] = 'attachment; filename="program.pdf"'  # Файл будет скачиваться
    response["Content-Disposition"] = 'inline; filename="program.pdf"'
    return response


@router.get(
    '/event/list',
    response=List[EventPreviewSchema],
    tags=[_('Спектакли')],
    summary=_('Получить список всех спектаклей: репертуар'),
    url_name='get-event-list'
)
async def get_event_list(
        request,
        show_on_main_page: bool = None,
        order_by: Literal['?', 'name', 'sort'] = None
):
    return await event_db_service.get_list(
        show_on_main_page=show_on_main_page,
        is_enable=True,
        order_by=order_by
    )


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
