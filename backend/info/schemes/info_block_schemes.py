from typing import Optional

from ninja import FilterSchema, Field, ModelSchema

from ..models import InfoBlock


class InfoBlockOutSchema(ModelSchema):
    class Config:
        model = InfoBlock
        model_fields = [
            'id', 'title', 'content', 'btn_text',
            'btn_link', 'cover'
        ]


class InfoBlockFilterSchema(FilterSchema):
    is_enable: Optional[bool] = Field(None, q='is_enable')
