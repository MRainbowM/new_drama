from datetime import datetime
from typing import Optional

from ninja import Schema


class PopupOutSchema(Schema):
    id: int
    subtitle: Optional[str] = None
    title: str
    short_title: str
    content: str
    btn_text: str
    btn_link: str
    cover: str
    end_at: datetime
