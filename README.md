# CidadeSomosNós – Arquivo de Posts

Este projeto é um protótipo de **arquivo de posts do Instagram** do CidadeSomosNós, rodando em **software livre**, com backend em FastAPI e banco de dados PostgreSQL.

A ideia é:

- Ter uma **cópia local** dos posts do Instagram (texto + mídias + datas)  
- Exibir esses posts em um **grid estilo Instagram**, com imagens em miniatura  
- Ao clicar em um post, abrir uma visão detalhada com **carrossel de fotos/vídeos** e o texto completo  
- Permitir criar novos posts com múltiplas mídias (imagens e vídeos)

---

## Tecnologias

- **Python** (3.11+)
- **FastAPI** (API web)
- **Uvicorn** (servidor ASGI)
- **SQLAlchemy** (ORM)
- **PostgreSQL** (banco de dados)
- **Pydantic v2** (modelos de dados)
- **HTML + CSS + JavaScript puro** (frontend simples)
- **Pandas + OpenPyXL** (importação de dados a partir de `.xlsx`)

---

## Estrutura do projeto

```text
cidadeSomosNos/
├─ main.py                     # Cria o app FastAPI, monta /uploads e inclui as rotas da API
├─ api.py                      # Rotas da API (/api/posts, etc.)
├─ config.py                   # Configurações (DATABASE_URL, pasta de uploads)
├─ database.py                 # Engine, SessionLocal, Base, get_db()
├─ models.py                   # Modelos SQLAlchemy (Post, Midia)
├─ schemas.py                  # Modelos Pydantic (PostRead, MidiaRead)
├─ index.html                  # Single Page "estilo Instagram" (grid + detalhe)
├─ importar_posts_e_midias.py  # Script para importar posts + mídias a partir de um .xlsx e arquivos já copiados
├─ posts_instagram.xlsx        # Arquivo de planilha com dados dos posts (id, data, texto) – opcional
├─ uploads/                    # Pasta com os arquivos de mídia (imagens e vídeos)
└─ venv/                       # Ambiente virtual Python (não versionar em git)
