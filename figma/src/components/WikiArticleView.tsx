import { ArrowLeft, Calendar, Edit2 } from 'lucide-react';
import { Button } from './ui/button';
import { WikiArticle } from '../data/wikipedia';

interface WikiArticleViewProps {
  article: WikiArticle;
  onBack: () => void;
}

// Simple WikiText parser
function parseWikiText(wikitext: string): string {
  let html = wikitext;
  
  // Headers (== Header ==)
  html = html.replace(/====\s*(.+?)\s*====/g, '<h4 class="text-white mt-6 mb-3">$1</h4>');
  html = html.replace(/===\s*(.+?)\s*===/g, '<h3 class="text-white mt-8 mb-4">$1</h3>');
  html = html.replace(/==\s*(.+?)\s*==/g, '<h2 class="text-white mt-10 mb-4">$1</h2>');
  
  // Bold ('''text''')
  html = html.replace(/'''(.+?)'''/g, '<strong class="text-white">$1</strong>');
  
  // Italic (''text'')
  html = html.replace(/''(.+?)''/g, '<em class="text-gray-300">$1</em>');
  
  // Links ([[Link]])
  html = html.replace(/\[\[(.+?)\]\]/g, '<a href="#" class="text-blue-400 hover:text-blue-300 underline">$1</a>');
  
  // Bulleted lists (* item)
  html = html.replace(/^\*\s+(.+)$/gm, '<li class="text-gray-300 ml-6">$1</li>');
  html = html.replace(/(<li.*<\/li>)/s, '<ul class="list-disc my-4 space-y-2">$1</ul>');
  
  // Numbered lists (# item)
  html = html.replace(/^#\s+(.+)$/gm, '<li class="text-gray-300 ml-6">$1</li>');
  html = html.replace(/(<li.*<\/li>)/s, '<ol class="list-decimal my-4 space-y-2">$1</ol>');
  
  // Paragraphs
  html = html.split('\n\n').map(para => {
    if (para.trim() && !para.match(/^<[h|u|o]/)) {
      return `<p class="text-gray-300 leading-relaxed mb-4">${para}</p>`;
    }
    return para;
  }).join('\n');
  
  return html;
}

export function WikiArticleView({ article, onBack }: WikiArticleViewProps) {
  const renderedContent = parseWikiText(article.wikitext);
  
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Back Button */}
      <Button 
        onClick={onBack}
        variant="ghost" 
        className="text-gray-400 hover:text-white hover:bg-white/5 group transition-all"
      >
        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Voltar para artigos
      </Button>

      {/* Article Header */}
      <div className="glass-effect rounded-2xl p-8 border border-white/10">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <Edit2 className="h-6 w-6 text-blue-400" />
          </div>
          <div className="flex-1">
            <h1 className="text-white mb-3">{article.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Criado em {new Date(article.createdAt).toLocaleDateString('pt-BR')}</span>
              </div>
              {article.updatedAt !== article.createdAt && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">•</span>
                  <span>Atualizado em {new Date(article.updatedAt).toLocaleDateString('pt-BR')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="glass-effect rounded-2xl p-8 border border-white/10">
        <div 
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: renderedContent }}
        />
      </div>

      {/* WikiText Source */}
      <details className="glass-effect rounded-2xl border border-white/10 overflow-hidden">
        <summary className="p-6 cursor-pointer text-white hover:bg-white/5 transition-colors">
          📝 Ver código WikiTexto
        </summary>
        <div className="p-6 pt-0">
          <pre className="bg-black/40 rounded-lg p-4 border border-white/5 overflow-x-auto">
            <code className="text-gray-300 text-sm font-mono">{article.wikitext}</code>
          </pre>
        </div>
      </details>
    </div>
  );
}
