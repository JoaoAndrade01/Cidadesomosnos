# models.py
from datetime import datetime, timezone

from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime,
    ForeignKey,
)
from sqlalchemy.orm import relationship

from database import Base


class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    content = Column(Text, nullable=False)

    # pode manter por compatibilidade, mas vamos parar de usar na prática
    image_path = Column(String, nullable=True)

    instagram_url = Column(String, nullable=True)

    created_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
    )

    published_at = Column(DateTime, nullable=False)

    midias = relationship(
        "Midia",
        back_populates="post",
        cascade="all, delete-orphan",
    )


class Midia(Base):
    __tablename__ = "midias"

    id = Column(Integer, primary_key=True, index=True)

    post_id = Column(
        Integer,
        ForeignKey("posts.id", ondelete="CASCADE"),
        nullable=False,
    )

    # "image" ou "video"
    tipo = Column(String(10), nullable=False)

    file_path = Column(String, nullable=False)

    created_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
    )

    post = relationship("Post", back_populates="midias")
