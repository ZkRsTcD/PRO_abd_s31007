import pyodbc
import datetime
from typing import Optional

#from src.main import connection_string
from database import connection_string
#from pyodbc import .......



class RecipeRepository:
    
    def get_connection(self):
        return pyodbc.connect(connection_string)
    
    def get_recipes(self, 
        from_date: str | None = None,
        to_date: str | None = None,
        search: str | None = None
    ) -> list[dict]:
        connection = self.get_connection()
        cursor = connection.cursor()
        try:
            query = """
                SELECT r.id, r.Machine_id, r.timestart, r.User_id, r.name, u.fname, u.sname FROM Recipe r 
                JOIN [User] u ON User_id = u.id
                WHERE 1=1
            """
            parameters = []

            if from_date:
                query += " AND r.timestart >= ?"
                parameters.append(from_date)

            if to_date:
                query += " AND r.timestart < DATEADD(day, 1, CAST(? AS DATE))"
                parameters.append(to_date)

            if search:
                query += " AND (r.id LIKE ? OR r.Machine_id LIKE ? OR r.name LIKE ? OR u.fname LIKE ? OR u.sname LIKE ?)"
                search_pattern = f"%{search}%"
                parameters.extend([search_pattern, search_pattern, search_pattern, search_pattern, search_pattern])

            query += " ORDER BY r.timestart DESC"
            

            cursor.execute(query, parameters)
            rows = cursor.fetchall()
            columns = [column[0] for column in cursor.description]
            recipes_list = [dict(zip(columns, row)) for row in rows]
            return recipes_list
        finally:
            cursor.close()
            connection.close()

    def get_by_id(self, recipe_id: int) -> Optional[dict]:
        connection = self.get_connection()
        cursor = connection.cursor()
        try:
            cursor.execute("SELECT * FROM Recipe WHERE id = ?", recipe_id)
            row = cursor.fetchone()
            if row is None:
                return None
            columns = [column[0] for column in cursor.description]
            recipe = dict(zip(columns, tuple(row)))
            return recipe
        finally:
            cursor.close()
            connection.close()
    
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
