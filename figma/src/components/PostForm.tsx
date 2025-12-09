import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Post } from './PostView';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PostFormProps {
  post?: Post;
  categories: string[];
  onSave: (post: Omit<Post, 'id'> & { id?: number }) => void;
  onCancel: () => void;
}

export function PostForm({ post, categories, onSave, onCancel }: PostFormProps) {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    image: post?.image || '',
    author: post?.author || '',
    category: post?.category || '',
    contentParagraphs: post?.content.join('\n\n') || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category) {
      alert('Por favor, selecione uma categoria');
      return;
    }
    
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
    
    onSave({
      id: post?.id,
      title: formData.title,
      image: formData.image,
      author: formData.author,
      date: 'Agora',
      fullDate: dateStr,
      category: formData.category,
      content: formData.contentParagraphs.split('\n\n').filter(p => p.trim())
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="card-gradient rounded-2xl border border-white/10 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-black/60 backdrop-blur-xl border-b border-white/10 p-6 flex items-center justify-between">
          <h2 className="text-white text-xl">
            {post ? 'Editar Post' : 'Novo Post'}
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
            <Label htmlFor="title" className="text-gray-300 text-sm">Título</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Digite o título do post"
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
              <Label htmlFor="author" className="text-gray-300 text-sm">Autor</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                placeholder="Nome do autor"
                required
                className="bg-black/40 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-gray-300 text-sm">Categoria</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData({ ...formData, category: value })}
                disabled={categories.length === 0}
              >
                <SelectTrigger className={`bg-black/40 border-white/10 text-white ${categories.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <SelectValue placeholder={categories.length === 0 ? 'Nenhuma categoria disponível' : 'Selecione uma categoria'} />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-white/10 rounded-xl backdrop-blur-xl">
                  {categories.length === 0 ? (
                    <div className="px-3 py-2 text-sm text-gray-400">
                      Nenhuma categoria disponível
                    </div>
                  ) : (
                    categories.map((category) => (
                      <SelectItem 
                        key={category} 
                        value={category} 
                        className="text-white hover:bg-white/10 rounded-lg"
                      >
                        {category}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              {categories.length === 0 ? (
                <p className="text-xs text-orange-400">
                  ⚠️ Crie pelo menos uma categoria antes de publicar
                </p>
              ) : (
                <p className="text-xs text-gray-500">
                  Use o botão "Categorias" na lista de posts para gerenciar
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-gray-300 text-sm">
              Conteúdo (separe parágrafos com linha em branco)
            </Label>
            <Textarea
              id="content"
              value={formData.contentParagraphs}
              onChange={(e) => setFormData({ ...formData, contentParagraphs: e.target.value })}
              placeholder="Digite o conteúdo do post..."
              required
              rows={10}
              className="bg-black/40 border-white/10 text-white placeholder:text-gray-500 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-white text-black hover:bg-gray-200"
            >
              {post ? 'Salvar Alterações' : 'Publicar Post'}
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
