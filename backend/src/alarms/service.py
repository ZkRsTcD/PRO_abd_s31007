from alarms.repository import AlarmsRepository
from alarms.models import AlarmListItem


class AlarmsService:

    def __init__(self, repository: AlarmsRepository):
        self.repository = repository

    def get_all_alarmReports(self) -> list[dict]:
        return self.repository.get_alarms()

    