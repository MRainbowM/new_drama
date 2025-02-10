from typing import Optional

from ninja import FilterSchema, Field, ModelSchema

from ..models import Review


class ReviewOutSchema(ModelSchema):
    class Config:
        model = Review
        model_fields = [
            'id', 'image', 'nickname'
        ]


class ReviewFilterSchema(FilterSchema):
    is_enable_main: Optional[bool] = Field(None, q='is_enable_main')
    is_enable_event: Optional[bool] = Field(None, q='is_enable_event')
    event_id: Optional[int] = Field(None, q='event_id')
