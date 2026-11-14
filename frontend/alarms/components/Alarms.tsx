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
        setFromDate,
        setToDate,
        setFilteredMachine,
        setFilteredOperator,
        handleSearchAndFilter,
        formatDateToString
    } = useAlarms();

    return (
        <div className="AlarmReports">
            <h1>
                Alarmy
            </h1>
            <div className="SearchFilterProductionPanel">
                {!loading && !error && (
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
                        handleSearchAndFilter={handleSearchAndFilter}
                        formatDateToString={formatDateToString}/> 
                )}
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
