from fastapi import APIRouter, HTTPException, Body

from settings.service import SettingsService
from settings.repository import SettingsRepository
#from settings.models import 

router = APIRouter()

service = SettingsService(SettingsRepository())


@router.get("/settings/users")
def get_users():
    return service.get_all_users()

@router.get("/settings/roles")
def get_roles():
    return service.get_all_roles()

@router.get("/settings/menu")
def get_menu():
    return service.get_whole_menu()

@router.get("/settings/menu/{role_id}")
def get_permitted_menu(role_id: int):
    return service.get_permitted_menu(role_id)

#@router.get()
