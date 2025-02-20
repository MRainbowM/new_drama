from typing import Optional, List

from ninja import ModelSchema, FilterSchema, Field

from people.schemes import PeoplePreviewSchema, PeopleShortSchema, EventPeopleOutSchema
from .event_image_schemes import EventImageOutSchema
from ..models import Event


class EventDetailSchema(ModelSchema):
    peoples: List[EventPeopleOutSchema]
    images: List[EventImageOutSchema]
    dramatist: Optional[PeopleShortSchema]
    producer: Optional[PeopleShortSchema]
    duration_format: Optional[str]

    class Config:
        model = Event

        model_fields = [
            'id', 'name', 'slug', 'short_description', 'min_age_limit',
            'description', 'has_intermission', 'premiere_at',
            'dramatist', 'producer',
            'cover', 'preview_cover', 'detail_cover', 'description_cover', 'actor_cover'
        ]

    @staticmethod
    def resolve_peoples(obj):
        return obj.peoples.all().order_by('sort')

    @staticmethod
    def resolve_images(obj):
        return obj.images.filter(is_enable=True)

    @staticmethod
    def resolve_duration_format(obj) -> str:
        if not obj.duration:
            return ''
        
        duration = str(obj.duration).split(':')
        return f'{duration[0]}:{duration[1]}'


class EventPreviewSchema(ModelSchema):
    dramatist: Optional[PeoplePreviewSchema]
    producer: Optional[PeoplePreviewSchema]

    class Config:
        model = Event
        model_fields = [
            'id', 'name', 'slug', 'short_description', 'cover', 'preview_cover', 'min_age_limit',
        ]


class EventProgramSchema(ModelSchema):
    class Config:
        model = Event
        model_fields = [
            'program_pdf', 'name'
        ]


class EventFilterSchema(FilterSchema):
    is_enable: Optional[bool] = Field(None, q='is_enable')
