from fastapi import APIRouter, HTTPException, Depends

from alarms.service import AlarmsService
from alarms.repository import AlarmsRepository
from alarms.models import AlarmListItem, FilterParameters


router = APIRouter()

service = AlarmsService(AlarmsRepository())


@router.get("/alarms/filter-data")
def get_filters_data():
    return service.get_filters_data()

@router.get("/alarms")
def get_alarmReports(filters: FilterParameters = Depends()):
    return service.get_all_alarmReports(filters)
