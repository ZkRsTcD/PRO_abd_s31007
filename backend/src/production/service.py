from production.repository import ProductionRepository
from production.models import FilterParameters, FilterListsData

class ProductionService:
    def __init__(self, repository: ProductionRepository):
            self.repository = repository

    def get_production(self, filters: FilterParameters) -> list[dict]:
          return self.repository.get_production(filters.from_date, filters.to_date, filters.search, filters.worksNo, filters.partNo)

    def get_filters_data(self) -> FilterListsData:
          return FilterListsData(
                worksNos=self.repository.get_filters_worksorder(),
                partNos=self.repository.get_filters_partnum()
          )
    