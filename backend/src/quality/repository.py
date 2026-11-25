import pyodbc

from database import connection_string

class QualityRepository:

    def get_connection(self):
        return pyodbc.connect(connection_string)

    def get_quality(self,
        from_date: str | None = None,
        to_date: str | None = None,
        search: str | None = None,
        worksNo: str | None = None,
        partNo: str | None = None,
        machine: str | None = None,
        offset: int = 0,
        limit: int = 50
    ) -> list[dict]:
        connection = self.get_connection()
        cursor = connection.cursor()
        try:

        finally:
            cursor.close()
            connection.close()

    def 
