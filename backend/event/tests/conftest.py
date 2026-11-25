from datetime import timedelta
import os

import pytest
from django.conf import settings
from django.utils import timezone
from event.models import Event, EventShow
from ninja.testing import TestAsyncClient

from basis.api import api

# Несколько TestClient на один NinjaAPI в рамках сессии pytest
os.environ.setdefault('NINJA_SKIP_REGISTRY', '1')

MISSING_COVER_PATH = 'event_cover/2026/09/08/missing.jpg'


@pytest.fixture
def api_client():
    return TestAsyncClient(api)


@pytest.fixture
def event(db):
    return Event.objects.create(
        name='Стоики',
        short_description='вкусный рецепт невкусных будней',
        slug='stoiki',
        min_age_limit=16,
    )


@pytest.fixture
def main_page_event(db):
    return Event.objects.create(
        name='Певец пустоты',
        short_description='спектакль на главной',
        slug='pevets-pustoty',
        min_age_limit=18,
        is_enable=True,
        show_on_main_page=True,
        sort=1,
    )


@pytest.fixture
def disabled_event(db):
    return Event.objects.create(
        name='Скрытый спектакль',
        short_description='не показываем на сайте',
        slug='hidden-event',
        min_age_limit=12,
        is_enable=False,
        show_on_main_page=True,
    )


@pytest.fixture
def event_without_main_page(db):
    return Event.objects.create(
        name='Только в репертуаре',
        short_description='не на главной',
        slug='repertoire-only',
        min_age_limit=16,
        is_enable=True,
        show_on_main_page=False,
        sort=2,
    )


@pytest.fixture
def event_with_missing_cover(main_page_event):
    """Спектакль с путём к обложке в БД, но без файла на диске."""
    Event.objects.filter(pk=main_page_event.pk).update(
        cover=MISSING_COVER_PATH,
        cover_in_list=MISSING_COVER_PATH,
        detail_cover=MISSING_COVER_PATH,
        description_cover=MISSING_COVER_PATH,
        actor_cover=MISSING_COVER_PATH,
    )
    main_page_event.refresh_from_db()
    return main_page_event


@pytest.fixture
def event_show(event):
    return EventShow.objects.create(
        event=event,
        start_at=timezone.now() + timedelta(days=3),
        is_enable=True,
        is_premiere=False,
        is_sold_out=False,
        is_promo=False,
        link_to_buy_ticket=f'{settings.TICKET_SERVICE_BASE_URL}/show/1',
    )


@pytest.fixture
def sold_out_event_show(event):
    return EventShow.objects.create(
        event=event,
        start_at=timezone.now() + timedelta(days=5),
        is_enable=True,
        is_premiere=True,
        is_sold_out=True,
        is_promo=True,
        link_to_buy_ticket=f'{settings.TICKET_SERVICE_BASE_URL}/show/2',
    )
