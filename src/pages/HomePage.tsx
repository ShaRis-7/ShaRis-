import { useState } from 'react';
import { useServices } from '../hooks/useServices';
import ServiceCard from '../components/ServiceCard';
import ViewToggle from '../components/ViewToggle';
import type { ViewMode } from '../types';

export default function HomePage() {
  const { services, loading, error } = useServices();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Hero */}
      <section className="text-center mb-10 sm:mb-14 animate-fade-in">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/30 mb-5">
          <span className="text-3xl font-serif font-bold text-brown">S</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-brown mb-3">歡迎來到這個溫暖的空間</h2>
        <p className="text-sm sm:text-base text-brown/50 max-w-md mx-auto leading-relaxed mb-6">
          我是 Sharis，這裡是一個安全、溫柔的空間。<br/>
          不論你帶著什麼樣的心情來到這裡，<br/>
          我都會用心陪伴你。
        </p>
        <div className="flex items-center justify-center gap-3">
          <a href="https://www.facebook.com/choosesharissincerely" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent/20 text-sm text-brown/60 hover:bg-accent/40 hover:text-brown transition-all">
            Facebook
          </a>
          <a href="https://www.instagram.com/choosesharissincerely" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent/20 text-sm text-brown/60 hover:bg-accent/40 hover:text-brown transition-all">
            Instagram
          </a>
        </div>
      </section>

      {/* Services */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h3 className="section-title">選擇服務</h3>
          <ViewToggle mode={viewMode} onChange={setViewMode}/>
        </div>
        {loading && <div className="text-center py-16 text-brown/40 text-sm">載入服務中…</div>}
        {error && <div className="bg-red-50 border border-red-100 rounded-2xl p-5 text-center text-sm text-red-500">無法載入服務列表，請稍後重新整理頁面。</div>}
        {!loading && !error && services.length === 0 && <div className="text-center py-16 text-brown/40 text-sm">目前沒有開放的服務，請稍後再來看看。</div>}
        {!loading && !error && services.length > 0 && (
          <div className={viewMode==='grid' ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'flex flex-col gap-3'}>
            {services.map((svc, i) => (
              <div key={svc.id} className="animate-slide-up" style={{animationDelay:`${i*100}ms`}}>
                <ServiceCard service={svc} viewMode={viewMode}/>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
