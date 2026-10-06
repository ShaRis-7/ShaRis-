import { Link } from 'react-router-dom';
import type { Service, AvailableSlot, BookingFormData } from '../types';

export default function BookingConfirmation({ service, slot, formData, bookingId }:
  { service:Service; slot:AvailableSlot; formData:BookingFormData; bookingId?:string }) {
  const d = new Date(slot.date+'T00:00:00');
  const wd = ['日','一','二','三','四','五','六'];
  const dateStr = `${d.getFullYear()} 年 ${d.getMonth()+1} 月 ${d.getDate()} 日（${wd[d.getDay()]}）`;

  return (
    <div className="animate-slide-up text-center space-y-6 py-4">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-50 mx-auto">
        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
      </div>
      <div><h2 className="font-serif text-2xl font-semibold text-brown">預約已送出 🎉</h2>
        <p className="text-sm text-brown/50 mt-2">感謝你的預約！我會盡快與你確認。</p></div>
      <div className="bg-white rounded-2xl border border-accent/20 p-5 shadow-soft text-left max-w-sm mx-auto">
        <h3 className="font-serif text-base font-semibold text-brown mb-4">預約詳情</h3>
        <div className="space-y-2 text-sm">
          <Row label="服務" value={service.name}/>
          <Row label="日期" value={dateStr}/>
          <Row label="時間" value={`${slot.start_time.slice(0,5)} – ${slot.end_time.slice(0,5)}`}/>
          <Row label="時長" value={`${service.duration_minutes} 分鐘`}/>
          <hr className="border-accent/20"/>
          <Row label="姓名" value={formData.clientName}/>
          <Row label="信箱" value={formData.clientEmail}/>
          <Row label="電話" value={formData.clientPhone}/>
          {formData.message && <Row label="留言" value={formData.message}/>}
          {bookingId && <><hr className="border-accent/20"/><Row label="編號" value={bookingId.slice(0,8).toUpperCase()}/></>}
        </div>
      </div>
      <div className="bg-accent/15 rounded-2xl p-5 max-w-sm mx-auto text-left">
        <h4 className="font-serif text-sm font-semibold text-brown mb-2">接下來⋯</h4>
        <ul className="text-sm text-brown/60 space-y-1.5">
          <li>1. 我會在 24 小時內確認你的預約</li>
          <li>2. 確認後你會收到通知信</li>
          <li>3. 有任何問題歡迎透過社群聯繫我</li>
        </ul>
      </div>
      <Link to="/" className="btn-secondary inline-flex">回到首頁</Link>
    </div>
  );
}

function Row({label,value}:{label:string;value:string}) {
  return <div className="flex justify-between gap-3"><span className="text-brown/40 flex-shrink-0">{label}</span><span className="font-medium text-brown text-right">{value}</span></div>;
}
