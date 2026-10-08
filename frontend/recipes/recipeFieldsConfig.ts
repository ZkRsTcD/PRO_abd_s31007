import type { RecipeDetails } from "./types";

export interface RecipeFieldConfig {
    key: keyof RecipeDetails;
    label: string;
    type: 'number';
    step?: string;
}

export const recipeFields: RecipeFieldConfig[] = [
    { key: 'moves', label: 'Moves', type: 'number' },
    { key: 'distance', label: 'Distance', type: 'number' },
    { key: 'airFlow', label: 'Air flow', type: 'number' },
    { key: 'airTemp', label: 'Air temp.', type: 'number' },
    { key: 'screwSpeed', label: 'Screw Speed', type: 'number' },
    { key: 'rollerPress', label: 'Roller Press', type: 'number' },
    { key: 'water', label: 'Water Flow', type: 'number' },
    { key: 'carrSpeed', label: 'Carr. Speed', type: 'number' },
    { key: 'rotatSpeed', label: 'Rotat. Speed', type: 'number' },
    { key: 'tempZone1', label: 'Temp. Zone 1', type: 'number' },
    { key: 'tempZone2', label: 'Temp. Zone 2', type: 'number' },
    { key: 'tempZone3', label: 'Temp. Zone 3', type: 'number' },
    { key: 'tempZone4', label: 'Temp. Zone 4', type: 'number' },
    { key: 'tempDie', label: 'Temp. Die', type: 'number' },
    { key: 'stbExtrSpeed', label: 'Stb. Extr. Speed', type: 'number' },
    { key: 'stbScrwSpeed', label: 'Stb. Scrw. Speed', type: 'number' },
    { key: 'stbAirFlow', label: 'Stb. Air Flow', type: 'number' },
    { key: 'stbAirTemp', label: 'Stb. Air Temp', type: 'number' },
    { key: 'carrRetDelBott', label: 'Carr. Ret. Del. Bott.', type: 'number' },
    { key: 'carrRetDelTop', label: 'Carr. Ret. Del. Top', type: 'number' },
    { key: 'carrAccDcc', label: 'Carr. Acc./Dec.', type: 'number' },
    { key: 'diameterEmpt', label: 'Diameter Empty', type: 'number', step: 'any' },
    { key: 'diameterLoad', label: 'Diameter Load', type: 'number' },
    { key: 'cuttBladeSpeed', label: 'Cutt. Blade Speed', type: 'number' },
    { key: 'cuttRotatSpeed', label: 'Cutt. Rotat. Speed', type: 'number' },
    { key: 'cuttFinishTime', label: 'Cutt. Finish Time', type: 'number' },
    { key: 'cabAirTempSett', label: 'Cab. Air Temp Sett.', type: 'number' },
    { key: 'cabAirTempAlm', label: 'Cab. Air Temp Alm.', type: 'number' },
    { key: 'optCarbon', label: 'Opt. Carbon', type: 'number' },
    { key: 'optCoreless', label: 'Opt. Coreless', type: 'number' },
]
