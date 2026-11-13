import pyodbc

from database import connection_string

class AlarmsRepository:

    def get_connection(self):
        return pyodbc.connect(connection_string)

    def get_alarms(self) -> list[dict]:
        connection = self.get_connection()
        cursor = connection.cursor()
        try:
            cursor.execute("""
                SELECT ar.id, m.machine_code, ar.timestart, u.fname, u.sname, a.reason FROM AlarmRaport ar
                JOIN Machine m ON ar.Machine_id = m.id
                JOIN [User] u ON ar.User_id = u.id
                JOIN Alarms a ON ar.Alarms_id = a.id
                ORDER BY ar.timestart DESC
            """)
            rows = cursor.fetchall()
            columns = [column[0] for column in cursor.description]
            alarms_list = [dict(zip(columns, row)) for row in rows]
            return alarms_list
        finally:
            cursor.close()
            connection.close()
