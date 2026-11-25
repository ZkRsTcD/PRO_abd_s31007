export interface QualityListItem {
    id: number;
    MachineWorkCycles_id: number;
    machine_code: string;
    timestart: string;
    worksorder: string;
    partnum: string;
    quantity: number;
    timework: number;
    fname: string;
    sname: string;
    weight: number;
    diameter: number;
}

export interface FilterParameters {
    fromDate?: string;
    toDate?: string;
    search?: string;
    worksNo?: string;
    partNo?: string;
    machine?: string;
    offset: number;
    limit: number;
}

export interface FilterListsData {
    worksNos: string[];
    partNos: string[];
    machines: string[];
}
