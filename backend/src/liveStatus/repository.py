import pyodbc

from database import connection_string


class LiveStatusRepository:

    def get_connection(self):
        return pyodbc.connect(connection_string)

    def get_live_status_data(self) -> list[dict]:
        connection = self.get_connection()
        cursor = connection.cursor()
        try:
            cursor.execute("""SELECT 
                id, 
                machine_code, 
                iOn, 
                iTemp, 
                iQi, 
                iData, 
                i1Cycle, 
                iAlarm, 
                iWork, 
                stopTime, 
                qtyLeft, 
                progress, 
                timeLeft, 
                cycleTime, 
                worksOrder, 
                partNumber, 
                recipe, 
                operator, 
                efficiency, 
                iClean, 
                iAss, 
                UpdatedAt 
                FROM Visualization WITH (NOLOCK)
            """)
            rows = cursor.fetchall()
            columns = [column[0] for column in cursor.description]
            live_status_list = [dict(zip(columns, row)) for row in rows]
            return live_status_list
        finally:
            cursor.close()
            connection.close()


    