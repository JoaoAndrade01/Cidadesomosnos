import { PostCard } from './PostCard';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Post } from './PostView';
import { Plus, Settings, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface PostsSectionProps {
  posts: Post[];
  categories: string[];
  onPostClick: (id: number) => void;
  isAdminMode?: boolean;
  onNewPost?: () => void;
  onEditPost?: (id: number) => void;
  onDeletePost?: (id: number) => void;
  onManageCategories?: () => void;
}

export function PostsSection({ posts, categories, onPostClick, isAdminMode, onNewPost, onEditPost, onDeletePost, onManageCategories }: PostsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [sortBy, setSortBy] = useState("recentes");
  const [searchQuery, setSearchQuery] = useState("");

  const allCategories = ["Todos", ...categories];
  
  let filteredPosts = selectedCategory === "Todos" 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  // Apply search filter
  if (searchQuery.trim()) {
    filteredPosts = filteredPosts.filter(post => {
      const searchLower = searchQuery.toLowerCase();
      const titleMatch = post.title.toLowerCase().includes(searchLower);
      const contentMatch = post.content.join(' ').toLowerCase().includes(searchLower);
      return titleMatch || contentMatch;
    });
  }

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
        <Input 
          placeholder="Pesquisar posts..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 pr-4 h-14 bg-black/40 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus:border-white/20 transition-all"
        />
      </div>

      {/* Header with Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <h2 className="text-3xl text-white tracking-tight">Últimos Posts</h2>
        
        <div className="flex gap-3 flex-wrap items-center">
          {isAdminMode && (
            <>
              <Button
                onClick={onManageCategories}
                variant="outline"
                className="border-white/10 text-gray-300 hover:bg-white/5 gap-2"
              >
                <Settings className="h-4 w-4" />
                Categorias
              </Button>
              <Button
                onClick={onNewPost}
                className="bg-green-500 hover:bg-green-600 text-white gap-2"
              >
                <Plus className="h-4 w-4" />
                Novo Post
              </Button>
            </>
          )}
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm">
              <SelectValue placeholder="Todas as Categorias" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-white/10 rounded-xl backdrop-blur-xl">
              {allCategories.map((category) => (
                <SelectItem key={category} value={category} className="text-white hover:bg-white/10 rounded-lg">
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-white/10 rounded-xl backdrop-blur-xl">
              <SelectItem value="recentes" className="text-white hover:bg-white/10 rounded-lg">Mais Recentes</SelectItem>
              <SelectItem value="antigos" className="text-white hover:bg-white/10 rounded-lg">Mais Antigos</SelectItem>
              <SelectItem value="populares" className="text-white hover:bg-white/10 rounded-lg">Mais Populares</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPosts.map((post) => (
          <PostCard 
            key={post.id} 
            {...post} 
            onClick={onPostClick}
            isAdminMode={isAdminMode}
            onEdit={onEditPost}
            onDelete={onDeletePost}
          />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-16 text-gray-400 bg-white/5 rounded-2xl border border-white/5">
          {searchQuery ? 'Nenhum post encontrado com essa pesquisa.' : 'Nenhum post encontrado nesta categoria.'}
        </div>
      )}
    </div>
  );
}