export interface User /*Account*/ {
    id: number;
    fname: string;
    sname: string
}

export interface Role {
    id: number;
    name: string;
    number_of_users: number;
}

export interface Menu {
    id: number;
    title: string;
}

export interface RoleUsersUpdate {
    roleId: number;
    toAdd: number[];
    toRemove: number[];
}

export interface RoleMenuCreate {
    roleId: number;
    toAdd: number[];
}

export interface RoleMenuDelete {
    roleId: number;
    toRemove: number[];
}
