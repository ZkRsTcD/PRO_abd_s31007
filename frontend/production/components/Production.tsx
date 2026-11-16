import React from "react";
import { useProduction } from "../useProduction"
import ProductionTable from "./ProductionTable";
import ProductionSearchFilterPanel from "./ProductionSearchFilterPanel";

const Production: React.FC = () => {
    const {
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
    } = useProduction();

    return (
        <div className="Production">
            <h1>Produkcja</h1>
            <div className="SearchFilterProductionPanel">
                <ProductionSearchFilterPanel 
                    fromDate={fromDate} 
                    toDate={toDate} 
                    filteredWorksNo={filteredWorksNo} 
                    filteredPartNo={filteredPartNo}
                    searchedTerm={searchedTerm}
                    filterLists={filterLists}
                    setFromDate={setFromDate}
                    setToDate={setToDate}
                    setFilteredWorksNo={setFilteredWorksNo}
                    setFilteredPartNo={setFilteredPartNo}
                    setSearchedTerm={setSearchedTerm}
                    loadProductionData={() => {setPage(1); loadProductionData(0, pageSize)}}
                    formatDateToString={formatDateToString}
                    setPage={setPage}/> 
            </div>
            <div className="PaginationPanel">
                <button name="GoBack" onClick={() => handlePagination(false)} disabled={page === 1 || loading}>{'<<'}</button>
                <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); loadProductionData(0, Number(e.target.value))}}>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={200}>200</option>
                    <option value={500}>500</option>
                </select>
                <button name="GoForward" onClick={() => handlePagination(true)} disabled={!hasMore || loading}>{'>>'}</button>
            </div>
            <div className="ProductionList">
                {loading && <p>Trwa pobieranie danych z bazy...</p>}
                {error && <p>Błąd połączenia: {error}</p>}
                {!loading && !error && (
                    <ProductionTable batches={batches} formatSecondsToTime={formatSecondsToTime}/>
                )}
            </div>
        </div>
    )
}

export default Production;

