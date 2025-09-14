from datetime import datetime

from ninja import Schema

from .event_schemes import EventPreviewSchema


class EventShowOutSchema(Schema):
    id: int
    event: EventPreviewSchema
    start_at: datetime
    is_premiere: bool
    link_to_buy_ticket: str
    day_of_week: str
