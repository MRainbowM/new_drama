from datetime import datetime
from typing import Optional

from ninja import Schema


class EventShowFilterSchema(Schema):
    event_id: Optional[int] = None


class EventInEventShowSchema(Schema):
    id: int
    name: str
    slug: str
    short_description: str
    preview_cover: Optional[str] = None
    min_age_limit: int


class EventShowOutSchema(Schema):
    id: int
    event: EventInEventShowSchema
    start_at: datetime
    is_premiere: bool
    link_to_buy_ticket: str
    day_of_week: str
