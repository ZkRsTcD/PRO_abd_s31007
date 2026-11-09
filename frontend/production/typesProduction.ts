export interface ProductionBatch {
    id: number;
    Machine_id: number;
    timestart: string;
    worksorder: string;
    partnum: string;
    name: string;       //Recipe name
    quantity: number;
    fname: string;     //User fnam
    sname: string;     //User sname
    timework: number;
    timewait: number;
    reason: string;     //Stop reason
}