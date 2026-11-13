import React from "react";
import type { ProductionBatch } from "../typesProduction";

interface ProductionTableProps {
    batches: ProductionBatch[];
    formatSecondsToTime: (totalSeconds: number | null | undefined) => string;
}

const ProductionTable: React.FC<ProductionTableProps> = ({ batches, formatSecondsToTime }) => {

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Numer Maszyny</th>
                    <th>Data</th>
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
                            <td>{new Date(batch.timestart).toLocaleString('pl-PL')}</td>
                            <td>{batch.worksorder}</td>
                            <td>{batch.partnum}</td>
                            <td>{batch.name}</td>
                            <td>{batch.quantity}</td>
                            <td>{batch.fname} {batch.sname}</td>
                            <td>{formatSecondsToTime(batch.timework)}</td>
                            <td>{formatSecondsToTime(batch.timewait)}</td>
                            <td>{batch.reason}</td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    )

}

export default ProductionTable;
