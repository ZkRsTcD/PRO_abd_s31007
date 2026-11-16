from pydantic import BaseModel

class LiveStatusPanelData(BaseModel):
    id: int
    machine_code: str
    iOn: bool
    iTemp: bool
    iQi: bool
    iData: bool
    i1Cycle: bool
    iAlarm: bool
    iWork: bool
    stopTime: str
    qtyLeft: int
    progress: int
    timeLeft: str
    cycleTime: str
    worksOrder: str
    partNumber: str
    recipe: str
    operator: str
    efficiency: int
    iClean: bool
    iAss: bool
    UpdatedAt: str
