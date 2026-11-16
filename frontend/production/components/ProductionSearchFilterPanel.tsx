import React from "react";
import type { FilterListsData } from '../typesProduction'

interface ProductionSearchFilterPanelProps {
    fromDate: Date|null;
    toDate: Date|null;
    filteredWorksNo: string;
    filteredPartNo: string;
    searchedTerm: string;
    filterLists: FilterListsData;
    setFromDate: (date: Date|null) => void;
    setToDate: (date: Date|null) => void;
    setFilteredWorksNo: (option: string) => void;
    setFilteredPartNo: (option: string) => void;
    setSearchedTerm: (term: string) => void;
    loadProductionData: () => void;
    formatDateToString: (date: Date|null) => string|undefined;
    setPage: (value: number) => void;
}

const ProductionSearchFilterPanel: React.FC<ProductionSearchFilterPanelProps> = ({
    fromDate,
    toDate,
    filteredWorksNo,
    filteredPartNo,
    searchedTerm,
    filterLists,
    setFromDate,
    setToDate,
    setFilteredWorksNo,
    setFilteredPartNo,
    setSearchedTerm,
    loadProductionData,
    formatDateToString,
    setPage
}) => {

    return (
        <div className="topPanel">
            <div className="datePanel">
                <input type="date" value={formatDateToString(fromDate)} onChange={(e) => setFromDate(e.target.valueAsDate)}/>
                <input type="date" value={formatDateToString(toDate)} onChange={(e) => setToDate(e.target.valueAsDate)}/>
            </div>
            <div className="FilterSelects">
                <select value={filteredWorksNo} onChange={(e) => setFilteredWorksNo(e.target.value)}>
                    <option value="">Wszystkie WORKS NO</option>
                    {filterLists.worksNos.map((wo) => (
                        <option key={wo} value={wo}>
                            {wo}
                        </option>
                    ))}
                </select>
                <select value={filteredPartNo} onChange={(e) => setFilteredPartNo(e.target.value)}>
                    <option value="">Wszystkie PART NO</option>
                    {filterLists.partNos.map((pn) => (
                        <option key={pn} value={pn}>
                            {pn}
                        </option>
                    ))}
                </select>
            </div>
            <div className="searchFilterPanel">
                <input type="text" placeholder="Wpisz tekst" value={searchedTerm ?? ''} onChange={(e) => setSearchedTerm(e.target.value)}/>
            </div>
            <div className="confirmFilterButton">
                <button onClick={() => {setPage(1); loadProductionData()}}>Szukaj</button>
            </div>
        </div>
    )

}

export default ProductionSearchFilterPanel;

