import { Calendar, ExternalLink } from 'lucide-react';

export function Sidebar() {
  const events = [
    { day: 'AGO', date: '15', title: 'Feira de Artesanato', location: 'Parque do Alto Vera' },
    { day: 'SET', date: '07', title: 'Concerto da Independência', location: 'Parque da Liberdade' }
  ];

  const links = [
    { name: 'Prefeitura Municipal', icon: '🏛️', url: '#' },
    { name: 'Portal do Turismo', icon: '✈️', url: '#' },
    { name: 'Serviços de Saúde', icon: '🏥', url: '#' },
    { name: 'Instagram', icon: '📸', url: 'https://instagram.com' }
  ];

  return (
    <div className="space-y-4">
      {/* Eventos Locais */}
      <div className="card-gradient rounded-2xl p-4 border border-white/5 shadow-xl">
        <h3 className="text-white text-sm mb-3 flex items-center gap-1.5 opacity-90">
          <Calendar className="h-4 w-4" />
          eventos
        </h3>
        <div className="space-y-3">
          {events.map((event, index) => (
            <div key={index} className="flex gap-2 group">
              <div className="bg-black/40 rounded-lg px-2 py-1.5 text-center min-w-[45px] border border-white/5">
                <div className="text-[10px] text-gray-500 uppercase">{event.day}</div>
                <div className="text-sm text-white">{event.date}</div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white text-xs mb-0.5 truncate group-hover:text-gray-200 transition-colors">{event.title}</h4>
                <p className="text-[10px] text-gray-500 truncate">{event.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Links Úteis */}
      <div className="card-gradient rounded-2xl p-4 border border-white/5 shadow-xl">
        <h3 className="text-white text-sm mb-3 opacity-90">Links</h3>
        <div className="space-y-2">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-all text-xs group px-2 py-1.5 rounded-lg hover:bg-white/5"
            >
              <span className="text-sm">{link.icon}</span>
              <span className="truncate flex-1">{link.name}</span>
              <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
