from typing import Optional

from ninja import FilterSchema, Field, ModelSchema

from ..models import Viewer


class ViewerOutSchema(ModelSchema):
    class Config:
        model = Viewer
        model_fields = [
            'id', 'image'
        ]


class ViewerFilterSchema(FilterSchema):
    is_enable: Optional[bool] = Field(None, q='is_enable')
