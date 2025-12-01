import { EventCard } from './EventCard';
import { Event } from '../data/events';
import { Calendar, Plus, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';

interface EventsSectionProps {
  events: Event[];
  onEventClick: (id: number) => void;
  isAdminMode?: boolean;
  onNewEvent?: () => void;
  onEditEvent?: (id: number) => void;
  onDeleteEvent?: (id: number) => void;
}

export function EventsSection({ events, onEventClick, isAdminMode, onNewEvent, onEditEvent, onDeleteEvent }: EventsSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Apply search filter
  let filteredEvents = events;
  if (searchQuery.trim()) {
    filteredEvents = events.filter(event => 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
        <Input 
          placeholder="Pesquisar eventos..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 pr-4 h-14 bg-black/40 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus:border-white/20 transition-all"
        />
      </div>

      {/* Header */}
      <div className="card-gradient rounded-xl p-5 border border-white/10 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Calendar className="h-6 w-6 text-white" />
            <h2 className="text-white text-xl">Eventos em Barbacena</h2>
          </div>
          {isAdminMode && (
            <Button
              onClick={onNewEvent}
              className="bg-green-500 hover:bg-green-600 text-white gap-2"
              size="sm"
            >
              <Plus className="h-4 w-4" />
              Novo Evento
            </Button>
          )}
        </div>
        <p className="text-gray-400 text-sm opacity-90">
          Fique por dentro de tudo que vai rolar na cidade! Shows, festivais, esportes, cultura e muito mais.
        </p>
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredEvents.map((event) => (
          <EventCard 
            key={event.id} 
            event={event} 
            onClick={onEventClick}
            isAdminMode={isAdminMode}
            onEdit={onEditEvent}
            onDelete={onDeleteEvent}
          />
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-16 text-gray-400 bg-white/5 rounded-2xl border border-white/5">
          {searchQuery ? 'Nenhum evento encontrado com essa pesquisa.' : 'Nenhum evento encontrado.'}
        </div>
      )}
    </div>
  );
}