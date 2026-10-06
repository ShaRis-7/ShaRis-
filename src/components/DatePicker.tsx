import { useMemo } from 'react';

const DAYS = ['一','二','三','四','五','六','日'];

export default function DatePicker({ year, month, selectedDate, availableDates, blockedDates, onSelectDate, onPrevMonth, onNextMonth }:
  { year:number; month:number; selectedDate:string|null; availableDates:Set<string>; blockedDates:Set<string>; onSelectDate:(d:string)=>void; onPrevMonth:()=>void; onNextMonth:()=>void }) {

  const today = new Date();
  const todayStr = fmt(today.getFullYear(), today.getMonth()+1, today.getDate());
  const canGoPrev = year > today.getFullYear() || (year === today.getFullYear() && month > today.getMonth()+1);

  const cells = useMemo(() => {
    const first = new Date(year, month-1, 1);
    const dim = new Date(year, month, 0).getDate();
    let off = first.getDay() - 1; if (off < 0) off = 6;
    const c: (number|null)[] = [];
    for (let i=0;i<off;i++) c.push(null);
    for (let d=1;d<=dim;d++) c.push(d);
    while (c.length%7) c.push(null);
    return c;
  }, [year, month]);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-5">
        <button onClick={onPrevMonth} disabled={!canGoPrev} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-accent/30 disabled:opacity-20 transition-all" aria-label="上一個月">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <h3 className="font-serif text-lg font-semibold text-brown">{year} 年 {month} 月</h3>
        <button onClick={onNextMonth} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-accent/30 transition-all" aria-label="下一個月">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map(d => <div key={d} className="text-center text-xs font-medium text-brown/40 py-1">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`e${i}`} className="w-10 h-10 mx-auto"/>;
          const ds = fmt(year, month, day);
          const isToday = ds===todayStr, isPast = ds<todayStr;
          const avail = availableDates.has(ds) && !isPast && !blockedDates.has(ds);
          const sel = ds===selectedDate;
          let cls = 'calendar-day mx-auto ';
          if (sel) cls += 'calendar-day-selected';
          else if (avail) cls += 'calendar-day-available' + (isToday?' calendar-day-today':'');
          else cls += 'calendar-day-disabled' + (isToday?' calendar-day-today':'');
          return <button key={ds} className={cls} disabled={!avail} onClick={()=>avail&&onSelectDate(ds)}>{day}</button>;
        })}
      </div>
      <div className="flex items-center justify-center gap-4 mt-4 text-xs text-brown/40">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-brown"/>已選擇</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full ring-2 ring-accent"/>今天</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-brown/10"/>無時段</span>
      </div>
    </div>
  );
}

function fmt(y:number,m:number,d:number){return `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;}
