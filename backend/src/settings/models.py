from pydantic import BaseModel
from typing import List

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

class RoleUsersUpdate(BaseModel):
    roleId: int
    toAdd: List[int]
    toRemove: List[int]

class RoleMenuUpdate(BaseModel):
    roleId: int
    toAdd: List[int]
    toRemove: List[int]

