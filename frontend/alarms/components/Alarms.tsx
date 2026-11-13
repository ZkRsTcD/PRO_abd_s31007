import React from "react";
import { useAlarms } from "../useAlarms";
import AlarmsTable from "./AlarmsTable"
//import 

const Alarms: React.FC = () => {
    const {
        alarmReports,
        loading,
        error
    } = useAlarms();

    return (
        <div className="AlarmReports">
            <h1>
                Alarmy
            </h1>
            {loading && <p>Trwa pobieranie danych z bazy...</p>}
            {error && <p>Błąd połączenia: {error}</p>}
            {!loading && !error && (
                <AlarmsTable alarmReports={alarmReports}/>
            )}
        </div>
    )
}

export default Alarms;
