from pydantic import BaseModel

class ProductionListItem(BaseModel):
    id: int
    Machine_id: int
    timestart: str
    timework: int
    timewait: int
    User_id: int
    worksorder: str
    partnum: str
    Recipe_id: int
    quantity: int
    Stops_id: int
