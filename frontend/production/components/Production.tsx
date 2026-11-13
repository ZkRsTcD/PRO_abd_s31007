import React from "react";
import { useProduction } from "../useProduction"
import ProductionTable from "./ProductionTable";
import ProductionSearchFilterPanel from "./ProductionSearchFilterPanel";
import './Production.css';

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
        setFromDate,
        setToDate,
        setFilteredWorksNo,
        setFilteredPartNo,
        setSearchedTerm,
        formatSecondsToTime,
        handleSearchAndFilter
    } = useProduction();

    return (
        <div className="Production">
            <h1>Produkcja</h1>
            <div className="SearchFilterProductionPanel">
                {!loading && !error && (
                    <ProductionSearchFilterPanel 
                        fromDate={fromDate} 
                        toDate={toDate} 
                        filteredWorksNo={filteredWorksNo} 
                        filteredPartNo={filteredPartNo}
                        searchedTerm={searchedTerm}
                        setFromDate={setFromDate}
                        setToDate={setToDate}
                        setFilteredWorksNo={setFilteredWorksNo}
                        setFilteredPartNo={setFilteredPartNo}
                        setSearchedTerm={setSearchedTerm}
                        handleSearchAndFilter={handleSearchAndFilter}/> 
                )}
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

