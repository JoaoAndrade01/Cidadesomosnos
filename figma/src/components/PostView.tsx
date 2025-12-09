import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import { Button } from './ui/button';

export interface Post {
  id: number;
  title: string;
  image: string;
  author: string;
  date: string;
  category: string;
  content: string[];
  fullDate?: string;
}

interface PostViewProps {
  post: Post;
  onBack: () => void;
}

export function PostView({ post, onBack }: PostViewProps) {
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button
        onClick={onBack}
        variant="ghost"
        className="text-white hover:text-gray-300 hover:bg-white/5 rounded-xl transition-all"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar
      </Button>

      {/* Post Header */}
      <div className="card-gradient rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
        <div className="aspect-[21/9] overflow-hidden">
          <ImageWithFallback 
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-10">
          {/* Category Badge */}
          <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white text-xs rounded-full mb-6 border border-white/10">
            {post.category}
          </div>

          {/* Title */}
          <h1 className="text-white text-5xl mb-8 tracking-tight leading-tight">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center gap-6 text-gray-400 text-sm mb-8 pb-8 border-b border-white/10">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{post.fullDate || post.date}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            {post.content.map((paragraph, index) => (
              <p key={index} className="text-gray-300 leading-relaxed mb-6 text-lg opacity-90">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Related Posts */}
      <div className="card-gradient rounded-2xl p-8 border border-white/5 shadow-xl">
        <h3 className="text-white mb-6 text-xl">Posts Relacionados</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-black/40 rounded-xl p-4 cursor-pointer hover:bg-white/10 transition-all border border-white/5 group">
              <p className="text-white text-sm mb-2 group-hover:text-gray-200 transition-colors">Post relacionado {i}</p>
              <p className="text-xs text-gray-500">Há {i} dias atrás</p>
            </div>
          ))}
        </div>
      </div>

      {/* Comments Section */}
      <div className="card-gradient rounded-2xl p-8 border border-white/5 shadow-xl text-center">
        <h3 className="text-white mb-4 text-xl">Comentários</h3>
        <p className="text-gray-400 text-sm opacity-90">
          Os comentários estão desativados neste momento. Compartilhe este post nas redes sociais!
        </p>
      </div>
    </div>
  );
}
