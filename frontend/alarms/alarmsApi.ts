import axios from "axios";
import type { AlarmRaport, FilterListsData, FilterParameters } from "./typesAlarms";

const httpClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: { 'Content-Type': 'application/json' }
})

export const alarmsApi = {
    getAlarms: async (): Promise<AlarmRaport[]> => {
        const { data } = await httpClient.get<AlarmRaport[]>('/alarms');
        return data;
    },

    getFilteredAlarms: async (filters: FilterParameters): Promise<AlarmRaport[]> => {
        const { data } = await httpClient.get<AlarmRaport[]>('/alarms', {
            params: {
                from_date: filters.fromDate,
                to_date: filters.toDate,
                machine: filters.machine,
                operator: filters.operator
            }
        });
        return data;
    },

    getFilterListsData: async (): Promise<FilterListsData> => {
        const { data } = await httpClient.get<FilterListsData>('/alarms/filter-data');
        return data;
    }

}
