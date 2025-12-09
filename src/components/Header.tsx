import { User, Shield, ShieldOff } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  onNavigate: (tab: string) => void;
  activeTab: string;
  isAdminMode: boolean;
  onToggleAdmin: () => void;
}

export function Header({ onNavigate, activeTab, isAdminMode, onToggleAdmin }: HeaderProps) {
  return (
    <header className="glass-effect border-b border-white/10 sticky top-0 z-50 shadow-2xl">
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white to-gray-300 flex items-center justify-center shadow-lg">
              <span className="text-xl font-[Aboreto] font-normal">🌹</span>
            </div>
            <h1 
              className="text-3xl text-white tracking-wide transform -rotate-1 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)]" 
              style={{ 
                fontFamily: '"Quicksand", "Nunito", "Comfortaa", "Varela Round", system-ui, sans-serif',
                fontWeight: '900',
                letterSpacing: '0.02em',
                textShadow: '3px 3px 0px rgba(0,0,0,0.3), -1px -1px 0px rgba(255,255,255,0.1)'
              }}
            >
              Barbacena.wiki
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-2">
            <button
              onClick={() => onNavigate('inicio')}
              className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                activeTab === 'inicio' 
                  ? 'bg-white/10 text-white backdrop-blur-sm' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Início
            </button>
            <button
              onClick={() => onNavigate('posts')}
              className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                activeTab === 'posts' 
                  ? 'bg-white/10 text-white backdrop-blur-sm' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Posts
            </button>
            <button
              onClick={() => onNavigate('wikipedia')}
              className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                activeTab === 'wikipedia' 
                  ? 'bg-white/10 text-white backdrop-blur-sm' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Wikipédia
            </button>
            <button
              onClick={() => onNavigate('sobre')}
              className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                activeTab === 'sobre' 
                  ? 'bg-white/10 text-white backdrop-blur-sm' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Sobre
            </button>
            
            <div className="h-6 w-px bg-white/10 mx-2"></div>
            
            <Button 
              onClick={onToggleAdmin}
              variant="ghost" 
              size="sm"
              className={`gap-2 transition-all duration-300 ${
                isAdminMode 
                  ? 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 border border-orange-500/30' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {isAdminMode ? (
                <>
                  <Shield className="h-4 w-4" />
                  <span className="text-xs">Admin</span>
                </>
              ) : (
                <>
                  <ShieldOff className="h-4 w-4" />
                  <span className="text-xs">Modo Admin</span>
                </>
              )}
            </Button>
            
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-lg">
              <User className="h-5 w-5" />
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}