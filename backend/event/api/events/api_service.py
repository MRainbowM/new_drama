from typing import Optional, List

from ninja.errors import HttpError
from people.db_services.event_people_db_service import event_people_db_service

from .schemas import (
    ORDER_BY_FIELDS,
    EventDetailSchema,
    EventPreviewSchema,
    PeoplePreviewInEventPreviewSchema,
    EventImageOutSchema
)
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
                'is_archival', 'cover_in_list', 'producer',
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

        :param slug: Slug спектакля
        :return: Данные спектакля
        :raises HttpError 404: Если спектакль не найден
        """
        event = await event_db_service.get_first(
            slug=slug,
            join_producer=True,
            prefetch_images=True,
            return_fields=[
                'id', 'name', 'slug', 'dramatist', 'short_description',
                'cover', 'preview_cover', 'min_age_limit', 'duration',
                'description', 'has_intermission', 'premiere_at',

                'is_archival', 'cover_in_list',
                'cover', 'detail_cover', 'description_cover', 'actor_cover',

                'producer', 'producer__first_name', 'producer__last_name',
                'producer__slug', 'producer__tag', 'producer__photo',
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

        return EventDetailSchema(
            id=event.id,
            name=event.name,
            slug=event.slug,
            short_description=event.short_description,
            min_age_limit=event.min_age_limit,
            description=event.description,
            has_intermission=event.has_intermission,
            premiere_at=event.premiere_at,
            dramatist=event.dramatist,
            cover_compressed_url=event.cover_compressed_url,
            detail_cover_compressed_url=event.detail_cover_compressed_url,
            description_cover_compressed_url=event.description_cover_compressed_url,
            actor_cover_compressed_url=event.actor_cover_compressed_url,
            duration_format=event.duration_format,
            producer=PeoplePreviewInEventPreviewSchema.model_validate(
                event.producer
            ),
            peoples=[
                PeoplePreviewInEventPreviewSchema(
                    id=event_people.people_id,
                    first_name=event_people.people.first_name,
                    last_name=event_people.people.last_name,
                    slug=event_people.people.slug,
                    tag=event_people.tag,
                    role=event_people.role
                )
                for event_people in event_peoples
            ],
            images=[
                EventImageOutSchema.model_validate(image)
                for image in images
            ]
        )


event_api_service = EventAPIService()
