import os
from datetime import date

from django.conf import settings
from django.http import Http404, FileResponse
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from ninja import Router

from ..models.services.event_show_db_service import event_show_db_service

router = Router()


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
