from fastapi import APIRouter, HTTPException, Body

from settings.service import SettingsService
from settings.repository import SettingsRepository
from settings.models import RoleUsersUpdate, RoleMenuCreate, RoleMenuDelete, SuccessResponse

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

@router.get("/settings/assignedusers/{role_id}")
def get_assigned_users(role_id: int):
    return service.get_assigned_users(role_id)

@router.put("/settings/role/updateusers")
def update_users_permissions(details: RoleUsersUpdate):
    try:
        service.update_users_permissions(details)
        return SuccessResponse(message="Uprawnienia użytkownika zostały zaktualizowane")
    except ValueError as err:
        raise HTTPException(status_code=400, detail=str(err))
    except Exception:
        raise HTTPException(status_code=500, detail="Błąd zapisu w bazie danych")

@router.post("/settings/role/createmenupermissions")
def create_menu_permissions(details: RoleMenuCreate):
    try:
        service.create_menu_permissions(details)
        return SuccessResponse(message="Uprawnienia w menu dla roli zostały dodane")
    except Exception:
        raise HTTPException(status_code=500, detail="Błąd dodawania rekordu do bazy")

@router.delete("/settings/role/deletemenupermissions")
def delete_menu_permissions(details: RoleMenuDelete):
    try:
        service.delete_menu_permissions(details)
        return SuccessResponse(message="Uprawnienia w menu dla roli zostały usunięte")
    except ValueError as err:
        raise HTTPException(status_code=404, detail=str(err))
    except Exception:
        raise HTTPException(status_code=500, detail="Błąd usuwania rekordu w bazie danych")
