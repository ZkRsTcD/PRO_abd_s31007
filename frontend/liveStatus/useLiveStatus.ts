import { useCallback, useEffect, useState } from "react";
import { liveStatusApi } from "./liveStatusApi";
import type { LiveStatusPanelData } from "./typesLiveStatus";

export function useLiveStatus() {
    const [liveStatusData, setLiveStatusData] = useState<LiveStatusPanelData[]>([]);
    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    const [error, setError] = useState<string|null>(null);

    const [lastSync, setLastSync] = useState<Date|null>(null);

    const [refreshIntervalMs] = useState<number>(10000);

    const loadData = useCallback(async (isBackground = false) => {

        if (isBackground && document.hidden) return;

        try {
            const data = await liveStatusApi.getLiveStatus();
            setLiveStatusData(data);
            setLastSync(new Date());
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Błąd połączenia');
        } finally {
            /////////////////////////////
        }
    }, [])


    useEffect(() => {

        loadData();
        //const 
    }, [])



    return {
        liveStatusData,
        initialLoading,
        error,
        lastSync
    }

}

