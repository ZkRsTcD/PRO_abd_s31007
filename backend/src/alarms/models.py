from pydantic import BaseModel
from typing import List 

class AlarmListItem(BaseModel):
    id: int
    machine_code: int
    timestart: str
    fname: str
    sname: str
    reason: str

class FilterParameters(BaseModel):
    from_date: str | None = None
    to_date: str | None = None
    machine: str | None = None
    operator: str | None = None
    offset: int = 0
    limit: int = 50

class FilterListsData(BaseModel):
    machines: List[str]
    operators: List[str]
