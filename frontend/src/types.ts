
export interface Recipe {
    id: number;
    Machine_id: number;
    timestart: string; //Dates comes through JSON as strings
    User_id: number;
    name: string;
    fname: string;
    sname: string;
}

export interface RecipeDetails{
    id: number;
    source: number;
    Machine_id: number;
    timestart: string;
    User_id: number;
    name: string
    moves: number;
    distance: number;
    airFlow: number;
    airTemp: number;
    screwSpeed: number;
    rollerPress: number;
    water: number;
    carrSpeed: number;
    rotatSpeed: number;
    tempZone1: number;
    tempZone2: number;
    tempZone3: number;
    tempZone4: number;
    tempDie: number;
    stbExtrSpeed: number;
    stbScrwSpeed: number;
    stbAirFlow: number;
    stbAirTemp: number;
    carrRetDelBott: number;
    carrRetDelTop: number;
    carrAccDcc: number;
    diameterEmpt: number; //Uwaga na to
    diameterLoad: number;
    cuttBladeSpeed: number;
    cuttRotatSpeed: number;
    cuttFinishTime: number;
    cabAirTempSett: number;
    cabAirTempAlm: number;
    optCarbon: number;
    optCoreless: number;
}
