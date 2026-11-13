import axios from "axios";
import type { AlarmRaport } from "./typesAlarms";

const httpClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: { 'Content-Type': 'application/json' }
})

export const alarmsApi = {
    getAlarms: async (): Promise<AlarmRaport[]> => {
        const { data } = await httpClient.get<AlarmRaport[]>('/alarms');
        return data;
    }
}
