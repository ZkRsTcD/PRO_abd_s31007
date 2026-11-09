import { useCallback, useEffect, useState } from "react";
import { productionApi } from "./productionApi";
import type { ProductionBatch } from './typesProduction'

export function useProduction() {
    const [batches, setBatches] = useState<ProductionBatch[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [error, setError] = useState<string|null>(null);


    const loadProduction = useCallback(async () => {
        try {
            setLoading(true);
            const data = await productionApi.getProduction();
            setBatches(data);
            setError(null);
            console.log(data[1])
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Błąd pobierania danych');
        } finally {
            setLoading(false);
        }
    }, []);

    const formatSecondsToTime = (totalSeconds: number | null | undefined): string => {
        if (totalSeconds === null || totalSeconds === undefined || isNaN(totalSeconds)) {
            return "-";
        }
        const seconds = totalSeconds % 60;
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const hours = Math.floor(totalSeconds / 3600);

        const pad = (num: number) => String(num).padStart(2, '0');

        if (hours > 0) {
            return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
        }
        return `${pad(minutes)}:${pad(seconds)}`;
    }


    useEffect(() => {
        loadProduction()
    }, [])

    return {
        batches,
        loading,
        error,
        formatSecondsToTime
    }
}

