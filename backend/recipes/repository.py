import pyodbc
import datetime

from src.main import connection_string



class RecipeRepository:
    
    def get_connection(self):
        return pyodbc.connect(connection_string)
    
    def get_all(self) -> list[dict]:
        connection = self.get_connection()
        cursor = connection.cursor()
        try:
            cursor.execute("SELECT r.id, r.Machine_id, r.timestart, r.User_id, r.name, u.fname, u.sname FROM Recipe r JOIN [User] u ON User_id = u.id")
            rows = cursor.fetchall()
            columns = [column[0] for column in cursor.description]
            recipes_list = [dict(zip(columns, row)) for row in rows]
            return recipes_list
        finally:
            cursor.close()
            connection.close()

    def get_by_id():
        return 
    
    def update(self, recipe_id: int, fields: dict) -> bool:
        connection = self.get_connection()
        cursor = connection.cursor()
        try:
            set_content = ", ".join([f"{key} = ?" for key in fields.keys()])
            sql_query = f"UPDATE Recipe SET {set_content} WHERE id = ?"
            query_values = list(fields.values()) + [recipe_id]
            cursor.execute(sql_query, query_values)
            connection.commit()
            return True
        except Exception:
            connection.rollback()
            raise
        finally:
            cursor.close()
            connection.close()

    def delete(self, recipe_id: int) -> bool:
        connection = self.get_connection()
        cursor = connection.cursor()
        try:
            cursor.execute("SELECT id FROM Recipe WHERE id = ?", recipe_id)
            if cursor.fetchone() is None:
                return False
            cursor.execute("DELETE FROM Recipe WHERE id = ?", recipe_id)
            connection.commit()
            return True
        except Exception:
            connection.rollback()
            raise
        finally:
            cursor.close()
            connection.close()

    def create(self, fields_to_insert: dict) -> int:
        connection = self.get_connection()
        cursor = connection.cursor()
        try:
            cursor.execute("SELECT MAX(id) + 1 FROM Recipe")
            row = cursor.fetchone()
            new_id = row[0] if row is not None else 1
            fields_to_insert['id'] = new_id                             #PO STRONIE BAZY?
            columns = ", ".join(fields_to_insert.keys())
            placeholders = ", ".join(["?" for _ in fields_to_insert])
            sql_query = f"INSERT INTO Recipe ({columns}) VALUES ({placeholders})"
            cursor.execute(sql_query, list(fields_to_insert.values()))
            connection.commit()
            return new_id
        except Exception:
            connection.rollback()
            raise
        finally:
            cursor.close()
            connection.close()
