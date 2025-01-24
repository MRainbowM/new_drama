from typing import Optional

from ninja import FilterSchema, Field, ModelSchema

from ..models import Partner


class PartnerOutSchema(ModelSchema):
    class Config:
        model = Partner
        model_fields = [
            'id', 'name', 'logo'
        ]


class PartnerFilterSchema(FilterSchema):
    is_enable: Optional[bool] = Field(None, q='is_enable')
