import React from "react";

interface RecipeSearchFilterPanelProps {
    fromDate: Date|null;
    toDate: Date|null;
    searchedTerm: string;
    setFromDate: (date: Date|null) => void;
    setToDate: (date: Date|null) => void;
    setSearchedTerm: (term: string) => void;
    loadRecipes: () => void;
    formatDateToString: (date: Date|null) => string|undefined
}

const RecipeSearchFilterPanel: React.FC<RecipeSearchFilterPanelProps> = ({
    fromDate,
    toDate,
    searchedTerm,
    setFromDate,
    setToDate,
    setSearchedTerm,
    loadRecipes,
    formatDateToString
}) => {
    return (
        <div className="topPanel">
            <div className="datePanel">
                <input type="date" value={formatDateToString(fromDate)} onChange={(e) => setFromDate(e.target.valueAsDate)}/>
                <input type="date" value={formatDateToString(toDate)} onChange={(e) => setToDate(e.target.valueAsDate)}/>
            </div>
            <div className="searchPanel">
                <input type="text" placeholder="Wpisz tekst" value={searchedTerm ?? ''} onChange={(e) => setSearchedTerm(e.target.value)}/>
            </div>
            <div className="confirmButton">
                <button onClick={loadRecipes}>Szukaj</button>
            </div>
        </div>
    )
}

export default RecipeSearchFilterPanel;
