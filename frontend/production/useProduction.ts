import { useCallback, useEffect, useState } from "react";
import { productionApi } from "./productionApi";
import type { ProductionBatch, FilterParameters, FilterListsData } from './typesProduction'
import { formatSecondsToTime, formatDateToString } from '../shared/formatters'


export function useProduction() {
    const [batches, setBatches] = useState<ProductionBatch[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [error, setError] = useState<string|null>(null);

    const [filterLists, setFilterLists] = useState<FilterListsData>({
        worksNos: [],
        partNos: []
    })

    const [fromDate, setFromDate] = useState<Date|null>(new Date(2000, 0, 1));
    const [toDate, setToDate] = useState<Date|null>(new Date());
    const [filteredWorksNo, setFilteredWorksNo] = useState<string>("");
    const [filteredPartNo, setFilteredPartNo] = useState<string>("");
    const [searchedTerm, setSearchedTerm] = useState<string>("");
    
    const [pageSize, setPageSize] = useState<number>(50);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    
    
    const loadProductionData = useCallback(async (customOffset?: number, customLimit?: number) => {
        setLoading(true);
        try{
            const currentOffset = customOffset !== undefined ? customOffset : (page - 1) * pageSize;
            
            const limitToUse = customLimit !== undefined ? customLimit : pageSize;
            
            const data = await productionApi.getFilteredProduction({
                fromDate: formatDateToString(fromDate), 
                toDate: formatDateToString(toDate),
                search: searchedTerm ? searchedTerm : undefined,
                worksNo: filteredWorksNo ? filteredWorksNo : undefined,
                partNo: filteredPartNo ? filteredPartNo : undefined,
                offset: currentOffset,
                limit: limitToUse + 1
            })

            if (data.length > limitToUse) {
                setHasMore(true);
                setBatches(data.slice(0, limitToUse));
            }else {
                setHasMore(false);
                setBatches(data)
            }

            setError(null)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Błąd pobierania danych');
        } finally {
            setLoading(false);
        }
    }, [fromDate, toDate, searchedTerm, filteredWorksNo, filteredPartNo, page, pageSize]);

    const getDataForFilters = useCallback(async () => {
        try {
            const data = await productionApi.getFilterListsData();
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
        //console.log(page)
        await loadProductionData(offset);
    };


    useEffect(() => {
        loadProductionData();
        getDataForFilters();
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
        filterLists,
        pageSize,
        page,
        hasMore,
        setFromDate,
        setToDate,
        setFilteredWorksNo,
        setFilteredPartNo,
        setSearchedTerm,
        formatSecondsToTime,
        loadProductionData,
        formatDateToString,
        handlePagination,
        setPage,
        setPageSize
    }
}

