from typing import Optional

from ninja import Schema


class EventProgramSchema(Schema):
    id: int
    name: str
    program_pdf: Optional[str] = None
