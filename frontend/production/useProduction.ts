import { useCallback, useEffect, useState } from "react";
import { productionApi } from "./productionApi";
import type { ProductionBatch, FilterParameters } from './typesProduction'

export function useProduction() {
    const [batches, setBatches] = useState<ProductionBatch[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [error, setError] = useState<string|null>(null);

    const [fromDate, setFromDate] = useState<Date|null>(new Date(2000, 1, 1, 1, 1));
    const [toDate, setToDate] = useState<Date|null>(new Date());
    const [filteredWorksNo, setFilteredWorksNo] = useState<string>("");
    const [filteredPartNo, setFilteredPartNo] = useState<string>("");
    const [searchedTerm, setSearchedTerm] = useState<string>("");


    const loadProduction = useCallback(async () => {
        try {
            setLoading(true);
            const data = await productionApi.getProduction();
            setBatches(data);
            setError(null);
            //console.log(data[1]);
            //console.log(toDate);
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

    const handleSearchAndFilter = async () => {
        // console.log(fromDate);
        // console.log(searchedTerm);
        try{
            const data = await productionApi.getFilteredProduction({
                fromDate: formatDateToString(fromDate), 
                toDate: formatDateToString(toDate),
                search: searchedTerm ? searchedTerm : undefined
            })
            setBatches(data)
            setError(null)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Błąd pobierania danych');
        } finally {
            setLoading(false);
        }
    }

    const formatDateToString = (date: Date|null): string|undefined => {
        if (!date) return undefined;
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }


    useEffect(() => {
        loadProduction()
    }, [])

    return {
        batches,
        loading,
        error,
        fromDate,
        toDate,
        filteredWorksNo,
        filteredPartNo,
        searchedTerm,
        setFromDate,
        setToDate,
        setFilteredWorksNo,
        setFilteredPartNo,
        setSearchedTerm,
        formatSecondsToTime,
        handleSearchAndFilter
    }
}

