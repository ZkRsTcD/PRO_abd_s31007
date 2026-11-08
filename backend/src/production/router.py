from fastapi import APIRouter, HTTPException

from production.service import ProductionService
from production.repository import ProductionRepository
#from production.models import

router = APIRouter()

service = ProductionService(ProductionRepository())


@router.get("/production")
def get_production():
    return service.get_production()

