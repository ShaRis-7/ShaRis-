import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAvailableSlots } from '../hooks/useAvailableSlots';
import { useBooking } from '../hooks/useBooking';
import ServiceDetail from '../components/ServiceDetail';
import DatePicker from '../components/DatePicker';
import TimeSlotPicker from '../components/TimeSlotPicker';
import BookingForm from '../components/BookingForm';
import BookingConfirmation from '../components/BookingConfirmation';
import type { Service, AvailableSlot, BookingStep, BookingFormData } from '../types';

export default function BookingPage() {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [svcLoading, setSvcLoading] = useState(true);
  const [svcError, setSvcError] = useState(false);

  useEffect(() => {
    if (!serviceSlug) return;
    let c = false;
    (async () => {
      const { data, error } = await supabase.from('services').select('*').eq('slug', serviceSlug).eq('is_active', true).single();
      if (c) return;
      if (error || !data) setSvcError(true); else setService(data);
      setSvcLoading(false);
    })();
    return () => { c = true; };
  }, [serviceSlug]);

  const [step, setStep] = useState<BookingStep>('detail');
  const now = new Date();
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);
  const [formData, setFormData] = useState<BookingFormData | null>(null);

  const { availableDates, blockedDateSet, getSlotsForDate, loading: slotsLoading } = useAvailableSlots(service?.id, calYear, calMonth);
  const { submitBooking, loading: bookingLoading, result: bookingResult } = useBooking();

  const slotsForDate = useMemo(() => selectedDate ? getSlotsForDate(selectedDate) : [], [selectedDate, getSlotsForDate]);

  const stepsOrder: BookingStep[] = ['detail', 'date', 'time', 'form', 'confirmation'];
  const stepLabels: Record<BookingStep, string> = { detail: '詳情', date: '日期', time: '時間', form: '資料', confirmation: '完成' };
  const curIdx = stepsOrder.indexOf(step);

  function prevMonth() { if (calMonth===1){setCalYear(y=>y-1);setCalMonth(12);}else setCalMonth(m=>m-1); setSelectedDate(null);setSelectedSlot(null); }
  function nextMonth() { if (calMonth===12){setCalYear(y=>y+1);setCalMonth(1);}else setCalMonth(m=>m+1); setSelectedDate(null);setSelectedSlot(null); }

  async function handleFormSubmit(data: BookingFormData) {
    if (!service || !selectedSlot) return;
    setFormData(data);
    const r = await submitBooking({ service_id: service.id, slot_id: selectedSlot.id, client_name: data.clientName, client_email: data.clientEmail, client_phone: data.clientPhone, message: data.message || null });
    if (r.success) setStep('confirmation');
  }

  if (svcLoading) return <div className="max-w-xl mx-auto px-4 py-20 text-center text-brown/40">載入中…</div>;
  if (svcError || !service) return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <p className="font-serif text-lg font-semibold text-brown mb-2">找不到此服務</p>
      <Link to="/" className="btn-secondary">回到首頁</Link>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {step !== 'confirmation' && (
        <nav className="mb-6">
          {step === 'detail' ? (
            <Link to="/" className="btn-back">← 返回服務列表</Link>
          ) : (
            <button onClick={() => { const p = curIdx-1; if(p>=0) setStep(stepsOrder[p]); }} className="btn-back">← 返回上一步</button>
          )}
        </nav>
      )}

      {/* Progress */}
      {step !== 'confirmation' && (
        <div className="flex items-center gap-1 mb-8 px-2">
          {stepsOrder.slice(0,-1).map((s,i) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className={`w-2.5 h-2.5 rounded-full transition-all ${i<=curIdx?'bg-brown scale-110':'bg-accent/40'}`}/>
                <span className={`text-[10px] mt-1 ${i<=curIdx?'text-brown':'text-brown/30'}`}>{stepLabels[s]}</span>
              </div>
              {i < stepsOrder.length-2 && <div className={`h-px flex-1 -mt-3 ${i<curIdx?'bg-brown':'bg-accent/30'}`}/>}
            </div>
          ))}
        </div>
      )}

      {step === 'detail' && <ServiceDetail service={service} onContinue={() => setStep('date')}/>}

      {step === 'date' && (
        <div>
          <h3 className="section-title mb-1">選擇日期</h3>
          <p className="text-sm text-brown/40 mb-4">有標記的日期代表有可預約的時段</p>
          <DatePicker year={calYear} month={calMonth} selectedDate={selectedDate} availableDates={availableDates} blockedDates={blockedDateSet}
            onSelectDate={(d) => { setSelectedDate(d); setSelectedSlot(null); setStep('time'); }} onPrevMonth={prevMonth} onNextMonth={nextMonth}/>
          {slotsLoading && <p className="text-center text-sm text-brown/40 mt-4">載入時段中…</p>}
        </div>
      )}

      {step === 'time' && selectedDate && (
        <div>
          <TimeSlotPicker date={selectedDate} slots={slotsForDate} selected={selectedSlot} onSelect={setSelectedSlot}/>
          {selectedSlot && <button onClick={() => setStep('form')} className="btn-primary w-full mt-6">繼續填寫資料</button>}
        </div>
      )}

      {step === 'form' && selectedSlot && (
        <BookingForm service={service} slot={selectedSlot} onSubmit={handleFormSubmit} loading={bookingLoading}/>
      )}

      {step === 'confirmation' && selectedSlot && formData && (
        <BookingConfirmation service={service} slot={selectedSlot} formData={formData} bookingId={bookingResult?.bookingId}/>
      )}
    </div>
  );
}
