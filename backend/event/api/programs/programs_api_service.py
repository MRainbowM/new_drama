import os

from django.conf import settings
from django.http import FileResponse
from django.utils import timezone
from event.db_services.event_show_db_service import event_show_db_service
from ninja.errors import HttpError


class ProgramsAPIService:
    async def get_program_today(self) -> FileResponse:
        """
        Получить программку спектакля по текущей дате.
        Спектакль сегодня или позже.
        Если нет подходящего спектакля в афише, то возвращается None.

        :raises HttpError 404: Если спектакль не найден.
        :return: Программка спектакля.
        """
        event_date = timezone.now().date()

        event_show = await event_show_db_service.get_first(
            is_enable=True,
            start_at__date__gte=event_date,
            order_by='start_at',
            join_event=True,
            return_fields=[
                'id', 'event', 'event__name', 'event__program_pdf'
            ]
        )
        print('---event_show', event_show.id)

        if event_show is None:
            # Нет подходящего спектакля в афише
            raise HttpError(status_code=404, message="Спектакль не найден")

        if not event_show.event.program_pdf:
            # Спектакль найден, но у него нет файла с программкой
            raise HttpError(
                status_code=404,
                message=f"Программка не найдена для спектакля {event_show.event.name}"
            )

        file_path = os.path.join(
            settings.MEDIA_ROOT, str(event_show.event.program_pdf)
        )

        if not os.path.exists(file_path):
            # Файл физически не существует на сервере
            raise HttpError(
                status_code=404,
                message=f"Файл программки не найден для спектакля {event_show.event.name}"
            )

        response = FileResponse(open(file_path, "rb"),
                                content_type="application/pdf")
        # response["Content-Disposition"] = 'attachment; filename="program.pdf"'  # Файл будет скачиваться
        response["Content-Disposition"] = 'inline; filename="program.pdf"'
        return response


programs_api_service = ProgramsAPIService()
