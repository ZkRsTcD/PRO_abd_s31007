import React from "react";
import { useProduction } from "../useProduction"
import ProductionTable from "./ProductionTable";

const Production: React.FC = () => {
    const {
        batches,
        loading,
        error
    } = useProduction();

    return (
        <div className="Production">
            <h1>Produkcja</h1>
            <div className="SearchingOptions">
                <label>Tu będzie filtrowanie, wyszukiwanie i ogólnie fajne rzeczy</label>
            </div>
            <div className="ProductionList">
                {loading && <p>Trwa pobieranie danych z bazy...</p>}
                {error && <p>Błąd połączenia: {error}</p>}
                {!loading && !error && (
                    <ProductionTable batches={batches}/>
                )}
            </div>
        </div>
    )
}

export default Production;

