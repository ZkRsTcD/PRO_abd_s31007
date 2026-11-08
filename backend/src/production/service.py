from production.repository import ProductionRepository
#from production.models import 

class ProductionService:
    def __init__(self, repository: ProductionRepository):
            self.repository = repository

    def get_production(self) -> list[dict]:
          return self.repository.get_production()
    