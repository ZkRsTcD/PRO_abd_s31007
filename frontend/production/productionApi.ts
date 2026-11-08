import axios from "axios";
import type { ProductionBatch } from "./typesProduction"

const httpClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: { 'Content-Type': 'application/json' }
})

export const productionApi = {
    getProduction: async (): Promise<ProductionBatch[]> => {
        const { data } = await httpClient.get<ProductionBatch[]>('/production');
        return data;
    }
    
}
