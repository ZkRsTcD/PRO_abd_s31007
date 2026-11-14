from alarms.repository import AlarmsRepository
from alarms.models import AlarmListItem, FilterParameters, FilterListsData


class AlarmsService:

    def __init__(self, repository: AlarmsRepository):
        self.repository = repository

    def get_all_alarmReports(self, filters: FilterParameters) -> list[dict]:
        return self.repository.get_alarms(filters.from_date, filters.to_date, filters.machine, filters.operator)

    def get_filters_data(self) -> FilterListsData:
        return FilterListsData(
            machines=self.repository.get_filters_machine(),
            operators=self.repository.get_filters_operator()
        )

    