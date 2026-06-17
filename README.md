Projekt uruchamiany w całości w środowisku kontenerowym Docker. Zawiera frontend napisany w React (Vite), TypeScript, backend w Pythonie (FastAPI) oraz bazę danych Microsoft SQL Server.



Uruchomienie projektu:

* "docker compose up --build" w terminalu w folderze gdzie znajduje się plik docker-compose.yml
* Przygotowanie bazy danych (MSSQL): 

  * Host: localhost, Port: 1433, Użytkownik: sa, Hasło: (hasło z pliku .env)
  * Stwórz nową bazę danych o nazwie TestPRO i wklej zawartość pliku Example.sql
* Aplikacja działa pod adresem http://localhost:5173 (backend działa na http://localhost:8080)

