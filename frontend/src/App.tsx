import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomeSection } from './components/HomeSection';
import { PostsSection } from './components/PostsSection';
import { AboutSection } from './components/AboutSection';
import { PostView } from './components/PostView';
import { AdminPanel } from './components/AdminPanel';
import { PostForm } from './components/PostForm';
import { CategoryManager } from './components/CategoryManager';
import { WikipediaSection } from './components/WikipediaSection';
import { WikiArticleView } from './components/WikiArticleView';
import { WikiEditor } from './components/WikiEditor';
import { Sidebar } from './components/Sidebar';
import { LoginModal } from './components/LoginModal';
import { fetchPosts, fetchCategories, Post } from './api/posts';
import { wikipediaData as initialWikipediaData, WikiArticle } from './data/wikipedia';
import { toast, Toaster } from 'sonner';

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Posts da API
  const [posts, setPosts] = useState<Post[]>([]);
  const [articles, setArticles] = useState<WikiArticle[]>(initialWikipediaData);
  
  // Categorias da API
  const [categories, setCategories] = useState<string[]>([]);
  
  // Carregar dados da API ao iniciar
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const [postsData, categoriesData] = await Promise.all([
          fetchPosts(),
          fetchCategories()
        ]);
        setPosts(postsData);
        setCategories(categoriesData.length > 0 ? categoriesData : ['Geral']);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        toast.error('Erro ao carregar posts');
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);
  
  // Form states
  const [showPostForm, setShowPostForm] = useState(false);
  const [showWikiEditor, setShowWikiEditor] = useState(false);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | undefined>(undefined);
  const [editingArticle, setEditingArticle] = useState<WikiArticle | undefined>(undefined);

  const handlePostClick = (id: number) => {
    setSelectedPostId(id);
    setSelectedArticleId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleArticleClick = (id: number) => {
    setSelectedArticleId(id);
    setSelectedPostId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedPostId(null);
    setSelectedArticleId(null);
  };

  const handleToggleAdmin = () => {
    if (isAdminMode) {
      // Se já está em modo admin, desativar diretamente
      setIsAdminMode(false);
      toast.info('Modo administrador desativado');
    } else {
      // Se não está em modo admin, abrir modal de login
      setShowLoginModal(true);
    }
  };

  const handleLoginResult = (success: boolean) => {
    if (success) {
      setIsAdminMode(true);
      setShowLoginModal(false);
      toast.success('Modo administrador ativado');
    }
  };

  // Post CRUD
  const handleNewPost = () => {
    if (categories.length === 0) {
      toast.error('Crie pelo menos uma categoria primeiro', {
        description: 'Acesse o botão "Categorias" para criar'
      });
      return;
    }
    setEditingPost(undefined);
    setShowPostForm(true);
  };

  const handleEditPost = (id: number) => {
    const post = posts.find(p => p.id === id);
    if (post) {
      setEditingPost(post);
      setShowPostForm(true);
    }
  };

  const handleDeletePost = (id: number) => {
    if (confirm('Tem certeza que deseja deletar este post?')) {
      setPosts(posts.filter(p => p.id !== id));
      toast.success('Post deletado com sucesso');
    }
  };

  const handleSavePost = (postData: Omit<Post, 'id'> & { id?: number }) => {
    if (postData.id) {
      // Edit existing
      setPosts(posts.map(p => p.id === postData.id ? { ...postData, id: postData.id } : p));
      toast.success('Post atualizado com sucesso');
    } else {
      // Create new
      const newPost = { ...postData, id: Math.max(...posts.map(p => p.id)) + 1 };
      setPosts([newPost, ...posts]);
      toast.success('Post criado com sucesso');
    }
    
    // Add category to list if it doesn't exist
    if (postData.category && !categories.includes(postData.category)) {
      setCategories([...categories, postData.category].sort());
    }
    
    setShowPostForm(false);
    setEditingPost(undefined);
  };

  // Wikipedia Article CRUD
  const handleNewArticle = () => {
    setEditingArticle(undefined);
    setShowWikiEditor(true);
  };

  const handleEditArticle = (id: number) => {
    const article = articles.find(a => a.id === id);
    if (article) {
      setEditingArticle(article);
      setShowWikiEditor(true);
    }
  };

  const handleDeleteArticle = (id: number) => {
    if (confirm('Tem certeza que deseja deletar este artigo?')) {
      setArticles(articles.filter(a => a.id !== id));
      toast.success('Artigo deletado com sucesso');
    }
  };

  const handleSaveArticle = (articleData: Omit<WikiArticle, 'id'> & { id?: number }) => {
    if (articleData.id) {
      // Edit existing
      setArticles(articles.map(a => a.id === articleData.id ? { ...articleData, id: articleData.id } : a));
      toast.success('Artigo atualizado com sucesso');
    } else {
      // Create new
      const newArticle = { ...articleData, id: Math.max(...articles.map(a => a.id)) + 1 };
      setArticles([newArticle, ...articles]);
      toast.success('Artigo criado com sucesso');
    }
    setShowWikiEditor(false);
    setEditingArticle(undefined);
  };

  // Category Management
  const handleAddCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category].sort());
      toast.success(`Categoria "${category}" adicionada`);
    }
  };

  const handleDeleteCategory = (category: string) => {
    // Check if any posts use this category
    const postsWithCategory = posts.filter(p => p.category === category);
    
    if (postsWithCategory.length > 0) {
      const postsText = postsWithCategory.length === 1 ? 'post usa' : 'posts usam';
      toast.error(`Não é possível deletar: ${postsWithCategory.length} ${postsText} esta categoria`, {
        description: 'Remova ou altere a categoria dos posts primeiro'
      });
      return;
    }
    
    if (confirm(`Tem certeza que deseja deletar a categoria "${category}"?`)) {
      setCategories(categories.filter(c => c !== category));
      toast.success(`Categoria "${category}" removida`);
    }
  };

  const selectedPost = selectedPostId ? posts.find(p => p.id === selectedPostId) : null;
  const selectedArticle = selectedArticleId ? articles.find(a => a.id === selectedArticleId) : null;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Toaster position="top-right" theme="dark" />
      
      {/* Admin Mode Indicator */}
      {isAdminMode && (
        <div className="fixed bottom-6 left-6 z-40 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full backdrop-blur-md shadow-xl">
          <div className="flex items-center gap-2 text-orange-400 text-sm">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <span>Modo Administrador Ativo</span>
          </div>
        </div>
      )}
      
      <Header 
        onNavigate={(tab) => {
          setActiveTab(tab);
          setSelectedPostId(null);
          setSelectedArticleId(null);
        }} 
        activeTab={activeTab}
        isAdminMode={isAdminMode}
        onToggleAdmin={handleToggleAdmin}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-4">
            {selectedPost ? (
              <PostView post={selectedPost} onBack={handleBackToList} />
            ) : selectedArticle ? (
              <WikiArticleView article={selectedArticle} onBack={handleBackToList} />
            ) : (
              <>
                {activeTab === 'inicio' && (
                  isAdminMode ? (
                    <AdminPanel 
                      postsCount={posts.length} 
                      articlesCount={articles.length}
                      categoriesCount={categories.length}
                      onManageCategories={() => setShowCategoryManager(true)}
                    />
                  ) : (
                    <HomeSection posts={posts} onPostClick={handlePostClick} />
                  )
                )}
                {activeTab === 'posts' && (
                  <PostsSection 
                    posts={posts}
                    categories={categories}
                    onPostClick={handlePostClick}
                    isAdminMode={isAdminMode}
                    onNewPost={handleNewPost}
                    onEditPost={handleEditPost}
                    onDeletePost={handleDeletePost}
                    onManageCategories={() => setShowCategoryManager(true)}
                  />
                )}
                {activeTab === 'wikipedia' && (
                  <WikipediaSection 
                    articles={articles}
                    onArticleClick={handleArticleClick}
                    isAdminMode={isAdminMode}
                    onNewArticle={handleNewArticle}
                    onEditArticle={handleEditArticle}
                    onDeleteArticle={handleDeleteArticle}
                  />
                )}
                {activeTab === 'sobre' && <AboutSection />}
              </>
            )}
          </div>

          {/* Sidebar - Always Visible */}
          <div className="lg:block hidden">
            <div className="sticky top-24">
              <Sidebar />
            </div>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <div className="lg:hidden mt-8">
          <Sidebar />
        </div>
      </main>

      <footer className="border-t border-white/5 bg-black/60 backdrop-blur-xl mt-20">
        <div className="container mx-auto px-4 py-10">
          <div className="text-center text-gray-500 text-sm">
            <p className="mb-3 opacity-80">
              O conteúdo do Cidade Somos Nós é disponibilizado sob a licença Creative Commons Attribution
            </p>
            <p className="opacity-70">© 2025 Cidade Somos Nós | Um projeto comunitário 🌹</p>
          </div>
        </div>
      </footer>

      {/* Forms */}
      {showPostForm && (
        <PostForm
          post={editingPost}
          categories={categories}
          onSave={handleSavePost}
          onCancel={() => {
            setShowPostForm(false);
            setEditingPost(undefined);
          }}
        />
      )}

      {showWikiEditor && (
        <WikiEditor
          article={editingArticle}
          onSave={handleSaveArticle}
          onCancel={() => {
            setShowWikiEditor(false);
            setEditingArticle(undefined);
          }}
        />
      )}

      {showCategoryManager && (
        <CategoryManager
          categories={categories}
          postsCount={posts.reduce((acc, post) => {
            acc[post.category] = (acc[post.category] || 0) + 1;
            return acc;
          }, {} as { [key: string]: number })}
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
          onClose={() => setShowCategoryManager(false)}
        />
      )}

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLoginResult}
      />
    </div>
  );
}