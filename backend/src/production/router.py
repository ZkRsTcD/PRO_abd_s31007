from fastapi import APIRouter, HTTPException, Depends

from production.service import ProductionService
from production.repository import ProductionRepository
from production.models import FilterParameters

router = APIRouter()

service = ProductionService(ProductionRepository())


@router.get("/production")
def get_production(filters: FilterParameters = Depends()):
    print("tak")
    return service.get_production(filters)

