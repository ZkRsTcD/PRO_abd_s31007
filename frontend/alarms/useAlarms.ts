import { useCallback, useEffect, useState } from "react";
import { alarmsApi } from "./alarmsApi";
import type { AlarmRaport, FilterListsData } from "./typesAlarms";
import { formatDateToString } from '../shared/formatters'

export function useAlarms() {
    const [alarmReports, setAlarmReports] = useState<AlarmRaport[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string|null>(null);

    const [filterLists, setFilterLists] = useState<FilterListsData>({
        machines: [],
        operators: []
    })

    const [fromDate, setFromDate] = useState<Date|null>(new Date(2000, 0, 1));
    const [toDate, setToDate] = useState<Date|null>(new Date());
    const [filteredMachine, setFilteredMachine] = useState<string>("");
    const [filteredOperator, setFilteredOperator] = useState<string>("");

    const [pageSize, setPageSize] = useState<number>(50);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);


    const loadAlarmReports = useCallback(async (customOffset?: number, customLimit?: number) => {
        setLoading(true);
        try{
            const currentOffset = customOffset !== undefined ? customOffset : (page - 1) * pageSize;
            
            const limitToUse = customLimit !== undefined ? customLimit : pageSize;

            const data = await alarmsApi.getFilteredAlarms({
                fromDate: formatDateToString(fromDate), 
                toDate: formatDateToString(toDate),
                machine: filteredMachine ? filteredMachine : undefined,
                operator: filteredOperator ? filteredOperator : undefined,
                offset: currentOffset,
                limit: limitToUse + 1
            })

            if (data.length > limitToUse) {
                setHasMore(true);
                setAlarmReports(data.slice(0, limitToUse));
            }else {
                setHasMore(false);
                setAlarmReports(data)
            }

            setError(null)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Błąd pobierania danych');
        } finally {
            setLoading(false);
        }
    }, [fromDate, toDate, filteredMachine, filteredOperator, page, pageSize]);
    
    const getDataForFilters = useCallback(async () => {
        try {
            const data = await alarmsApi.getFilterListsData();
            setFilterLists(data);
        } catch (err) {
            console.error("Nie udało się pobrać danych do pól filtrujących", err);
        }
    }, []);
    
    const handlePagination = async (forward: boolean) => {
        const newPage = forward ? page + 1 : Math.max(page - 1, 1);
        if (!forward && page === 1) return;
        setPage(newPage);
        const offset = (newPage - 1) * pageSize;
        await loadAlarmReports(offset);
    };


    useEffect(() => {
        loadAlarmReports();
        getDataForFilters();
    }, []);

    return {
        alarmReports,
        loading,
        error,
        fromDate,
        toDate,
        filteredMachine,
        filteredOperator,
        filterLists,
        pageSize,
        page,
        hasMore,
        setFromDate,
        setToDate,
        setFilteredMachine,
        setFilteredOperator,
        loadAlarmReports,
        formatDateToString,
        handlePagination,
        setPage,
        setPageSize
    }

}
