export interface ProductionBatch {
    id: number;
    machine_code: string;
    timestart: string;
    worksorder: string;
    partnum: string;
    name: string;       //Recipe name
    quantity: number;
    fname: string;     //User fname
    sname: string;     //User sname
    timework: number;
    timewait: number;
    reason: string;     //Stop reason
}

export interface FilterParameters {
    fromDate?: string;
    toDate?: string;
    search?: string;
    worksNo?: string;
    partNo?: string;
    offset: number;
    limit: number;
}

export interface FilterListsData {
    worksNos: string[];
    partNos: string[];
}

