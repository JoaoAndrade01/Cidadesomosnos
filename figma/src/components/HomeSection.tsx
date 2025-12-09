import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Post } from './PostView';
import { useState, useEffect } from 'react';

interface HomeSectionProps {
  posts: Post[];
  onPostClick: (id: number) => void;
}

export function HomeSection({ posts, onPostClick }: HomeSectionProps) {
  // Get featured posts - use first 3 posts if available
  const featuredPosts = posts.slice(0, 3);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (featuredPosts.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
    }
  };

  const prevSlide = () => {
    if (featuredPosts.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length);
    }
  };

  // Auto-advance carousel every 6 seconds
  useEffect(() => {
    if (featuredPosts.length <= 1) return; // Don't auto-advance if only one post
    
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [featuredPosts.length, currentSlide]);

  const currentPost = featuredPosts[currentSlide];
  
  if (!currentPost) {
    return (
      <div className="text-center py-16 text-gray-400">
        Nenhum post disponível no momento.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl p-6 text-center border border-white/10 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#151515] to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]"></div>
        <div className="relative z-10">
          <h2 className="text-white text-2xl mb-3 tracking-tight" style={{ fontFamily: 'cursive' }}>
            Um cantinho nosso na web!
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-4 leading-relaxed opacity-90 text-sm">
            Fala, gente! O Barbacena.wiki é a nossa parada de registro pra tudo que rola na cidade. 
            Quer saber de evento enquanto bapeia, descobrir os últimos acontecimentos ou descobrir 
            um lugar novo pra comer? Aqui é o lugar! Bora criar um espaço feito nos, para nós. Chega mais 
            e explora!
          </p>
          <button className="text-gray-300 hover:text-white transition-all inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm text-sm">
            Saiba mais →
          </button>
        </div>
      </div>

      {/* Featured Post Carousel */}
      <div className="card-gradient rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
        <div 
          key={currentPost.id}
          onClick={() => onPostClick(currentPost.id)}
          className="cursor-pointer group animate-in fade-in duration-700"
        >
          <div className="aspect-[21/9] overflow-hidden relative">
            <ImageWithFallback 
              src={currentPost.image}
              alt={currentPost.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          </div>
          <div className="p-5">
            <div className="inline-block px-2.5 py-0.5 bg-white/10 backdrop-blur-sm rounded-full text-xs text-gray-300 mb-2 border border-white/10">
              POST EM DESTAQUE
            </div>
            <h3 className="text-white text-xl mb-2 group-hover:text-gray-100 transition-colors leading-tight">
              {currentPost.title}
            </h3>
            <p className="text-gray-300 mb-3 leading-relaxed opacity-90 text-sm line-clamp-2">
              {currentPost.content[0]}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                {currentPost.author}
              </span>
              <span>•</span>
              <span>{currentPost.date}</span>
            </div>
            
            {/* Navigation controls */}
            <div className="flex items-center justify-center gap-3 mt-5 pt-4 border-t border-white/5">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                className="p-2 hover:bg-white/10 rounded-lg transition-all backdrop-blur-sm border border-white/5"
              >
                <ChevronLeft className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
              </button>
              <div className="flex gap-2">
                {featuredPosts.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentSlide(index);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      index === currentSlide ? 'bg-white w-8' : 'bg-gray-600 hover:bg-gray-500 w-2'
                    }`}
                  />
                ))}
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                className="p-2 hover:bg-white/10 rounded-lg transition-all backdrop-blur-sm border border-white/5"
              >
                <ChevronRight className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}