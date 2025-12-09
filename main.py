# main.py
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from pathlib import Path

from config import UPLOAD_DIR
from database import Base, engine
import models  # importante para registrar modelos
from api import router as api_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="CidadeSomosNós – Arquivo de Posts")

app.mount("/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")


@app.get("/", response_class=HTMLResponse)
def read_root():
    index_path = Path(__file__).resolve().parent / "index.html"
    return index_path.read_text(encoding="utf-8")


app.include_router(api_router, prefix="/api")
