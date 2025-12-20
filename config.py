# config.py
from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent

# pasta de uploads
UPLOAD_DIR = BASE_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

# URL do banco de dados
# Para produção com PostgreSQL, defina a variável de ambiente DATABASE_URL:
#   export DATABASE_URL="postgresql://csnuser:csnpass@localhost:5432/cidadesomosnos"
# Ou defina USE_SQLITE=false para usar a URL padrão do PostgreSQL
USE_SQLITE = os.getenv("USE_SQLITE", "true").lower() == "true"

if USE_SQLITE:
    # SQLite para desenvolvimento local
    SQLITE_PATH = BASE_DIR / "database.db"
    DATABASE_URL = f"sqlite:///{SQLITE_PATH}"
else:
    # PostgreSQL para produção
    DATABASE_URL = os.getenv(
        "DATABASE_URL",
        "postgresql://csnuser:csnpass@localhost:5432/cidadesomosnos",
    )
