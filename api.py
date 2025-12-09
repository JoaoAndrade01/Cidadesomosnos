# api.py
import os
from datetime import datetime

from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session

from config import UPLOAD_DIR
from database import get_db
from models import Post, Midia
from schemas import PostRead

router = APIRouter()


@router.get("/posts", response_model=list[PostRead])
def list_posts(db: Session = Depends(get_db)):
    posts = (
        db.query(Post)
        .order_by(Post.published_at.desc())
        .all()
    )
    return posts



@router.get("/posts/{post_id}", response_model=PostRead)
def get_post(post_id: int, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post não encontrado")
    return post


@router.post("/posts", response_model=PostRead)
async def create_post(
    title: str = Form(...),
    content: str = Form(...),
    published_at: str = Form(...),          # YYYY-MM-DD
    instagram_url: str | None = Form(None),
    media: list[UploadFile] = File(...),    # múltiplas mídias
    db: Session = Depends(get_db),
):
    # converte string de data
    try:
        published_at_dt = datetime.fromisoformat(published_at)
    except ValueError:
        raise HTTPException(status_code=400, detail="Data inválida (use YYYY-MM-DD)")

    if not media:
        raise HTTPException(status_code=400, detail="Envie pelo menos uma mídia")

    # cria o Post
    post = Post(
        title=title,
        content=content,
        instagram_url=instagram_url,
        published_at=published_at_dt,
    )
    db.add(post)
    db.flush()  # garante que post.id exista

    first_media_path: str | None = None

    # processa cada arquivo enviado
    for idx, file in enumerate(media):
        if not file.filename:
            continue

        # nome de arquivo
        timestamp = int(datetime.utcnow().timestamp())
        safe_name = file.filename.replace(" ", "_")
        filename = f"{timestamp}_{idx}_{safe_name}"
        filepath = UPLOAD_DIR / filename

        # salva o arquivo
        file_bytes = await file.read()
        with filepath.open("wb") as buffer:
            buffer.write(file_bytes)

        # detecta tipo pela content_type
        content_type = file.content_type or ""
        if content_type.startswith("video/"):
            tipo = "video"
        else:
            tipo = "image"

        media_path = f"/uploads/{filename}"

        if first_media_path is None:
            first_media_path = media_path

        midia = Midia(
            post_id=post.id,
            tipo=tipo,
            file_path=media_path,
        )
        db.add(midia)

    # opcional: guardar primeira mídia no campo legado image_path
    if first_media_path:
        post.image_path = first_media_path

    db.commit()
    db.refresh(post)
    return post
