from typing import Sequence, Generic, TypeVar

from pydantic import BaseModel, Field

T = TypeVar('T')


class PageSchema(BaseModel, Generic[T]):
    """
    Схема страницы с пагинатором.
    """
    data: Sequence[T]
    count: int = Field(..., description='Количество элементов')
    count_page: int = Field(..., description='Количество страниц')
    page: int = Field(..., ge=1, description='Номер страницы (от 1)')
    size: int = Field(..., ge=1, description='Размер страницы (от 1)')


class PaginatorQuerySchema(BaseModel):
    """
    Схема query-параметров для пагинации.
    """
    page: int = Field(1, ge=1, description='Номер страницы (от 1)')
    size: int = Field(50, ge=1, le=100, description='Размер страницы (от 1)')
