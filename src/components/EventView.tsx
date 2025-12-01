import { ArrowLeft, Calendar, MapPin, Clock, Tag, User } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Event } from '../data/events';

interface EventViewProps {
  event: Event;
  onBack: () => void;
}

export function EventView({ event, onBack }: EventViewProps) {
  return (
    <div className="space-y-4">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm">Voltar para eventos</span>
      </button>

      {/* Event Content */}
      <article className="card-gradient rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
        {/* Hero Image */}
        <div className="aspect-[21/9] overflow-hidden relative">
          <ImageWithFallback
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute bottom-6 left-6">
            <span className="inline-block px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-xs text-white border border-white/20 mb-3">
              {event.category}
            </span>
          </div>
        </div>

        <div className="p-6">
          {/* Title */}
          <h1 className="text-white text-2xl mb-4 leading-tight">
            {event.title}
          </h1>

          {/* Event Info Grid */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6 p-4 bg-black/30 rounded-xl border border-white/5">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Data</div>
                  <div className="text-sm text-gray-200">{event.fullDate}</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Horário</div>
                  <div className="text-sm text-gray-200">{event.time}</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Local</div>
                  <div className="text-sm text-gray-200">{event.location}</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <User className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Organização</div>
                  <div className="text-sm text-gray-200">{event.organizer}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Price Highlight */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl mb-6">
            <Tag className="h-4 w-4 text-green-400" />
            <span className="text-sm text-green-300">{event.price}</span>
          </div>

          {/* Description */}
          <div className="space-y-4 text-gray-300 leading-relaxed">
            {event.fullDescription.map((paragraph, index) => (
              <p key={index} className="text-sm opacity-90">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
