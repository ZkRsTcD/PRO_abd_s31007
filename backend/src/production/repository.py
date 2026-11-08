import pyodbc

from database import connection_string


class ProductionRepository:

    def get_connection(self):
        return pyodbc.connect(connection_string)

    def get_production(self):
        
    
