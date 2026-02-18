from event.api.api import router as event_router
from event.api.event_shows.api import router as event_shows_router
from event.api.events.api import router as events_router
from info.api.info_blocks.api import router as info_block_router
from info.api.partners.api import router as partners_router
from info.api.popups.api import router as popups_router
from info.api.reviews.api import router as review_router
from ninja import NinjaAPI
from people.api import router as people_router

api = NinjaAPI(
    urls_namespace='api',
    docs_url='docs',
    openapi_url='openapi.json',  # это сделает openapi.json доступным по /api/openapi.json
)

api.add_router("/event/", event_router)  # TODO: del
api.add_router("/event-shows/", event_shows_router)
api.add_router("/events/", events_router)
api.add_router("/people/", people_router)
api.add_router("/info/", info_block_router)
api.add_router("/info/", review_router)
api.add_router("/info/", popups_router)
api.add_router("/info/", partners_router)
