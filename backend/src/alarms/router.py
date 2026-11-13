from fastapi import APIRouter, HTTPException

from alarms.service import AlarmsService
from alarms.repository import AlarmsRepository
from alarms.models import AlarmListItem


router = APIRouter()

service = AlarmsService(AlarmsRepository())


@router.get("/alarms")
def get_alarmReports():
    return service.get_all_alarmReports()
