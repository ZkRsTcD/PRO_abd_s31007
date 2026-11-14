export interface AlarmRaport {
    id: number;
    machine_code: number;
    timestart: string;
    fname: string;
    sname: string;
    reason: string;
}

export interface FilterParameters {
    fromDate?: string;
    toDate?: string;
    machine?: string;
    operator?: string;
}

export interface FilterListsData {
    machines: string[];
    operators: string[];
}
