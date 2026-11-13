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

class FilterParameters(BaseModel):
    from_date: str | None = None
    to_date: str | None = None
    search: str | None = None
