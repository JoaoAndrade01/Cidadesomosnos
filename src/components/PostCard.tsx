import { ImageWithFallback } from './figma/ImageWithFallback';
import { Pencil, Trash2 } from 'lucide-react';

interface PostCardProps {
  id: number;
  title: string;
  image: string;
  author: string;
  date: string;
  onClick?: (id: number) => void;
  isAdminMode?: boolean;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export function PostCard({ id, title, image, author, date, onClick, isAdminMode, onEdit, onDelete }: PostCardProps) {
  return (
    <div 
      onClick={() => onClick?.(id)}
      className="card-gradient rounded-2xl overflow-hidden border border-white/5 hover-lift shine-effect group cursor-pointer shadow-xl"
    >
      <div className="aspect-video overflow-hidden relative">
        <ImageWithFallback 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {isAdminMode && (
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(id);
              }}
              className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors shadow-lg"
              title="Editar post"
            >
              <Pencil className="h-4 w-4 text-white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(id);
              }}
              className="p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors shadow-lg"
              title="Deletar post"
            >
              <Trash2 className="h-4 w-4 text-white" />
            </button>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-white mb-3 group-hover:text-gray-100 transition-colors leading-snug">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
            {author}
          </span>
          <span>•</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}
