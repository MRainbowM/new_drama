from django.utils import timezone

from ..popup_model import Popup


class PopupDBService:
    def get_active(self) -> Popup:
        """
            Получение активного поп-апа на текущий момент времени
        """
        current_time = timezone.localtime()

        return Popup.objects.filter(
            is_enable=True,
            start_at__lte=current_time,
            end_at__gte=current_time,
        ).first()


popup_db_service = PopupDBService()
