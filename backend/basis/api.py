from ninja import NinjaAPI

from event.api import router as event_router
from people.api import router as people_router

api = NinjaAPI()

api.add_router("/event/", event_router)
api.add_router("/people/", people_router)
