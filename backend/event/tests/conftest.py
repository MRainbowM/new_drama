from datetime import timedelta

import pytest
from django.conf import settings
from django.utils import timezone
from event.models import Event, EventShow
from ninja.testing import TestAsyncClient

from basis.api import api


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
def event_show(event):
    return EventShow.objects.create(
        event=event,
        start_at=timezone.now() + timedelta(days=3),
        is_enable=True,
        is_premiere=False,
        is_sold_out=False,
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
        link_to_buy_ticket=f'{settings.TICKET_SERVICE_BASE_URL}/show/2',
    )
