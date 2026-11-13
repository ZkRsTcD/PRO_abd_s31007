import pyodbc

from database import connection_string


class ProductionRepository:

    def get_connection(self):
        return pyodbc.connect(connection_string)

    def get_production(self, 
        from_date: str | None = None,
        to_date: str | None = None,
        search: str | None = None
    ) -> list[dict]:
        connection = self.get_connection()
        cursor = connection.cursor()
        try:
            query = """
                SELECT TOP 50 p.id, p.Machine_id, p.timestart, p.worksorder, p.partnum, r.name, p.quantity, u.fname, u.sname, p.timework, p.timewait, s.reason FROM MachineWorkCycle p
                JOIN Recipe r ON p.Recipe_id = r.id
                JOIN [User] u ON p.User_id = u.id
                LEFT JOIN Stops s ON p.Stops_id = s.id
                WHERE 1=1
            """
            parameters = []

            if from_date:
                query += " AND p.timestart >= ?"
                parameters.append(from_date)

            if to_date:
                query += " AND p.timestart < DATEADD(day, 1, CAST(? AS DATE))"
                parameters.append(to_date)

            if search:
                query += " AND (p.worksorder LIKE ? OR p.partnum LIKE ? OR r.name LIKE ? OR u.fname LIKE ? OR u.sname LIKE ? OR p.id LIKE ? OR s.reason LIKE ?)"
                search_pattern = f"%{search}%"
                parameters.extend([search_pattern, search_pattern, search_pattern, search_pattern, search_pattern, search_pattern, search_pattern])

            query += " ORDER BY p.timestart DESC"

            #print(query)

            cursor.execute(query, parameters)
            rows = cursor.fetchall()
            columns = [column[0] for column in cursor.description]
            production_list = [dict(zip(columns, row)) for row in rows]
            return production_list
        finally:
            cursor.close()
            connection.close()

    
