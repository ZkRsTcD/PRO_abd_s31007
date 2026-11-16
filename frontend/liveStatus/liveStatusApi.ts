import axios from "axios";
import type { LiveStatusPanelData } from "./typesLiveStatus";

const httpClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: { 'Content-Type': 'application/json' }
})

export const liveStatusApi = {

    getLiveStatus: async (): Promise<LiveStatusPanelData[]> => {
        const { data } = await httpClient.get<LiveStatusPanelData[]>('/live-status')
        return data;
    }

}
