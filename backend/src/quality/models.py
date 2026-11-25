from pydantic import BaseModel
from typing import List 

class QualityListItem(BaseModel):
    id: int
    MachineWorkCycles_id: int
    machine_code: str           #From Machine
    timestart: str
    worksorder: str             #From MachineWorkCycles
    partnum: str                #From MachineWorkCycles
    quantity: int               #From MachineWorkCycles
    timework: int               #From MachineWorkCycles
    fname: str                  #From User
    sname: str                  #From User
    weight: int
    diameter: int

class FilterParameters(BaseModel):
    from_date: str | None = None
    to_date: str | None = None
    search: str | None = None
    worksNo: str | None = None
    partNo: str | None = None
    machine: str | None = None
    offset: int = 0
    limit: int = 50

class FilterListsData(BaseModel):
    worksNos: List[str]
    partNos: List[str]
    machines: List[str]


