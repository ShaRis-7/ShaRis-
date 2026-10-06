import type { Service } from '../types';

export default function ServiceDetail({ service, onContinue }: { service: Service; onContinue: () => void }) {
  const price = new Intl.NumberFormat('zh-TW', { style: 'currency', currency: 'TWD', minimumFractionDigits: 0 }).format(service.price_ntd);
  const hours = Math.floor(service.duration_minutes / 60);
  const dur = hours > 0 ? `${hours} 小時` : `${service.duration_minutes} 分鐘`;
  const emoji = service.name.includes('面對面') ? '🤝' : '🍽️';
  const sections = getSections(service);

  return (
    <div className="animate-fade-in space-y-6">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/30 mx-auto"><span className="text-3xl">{emoji}</span></div>
        <h2 className="font-serif text-2xl font-semibold text-brown">{service.name}</h2>
        <div className="flex items-center justify-center gap-3 text-sm text-brown/50">
          <span>🕐 {dur}</span><span className="text-brown/20">|</span><span>{price}</span>
        </div>
      </div>
      <div className="space-y-4">
        {sections.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl border border-accent/20 p-5 shadow-soft">
            <h3 className="font-serif text-base font-semibold text-brown mb-3">{s.icon && <span className="mr-2">{s.icon}</span>}{s.title}</h3>
            <div className="text-sm text-brown/70 leading-relaxed whitespace-pre-line">{s.content}</div>
          </div>
        ))}
      </div>
      <button onClick={onContinue} className="btn-primary w-full text-base">選擇日期與時間</button>
    </div>
  );
}

function getSections(svc: Service) {
  const d = svc.details;
  if (d && typeof d === 'object' && Object.keys(d).length > 0) {
    const out: {icon?:string;title:string;content:string}[] = [];
    if (d.about) out.push({icon:'🌿',title:'關於這個空間',content:d.about});
    if (d.what_you_can) out.push({icon:'💛',title:'在這裡你可以',content:d.what_you_can});
    if (d.how_it_works) out.push({icon:'🕊️',title:'我們會怎麼進行',content:d.how_it_works});
    out.push({icon:'⏰',title:'時間與費用',content:`每次 ${svc.duration_minutes} 分鐘\n費用：NT$${new Intl.NumberFormat('zh-TW').format(svc.price_ntd)}`});
    if (d.important_note) out.push({icon:'📝',title:'一件重要的事',content:d.important_note});
    if (d.form_url) out.push({icon:'📋',title:'預約前請先填寫',content:`請先閱讀並填寫以下表單：\n${d.form_url}`});
    if (out.length > 0) return out;
  }
  const isFace = svc.name.includes('面對面');
  return [
    {icon:'🌿',title:'關於這個空間',content:isFace?'這是一個安靜、溫暖的空間，專屬於你。\n在這裡，沒有評價、沒有建議，只有真誠的傾聽與陪伴。':'在一頓飯的時間裡，讓故事自然流動。\n不只是吃飯，更是一段被好好陪伴的時光。'},
    {icon:'💛',title:'在這裡你可以',content:'• 說出那些藏在心裡很久的話\n• 釐清自己的情緒與想法\n• 在安全的空間裡感受被理解\n• 找到面對生活的力量與方向'},
    {icon:'🕊️',title:'我們會怎麼進行',content:isFace?'我會用心聆聽你的分享，不做評價。\n透過溫柔的對話，陪你一起整理思緒。':'我們會一起在舒適的餐廳用餐。\n邊吃邊聊，讓對話自然流動。'},
    {icon:'⏰',title:'時間與費用',content:`每次 ${svc.duration_minutes} 分鐘\n費用：NT$${new Intl.NumberFormat('zh-TW').format(svc.price_ntd)}`},
    {icon:'📝',title:'一件重要的事',content:'這不是心理治療或諮商，而是一段人與人之間真實的陪伴。\n如果你正經歷嚴重的心理困擾，建議優先尋求專業醫療協助。'},
  ];
}
