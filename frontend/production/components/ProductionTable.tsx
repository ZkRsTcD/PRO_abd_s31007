import React from "react";
import type { ProductionBatch } from "../typesProduction";

interface ProductionTableProps {
    batches: ProductionBatch[];
}

const ProductionTable: React.FC<ProductionTableProps> = ({ batches }) => {

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Numer Maszyny</th>
                    <th>Data modyfikacji</th>
                    <th>WORKS NO</th>
                    <th>PART NO</th>
                    <th>Receptura</th>
                    <th>Ilość</th>
                    <th>Operator</th>
                    <th>WORK TIME</th>
                    <th>BREAK TIME</th>
                    <th>STOP</th>
                </tr>
            </thead>
            <tbody>
                {batches.length === 0 ? (
                    <tr>
                        <td>Brak rekordów w tabeli</td>
                    </tr>
                ) : (
                    batches.map(batch => (
                        <tr key={batch.id}>
                            <td>{batch.id}</td>
                            <td>{batch.Machine_id}</td>
                            <td>{batch.timestart}</td>
                            <td>{batch.timework}</td>
                            <td>{batch.timewait}</td>
                            <td>{batch.User_id}</td> {/*Tu imię i nazwisko zamiast id*/}
                            <td>{batch.worksorder}</td>
                            <td>{batch.partnum}</td>
                            <td>{batch.worksorder}</td>
                            <td>{batch.quantity}</td>
                            <td>{batch.Stops_id}</td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    )

}

export default ProductionTable;
