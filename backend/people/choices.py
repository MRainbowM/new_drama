from django.utils.translation import gettext_lazy as _

# Тег в карточке спектакля
PEOPLE_TAG_ACTOR = 'actor'
PEOPLE_TAG_AUTHOR = 'author'

PEOPLE_TAG_LIST = (
    (PEOPLE_TAG_ACTOR, _('Актер')),
    (PEOPLE_TAG_AUTHOR, _('Автор'))
)

# Тег фильтрации в списке работников
PEOPLE_FILTER_TAG_ACTOR = 'actor'
PEOPLE_FILTER_TAG_DIRECTOR = 'director'
PEOPLE_FILTER_TAG_AUTHOR = 'author'
PEOPLE_FILTER_TAG_TEAM = 'team'

PEOPLE_FILTER_TAG_LIST = (
    (PEOPLE_FILTER_TAG_ACTOR, _('Актер')),
    (PEOPLE_FILTER_TAG_DIRECTOR, _('Режиссер')),
    (PEOPLE_FILTER_TAG_AUTHOR, _('Автор')),
    (PEOPLE_FILTER_TAG_TEAM, _('Команда')),
)
