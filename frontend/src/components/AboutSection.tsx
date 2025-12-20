import { ImageWithFallback } from './figma/ImageWithFallback';

export function AboutSection() {
  return (
    <div className="space-y-6">
      <div className="card-gradient rounded-2xl p-8 border border-white/5 shadow-2xl">
        <h2 className="text-3xl text-white mb-5 tracking-tight" style={{ fontFamily: 'cursive' }}>
          Sobre o Cidade Somos Nós
        </h2>
        <p className="text-gray-300 leading-relaxed mb-4 opacity-90">
          O Cidade Somos Nós nasceu do desejo de criar um espaço colaborativo onde moradores e 
          visitantes pudessem compartilhar histórias, descobertas e experiências sobre nossa cidade.
        </p>
        <p className="text-gray-300 leading-relaxed opacity-90">
          Aqui você encontra desde notícias locais até dicas de onde comer, eventos culturais 
          e tudo que faz de Barbacena um lugar especial. É feito por quem vive e ama a cidade!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card-gradient rounded-2xl overflow-hidden border border-white/5 shadow-xl hover-lift group">
          <div className="aspect-video overflow-hidden">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1656701858200-46341576b29e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwcm9zZXMlMjBnYXJkZW58ZW58MXx8fHwxNzYyMTQyMjc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Cidade das Rosas"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
          <div className="p-5">
            <h3 className="text-white mb-2">Cidade das Rosas 🌹</h3>
            <p className="text-gray-300 text-sm leading-relaxed opacity-90">
              Barbacena é conhecida nacionalmente pela produção de rosas e flores. 
              O clima ameno da serra proporciona condições perfeitas para o cultivo.
            </p>
          </div>
        </div>

        <div className="card-gradient rounded-2xl overflow-hidden border border-white/5 shadow-xl hover-lift group">
          <div className="aspect-video overflow-hidden">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1623244493876-4a390033cae6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3JpYyUyMGNpdHklMjBicmF6aWx8ZW58MXx8fHwxNzYyMTY5MzA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="História"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
          <div className="p-5">
            <h3 className="text-white mb-2">História & Patrimônio 🏛️</h3>
            <p className="text-gray-300 text-sm leading-relaxed opacity-90">
              Fundada em 1791, a cidade preserva um rico patrimônio histórico e arquitetônico 
              do período colonial brasileiro.
            </p>
          </div>
        </div>
      </div>

      <div className="card-gradient rounded-2xl p-8 border border-white/5 shadow-2xl">
        <h3 className="text-white mb-6 text-center text-xl tracking-tight">Nossa cidade em números</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center group">
            <div className="text-3xl text-white mb-2 group-hover:scale-110 transition-transform">138 mil</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">habitantes</div>
          </div>
          <div className="text-center group">
            <div className="text-3xl text-white mb-2 group-hover:scale-110 transition-transform">1791</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">ano de fundação</div>
          </div>
          <div className="text-center group">
            <div className="text-3xl text-white mb-2 group-hover:scale-110 transition-transform">1.100m</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">de altitude</div>
          </div>
          <div className="text-center group">
            <div className="text-3xl text-white mb-2 group-hover:scale-110 transition-transform">759 km²</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">de área</div>
          </div>
        </div>
      </div>

      <div className="card-gradient rounded-2xl p-6 border border-white/5 text-center shadow-xl">
        <p className="text-gray-300 opacity-90 leading-relaxed">
          O conteúdo do Cidade Somos Nós é colaborativo e criado pela Creative Commons Attribution. 
          Compartilhe!
        </p>
        <p className="text-xs text-gray-500 mt-3">
          © 2025 Cidade Somos Nós - Um projeto comunitário ❤️
        </p>
      </div>
    </div>
  );
}