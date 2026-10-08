from datetime import datetime
from pydantic import BaseModel
from typing import Optional


class RecipeListItem(BaseModel):
    id: int
    Machine_id: int
    timestart: datetime
    User_id: int
    name: str
    fname: str
    sname: str

class RecipeDetails(BaseModel):
    #id: int
    #source: int
    #Machine_id: int
    #timestart: datetime
    #User_id: int
    #name: str
    moves: int
    distance: int
    airFlow: int
    airTemp: int
    screwSpeed: int
    rollerPress: int
    water: int
    carrSpeed: int
    rotatSpeed: int
    tempZone1: int
    tempZone2: int
    tempZone3: int
    tempZone4: int
    tempDie: int
    stbExtrSpeed: int
    stbScrwSpeed: int
    stbAirFlow: int
    stbAirTemp: int
    carrRetDelBott: int
    carrRetDelTop: int
    carrAccDcc: int
    diameterEmpt: float
    diameterLoad: int
    cuttBladeSpeed: int
    cuttRotatSpeed: int
    cuttFinishTime: int
    cabAirTempSett: int
    cabAirTempAlm: int
    optCarbon: int
    optCoreless: int

class SuccessResponse(BaseModel):
    status: str = "success"
    message: str

class RecipeUpdateRequest():
    id: int
    