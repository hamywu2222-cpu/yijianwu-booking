'use client';

import { useState } from 'react';

export default function BookingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [referenceNumber, setReferenceNumber] = useState('');

  const generateReferenceNumber = () => {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${dateStr}-${random}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const refNum = generateReferenceNumber();
    setReferenceNumber(refNum);

    const params = new URLSearchParams();
    params.append('name', formData.get('name') as string);
    params.append('phone', formData.get('phone') as string);
    params.append('checkInDate', formData.get('checkInDate') as string);
    params.append('checkOutDate', formData.get('checkOutDate') as string);
    params.append('roomType', formData.get('roomType') as string);
    params.append('numberOfPeople', formData.get('numberOfPeople') as string);
    params.append('lineId', formData.get('lineId') as string);
    params.append('note', formData.get('note') as string);
    params.append('referenceNumber', refNum);

    try {
      await fetch(
        'https://script.google.com/macros/s/AKfycbx3J43TGTOi5-HyB65Rc0B3ELQ6lubli1biES_ZpCTyk7WFXdV84xuyUk2vplXEP4WQtA/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString(),
        }
      );
      setSubmitStatus('success');
      form.reset();
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5F1] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-light tracking-tight text-[#3F3A36] mb-3">訂房詢問</h1>
          <p className="text-[#6B665F] text-lg">請填寫以下資訊，我們會盡快與您聯繫確認</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-3xl border border-[#EDE8E0] shadow-sm space-y-8">
          
          {/* 姓名 + 電話 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#3F3A36] mb-2">姓名</label>
              <input type="text" name="name" className="w-full border border-[#D1C9BE] rounded-xl px-4 py-3.5 text-[#3F3A36] placeholder:text-[#9A9389] focus:outline-none focus:border-[#8B7355]" placeholder="請輸入姓名" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#3F3A36] mb-2">聯絡電話</label>
              <input type="tel" name="phone" className="w-full border border-[#D1C9BE] rounded-xl px-4 py-3.5 text-[#3F3A36] placeholder:text-[#9A9389] focus:outline-none focus:border-[#8B7355]" placeholder="請輸入電話號碼" required />
            </div>
          </div>

          {/* 日期 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#3F3A36] mb-2">入住日期</label>
              <input type="date" name="checkInDate" className="w-full border border-[#D1C9BE] rounded-xl px-4 py-3.5 text-[#3F3A36] focus:outline-none focus:border-[#8B7355]" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#3F3A36] mb-2">退房日期</label>
              <input type="date" name="checkOutDate" className="w-full border border-[#D1C9BE] rounded-xl px-4 py-3.5 text-[#3F3A36] focus:outline-none focus:border-[#8B7355]" required />
            </div>
          </div>

          {/* 房型 + 人數 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#3F3A36] mb-2">欲訂房型</label>
              <select name="roomType" className="w-full border border-[#D1C9BE] rounded-xl px-4 py-3.5 text-[#3F3A36] focus:outline-none focus:border-[#8B7355]">
                <option value="">請選擇房型</option>
                <option value="和鳴雙人房">和鳴雙人房</option>
                <option value="和風4-6家庭房">和風4-6家庭房</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#3F3A36] mb-2">入住人數</label>
              <input type="number" name="numberOfPeople" className="w-full border border-[#D1C9BE] rounded-xl px-4 py-3.5 text-[#3F3A36] focus:outline-none focus:border-[#8B7355]" placeholder="請輸入人數" min="1" required />
            </div>
          </div>

          {/* LINE ID */}
          <div>
            <label className="block text-sm font-medium text-[#3F3A36] mb-2">LINE ID（選填）</label>
            <input type="text" name="lineId" className="w-full border border-[#D1C9BE] rounded-xl px-4 py-3.5 text-[#3F3A36] placeholder:text-[#9A9389] focus:outline-none focus:border-[#8B7355]" placeholder="例如：@yourlineid" />
          </div>

          {/* 備註 */}
          <div>
            <label className="block text-sm font-medium text-[#3F3A36] mb-2">備註（選填）</label>
            <textarea name="note" rows={4} className="w-full border border-[#D1C9BE] rounded-xl px-4 py-3.5 text-[#3F3A36] placeholder:text-[#9A9389] focus:outline-none focus:border-[#8B7355]" placeholder="有其他需求請告訴我們"></textarea>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#3F3A36] hover:bg-[#2C2926] text-white py-4 rounded-2xl text-base tracking-wider transition-colors disabled:opacity-60 mt-4"
          >
            {isSubmitting ? '送出中...' : '送出詢問'}
          </button>

          {/* 成功訊息 */}
          {submitStatus === 'success' && referenceNumber && (
            <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-2xl text-center">
              <p className="text-green-700 font-semibold text-lg mb-2">✅ 我們已收到您的詢問！</p>
              <p className="text-[#3F3A36] mb-1">您的詢問編號：<span className="font-bold text-xl">{referenceNumber}</span></p>
              <p className="text-sm text-gray-600 mt-3">請加入我們的 LINE 官方帳號後，傳送上方編號給我們，我們會主動聯繫您。</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <p className="text-center text-red-600 mt-4 font-medium">❌ 送出失敗，請稍後再試或直接聯絡我們。</p>
          )}
        </form>
      </div>
    </div>
  );
}