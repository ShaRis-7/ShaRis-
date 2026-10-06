import type { AvailableSlot } from '../types';

export default function TimeSlotPicker({ date, slots, selected, onSelect }:
  { date:string; slots:AvailableSlot[]; selected:AvailableSlot|null; onSelect:(s:AvailableSlot)=>void }) {
  const d = new Date(date+'T00:00:00');
  const wd = ['日','一','二','三','四','五','六'];
  const label = `${d.getMonth()+1} 月 ${d.getDate()} 日（${wd[d.getDay()]}）`;

  return (
    <div className="animate-fade-in">
      <p className="text-sm text-brown/50 mb-1">你選擇了</p>
      <h3 className="font-serif text-lg font-semibold text-brown mb-4">{label}</h3>
      <p className="text-sm text-brown/50 mb-3">請選擇一個時間：</p>
      <div className="grid grid-cols-2 gap-3">
        {slots.map(s => (
          <button key={s.id} onClick={() => onSelect(s)}
            className={`p-4 rounded-xl border text-left transition-all ${selected?.id===s.id ? 'border-brown bg-brown/5 shadow-soft' : 'border-accent/30 hover:border-accent hover:bg-accent/5'}`}>
            <span className="block text-lg font-semibold text-brown">{s.start_time.slice(0,5)}</span>
            <span className="text-xs text-brown/40">{s.start_time.slice(0,5)} – {s.end_time.slice(0,5)}</span>
          </button>
        ))}
      </div>
      {slots.length === 0 && <p className="text-center text-brown/40 py-8">此日期沒有可用時段</p>}
    </div>
  );
}
