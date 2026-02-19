from django.utils import timezone
from info.db_services.popup_db_service import popup_db_service
from info.models import Popup
from ninja.errors import HttpError


class PopupApiService:

    async def get_active_popup(self) -> Popup:
        """
        Получение активного поп-апа на текущий момент времени.
        """
        current_time = timezone.now()

        popup = await popup_db_service.get_first(
            is_enable=True,
            start_at__lte=current_time,
            end_at__gte=current_time,
            return_fields=[
                'id', 'subtitle', 'title', 'short_title',
                'content', 'btn_text', 'btn_link', 'cover', 'end_at'
            ]
        )

        if not popup:
            raise HttpError(
                status_code=404,
                message='Поп-ап не найден.'
            )

        return popup


popup_api_service = PopupApiService()
