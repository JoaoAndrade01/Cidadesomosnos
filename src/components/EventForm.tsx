import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Event } from '../data/events';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EventFormProps {
  event?: Event;
  onSave: (event: Omit<Event, 'id'> & { id?: number }) => void;
  onCancel: () => void;
}

export function EventForm({ event, onSave, onCancel }: EventFormProps) {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    image: event?.image || '',
    date: event?.date || '',
    fullDate: event?.fullDate || '',
    time: event?.time || '',
    location: event?.location || '',
    category: event?.category || '',
    organizer: event?.organizer || '',
    price: event?.price || '',
    description: event?.description || '',
    fullDescriptionParagraphs: event?.fullDescription.join('\n\n') || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSave({
      id: event?.id,
      title: formData.title,
      image: formData.image,
      date: formData.date,
      fullDate: formData.fullDate,
      time: formData.time,
      location: formData.location,
      category: formData.category,
      organizer: formData.organizer,
      price: formData.price,
      description: formData.description,
      fullDescription: formData.fullDescriptionParagraphs.split('\n\n').filter(p => p.trim())
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="card-gradient rounded-2xl border border-white/10 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-black/60 backdrop-blur-xl border-b border-white/10 p-6 flex items-center justify-between">
          <h2 className="text-white text-xl">
            {event ? 'Editar Evento' : 'Novo Evento'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-300 text-sm">Título do Evento</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Digite o título do evento"
              required
              className="bg-black/40 border-white/10 text-white placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="text-gray-300 text-sm">URL da Imagem</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://exemplo.com/imagem.jpg ou https://imgur.com/xxxxx"
              required
              className="bg-black/40 border-white/10 text-white placeholder:text-gray-500"
            />
            <p className="text-xs text-gray-500">
              💡 Aceita URLs do Imgur, Unsplash e outros serviços de imagem
            </p>
            {formData.image && (
              <div className="mt-3 rounded-lg overflow-hidden border border-white/10">
                <p className="text-xs text-gray-400 px-3 py-2 bg-black/40">Prévia:</p>
                <div className="aspect-video bg-black/20">
                  <ImageWithFallback 
                    src={formData.image} 
                    alt="Prévia" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-gray-300 text-sm">Data (resumida)</Label>
              <Input
                id="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                placeholder="Ex: 15 de maio"
                required
                className="bg-black/40 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullDate" className="text-gray-300 text-sm">Data Completa</Label>
              <Input
                id="fullDate"
                value={formData.fullDate}
                onChange={(e) => setFormData({ ...formData, fullDate: e.target.value })}
                placeholder="Ex: 15 de maio de 2025"
                required
                className="bg-black/40 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="time" className="text-gray-300 text-sm">Horário</Label>
              <Input
                id="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                placeholder="Ex: 19h às 23h"
                required
                className="bg-black/40 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-gray-300 text-sm">Categoria</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Ex: Música, Cultura..."
                required
                className="bg-black/40 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-gray-300 text-sm">Local</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Ex: Centro Cultural de Barbacena"
              required
              className="bg-black/40 border-white/10 text-white placeholder:text-gray-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="organizer" className="text-gray-300 text-sm">Organizador</Label>
              <Input
                id="organizer"
                value={formData.organizer}
                onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                placeholder="Ex: Prefeitura Municipal"
                required
                className="bg-black/40 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="text-gray-300 text-sm">Preço</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="Ex: Gratuito, R$ 30..."
                required
                className="bg-black/40 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-300 text-sm">Descrição Curta</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Breve descrição do evento..."
              required
              rows={2}
              className="bg-black/40 border-white/10 text-white placeholder:text-gray-500 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullDescription" className="text-gray-300 text-sm">
              Descrição Completa (separe parágrafos com linha em branco)
            </Label>
            <Textarea
              id="fullDescription"
              value={formData.fullDescriptionParagraphs}
              onChange={(e) => setFormData({ ...formData, fullDescriptionParagraphs: e.target.value })}
              placeholder="Descrição detalhada do evento..."
              required
              rows={8}
              className="bg-black/40 border-white/10 text-white placeholder:text-gray-500 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-white text-black hover:bg-gray-200"
            >
              {event ? 'Salvar Alterações' : 'Publicar Evento'}
            </Button>
            <Button
              type="button"
              onClick={onCancel}
              variant="outline"
              className="border-white/10 text-gray-300 hover:bg-white/5"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
