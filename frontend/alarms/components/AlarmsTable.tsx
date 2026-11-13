import React from "react";
import type { AlarmRaport } from "../typesAlarms";

interface AlarmsTableProps {
    alarmReports: AlarmRaport[];
}

const AlarmsTable: React.FC<AlarmsTableProps> = ({ alarmReports }) => {

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Numer Maszyny</th>
                    <th>Data wystąpienia</th>
                    <th>Operator</th>
                    <th>Opis alarmu</th>
                </tr>
            </thead>
            <tbody>
                {alarmReports.length === 0 ? (
                    <tr>
                        <td>Brak rekordów w bazie AlarmRaport</td>
                    </tr>
                ) : (
                    alarmReports.map(alarmReport => (
                        <tr key={alarmReport.id}>
                            <td>{alarmReport.id}</td>
                            <td>{alarmReport.machine_code}</td>
                            <td>{new Date(alarmReport.timestart).toLocaleString('pl-PL')}</td>
                            <td>{alarmReport.fname} {alarmReport.sname}</td>
                            <td>{alarmReport.reason}</td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    )

}

export default AlarmsTable;
