from ninja import ModelSchema

from .people_schemes import PeopleShortSchema
from ..models import EventPeople


class EventPeopleOutSchema(ModelSchema):
    people: PeopleShortSchema

    class Config:
        model = EventPeople
        model_fields = ['id', 'tag', 'role', 'sort']
