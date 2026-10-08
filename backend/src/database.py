
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