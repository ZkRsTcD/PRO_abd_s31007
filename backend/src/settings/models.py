from pydantic import BaseModel

class UserListItem(BaseModel):
    id: int
    fname: str
    sname: str
    Role_id: int

class RoleListItem(BaseModel):
    id: int
    name: str
    number_of_users: int

class MenuListItem(BaseModel):
    title: str

