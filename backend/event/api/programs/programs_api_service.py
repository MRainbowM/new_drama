import os

from django.conf import settings
from django.http import FileResponse, HttpResponseRedirect
from django.utils import timezone
from event.db_services.event_show_db_service import event_show_db_service


class ProgramsAPIService:
    def _redirect_to_event(self, host: str, slug: str | None) -> HttpResponseRedirect:
        base_url = f"https://{host}"
        path = f"/events/{slug}" if slug else "/events"
        return HttpResponseRedirect(base_url + path)

    async def get_program_today(self, host: str) -> FileResponse:
        """
        Получить программку спектакля по текущей дате.
        Спектакль сегодня или позже.
        Если нет подходящего спектакля или программки — редирект на карточку спектакля.

        :param host: Хост, на котором работает сервер.
        :return: Программка спектакля или редирект на фронтенд.
        """
        event_date = timezone.now().date()

        event_show = await event_show_db_service.get_first(
            is_enable=True,
            start_at__date__gte=event_date,
            order_by='start_at',
            join_event=True,
            return_fields=[
                'id', 'event', 'event__name', 'event__slug', 'event__program_pdf'
            ]
        )

        if event_show is None:
            return self._redirect_to_event(host, slug=None)

        if not event_show.event.program_pdf:
            return self._redirect_to_event(host, slug=event_show.event.slug)

        file_path = os.path.join(
            settings.MEDIA_ROOT, str(event_show.event.program_pdf)
        )

        if not os.path.exists(file_path):
            return self._redirect_to_event(host, slug=event_show.event.slug)

        response = FileResponse(
            open(file_path, "rb"),
            content_type="application/pdf"
        )

        # response["Content-Disposition"] = 'attachment; filename="program.pdf"'  # Файл будет скачиваться
        response["Content-Disposition"] = 'inline; filename="program.pdf"'
        return response


programs_api_service = ProgramsAPIService()
