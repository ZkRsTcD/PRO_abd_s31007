import React from "react";
import { useProduction } from "../useProduction"
import ProductionTable from "./ProductionTable";

const Production: React.FC = () => {
    const {
        batches,
        loading,
        error,
        formatSecondsToTime
    } = useProduction();

    return (
        <div className="Production">
            <h1>Produkcja</h1>
            <div className="SearchFilterPanel">
                <label>Tu będzie filtrowanie, wyszukiwanie i ogólnie fajne rzeczy</label>
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

