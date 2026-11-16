export interface LiveStatusPanelData {
    id: number;
    machine_code: string;
    iOn: boolean;
    iTemp: boolean;
    iQi: boolean;
    iData: boolean;
    i1Cycle: boolean;
    iAlarm: boolean;
    iWork: boolean;
    stopTime: string;
    qtyLeft: number;
    progress: number;
    timeLeft: string;
    cycleTime: string;
    worksOrder: string;
    partNumber: string;
    recipe: string;
    operator: string;
    efficiency: number;
    iClean: boolean;
    iAss: boolean;
    UpdatedAt: string;
}

