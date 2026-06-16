'use client';

import { useState } from 'react';

export default function Home() {
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
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params.toString(),
        }
      );

      setSubmitStatus('success');
      form.reset();

    } catch (error) {
      console.error('提交錯誤:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F5F1] text-[#3F3A36]">
      {/* 導覽列 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#EDE8E0]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-medium tracking-widest">一間屋·駅前宿</div>
          <div className="flex gap-8 text-sm">
            <a href="#rooms" className="hover:text-[#8B7355] transition-colors">房間</a>
            <a href="#about" className="hover:text-[#8B7355] transition-colors">關於我們</a>
            <a href="#booking" className="hover:text-[#8B7355] transition-colors">訂房詢問</a>
          </div>
        </div>
      </nav>

      {/* Hero 區塊 */}
      <section className="h-[100dvh] flex items-center justify-center px-6 pt-16 bg-[#F8F5F1]">
        <div className="max-w-5xl text-center">
          <div className="text-[#8B7355] text-sm tracking-[4px] mb-4">
            FULONG · JAPANESE STYLE GUESTHOUSE
          </div>
          <h1 className="text-[56px] md:text-[72px] leading-none font-light tracking-[-1.5px] mb-6 text-[#3F3A36]">
            一間屋·駅前宿
          </h1>
          <p className="text-xl md:text-2xl text-[#5C564F] max-w-2xl mx-auto mb-10">
            在福隆車站旁，感受日式溫潤的慢時光
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#rooms" className="inline-block px-8 py-3.5 bg-[#3F3A36] text-white rounded-full text-sm tracking-wider hover:bg-[#2C2926] transition-colors">
              查看房間
            </a>
            <a href="#booking" className="inline-block px-8 py-3.5 border border-[#3F3A36] text-[#3F3A36] rounded-full text-sm tracking-wider hover:bg-[#3F3A36] hover:text-white transition-colors">
              立即詢問
            </a>
          </div>
        </div>
      </section>

      {/* 關於我們 */}
      <section id="about" className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="text-[#8B7355] text-sm tracking-widest mb-2">ABOUT US</div>
          <h2 className="text-4xl font-light">關於 一間屋·駅前宿</h2>
        </div>
        <div className="prose prose-lg max-w-none text-[#4A4640]">
          <p>
            位於福隆車站旁，我們以日式輕奢為理念，打造一處讓人放鬆的居所。
            每一個細節都希望帶給客人溫暖與安心。
          </p>
        </div>
      </section>

      {/* 房間介紹 */}
      <section id="rooms" className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-[#8B7355] text-sm tracking-[3px] mb-2">ROOMS</div>
            <h2 className="text-4xl font-light tracking-tight">房間介紹</h2>
            <p className="mt-3 text-[#6B665F]">我們提供雙人房與家庭房，空間舒適，適合不同類型的旅客</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* 雙人房 */}
            <div className="group border border-[#EDE8E0] rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="h-56 bg-[#EDE8E0] flex items-center justify-center">
                <span className="text-[#8B7355] text-sm">房間照片</span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-light">雙人房</h3>
                  <span className="text-xs px-3 py-1 bg-[#F1EDE6] text-[#8B7355] rounded-full">共 4 間</span>
                </div>
                <div className="inline-block mb-3 px-2.5 py-0.5 text-xs bg-[#F8F5F1] text-[#8B7355] rounded">
                  衛浴共用
                </div>
                <p className="text-[#6B665F] text-sm mb-4 leading-relaxed">
                  四間格局與設備皆相同的雙人房，空間舒適，適合情侶或朋友同行。
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#8B7355]">2 人</span>
                  <a href="#booking" className="text-sm px-5 py-2.5 border border-[#3F3A36] rounded-full hover:bg-[#3F3A36] hover:text-white transition-colors">
                    詢問此房型
                  </a>
                </div>
              </div>
            </div>

            {/* 家庭房 */}
            <div className="group border border-[#EDE8E0] rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="h-56 bg-[#EDE8E0] flex items-center justify-center">
                <span className="text-[#8B7355] text-sm">房間照片</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-light mb-2">家庭房</h3>
                <div className="inline-block mb-3 px-2.5 py-0.5 text-xs bg-[#F8F5F1] text-[#8B7355] rounded">
                  衛浴共用
                </div>
                <p className="text-[#6B665F] text-sm mb-4 leading-relaxed">
                  可容納 4–6 人的寬敞房型，適合家庭出遊或好友同行。
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#8B7355]">4–6 人</span>
                  <a href="#booking" className="text-sm px-5 py-2.5 border border-[#3F3A36] rounded-full hover:bg-[#3F3A36] hover:text-white transition-colors">
                    詢問此房型
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 訂房詢問表單 */}
      <section id="booking" className="max-w-2xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <div className="text-[#8B7355] text-sm tracking-[3px] mb-2">BOOKING</div>
          <h2 className="text-4xl font-light tracking-tight">訂房詢問</h2>
          <p className="mt-3 text-[#6B665F]">請填寫以下資訊，我們會盡快與您聯繫確認</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl border border-[#EDE8E0]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-2 text-[#5C564F]">姓名</label>
              <input type="text" name="name" className="w-full border border-[#EDE8E0] rounded-lg px-4 py-3 focus:outline-none focus:border-[#8B7355]" placeholder="請輸入姓名" required />
            </div>
            <div>
              <label className="block text-sm mb-2 text-[#5C564F]">聯絡電話</label>
              <input type="tel" name="phone" className="w-full border border-[#EDE8E0] rounded-lg px-4 py-3 focus:outline-none focus:border-[#8B7355]" placeholder="請輸入電話號碼" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-2 text-[#5C564F]">入住日期</label>
              <input type="date" name="checkInDate" className="w-full border border-[#EDE8E0] rounded-lg px-4 py-3 focus:outline-none focus:border-[#8B7355]" required />
            </div>
            <div>
              <label className="block text-sm mb-2 text-[#5C564F]">退房日期</label>
              <input type="date" name="checkOutDate" className="w-full border border-[#EDE8E0] rounded-lg px-4 py-3 focus:outline-none focus:border-[#8B7355]" required />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2 text-[#5C564F]">欲訂房型</label>
            <select name="roomType" className="w-full border border-[#EDE8E0] rounded-lg px-4 py-3 focus:outline-none focus:border-[#8B7355]">
              <option value="">請選擇房型</option>
              <option value="雙人房">雙人房（共4間）</option>
              <option value="家庭房">家庭房</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-2 text-[#5C564F]">入住人數</label>
              <input type="number" name="numberOfPeople" className="w-full border border-[#EDE8E0] rounded-lg px-4 py-3 focus:outline-none focus:border-[#8B7355]" placeholder="請輸入人數" min="1" required />
            </div>
            <div>
              <label className="block text-sm mb-2 text-[#5C564F]">LINE ID（選填）</label>
              <input type="text" name="lineId" className="w-full border border-[#EDE8E0] rounded-lg px-4 py-3 focus:outline-none focus:border-[#8B7355]" placeholder="例如：@yourlineid" />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2 text-[#5C564F]">備註（選填）</label>
            <textarea name="note" className="w-full border border-[#EDE8E0] rounded-lg px-4 py-3 h-28 focus:outline-none focus:border-[#8B7355]" placeholder="有其他需求請告訴我們"></textarea>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#3F3A36] text-white py-4 rounded-full text-sm tracking-wider hover:bg-[#2C2926] transition-colors mt-4 disabled:opacity-50"
          >
            {isSubmitting ? '送出中...' : '送出詢問'}
          </button>

          {/* 成功訊息區塊 */}
          {submitStatus === 'success' && referenceNumber && (
            <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-2xl text-center">
              <p className="text-green-700 font-medium mb-3">✅ 我們已收到您的詢問！</p>
              
              <div className="bg-white p-4 rounded-xl mb-4">
                <p className="text-sm text-gray-600 mb-1">您的詢問編號</p>
                <p className="text-2xl font-bold text-[#3F3A36] tracking-wider">{referenceNumber}</p>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                請加入我們的 LINE 官方帳號後，<br />
                <span className="font-medium text-[#3F3A36]">直接傳送上方編號</span> 給我們，<br />
                我們會主動與您聯繫確認，您無需再說明一次資料。
              </p>

              <a 
                href="https://line.me/R/ti/p/@811mszbh" 
                target="_blank"
                className="inline-block w-full bg-[#00C300] text-white py-3.5 rounded-full font-medium hover:bg-[#00A000] transition-colors text-center"
              >
                一鍵加入 LINE 官方帳號
              </a>
            </div>
          )}

          {submitStatus === 'error' && (
            <p className="text-center text-red-600 mt-4">❌ 送出失敗，請稍後再試或直接聯絡我們。</p>
          )}
        </form>
      </section>
    </main>
  );
}