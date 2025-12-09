import { useState, useEffect } from 'react';
import { X, Eye, Code, Save, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { WikiArticle } from '../data/wikipedia';

interface WikiEditorProps {
  article?: WikiArticle;
  onSave: (articleData: Omit<WikiArticle, 'id'> & { id?: number }) => void;
  onCancel: () => void;
}

// Simple WikiText parser (same as WikiArticleView)
function parseWikiText(wikitext: string): string {
  let html = wikitext;
  
  html = html.replace(/====\s*(.+?)\s*====/g, '<h4 class="text-white mt-6 mb-3">$1</h4>');
  html = html.replace(/===\s*(.+?)\s*===/g, '<h3 class="text-white mt-8 mb-4">$1</h3>');
  html = html.replace(/==\s*(.+?)\s*==/g, '<h2 class="text-white mt-10 mb-4">$1</h2>');
  html = html.replace(/'''(.+?)'''/g, '<strong class="text-white">$1</strong>');
  html = html.replace(/''(.+?)''/g, '<em class="text-gray-300">$1</em>');
  html = html.replace(/\[\[(.+?)\]\]/g, '<a href="#" class="text-blue-400 hover:text-blue-300 underline">$1</a>');
  html = html.replace(/^\*\s+(.+)$/gm, '<li class="text-gray-300 ml-6">$1</li>');
  html = html.replace(/(<li.*<\/li>)/s, '<ul class="list-disc my-4 space-y-2">$1</ul>');
  html = html.replace(/^#\s+(.+)$/gm, '<li class="text-gray-300 ml-6">$1</li>');
  html = html.replace(/(<li.*<\/li>)/s, '<ol class="list-decimal my-4 space-y-2">$1</ol>');
  
  html = html.split('\n\n').map(para => {
    if (para.trim() && !para.match(/^<[h|u|o]/)) {
      return `<p class="text-gray-300 leading-relaxed mb-4">${para}</p>`;
    }
    return para;
  }).join('\n');
  
  return html;
}

export function WikiEditor({ article, onSave, onCancel }: WikiEditorProps) {
  const [title, setTitle] = useState(article?.title || '');
  const [wikitext, setWikitext] = useState(article?.wikitext || '');
  const [showPreview, setShowPreview] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !wikitext.trim()) {
      alert('Por favor, preencha o título e o conteúdo');
      return;
    }

    const now = new Date().toISOString().split('T')[0];
    
    onSave({
      id: article?.id,
      title: title.trim(),
      wikitext: wikitext.trim(),
      createdAt: article?.createdAt || now,
      updatedAt: now
    });
  };

  const renderedContent = parseWikiText(wikitext);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <form onSubmit={handleSubmit} className="glass-effect rounded-2xl border border-white/10 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-white/10 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-white mb-1">
                    {article ? '✏️ Editar Publicação' : '📝 Nova Publicação'}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Escreva o artigo usando a linguagem WikiTexto
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={onCancel}
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Título do Artigo</label>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: História de Barbacena"
                  className="bg-black/40 border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500/50"
                  required
                />
              </div>

              {/* Toggle Buttons */}
              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={() => setShowPreview(false)}
                  variant={!showPreview ? "default" : "outline"}
                  size="sm"
                  className={!showPreview ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  <Code className="mr-2 h-4 w-4" />
                  Editor
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowPreview(true)}
                  variant={showPreview ? "default" : "outline"}
                  size="sm"
                  className={showPreview ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Prévia
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowHelp(!showHelp)}
                  variant="outline"
                  size="sm"
                  className="ml-auto"
                >
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Ajuda
                </Button>
              </div>

              {/* Help Section */}
              {showHelp && (
                <div className="glass-effect rounded-xl p-4 border border-blue-500/20 bg-blue-500/5 space-y-3">
                  <h3 className="text-white text-sm">📚 Guia Rápido de WikiTexto</h3>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <code className="block bg-black/40 p-2 rounded text-blue-300 mb-1">
                        '''Texto em negrito'''
                      </code>
                      <p className="text-gray-400 text-xs">Negrito</p>
                    </div>
                    <div>
                      <code className="block bg-black/40 p-2 rounded text-blue-300 mb-1">
                        ''Texto em itálico''
                      </code>
                      <p className="text-gray-400 text-xs">Itálico</p>
                    </div>
                    <div>
                      <code className="block bg-black/40 p-2 rounded text-blue-300 mb-1">
                        == Título ==
                      </code>
                      <p className="text-gray-400 text-xs">Título de seção</p>
                    </div>
                    <div>
                      <code className="block bg-black/40 p-2 rounded text-blue-300 mb-1">
                        === Subtítulo ===
                      </code>
                      <p className="text-gray-400 text-xs">Subtítulo</p>
                    </div>
                    <div>
                      <code className="block bg-black/40 p-2 rounded text-blue-300 mb-1">
                        * Item de lista
                      </code>
                      <p className="text-gray-400 text-xs">Lista com marcadores</p>
                    </div>
                    <div>
                      <code className="block bg-black/40 p-2 rounded text-blue-300 mb-1">
                        # Item numerado
                      </code>
                      <p className="text-gray-400 text-xs">Lista numerada</p>
                    </div>
                    <div className="md:col-span-2">
                      <code className="block bg-black/40 p-2 rounded text-blue-300 mb-1">
                        [[Link para outro artigo]]
                      </code>
                      <p className="text-gray-400 text-xs">Link interno</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Editor / Preview */}
              {!showPreview ? (
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Conteúdo em WikiTexto</label>
                  <Textarea
                    value={wikitext}
                    onChange={(e) => setWikitext(e.target.value)}
                    placeholder="Digite o conteúdo do artigo usando WikiTexto...&#10;&#10;Exemplo:&#10;== Introdução ==&#10;'''Barbacena''' é uma cidade...&#10;&#10;== História ==&#10;A cidade foi fundada em 1791..."
                    className="bg-black/40 border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500/50 font-mono min-h-[400px]"
                    required
                  />
                  <p className="text-gray-500 text-xs mt-2">
                    {wikitext.length} caracteres
                  </p>
                </div>
              ) : (
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Prévia do Artigo</label>
                  <div className="glass-effect rounded-xl p-6 border border-white/10 min-h-[400px]">
                    {wikitext ? (
                      <div 
                        className="prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: renderedContent }}
                      />
                    ) : (
                      <p className="text-gray-500 text-center py-20">
                        Digite o conteúdo no editor para ver a prévia
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-black/20 flex justify-end gap-3">
              <Button
                type="button"
                onClick={onCancel}
                variant="outline"
                className="border-white/10 text-gray-400 hover:text-white hover:bg-white/5"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
              >
                <Save className="mr-2 h-4 w-4" />
                {article ? 'Atualizar Publicação' : 'Criar Publicação'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
