
from settings.repository import SettingsRepository
#from settings.models import 


class SettingsService:
    def __init__(self, repository: SettingsRepository):
        self.repository = repository

    def get_all_users(self) -> list[dict]:
        return self.repository.get_all_users()

    def get_all_roles(self) -> list[dict]:
        return self.repository.get_all_roles()

    def get_whole_menu(self) -> list[dict]:
        return self.repository.get_whole_menu()

    def get_permitted_menu(self, role_id: int) -> list[dict] | None:
        return self.repository.get_permitted_menu(role_id)

    def get_assigned_users(self, role_id: int) -> list[dict] | None:
        return self.repository.get_assigned_users(role_id)

