import axios from "axios";
import type { ProductionBatch, FilterParameters, FilterListsData } from "./typesProduction"

const httpClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: { 'Content-Type': 'application/json' }
})

export const productionApi = {
    // getProduction: async (): Promise<ProductionBatch[]> => {
    //     const { data } = await httpClient.get<ProductionBatch[]>('/production');
    //     return data;
    // },
    
    getFilteredProduction: async (filters: FilterParameters): Promise<ProductionBatch[]> => {
        
        const { data } = await httpClient.get<ProductionBatch[]>('/production', {
            params: {
                from_date: filters.fromDate,
                to_date: filters.toDate,
                search: filters.search,
                worksNo: filters.worksNo,
                partNo: filters.partNo,
                offset: filters.offset,
                limit: filters.limit
            }});
        return data
    },

    getFilterListsData: async (): Promise<FilterListsData> => {
        const { data } = await httpClient.get<FilterListsData>('/production/filter-data');
        return data;
    }

}
