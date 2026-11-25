export interface AlarmRaport {
    id: number;
    machine_code: string;
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
    offset: number;
    limit: number;
}

export interface FilterListsData {
    machines: string[];
    operators: string[];
}
