from typing import Optional

from ninja import Schema


class InfoBlockOutSchema(Schema):
    id: int
    title: str
    content: str
    btn_text: str
    btn_link: str
    cover: str
    menu_title_slug: str
    menu_title: str


class InfoBlockFilterSchema(Schema):
    in_menu: Optional[bool] = None
