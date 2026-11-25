from pydantic import BaseModel
from typing import List

class ProductionListItem(BaseModel):
    id: int
    machine_code: str
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
    worksNo: str | None = None
    partNo: str | None = None
    offset: int = 0
    limit: int = 50

class FilterListsData(BaseModel):
    worksNos: List[str]
    partNos: List[str]
