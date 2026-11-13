from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
import pyodbc
import os
import datetime
import sys
from pathlib import Path

src_dir = Path(__file__).resolve().parent


from production.router import router as production_router
from recipes.router import router as recipes_router
from settings.router import router as settings_router
from alarms.router import router as alarms_router


app = FastAPI()

connection_string = (
    "Driver={ODBC Driver 18 for SQL Server};"
    "Server=(localdb)\\MSSQLLocalDB;"
    "Database=TestPRO;"
    "Trusted_Connection=yes;"
)


# db_server = os.getenv("DB_SERVER", "db")
# db_name = os.getenv("DB_NAME", "TestPRO")
# db_user = os.getenv("DB_USER", "sa")
# db_password = os.getenv("DB_PASSWORD", "TwojeSuperSilneHaslo123!")

# connection_string = (
#     f"Driver={{ODBC Driver 18 for SQL Server}};"
#     f"Server={db_server};"
#     f"Database={db_name};"
#     f"UID={db_user};"
#     f"PWD={db_password};"
# )


#  /\ Wersja sterownika ODBC zmianiona z 17 na 18. Może powodować problemy


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


app.include_router(production_router, tags=["Produkcja"])
app.include_router(recipes_router, tags=["Receptury"])
app.include_router(settings_router, tags=["Ustawienia"])
app.include_router(alarms_router, tags=["Alarmy"])



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)




