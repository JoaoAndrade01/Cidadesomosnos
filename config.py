# config.py
from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent

# pasta de uploads
UPLOAD_DIR = BASE_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

# URL do banco de dados
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://csnuser:csnpass@localhost:5432/cidadesomosnos",
)
