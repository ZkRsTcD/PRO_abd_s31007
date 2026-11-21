import React from "react";
import { useAlarms } from "../useAlarms";
import AlarmsTable from "./AlarmsTable"
import AlarmsSearchFilterPanel from "./AlarmsSearchFilterPanel";
//import 

const Alarms: React.FC = () => {
    const {
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
    } = useAlarms();

    return (
        <div className="AlarmReports">
            <h1>
                Alarmy
            </h1>
            <div className="SearchFilterProductionPanel">
                <AlarmsSearchFilterPanel 
                    fromDate={fromDate} 
                    toDate={toDate} 
                    filteredMachine={filteredMachine} 
                    filteredOperator={filteredOperator}
                    filterLists={filterLists}
                    setFromDate={setFromDate}
                    setToDate={setToDate}
                    setFilteredMachine={setFilteredMachine}
                    setFilteredOperator={setFilteredOperator}
                    loadAlarmReports={() => {setPage(1); loadAlarmReports(0, pageSize)}}
                    formatDateToString={formatDateToString}/> 
            </div>
            <div className="PaginationPanel">
                <button name="GoBack" onClick={() => handlePagination(false)} disabled={page === 1 || loading}>{'<<'}</button>
                <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); loadAlarmReports(0, Number(e.target.value))}}>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={200}>200</option>
                    <option value={500}>500</option>
                </select>
                <button name="GoForward" onClick={() => handlePagination(true)} disabled={!hasMore || loading}>{'>>'}</button>
            </div>
            <div className="AlarmsList">
                {loading && <p>Trwa pobieranie danych z bazy...</p>}
                {error && <p>Błąd połączenia: {error}</p>}
                {!loading && !error && (
                    <AlarmsTable alarmReports={alarmReports}/>
                )}
            </div>
        </div>
    )
}

export default Alarms;
