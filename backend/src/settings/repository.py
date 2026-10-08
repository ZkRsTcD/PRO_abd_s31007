import pyodbc

from database import connection_string


class SettingsRepository:

    def get_connection(self):
            return pyodbc.connect(connection_string)

    def get_all_users(self) -> list[dict]:
          connection = self.get_connection()
          cursor = connection.cursor()
          try:
                cursor.execute("")
                rows = cursor.fetchall()
                columns = [column[0] for column in cursor.description]
                users_list = [dict(zip(columns, row)) for row in rows]
                return users_list
          finally:
                cursor.close()
                connection.close()
