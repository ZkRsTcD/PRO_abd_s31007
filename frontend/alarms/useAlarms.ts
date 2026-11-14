import { useCallback, useEffect, useState } from "react";
import { alarmsApi } from "./alarmsApi";
import type { AlarmRaport, FilterListsData } from "./typesAlarms";

export function useAlarms() {
    const [alarmReports, setAlarmReports] = useState<AlarmRaport[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string|null>(null);

    const [filterLists, setFilterLists] = useState<FilterListsData>({
        machines: [],
        operators: []
    })

    const [fromDate, setFromDate] = useState<Date|null>(new Date(2000, 1, 1, 1, 1));
    const [toDate, setToDate] = useState<Date|null>(new Date());
    const [filteredMachine, setFilteredMachine] = useState<string>("");
    const [filteredOperator, setFilteredOperator] = useState<string>("");


    const loadAlarmReports = useCallback(async () => {
        try{
            setLoading(true);
            const data = await alarmsApi.getAlarms();
            setAlarmReports(data);
            setError(null);
            //console.log(data[21].timestart)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Błąd pobierania danych');
        } finally {
            setLoading(false);
        }
    }, []);

    const handleSearchAndFilter = async () => {
        setLoading(true);
        try{
            const data = await alarmsApi.getFilteredAlarms({
                fromDate: formatDateToString(fromDate), 
                toDate: formatDateToString(toDate),
                machine: filteredMachine,
                operator: filteredOperator
            })
            setAlarmReports(data)
            setError(null)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Błąd pobierania danych');
        } finally {
            setLoading(false);
        }
    }

        const getDataForFilters = useCallback(async () => {
            try {
                const data = await alarmsApi.getFilterListsData();
                setFilterLists(data);
            } catch (err) {
                console.error("Nie udało się pobrać danych do pól filtrujących", err);
            }
        }, []);

        const formatDateToString = (date: Date|null): string|undefined => {
            if (!date) return undefined;
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }


    useEffect(() => {
        loadAlarmReports();
        getDataForFilters();
    }, [loadAlarmReports]);

    return {
        alarmReports,
        loading,
        error,
        fromDate,
        toDate,
        filteredMachine,
        filteredOperator,
        filterLists,
        setFromDate,
        setToDate,
        setFilteredMachine,
        setFilteredOperator,
        handleSearchAndFilter,
        formatDateToString
    }

}
