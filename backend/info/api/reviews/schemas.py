from typing import Optional

from ninja import Schema


class ReviewOutSchema(Schema):
    id: int
    image: str
    nickname: Optional[str] = None


class ReviewFilterSchema(Schema):
    is_enable_main: Optional[bool] = None
    is_enable_event: Optional[bool] = None
    event_id: Optional[int] = None
