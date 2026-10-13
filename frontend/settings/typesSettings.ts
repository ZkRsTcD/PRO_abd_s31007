export interface User /*Account*/ {
    id: number;
    fname: string;
    sname: string
}

export interface Role {
    id: number;
    description: string;
    numberOfUsers: number;
}

export interface Menu {
    title: string;
}
