import React from "react";

interface ProductionSearchFilterPanelProps {
    fromDate: Date|null;
    toDate: Date|null;
    filteredWorksNo: string;
    filteredPartNo: string;
    searchedTerm: string;
    setFromDate: (date: Date|null) => void;
    setToDate: (date: Date|null) => void;
    setFilteredWorksNo: (option: string) => void;
    setFilteredPartNo: (option: string) => void;
    setSearchedTerm: (term: string) => void;
    handleSearchAndFilter: () => void;
}

const ProductionSearchFilterPanel: React.FC<ProductionSearchFilterPanelProps> = ({
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
    handleSearchAndFilter
}) => {

    return (
        <div className="topPanel">
            <div className="datePanel">
                <input type="date" onChange={(e) => setFromDate(e.target.valueAsDate)}/>
                <input type="date" onChange={(e) => setToDate(e.target.valueAsDate)}/>
            </div>
            <div className="worksAndPartFilterPanel">
                <select >

                    <option>Uno</option>
                    <option>Dos</option>

                </select>
                <select >

                    <option>Tres</option>
                    <option>Cuatro</option>

                </select>
            </div>
            <div className="searchPanel">
                <input type="text" placeholder="Wpisz tekst" value={searchedTerm ?? ''} onChange={(e) => setSearchedTerm(e.target.value)}/>
            </div>
            <div className="confirmButton">
                <button onClick={handleSearchAndFilter}>Szukaj</button>
            </div>
        </div>
    )

}

export default ProductionSearchFilterPanel;

