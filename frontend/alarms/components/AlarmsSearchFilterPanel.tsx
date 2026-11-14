import React from "react";
import type { FilterListsData } from '../typesAlarms'

interface AlarmsSearchFilterPanelProps {
    fromDate: Date|null;
    toDate: Date|null;
    filteredMachine: string;
    filteredOperator: string;
    filterLists: FilterListsData;
    setFromDate: (date: Date|null) => void;
    setToDate: (date: Date|null) => void;
    setFilteredMachine: (option: string) => void;
    setFilteredOperator: (option: string) => void;
    handleSearchAndFilter: () => void;
    formatDateToString: (date: Date|null) => string|undefined
}

const AlarmsSearchFilterPanel: React.FC<AlarmsSearchFilterPanelProps> = ({
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
}) => {

    return (
        <div className="topPanel">
            <div className="datePanel">
                <input type="date" value={formatDateToString(fromDate)} onChange={(e) => setFromDate(e.target.valueAsDate)}/>
                <input type="date" value={formatDateToString(toDate)} onChange={(e) => setToDate(e.target.valueAsDate)}/>
            </div>
            <div className="FilterSelects">
                <select value={filteredMachine} onChange={(e) => setFilteredMachine(e.target.value)}>
                    <option value="">Wszystkie MASZYNY</option>
                    {filterLists.machines.map((m) => (
                        <option key={m} value={m}>
                            {m}
                        </option>
                    ))}
                </select>
                <select value={filteredOperator} onChange={(e) => setFilteredOperator(e.target.value)}>
                    <option value="">Wszyscy OPERATORZY</option>
                    {filterLists.operators.map((o) => (
                        <option key={o} value={o}>
                            {o}
                        </option>
                    ))}
                </select>
            </div>
            <div className="confirmFilterButton">
                <button onClick={handleSearchAndFilter}>Szukaj</button>
            </div>
        </div>
    )

}

export default AlarmsSearchFilterPanel;
