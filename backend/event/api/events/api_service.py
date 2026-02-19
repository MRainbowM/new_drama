from ninja.errors import HttpError
from people.db_services.event_people_db_service import event_people_db_service

from .schemas import *
from ...db_services.event_db_service import event_db_service
from ...db_services.event_image_db_service import event_image_db_service


class EventAPIService:

    async def get_events(
            self,
            show_on_main_page: Optional[bool] = None,
            order_by: Optional[ORDER_BY_FIELDS] = None
    ) -> List[EventPreviewSchema]:
        """
        Получить список спектаклей: репертуар.
        Только разрешенные к показу на сайте.

        :param show_on_main_page: Показывать на главной странице
        :param order_by: Сортировка
        :return: Список спектаклей
        """
        events = await event_db_service.get_list(
            show_on_main_page=show_on_main_page,
            order_by=order_by,
            is_enable=True,  # Только разрешенные к показу на сайте
            join_producer=True,
            return_fields=[
                'id', 'name', 'slug', 'dramatist', 'short_description', 'cover', 'preview_cover', 'min_age_limit',
                'is_archival', 'producer',
                'cover_in_list', 'show_on_main_page', 'is_enable',

                'producer', 'producer__first_name', 'producer__last_name', 'producer__slug', 'producer__tag',
                'producer__photo',
            ],
        )

        return [
            EventPreviewSchema.model_validate(event)
            for event in events
        ]

    async def get_event_by_slug(self, slug: str) -> Optional[EventDetailSchema]:
        """
        Получить данные спектакля по slug.

        :param slug: Slug спектакля.
        :return: Данные спектакля.
        :raises HttpError 404: Если спектакль не найден.
        """
        event = await event_db_service.get_first(
            slug=slug,
            join_producer=True,
            return_fields=[
                'id', 'name', 'slug', 'dramatist', 'short_description',
                'cover', 'preview_cover', 'min_age_limit', 'duration',
                'description', 'has_intermission', 'premiere_at',

                'cover', 'detail_cover', 'description_cover', 'actor_cover',

                'producer', 'producer__first_name', 'producer__last_name',
            ]
        )

        if not event:
            raise HttpError(
                status_code=404,
                message='Спектакль не найден'
            )

        event_peoples = await event_people_db_service.get_list(
            event_id=event.id,
            join_people=True,
            order_by='sort',
            return_fields=[
                'id', 'people', 'people__first_name',
                'people__last_name', 'people__slug',
                'tag', 'role',
            ]
        )

        images = await event_image_db_service.get_list(
            event_id=event.id,
            is_enable=True,
            return_fields=['id', 'image']
        )

        return EventDetailResponseSchema(
            event=EventDetailSchema.model_validate(event),
            peoples=[
                EventPeopleInEventOutSchema.model_validate(event_people)
                for event_people in event_peoples
            ],
            images=[
                EventImageOutSchema.model_validate(image)
                for image in images
            ]
        )


event_api_service = EventAPIService()
