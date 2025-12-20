# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from pathlib import Path

from config import UPLOAD_DIR
from database import Base, engine
import models  # importante para registrar modelos
from api import router as api_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="CidadeSomosNós – Arquivo de Posts")

# CORS para desenvolvimento local
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")

# Servir frontend buildado (produção)
FRONTEND_DIST = Path(__file__).resolve().parent / "frontend" / "dist"
if FRONTEND_DIST.exists():
    app.mount("/assets", StaticFiles(directory=str(FRONTEND_DIST / "assets")), name="assets")


@app.get("/", response_class=HTMLResponse)
def read_root():
    # Em produção, servir index.html do frontend buildado
    frontend_index = FRONTEND_DIST / "index.html"
    if frontend_index.exists():
        return frontend_index.read_text(encoding="utf-8")
    # Fallback para index.html antigo
    index_path = Path(__file__).resolve().parent / "index.html"
    return index_path.read_text(encoding="utf-8")


app.include_router(api_router, prefix="/api")
