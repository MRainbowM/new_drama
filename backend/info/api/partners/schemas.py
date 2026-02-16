from ninja import Schema


class PartnerOutSchema(Schema):
    id: int
    name: str
    logo: str
    link: str
