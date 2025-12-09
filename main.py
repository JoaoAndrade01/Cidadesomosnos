from fastapi import FastAPI, Depends, UploadFile, File, Form
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from datetime import datetime, timezone
from pathlib import Path
import shutil
import os

# --- CONFIGURAÇÃO DO BANCO ---

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://csnuser:csnpass@localhost:5432/cidadesomosnos"
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# --- UPLOADS ---

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


# --- MODELO SQLALCHEMY ---

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    content = Column(Text, nullable=False)

    # caminho da imagem salva no servidor
    image_path = Column(String, nullable=True)

    instagram_url = Column(String, nullable=True)

    # quando o registro foi criado no sistema (no site)
    created_at = Column(DateTime(timezone=True),default=lambda: datetime.now(timezone.utc))

    # data de publicação original no Instagram
    published_at = Column(DateTime, nullable=False)


Base.metadata.create_all(bind=engine)


# --- SCHEMA Pydantic ---

class PostRead(BaseModel):
    id: int
    title: str
    content: str
    image_path: str | None
    instagram_url: str | None
    created_at: datetime
    published_at: datetime

    class Config:
        orm_mode = True


# --- APP ---

app = FastAPI(title="CidadeSomosNós – Arquivo de Posts")

# servir arquivos de imagem
app.mount("/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")


# Rota principal: devolve o HTML da página única
@app.get("/", response_class=HTMLResponse)
def read_root():
    with open("index.html", "r", encoding="utf-8") as f:
        return f.read()


# Listar posts
@app.get("/api/posts", response_model=list[PostRead])
def list_posts(db: Session = Depends(get_db)):
    posts = db.query(Post).order_by(Post.published_at.desc()).all()
    return posts


# Criar post (com upload de imagem + data de publicação)
@app.post("/api/posts", response_model=PostRead)
async def create_post(
    title: str = Form(...),
    content: str = Form(...),
    published_at: str = Form(...),          # formato YYYY-MM-DD vindo do input date
    instagram_url: str | None = Form(None),
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    # converte a data de string para datetime
    published_at_dt = datetime.fromisoformat(published_at)

    # salva a imagem na pasta uploads/
    timestamp = int(datetime.now(timezone.utc).timestamp())
    filename = f"{timestamp}_{image.filename}"
    filepath = UPLOAD_DIR / filename

    with filepath.open("wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    image_path = f"/uploads/{filename}"

    post = Post(
        title=title,
        content=content,
        image_path=image_path,
        instagram_url=instagram_url,
        published_at=published_at_dt,
    )

    db.add(post)
    db.commit()
    db.refresh(post)
    return post
