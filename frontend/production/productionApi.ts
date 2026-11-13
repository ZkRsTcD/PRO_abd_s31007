import axios from "axios";
import type { ProductionBatch, FilterParameters } from "./typesProduction"

const httpClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: { 'Content-Type': 'application/json' }
})

export const productionApi = {
    getProduction: async (): Promise<ProductionBatch[]> => {
        const { data } = await httpClient.get<ProductionBatch[]>('/production');
        return data;
    },
    
    getFilteredProduction: async (filters: FilterParameters): Promise<ProductionBatch[]> => {
        // const parameters = new URLSearchParams();

        // if(filters.fromDate){
        //     parameters.append('from_date', filters.fromDate);
        // }
        // if(filters.toDate){
        //     parameters.append('to_date', filters.toDate);
        // }
        // if(filters.search){
        //     parameters.append('search', filters.search);
        // }

        const { data } = await httpClient.get<ProductionBatch[]>('/production', {
            params: {
                from_date: filters.fromDate,
                to_date: filters.toDate,
                search: filters.search
            }});
        return data
    }

}
