from typing import List

from info.db_services.review_db_service import review_db_service
from info.models import Review


class ReviewApiService:

    async def get_review_list(
            self,
            is_enable_main: bool = None,
            is_enable_event: bool = None,
            event_id: int = None
    ) -> List[Review]:
        return await review_db_service.get_list(
            is_enable_main=is_enable_main,
            is_enable_event=is_enable_event,
            event_id=event_id
        )


review_api_service = ReviewApiService()
