import pyodbc

from database import connection_string


class SettingsRepository:

    def get_connection(self):
            return pyodbc.connect(connection_string)


    def get_all_users(self) -> list[dict]:
          connection = self.get_connection()
          cursor = connection.cursor()
          try:
                cursor.execute("SELECT id, fname, sname FROM [User]")
                rows = cursor.fetchall()
                columns = [column[0] for column in cursor.description]
                users_list = [dict(zip(columns, row)) for row in rows]
                return users_list
          finally:
                cursor.close()
                connection.close()

    def get_all_roles(self) -> list[dict]:
            connection = self.get_connection()
            cursor = connection.cursor()
            try:
                  cursor.execute("SELECT r.id, r.name, (SELECT COUNT(*) FROM [User] u WHERE r.id = u.role_id) AS number_of_users FROM [Role] r")
                  rows = cursor.fetchall()
                  columns = [column[0] for column in cursor.description]
                  roles_list = [dict(zip(columns, row)) for row in rows]
                  return roles_list
            finally:
                  cursor.close()
                  connection.close()

    def get_whole_menu(self) -> list[dict]:
                connection = self.get_connection()
                cursor = connection.cursor()
                try:
                      cursor.execute("SELECT id, title FROM Menu")
                      rows = cursor.fetchall()
                      columns = [column[0] for column in cursor.description]
                      menu_list = [dict(zip(columns, row)) for row in rows]
                      return menu_list
                finally:
                      cursor.close()
                      connection.close()
    
    def get_permitted_menu(self, role_id: int) -> list[dict] | None:
            connection = self.get_connection()
            cursor = connection.cursor()
            try:
                  cursor.execute("SELECT id, title FROM Menu m JOIN Menu_Role mr ON m.id = mr.Menu_id WHERE mr.Role_id = ?", role_id)
                  rows = cursor.fetchall()
                  if rows is None:
                         return None
                  columns = [column[0] for column in cursor.description]
                  menu_list = [dict(zip(columns, row)) for row in rows]
                  return menu_list
            finally:
                  cursor.close()
                  connection.close()

    def get_assigned_users(self, role_id: int) -> list[dict] | None:
            connection = self.get_connection()
            cursor = connection.cursor()
            try:
                  cursor.execute("SELECT id FROM [User] WHERE role_id = ?", role_id)
                  rows = cursor.fetchall()
                  if rows is None:
                         return None
                  columns = [column[0] for column in cursor.description]
                  users_list = [dict(zip(columns, row)) for row in rows]
                  return users_list
            finally:
                  cursor.close()
                  connection.close()
