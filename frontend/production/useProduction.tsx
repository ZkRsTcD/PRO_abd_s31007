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
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Błąd pobierania danych');
        } finally {
            setLoading(false);
        }
    }, []);


    useEffect(() => {

    }, [])

    return {
        batches,
        loading,
        error
    }
}

