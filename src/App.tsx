import { useState } from 'react';
import { Header } from './components/Header';
import { HomeSection } from './components/HomeSection';
import { PostsSection } from './components/PostsSection';
import { EventsSection } from './components/EventsSection';
import { AboutSection } from './components/AboutSection';
import { PostView, Post } from './components/PostView';
import { EventView } from './components/EventView';
import { AdminPanel } from './components/AdminPanel';
import { PostForm } from './components/PostForm';
import { EventForm } from './components/EventForm';
import { CategoryManager } from './components/CategoryManager';
import { Sidebar } from './components/Sidebar';
import { postsData as initialPostsData } from './data/posts';
import { eventsData as initialEventsData, Event } from './data/events';
import { toast, Toaster } from 'sonner@2.0.3';

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  
  // Manage posts and events state
  const [posts, setPosts] = useState<Post[]>(initialPostsData);
  const [events, setEvents] = useState<Event[]>(initialEventsData);
  
  // Categories state - initialize with existing categories from posts
  const [categories, setCategories] = useState<string[]>(() => {
    const uniqueCategories = Array.from(new Set(initialPostsData.map(p => p.category)));
    return uniqueCategories.sort();
  });
  
  // Form states
  const [showPostForm, setShowPostForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | undefined>(undefined);
  const [editingEvent, setEditingEvent] = useState<Event | undefined>(undefined);

  const handlePostClick = (id: number) => {
    setSelectedPostId(id);
    setSelectedEventId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEventClick = (id: number) => {
    setSelectedEventId(id);
    setSelectedPostId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedPostId(null);
    setSelectedEventId(null);
  };

  const handleToggleAdmin = () => {
    setIsAdminMode(!isAdminMode);
    if (!isAdminMode) {
      toast.success('Modo administrador ativado');
    } else {
      toast.info('Modo administrador desativado');
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

  // Event CRUD
  const handleNewEvent = () => {
    setEditingEvent(undefined);
    setShowEventForm(true);
  };

  const handleEditEvent = (id: number) => {
    const event = events.find(e => e.id === id);
    if (event) {
      setEditingEvent(event);
      setShowEventForm(true);
    }
  };

  const handleDeleteEvent = (id: number) => {
    if (confirm('Tem certeza que deseja deletar este evento?')) {
      setEvents(events.filter(e => e.id !== id));
      toast.success('Evento deletado com sucesso');
    }
  };

  const handleSaveEvent = (eventData: Omit<Event, 'id'> & { id?: number }) => {
    if (eventData.id) {
      // Edit existing
      setEvents(events.map(e => e.id === eventData.id ? { ...eventData, id: eventData.id } : e));
      toast.success('Evento atualizado com sucesso');
    } else {
      // Create new
      const newEvent = { ...eventData, id: Math.max(...events.map(e => e.id)) + 1 };
      setEvents([newEvent, ...events]);
      toast.success('Evento criado com sucesso');
    }
    setShowEventForm(false);
    setEditingEvent(undefined);
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
  const selectedEvent = selectedEventId ? events.find(e => e.id === selectedEventId) : null;

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
          setSelectedEventId(null);
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
            ) : selectedEvent ? (
              <EventView event={selectedEvent} onBack={handleBackToList} />
            ) : (
              <>
                {activeTab === 'inicio' && (
                  isAdminMode ? (
                    <AdminPanel 
                      postsCount={posts.length} 
                      eventsCount={events.length}
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
                {activeTab === 'eventos' && (
                  <EventsSection 
                    events={events}
                    onEventClick={handleEventClick}
                    isAdminMode={isAdminMode}
                    onNewEvent={handleNewEvent}
                    onEditEvent={handleEditEvent}
                    onDeleteEvent={handleDeleteEvent}
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
              O conteúdo do Barbacena.wiki é disponibilizado sob a licença Creative Commons Attribution
            </p>
            <p className="opacity-70">© 2025 Barbacena.wiki | Um projeto comunitário 🌹</p>
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

      {showEventForm && (
        <EventForm
          event={editingEvent}
          onSave={handleSaveEvent}
          onCancel={() => {
            setShowEventForm(false);
            setEditingEvent(undefined);
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
    </div>
  );
}
