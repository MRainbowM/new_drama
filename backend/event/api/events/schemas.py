from typing import Literal, Optional

from ninja import Schema
from pydantic import Field

ORDER_BY_FIELDS = Literal['?', 'name', 'sort']


class EventFilterSchema(Schema):
    show_on_main_page: bool = Field(
        default=None,
        description='Показывать на главной странице',
    )
    order_by: ORDER_BY_FIELDS = Field(
        default=None,
        description='Сортировка',
    )


class PeoplePreviewInEventPreviewSchema(Schema):
    id: int
    first_name: str
    last_name: str
    slug: str
    tag: Optional[str] = None
    photo: Optional[str] = None


class EventPreviewSchema(Schema):
    id: int
    name: str
    slug: str
    dramatist: str
    short_description: str
    cover: str
    preview_cover: Optional[str] = None
    min_age_limit: int
    is_archival: bool
    cover_in_list: Optional[str] = None

    producer: Optional[PeoplePreviewInEventPreviewSchema]
    cover_compressed_url: str
