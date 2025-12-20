// API Functions para integração com backend FastAPI

export interface Midia {
    id: number;
    tipo: 'image' | 'video';
    file_path: string;
}

export interface ApiPost {
    id: number;
    title: string;
    content: string;
    instagram_url: string | null;
    author: string;
    category: string;
    created_at: string;
    published_at: string;
    midias: Midia[];
}

// Tipo adaptado para componentes React
export interface Post {
    id: number;
    title: string;
    image: string;
    author: string;
    date: string;
    category: string;
    content: string[];
    fullDate?: string;
    instagram_url?: string;
    midias?: Midia[];
}

const API_BASE = '/api';

// Formatar data para exibição
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hoje';
    if (diffDays === 1) return '1 dia atrás';
    if (diffDays < 7) return `${diffDays} dias atrás`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} semanas atrás`;

    return date.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

function formatFullDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

// Converter post da API para formato do React
function convertApiPost(apiPost: ApiPost): Post {
    const firstImage = apiPost.midias.find(m => m.tipo === 'image');
    const firstMedia = firstImage || apiPost.midias[0];

    return {
        id: apiPost.id,
        title: apiPost.title,
        image: firstMedia ? firstMedia.file_path : '/uploads/placeholder.jpg',
        author: apiPost.author || 'Cidade Somos Nós',
        date: formatDate(apiPost.published_at),
        category: apiPost.category || 'Geral',
        content: apiPost.content.split('\n\n').filter(p => p.trim()),
        fullDate: formatFullDate(apiPost.published_at),
        instagram_url: apiPost.instagram_url || undefined,
        midias: apiPost.midias,
    };
}

// Buscar todos os posts
export async function fetchPosts(): Promise<Post[]> {
    const response = await fetch(`${API_BASE}/posts`);
    if (!response.ok) {
        throw new Error('Erro ao carregar posts');
    }
    const apiPosts: ApiPost[] = await response.json();
    return apiPosts.map(convertApiPost);
}

// Buscar post por ID
export async function fetchPost(id: number): Promise<Post> {
    const response = await fetch(`${API_BASE}/posts/${id}`);
    if (!response.ok) {
        throw new Error('Post não encontrado');
    }
    const apiPost: ApiPost = await response.json();
    return convertApiPost(apiPost);
}

// Buscar categorias
export async function fetchCategories(): Promise<string[]> {
    const response = await fetch(`${API_BASE}/categories`);
    if (!response.ok) {
        return ['Geral'];
    }
    return await response.json();
}

// Criar novo post
export async function createPost(data: FormData): Promise<Post> {
    const response = await fetch(`${API_BASE}/posts`, {
        method: 'POST',
        body: data,
    });
    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Erro ao criar post');
    }
    const apiPost: ApiPost = await response.json();
    return convertApiPost(apiPost);
}
