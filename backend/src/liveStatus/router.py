from fastapi import APIRouter

from liveStatus.service import LiveStatusService
from liveStatus.repository import LiveStatusRepository
from liveStatus.models import LiveStatusPanelData


router = APIRouter()

service = LiveStatusService(LiveStatusRepository())


@router.get("/live-status")
def get_live_status_data():
    return service.get_live_status_data()
