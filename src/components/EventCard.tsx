import { ImageWithFallback } from './figma/ImageWithFallback';
import { Calendar, MapPin, Clock, Tag, Pencil, Trash2 } from 'lucide-react';
import { Event } from '../data/events';

interface EventCardProps {
  event: Event;
  onClick: (id: number) => void;
  isAdminMode?: boolean;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export function EventCard({ event, onClick, isAdminMode, onEdit, onDelete }: EventCardProps) {
  return (
    <div
      onClick={() => onClick(event.id)}
      className="card-gradient rounded-xl overflow-hidden border border-white/5 hover-lift cursor-pointer group shadow-xl"
    >
      <div className="aspect-video overflow-hidden relative">
        <ImageWithFallback
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-full text-xs text-white border border-white/20">
            {event.category}
          </span>
        </div>
        
        {isAdminMode && (
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(event.id);
              }}
              className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors shadow-lg"
              title="Editar evento"
            >
              <Pencil className="h-4 w-4 text-white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(event.id);
              }}
              className="p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors shadow-lg"
              title="Deletar evento"
            >
              <Trash2 className="h-4 w-4 text-white" />
            </button>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-white mb-3 group-hover:text-gray-100 transition-colors leading-tight">
          {event.title}
        </h3>
        
        <p className="text-gray-300 mb-4 text-sm opacity-90 leading-relaxed line-clamp-2">
          {event.description}
        </p>
        
        <div className="space-y-2 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-gray-500" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-gray-500" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-gray-500" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Tag className="h-3.5 w-3.5 text-gray-500" />
            <span className="text-green-400">{event.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
