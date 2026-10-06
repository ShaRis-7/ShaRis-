import { Link } from 'react-router-dom';
import type { Service, ViewMode } from '../types';

export default function ServiceCard({ service, viewMode }: { service: Service; viewMode: ViewMode }) {
  const isGrid = viewMode === 'grid';
  const price = new Intl.NumberFormat('zh-TW', { style: 'currency', currency: 'TWD', minimumFractionDigits: 0 }).format(service.price_ntd);
  const hours = Math.floor(service.duration_minutes / 60);
  const mins = service.duration_minutes % 60;
  const dur = hours > 0 ? `${hours} 小時${mins > 0 ? ` ${mins} 分鐘` : ''}` : `${mins} 分鐘`;
  const emoji = service.name.includes('面對面') ? '🤝' : '🍽️';

  return (
    <Link to={`/booking/${service.slug}`} className={`card group block ${isGrid ? 'p-6' : 'p-4 flex items-center gap-5'}`}>
      <div className={`flex-shrink-0 rounded-xl bg-accent/30 flex items-center justify-center ${isGrid ? 'w-14 h-14 mb-4' : 'w-12 h-12'}`}>
        <span className="text-2xl">{emoji}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className={`font-serif font-semibold text-brown group-hover:text-brown-dark transition-colors ${isGrid ? 'text-lg mb-2' : 'text-base'}`}>{service.name}</h3>
        <div className="flex flex-wrap items-center gap-x-3 text-sm text-brown/50">
          <span>🕐 {dur}</span>
          <span>💰 {price}</span>
        </div>
        {isGrid && service.description && <p className="mt-3 text-sm text-brown/50 line-clamp-2">{service.description}</p>}
      </div>
      <div className={`flex-shrink-0 ${isGrid ? 'mt-4' : ''}`}>
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent/20 text-brown/40 group-hover:bg-brown group-hover:text-cream transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
        </span>
      </div>
    </Link>
  );
}
