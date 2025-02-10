from typing import Optional

from ninja import ModelSchema, FilterSchema, Field

from ..models import EventImage


class EventImageOutSchema(ModelSchema):
    class Config:
        model = EventImage
        model_fields = [
            'id', 'image',
        ]


class EventImageFilterSchema(FilterSchema):
    is_enable: Optional[bool] = Field(None, q='is_enable')
    event_id: int = Field(None, q='event_id')
