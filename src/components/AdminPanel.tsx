import { BarChart3, FileText, Calendar, TrendingUp, Tag } from 'lucide-react';
import { Button } from './ui/button';

interface AdminPanelProps {
  postsCount: number;
  eventsCount: number;
  categoriesCount?: number;
  onManageCategories?: () => void;
}

export function AdminPanel({ postsCount, eventsCount, categoriesCount = 0, onManageCategories }: AdminPanelProps) {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="card-gradient rounded-xl p-6 border border-white/10 shadow-xl">
        <h2 className="text-white text-xl mb-2">Painel do Administrador</h2>
        <p className="text-gray-400 text-sm">
          Gerencie posts, eventos e conteúdo do Barbacena.wiki
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-gradient rounded-xl p-5 border border-white/10 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <FileText className="h-8 w-8 text-blue-400" />
            <span className="text-xs text-gray-500">Total</span>
          </div>
          <div className="text-2xl text-white mb-1">{postsCount}</div>
          <div className="text-xs text-gray-400">Posts Publicados</div>
        </div>

        <div className="card-gradient rounded-xl p-5 border border-white/10 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <Calendar className="h-8 w-8 text-green-400" />
            <span className="text-xs text-gray-500">Total</span>
          </div>
          <div className="text-2xl text-white mb-1">{eventsCount}</div>
          <div className="text-xs text-gray-400">Eventos Cadastrados</div>
        </div>

        <div 
          className="card-gradient rounded-xl p-5 border border-white/10 shadow-xl hover:border-purple-500/30 transition-all cursor-pointer group" 
          onClick={onManageCategories}
        >
          <div className="flex items-center justify-between mb-3">
            <Tag className="h-8 w-8 text-purple-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs text-gray-500 group-hover:text-purple-400 transition-colors">Gerenciar</span>
          </div>
          <div className="text-2xl text-white mb-1">{categoriesCount}</div>
          <div className="text-xs text-gray-400 group-hover:text-purple-300 transition-colors">Categorias</div>
        </div>

        <div className="card-gradient rounded-xl p-5 border border-white/10 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <BarChart3 className="h-8 w-8 text-orange-400" />
            <span className="text-xs text-gray-500">Este mês</span>
          </div>
          <div className="text-2xl text-white mb-1">12.4k</div>
          <div className="text-xs text-gray-400">Visualizações</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card-gradient rounded-xl p-6 border border-white/10 shadow-xl">
        <h3 className="text-white mb-4">Ações Rápidas</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
            <span className="text-gray-300">Posts aguardando moderação</span>
            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">0</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
            <span className="text-gray-300">Eventos próximos (7 dias)</span>
            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">3</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
            <span className="text-gray-300">Comentários para revisar</span>
            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
