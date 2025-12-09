# importar_posts_e_midias.py

import re
from datetime import datetime
from pathlib import Path

import pandas as pd

from config import UPLOAD_DIR
from database import SessionLocal
from models import Post, Midia

# ==============================
# CONFIGURAÇÕES – AJUSTAR AQUI
# ==============================

EXCEL_PATH = Path("posts_instagram.xlsx")  # nome do seu arquivo .xlsx

# nomes das colunas no Excel
COL_ID = "id"
COL_DATA = "data de postagem"
COL_TEXTO = "texto"

# se a data vier como string tipo "10/05/2023", use "%d/%m/%Y"
FORMATO_DATA = "%d/%m/%Y"


# ==============================
# FUNÇÕES AUXILIARES
# ==============================

def parse_data(val):
    """Converte valor de data do Excel para datetime."""
    if isinstance(val, datetime):
        return val
    s = str(val).strip()
    if not s:
        return None
    if FORMATO_DATA:
        return datetime.strptime(s, FORMATO_DATA)
    return pd.to_datetime(s).to_pydatetime()


def detectar_tipo_por_extensao(nome_arquivo: str) -> str:
    ext = nome_arquivo.lower().split(".")[-1]
    if ext in ["mp4", "mov", "avi", "mkv"]:
        return "video"
    return "image"


def agrupar_midias_por_post(upload_dir: Path):
    """
    Retorna um dict {post_id:int -> [Path(...), ...]}
    baseado em arquivos com padrão 'post{n}_...'
    """
    mapa = {}
    for f in upload_dir.iterdir():
        if not f.is_file():
            continue
        m = re.match(r"post(\d+)_", f.name)
        if not m:
            continue
        post_id = int(m.group(1))
        mapa.setdefault(post_id, []).append(f)
    return mapa


# ==============================
# SCRIPT PRINCIPAL
# ==============================

def main():
    if not EXCEL_PATH.exists():
        raise FileNotFoundError(f"Arquivo Excel não encontrado: {EXCEL_PATH}")

    if not UPLOAD_DIR.exists():
        raise FileNotFoundError(f"Pasta uploads não encontrada: {UPLOAD_DIR}")

    print(f"Lendo Excel: {EXCEL_PATH}")
    df = pd.read_excel(EXCEL_PATH)
    print(f"Linhas lidas: {len(df)}")

    # agrupa arquivos de mídia por ID de post (1,2,3,...)
    midias_por_post = agrupar_midias_por_post(UPLOAD_DIR)
    print(f"Posts com mídias encontrados na pasta uploads: {list(midias_por_post.keys())}")

    session = SessionLocal()
    try:
        for idx, row in df.iterrows():
            # ID do post (1..10)
            raw_id = row.get(COL_ID)
            if pd.isna(raw_id):
                print(f"[linha {idx}] sem ID, ignorando")
                continue

            try:
                post_idx = int(raw_id)
            except ValueError:
                print(f"[linha {idx}] ID inválido: {raw_id}, ignorando")
                continue

            texto_val = row.get(COL_TEXTO, "")
            content = "" if pd.isna(texto_val) else str(texto_val).strip()

            # você pode criar um título automático ou deixar vazio
            title = f"Post {post_idx}"

            data_val = row.get(COL_DATA)
            published_at = parse_data(data_val)
            if not published_at:
                print(f"[linha {idx}] data inválida para post {post_idx}, ignorando")
                continue

            # mídias associadas a este post
            arquivos_midias = midias_por_post.get(post_idx, [])

            if not arquivos_midias:
                print(f"[linha {idx}] Post {post_idx} sem mídia encontrada em uploads/, criando mesmo assim.")
            else:
                print(f"[linha {idx}] Post {post_idx} -> {len(arquivos_midias)} mídia(s)")

            # cria o Post
            post = Post(
                title=title,
                content=content,
                instagram_url=None,  # se quiser, depois adiciona URL no Excel
                published_at=published_at,
            )
            session.add(post)
            session.flush()  # garante post.id

            # cria Midia para cada arquivo
            first_media_path = None

            for f in sorted(arquivos_midias, key=lambda p: p.name):
                file_path_rel = f"/uploads/{f.name}"
                tipo = detectar_tipo_por_extensao(f.name)

                if first_media_path is None:
                    first_media_path = file_path_rel

                midia = Midia(
                    post_id=post.id,
                    tipo=tipo,
                    file_path=file_path_rel,
                )
                session.add(midia)

            # opcional: preencher campo legado image_path com a primeira mídia
            if first_media_path:
                post.image_path = first_media_path

            print(f"[linha {idx}] Post criado (id interno: {post.id}, idx: {post_idx})")

        session.commit()
        print("Importação concluída com sucesso!")
    except Exception as e:
        session.rollback()
        print("Erro na importação, transação revertida.")
        raise
    finally:
        session.close()


if __name__ == "__main__":
    main()
