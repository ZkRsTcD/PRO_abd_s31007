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
