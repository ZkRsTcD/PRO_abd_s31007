import pyodbc
from typing import List

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


      def update_users_permissions(self, role_id: int, to_add: List[int], to_remove: List[int]) -> bool:
            connection = self.get_connection()
            cursor = connection.cursor()
            try:
                  if to_remove:
                        #No removal. Setting role to id = 1 (No access)
                        query = "UPDATE [User] SET role_id = 1 WHERE id = ?"
                        parameters = [(u,) for u in to_remove]
                        cursor.executemany(query, parameters)
                  if to_add:
                        query = "UPDATE [User] SET role_id = ? WHERE id = ?"
                        parameters = [(role_id, u) for u in to_add]
                        cursor.executemany(query, parameters)
                  connection.commit()
                  return True
            except Exception:
                  connection.rollback()
                  raise
            finally:
                  cursor.close()
                  connection.close()

      def create_menu_permissions(self, role_id: int, menu_id: List[int]) -> bool:
            connection = self.get_connection()
            cursor = connection.cursor()
            try:
                  query = "INSERT INTO Menu_Role (Menu_id, Role_id) VALUES (?, ?)"
                  parameters = [(m, role_id) for m in menu_id]
                  cursor.executemany(query, parameters)
                  connection.commit()
                  return True
            except Exception:
                  connection.rollback()
                  raise
            finally:
                  cursor.close()
                  connection.close()

      def delete_menu_permissions(self, role_id: int, menu_id: List[int]) -> bool:
            connection = self.get_connection()
            cursor = connection.cursor()
            try:
                  placeholders = ','.join(['?'] * len(menu_id))
                  query = f"SELECT Role_id, Menu_id FROM Menu_Role WHERE Role_id = ? AND Menu_id IN ({placeholders})"
                  parameters = [role_id] + menu_id
                  cursor.execute(query, parameters)
                  rows = cursor.fetchall()
                  if not rows:
                        return False
                  delete_query = f"DELETE FROM Menu_Role WHERE Role_id = ? AND Menu_id IN ({placeholders})"
                  cursor.execute(delete_query, parameters)
                  connection.commit()
                  return True
            except Exception:
                  connection.rollback()
                  raise
            finally:
                  cursor.close()
                  connection.close()

                  
