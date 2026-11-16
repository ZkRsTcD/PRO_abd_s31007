import { useCallback, useEffect, useState } from "react";
import { liveStatusApi } from "./liveStatusApi";
import type { LiveStatusPanelData } from "./typesLiveStatus";

export function useLiveStatus() {
    const [liveStatusData, setLiveStatusData] = useState<LiveStatusPanelData[]>([]);
    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    const [error, setError] = useState<string|null>(null);

    const [refreshIntervalMs] = useState<number>(10000);

    const loadData = useCallback(async () => {

        try {
            const data = await liveStatusApi.getLiveStatus();
            setLiveStatusData(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Błąd połączenia');
        } finally {
            /////////////////////////////
        }
    }, [])


    useEffect(() => {


        const 
    }, [])



    return {
        liveStatusData,
        initialLoading,
        error
    }

}

