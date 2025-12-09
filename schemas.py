# schemas.py
from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel


class MidiaRead(BaseModel):
    id: int
    tipo: str
    file_path: str

    class Config:
        orm_mode = True


class PostRead(BaseModel):
    id: int
    title: str
    content: str
    instagram_url: Optional[str]
    created_at: datetime
    published_at: datetime
    midias: List[MidiaRead] = []

    class Config:
        orm_mode = True
