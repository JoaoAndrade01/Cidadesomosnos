# migrate_db.py
# Script para adicionar colunas author e category ao banco existente

import sqlite3

def migrate():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    
    # Verificar colunas existentes
    cursor.execute("PRAGMA table_info(posts)")
    columns = [col[1] for col in cursor.fetchall()]
    
    # Adicionar author se não existir
    if 'author' not in columns:
        cursor.execute('ALTER TABLE posts ADD COLUMN author TEXT DEFAULT "Cidade Somos Nos"')
        print('Coluna "author" adicionada')
    else:
        print('Coluna "author" já existe')
    
    # Adicionar category se não existir  
    if 'category' not in columns:
        cursor.execute('ALTER TABLE posts ADD COLUMN category TEXT DEFAULT "Geral"')
        print('Coluna "category" adicionada')
    else:
        print('Coluna "category" já existe')
    
    conn.commit()
    conn.close()
    print('Migração concluída!')

if __name__ == '__main__':
    migrate()
