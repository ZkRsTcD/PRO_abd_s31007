import pyodbc

from database import connection_string


class ProductionRepository:

    def get_connection(self):
        return pyodbc.connect(connection_string)

    def get_production(self) -> list[dict]:
        connection = self.get_connection()
        cursor = connection.cursor()
        try:
            cursor.execute("""
                SELECT TOP 50 p.id, p.Machine_id, p.timestart, p.worksorder, p.partnum, r.name, p.quantity, u.fname, u.sname, p.timework, p.timewait, s.reason FROM MachineWorkCycle p
                JOIN Recipe r ON p.Recipe_id = r.id
                JOIN [User] u ON p.User_id = u.id
                LEFT JOIN Stops s ON p.Stops_id = s.id
                ORDER BY p.timestart DESC
            """)
            rows = cursor.fetchall()
            columns = [column[0] for column in cursor.description]
            production_list = [dict(zip(columns, row)) for row in rows]
            return production_list
        finally:
            cursor.close()
            connection.close()
    
