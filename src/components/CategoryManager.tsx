import { useState } from 'react';
import { X, Plus, Tag, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface CategoryManagerProps {
  categories: string[];
  postsCount?: { [key: string]: number };
  onAddCategory: (category: string) => void;
  onDeleteCategory: (category: string) => void;
  onClose: () => void;
}

export function CategoryManager({ categories, postsCount = {}, onAddCategory, onDeleteCategory, onClose }: CategoryManagerProps) {
  const [newCategory, setNewCategory] = useState('');

  const handleAdd = () => {
    const trimmed = newCategory.trim();
    
    if (!trimmed) {
      return;
    }
    
    // Check for duplicates (case-insensitive)
    const duplicate = categories.find(c => c.toLowerCase() === trimmed.toLowerCase());
    
    if (duplicate) {
      alert(`A categoria "${duplicate}" já existe!`);
      return;
    }
    
    onAddCategory(trimmed);
    setNewCategory('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="card-gradient rounded-2xl border border-white/10 shadow-2xl max-w-lg w-full">
        <div className="bg-black/60 backdrop-blur-xl border-b border-white/10 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Tag className="h-5 w-5 text-white" />
            <h2 className="text-white text-xl">Gerenciar Categorias</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Add New Category */}
          <div className="space-y-3">
            <Label className="text-gray-300 text-sm">Nova Categoria</Label>
            <div className="flex gap-2">
              <Input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite o nome da categoria"
                className="bg-black/40 border-white/10 text-white placeholder:text-gray-500"
              />
              <Button
                onClick={handleAdd}
                disabled={!newCategory.trim()}
                className="bg-green-500 hover:bg-green-600 text-white gap-2 shrink-0"
              >
                <Plus className="h-4 w-4" />
                Adicionar
              </Button>
            </div>
          </div>

          {/* Categories List */}
          <div className="space-y-3">
            <Label className="text-gray-300 text-sm">Categorias Existentes ({categories.length})</Label>
            <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar">
              {categories.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <Tag className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm mb-1">Nenhuma categoria cadastrada</p>
                  <p className="text-gray-600 text-xs">Adicione sua primeira categoria acima</p>
                </div>
              ) : (
                categories.map((category) => {
                  const count = postsCount[category] || 0;
                  const canDelete = count === 0;
                  
                  return (
                    <div
                      key={category}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Tag className="h-4 w-4 text-gray-400" />
                        <span className="text-white">{category}</span>
                        <span className="text-xs text-gray-500 bg-black/30 px-2 py-0.5 rounded-full">
                          {count} {count === 1 ? 'post' : 'posts'}
                        </span>
                      </div>
                      <button
                        onClick={() => onDeleteCategory(category)}
                        className={`p-2 rounded-lg transition-all ${
                          canDelete 
                            ? 'opacity-0 group-hover:opacity-100 hover:bg-red-500/20' 
                            : 'opacity-50 cursor-not-allowed'
                        }`}
                        title={canDelete ? 'Deletar categoria' : 'Categoria em uso'}
                      >
                        <Trash2 className={`h-4 w-4 ${canDelete ? 'text-red-400' : 'text-gray-600'}`} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full border-white/10 text-gray-300 hover:bg-white/5"
            >
              Fechar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
