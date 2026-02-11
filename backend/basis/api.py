from event.api import router as event_router
from info.api.info_block.api import router as info_block_router
from info.api.popups.api import router as popups_router
from info.api.review.api import router as review_router
# from info.api import router as info_router
from ninja import NinjaAPI
from people.api import router as people_router

api = NinjaAPI(
    urls_namespace='api',
    docs_url='docs',
    openapi_url='openapi.json',  # это сделает openapi.json доступным по /api/openapi.json
)

api.add_router("/event/", event_router)
api.add_router("/people/", people_router)
# api.add_router("/info/", info_router)
api.add_router("/info/", info_block_router)
api.add_router("/info/", review_router)
api.add_router("/info/", popups_router)
