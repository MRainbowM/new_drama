from ninja import NinjaAPI

from event.api import router as event_router
from info.api import router as info_router
from people.api import router as people_router

api = NinjaAPI(urls_namespace='api')

api.add_router("/event/", event_router)
api.add_router("/people/", people_router)
api.add_router("/info/", info_router)
