from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
import pyodbc
import os
import datetime

app = FastAPI()

# connection_string = (
#     "Driver={ODBC Driver 17 for SQL Server};"
#     "Server=(localdb)\MSSQLLocalDB;"
#     "Database=TestPRO;"
#     "Trusted_Connection=yes;"
# )

# connection_string = (
#     "Driver={ODBC Driver 17 for SQL Server};"
#     "Server=db;"
#     "Database=TestPRO;"
#     "UID=sa;"
#     "PWD=Haslo4!;"
# )

db_server = os.getenv("DB_SERVER", "db")
db_name = os.getenv("DB_NAME", "TestPRO")
db_user = os.getenv("DB_USER", "sa")
db_password = os.getenv("DB_PASSWORD", "TwojeSuperSilneHaslo123!")

connection_string = (
    f"Driver={{ODBC Driver 17 for SQL Server}};"
    f"Server={db_server};"
    f"Database={db_name};"
    f"UID={db_user};"
    f"PWD={db_password};"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)



@app.get("/recipes")
def get_recipes():
    connection = pyodbc.connect(connection_string)
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

@app.get("/recipe/details/{recipe_id}")
def get_recipe_details(recipe_id: int):
    connection = pyodbc.connect(connection_string)
    cursor = connection.cursor()
    try:
        cursor.execute("SELECT * FROM Recipe WHERE id = ?", recipe_id)
        row = cursor.fetchone()
        if row is None:
            return {"error": "Błąd przy wczytywaniu receptury"}
        
        columns = [column[0] for column in cursor.description]
        recipe = dict(zip(columns, tuple(row)))
        return recipe
    finally:
        cursor.close()
        connection.close()

@app.put("/recipe/details/{recipe_id}")
def update_recipe_details(recipe_id: int, details: dict = Body(...)):
    connection = pyodbc.connect(connection_string)
    cursor = connection.cursor()
    try:
        ignored_keys = {'id', 'Source', 'Machine_id', 'timestart', 'User_id', 'name'}
        fields_to_update = {k: v for k, v in details.items() if k not in ignored_keys}
        if not fields_to_update:
            return {"error": "Brak danych do zaktualizowania"}
        set_content = ", ".join([f"{key} = ?" for key in fields_to_update.keys()])
        sql_query = f"UPDATE Recipe SET {set_content} WHERE id = ?"
        query_values = list(fields_to_update.values()) + [recipe_id]
        cursor.execute(sql_query, query_values)
        connection.commit()
        return {"status": "success", "message": "Receptura została zaktualizowana"}
    except Exception as e:
        connection.rollback()
        return {"error": "Błąd zapisu w bazie danych"}
    finally:
        cursor.close()
        connection.close()
    
        



# @app.get("/user/name/{user_id}")
# def get_users_name(user_id: int):
#     connection = pyodbc.connect(connection_string)
#     cursor = connection.cursor()
#     try:
#         cursor.execute("SELECT fname, sname FROM [User] WHERE id = ?", user_id)
#         row = cursor.fetchone()
#         if row is None:
#             return {"error": "Brak usera"}
#         return {
#             "fname": row[0],
#             "sname": row[1]
#         }
#     finally:
#         cursor.close()
#         connection.close()
        
    

        



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)




