import { useCallback, useEffect, useState } from "react";
import { alarmsApi } from "./alarmsApi";
import type { AlarmRaport } from "./typesAlarms";

export function useAlarms() {
    const [alarmReports, setAlarmReports] = useState<AlarmRaport[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string|null>(null);

    const loadAlarmReports = useCallback(async () => {
        try{
            setLoading(true);
            const data = await alarmsApi.getAlarms();
            setAlarmReports(data);
            setError(null);
            //console.log(data[21].timestart)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Błąd pobierania danych');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadAlarmReports();
    }, [loadAlarmReports]);

    return {
        alarmReports,
        loading,
        error
    }

}
