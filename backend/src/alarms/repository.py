import pyodbc

from database import connection_string

class AlarmsRepository:

    def get_connection(self):
        return pyodbc.connect(connection_string)

    def get_alarms(self, 
        from_date: str | None = None,
        to_date: str | None = None,
        machine: str | None = None,
        operator: str | None = None,
        offset: int = 0,
        limit: int = 50
    ) -> list[dict]:
        connection = self.get_connection()
        cursor = connection.cursor()
        try:
            query = """
                SELECT ar.id, m.machine_code, ar.timestart, u.fname, u.sname, a.reason FROM AlarmRaport ar
                JOIN Machine m ON ar.Machine_id = m.id
                JOIN [User] u ON ar.User_id = u.id
                JOIN Alarms a ON ar.Alarms_id = a.id
                WHERE 1=1
            """
            parameters = []

            if from_date:
                query += " AND ar.timestart >= ?"
                parameters.append(from_date)
            
            if to_date:
                query += " AND ar.timestart < DATEADD(day, 1, CAST(? AS DATE))"
                parameters.append(to_date)

            if machine:
                query += " AND m.machine_code = ?"
                parameters.append(machine)

            if operator:
                query += " AND (u.fname + ' ' + u.sname) = ?"
                parameters.append(operator)

            query += " ORDER BY ar.timestart DESC"

            query += " OFFSET ? ROWS"
            parameters.append(offset)
            
            query += " FETCH NEXT ? ROWS ONLY"
            parameters.append(limit)

            cursor.execute(query, parameters)
            rows = cursor.fetchall()
            columns = [column[0] for column in cursor.description]
            alarms_list = [dict(zip(columns, row)) for row in rows]
            return alarms_list
        finally:
            cursor.close()
            connection.close()

    def get_filters_machine(self) -> list[str]:
        connection = self.get_connection()
        cursor = connection.cursor()
        try:
            cursor.execute("""
                SELECT DISTINCT m.machine_code FROM AlarmRaport ar
                RIGHT JOIN Machine m ON ar.Machine_id = m.id
                ORDER BY m.machine_code ASC
            """)
            rows = cursor.fetchall()
            return [row[0] for row in rows]
        finally:
            cursor.close()
            connection.close()

    def get_filters_operator(self) -> list[str]:
        connection = self.get_connection()
        cursor = connection.cursor()
        try:
            cursor.execute("""
                SELECT (u.fname + ' ' + u.sname) AS FullName FROM AlarmRaport ar
                RIGHT JOIN [User] u ON ar.User_id = u.id
                GROUP BY u.fname, u.sname
                ORDER BY u.sname ASC
            """)
            rows = cursor.fetchall()
            return [row[0] for row in rows]
        finally:
            cursor.close()
            connection.close()
