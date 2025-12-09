import { Plus, BookOpen, Edit, Trash2, Search } from 'lucide-react';
import { Button } from './ui/button';
import { WikiArticle } from '../data/wikipedia';
import { useState } from 'react';
import { Input } from './ui/input';

interface WikipediaSectionProps {
  articles: WikiArticle[];
  onArticleClick: (id: number) => void;
  isAdminMode: boolean;
  onNewArticle: () => void;
  onEditArticle: (id: number) => void;
  onDeleteArticle: (id: number) => void;
}

export function WikipediaSection({ 
  articles, 
  onArticleClick,
  isAdminMode,
  onNewArticle,
  onEditArticle,
  onDeleteArticle
}: WikipediaSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="glass-effect rounded-2xl p-8 border border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-white mb-2">📚 Wikipédia Barbacena</h2>
            <p className="text-gray-400">
              Artigos enciclopédicos sobre Barbacena em formato WikiTexto
            </p>
          </div>
          
          {isAdminMode && (
            <Button 
              onClick={onNewArticle}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-blue-500/40 hover:scale-105"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nova Publicação
            </Button>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="glass-effect rounded-2xl p-6 border border-white/10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          <Input
            type="text"
            placeholder="Buscar artigos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-black/40 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid gap-4">
        {filteredArticles.length === 0 ? (
          <div className="glass-effect rounded-2xl p-12 text-center border border-white/10">
            <BookOpen className="mx-auto h-16 w-16 text-gray-600 mb-4" />
            <p className="text-gray-400">
              {searchTerm ? 'Nenhum artigo encontrado' : 'Nenhum artigo publicado ainda'}
            </p>
          </div>
        ) : (
          filteredArticles.map((article) => (
            <div
              key={article.id}
              className="glass-effect rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300 group cursor-pointer"
              onClick={() => !isAdminMode && onArticleClick(article.id)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20 group-hover:border-blue-500/40 transition-colors">
                      <BookOpen className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white mb-1 group-hover:text-blue-400 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Criado em {new Date(article.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  
                  {/* Preview of wikitext */}
                  <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                    <p className="text-gray-400 text-sm font-mono line-clamp-2">
                      {article.wikitext.substring(0, 150)}...
                    </p>
                  </div>
                </div>

                {isAdminMode && (
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditArticle(article.id);
                      }}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-blue-500/20 hover:text-blue-400 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteArticle(article.id);
                      }}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Info Box */}
      <div className="glass-effect rounded-2xl p-6 border border-blue-500/20 bg-blue-500/5">
        <p className="text-gray-400 text-sm leading-relaxed">
          <span className="text-blue-400">💡 Dica:</span> Os artigos são escritos em WikiTexto, 
          a mesma linguagem usada na Wikipédia. Use <code className="px-1.5 py-0.5 bg-black/40 rounded text-blue-300">'''negrito'''</code>, 
          <code className="px-1.5 py-0.5 bg-black/40 rounded text-blue-300">''itálico''</code>, 
          <code className="px-1.5 py-0.5 bg-black/40 rounded text-blue-300">== títulos ==</code> e 
          <code className="px-1.5 py-0.5 bg-black/40 rounded text-blue-300">* listas</code> para formatar o conteúdo.
        </p>
      </div>
    </div>
  );
}
