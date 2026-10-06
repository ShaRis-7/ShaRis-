import { useState } from 'react';
import type { Service, AvailableSlot, BookingFormData } from '../types';

export default function BookingForm({ service, slot, onSubmit, loading }:
  { service:Service; slot:AvailableSlot; onSubmit:(d:BookingFormData)=>void; loading:boolean }) {
  const [form, setForm] = useState<BookingFormData>({ clientName:'', clientEmail:'', clientPhone:'', message:'' });
  const [errors, setErrors] = useState<Record<string,string>>({});

  const price = new Intl.NumberFormat('zh-TW',{style:'currency',currency:'TWD',minimumFractionDigits:0}).format(service.price_ntd);

  function validate() {
    const e: Record<string,string> = {};
    if (!form.clientName.trim()) e.clientName = '請輸入姓名';
    if (!form.clientEmail.trim() || !form.clientEmail.includes('@')) e.clientEmail = '請輸入有效的電子郵件';
    if (!form.clientPhone.trim()) e.clientPhone = '請輸入聯絡電話';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (validate()) onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in space-y-5">
      <div className="bg-accent/15 rounded-xl p-4 text-sm text-brown/60">
        <p><strong>{service.name}</strong></p>
        <p>{slot.date} · {slot.start_time.slice(0,5)} – {slot.end_time.slice(0,5)} · {price}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-brown mb-1.5">姓名 *</label>
        <input className="input-field" value={form.clientName} onChange={e=>setForm({...form,clientName:e.target.value})} placeholder="你的姓名"/>
        {errors.clientName && <p className="text-xs text-red-500 mt-1">{errors.clientName}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-brown mb-1.5">電子郵件 *</label>
        <input type="email" className="input-field" value={form.clientEmail} onChange={e=>setForm({...form,clientEmail:e.target.value})} placeholder="your@email.com"/>
        {errors.clientEmail && <p className="text-xs text-red-500 mt-1">{errors.clientEmail}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-brown mb-1.5">聯絡電話 *</label>
        <input type="tel" className="input-field" value={form.clientPhone} onChange={e=>setForm({...form,clientPhone:e.target.value})} placeholder="0912-345-678"/>
        {errors.clientPhone && <p className="text-xs text-red-500 mt-1">{errors.clientPhone}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-brown mb-1.5">想說的話（選填）</label>
        <textarea className="input-field min-h-[100px]" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="有什麼想讓我事先知道的嗎？"/>
      </div>
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? '送出中...' : '確認預約'}
      </button>
    </form>
  );
}
