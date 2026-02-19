from datetime import date
from typing import Literal, Optional, List

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
    tag: Optional[str] = None
    role: Optional[str] = None


class ProducerPreviewInEventPreviewSchema(Schema):
    id: int
    first_name: str
    last_name: str


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

    producer: Optional[ProducerPreviewInEventPreviewSchema] = None
    cover_compressed_url: str


class EventImageOutSchema(Schema):
    id: int
    image: str
    image_compressed_url: Optional[str] = None


class EventDetailSchema(Schema):
    id: int
    name: str
    slug: str
    short_description: str
    min_age_limit: int
    description: str
    has_intermission: bool
    premiere_at: Optional[date] = None
    dramatist: str

    duration_format: str

    cover_compressed_url: Optional[str] = None
    detail_cover_compressed_url: Optional[str] = None
    description_cover_compressed_url: Optional[str] = None
    actor_cover_compressed_url: Optional[str] = None

    peoples: List[PeoplePreviewInEventPreviewSchema]
    images: List[EventImageOutSchema]
    producer: Optional[ProducerPreviewInEventPreviewSchema] = None
