from pydantic import BaseModel

class AlarmListItem(BaseModel):
    id: int
    machine_code: int
    timestart: str
    fname: str
    sname: str
    reason: str
