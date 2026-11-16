from liveStatus.repository import LiveStatusRepository
from liveStatus.models import LiveStatusPanelData

class LiveStatusService:

    def __init__(self, repository: LiveStatusRepository):
        self.repository = repository

    def get_live_status_data(self) -> list[dict]:
        return self.repository.get_live_status_data()
