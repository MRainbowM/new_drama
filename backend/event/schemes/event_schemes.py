from typing import List
from typing import Optional

from ninja import ModelSchema, FilterSchema, Field
from people.schemes import PeoplePreviewSchema, PeopleShortSchema, EventPeopleOutSchema

from .event_image_schemes import EventImageOutSchema
from ..models import Event


class EventDetailSchema(ModelSchema):
    peoples: List[EventPeopleOutSchema]
    images: List[EventImageOutSchema]
    producer: Optional[PeopleShortSchema]
    duration_format: Optional[str]
    cover_compressed_url: Optional[str] = None
    detail_cover_compressed_url: Optional[str] = None
    description_cover_compressed_url: Optional[str] = None
    actor_cover_compressed_url: Optional[str] = None

    class Config:
        model = Event

        model_fields = [
            'id', 'name', 'slug', 'short_description', 'min_age_limit',
            'description', 'has_intermission', 'premiere_at',
            'dramatist', 'producer',
            'cover', 'cover_in_list', 'preview_cover', 'detail_cover', 'description_cover', 'actor_cover',
            'is_archival'
        ]

    @staticmethod
    def resolve_duration_format(obj) -> str:
        if not obj.duration:
            return ''

        duration = str(obj.duration).split(':')
        return f'{duration[0]}:{duration[1]}'


class EventPreviewSchema(ModelSchema):
    producer: Optional[PeoplePreviewSchema]
    cover_compressed_url: str

    class Config:
        model = Event
        model_fields = [
            'id', 'name', 'slug', 'dramatist', 'short_description', 'cover', 'preview_cover', 'min_age_limit',
            'is_archival', 'cover_in_list'
        ]


class EventProgramSchema(ModelSchema):
    class Config:
        model = Event
        model_fields = [
            'program_pdf', 'name'
        ]


class EventFilterSchema(FilterSchema):
    is_enable: Optional[bool] = Field(None, q='is_enable')
