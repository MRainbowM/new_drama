from datetime import datetime
from typing import Optional

from django.db.models import Q
from ninja import Schema, FilterSchema, Field

from .event_schemes import EventPreviewSchema


class EventShowOutSchema(Schema):
    id: int
    event: EventPreviewSchema
    start_at: datetime
    is_premiere: bool
    link_to_buy_ticket: str


class EventShowFilterSchema(FilterSchema):
    # start_at__gte: Optional[datetime] = Field(None, q='start_at__gte')
    # start_at__lte: Optional[datetime] = Field(None, q='start_at__lte')
    # start_at__month__gte: Optional[int] = Field(None, q='start_at__month__gte')
    # start_at__year__gte: Optional[int] = Field(None, q='start_at__year__gte')
    is_enable: Optional[bool] = Field(None, q='is_enable')
    event_id: Optional[int] = Field(None, q='event_id')

    from_current_month: Optional[bool] = None

    def filter_from_current_month(self, value: bool) -> Q:
        """Фильтр возвращает спектакли, идущие в текущем и последующих месяцах"""
        if not value:
            return Q()

        today = datetime.today()
        return Q(
            start_at__month__gte=today.month
        ) & Q(
            start_at__year__gte=today.month
        )
