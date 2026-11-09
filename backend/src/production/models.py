from pydantic import BaseModel

class ProductionListItem(BaseModel):
    id: int
    Machine_id: int
    timestart: str
    worksorder: str
    partnum: str
    name: str   #Recipe name
    quantity: int
    fname: str     #User fname
    sname: str     #User sname
    timework: int
    timewait: int
    reason: str
