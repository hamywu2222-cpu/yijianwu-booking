'use client';

import { useState } from 'react';

export default function YijianwuWebsite() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [renovationTab, setRenovationTab] = useState<'before' | 'during' | 'after'>('after');
  const [modalImage, setModalImage] = useState<string | null>(null);

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
      {/* 優雅固定導覽列 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F8F5F1]/95 backdrop-blur-md border-b border-[#EDE8E0]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-light tracking-[3px]">一間屋</div>
            <div className="text-sm text-[#8B7355] tracking-widest">· 駅前宿</div>
          </div>
          <div className="flex gap-7 text-sm font-medium">
            <a href="#renovation" className="nav-link hover:text-[#8B7355] transition-colors">翻新</a>
            <a href="#rooms" className="nav-link hover:text-[#8B7355] transition-colors">房間</a>
            <a href="#package" className="nav-link hover:text-[#8B7355] transition-colors">包房</a>
            <a href="#amenities" className="nav-link hover:text-[#8B7355] transition-colors">設施</a>
            <a href="#location" className="nav-link hover:text-[#8B7355] transition-colors">位置</a>
            <a href="#booking" className="nav-link hover:text-[#8B7355] transition-colors">訂房</a>
          </div>
          <a 
            href="tel:0912362533" 
            className="hidden md:block text-sm text-[#8B7355] hover:text-[#3F3A36] transition-colors tracking-wider"
          >
            📞 0912-362-533
          </a>
          <a 
            href="https://line.me/ti/p/@811mszbh" 
            target="_blank"
            className="hidden md:flex items-center gap-2 bg-[#00C300] text-white text-xs px-5 py-2 rounded-full hover:bg-[#00A000] transition-all tracking-wider font-medium"
          >
            LINE 直接訂房享 95 折
          </a>
          <a href="#booking" className="hidden md:block text-xs px-5 py-2 border border-[#3F3A36] rounded-full hover:bg-[#3F3A36] hover:text-white transition-all tracking-wider">
            立即詢問
          </a>
        </div>
      </nav>

      {/* Hero 區塊 - 已更換為 LOGO 背景，字體已搭配星空暖調風格 */}
      <section className="relative h-[100dvh] flex items-center justify-center pt-16 overflow-hidden">
        {/* 背景 - 您的 LOGO 插畫 */}
        <div className="absolute inset-0 bg-[url('/images/hero.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/25 to-black/55" />
        </div>

        {/* 內容置底，避免與 LOGO 中央大標題重疊，讓 LOGO 更突出 */}
        <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center justify-end h-full pb-20 md:pb-28 text-center">
          
          {/* 頂部小標 - 極簡，放在最上方 */}
          <div className="inline-block text-[9px] md:text-xs tracking-[4px] mb-2 px-4 py-0.5 border border-[#F5E8C7]/40 rounded-full text-[#F5E8C7]/70">
            one house · ekimae-yado
          </div>

          {/* 副標題 - 移到底部，與 LOGO 下方插畫區域呼應，更乾淨優雅 */}
          <div className="mb-5 px-6 py-3 rounded-2xl bg-black/20 backdrop-blur-sm">
            <p className="hero-subtitle text-lg md:text-xl font-light tracking-[1.2px] text-[#F5E8C7] leading-tight">
              福隆車站步行 30 秒　・　日式溫潤的慢時光
            </p>
          </div>

          {/* CTA 按鈕 - 更簡潔有力，顏色與 LOGO 暖調呼應 */}
          <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
            <a 
              href="https://line.me/ti/p/@811mszbh" 
              target="_blank"
              className="px-7 py-3 bg-[#00C300] hover:bg-[#00A000] text-white rounded-full font-medium tracking-[0.5px] text-xs md:text-sm transition-all active:scale-[0.985] shadow"
            >
              LINE 直接訂房享 95 折
            </a>
            <a href="#rooms" className="px-7 py-3 bg-[#F5E8C7] text-[#3F3A36] rounded-full font-medium tracking-[0.5px] text-xs md:text-sm hover:bg-white transition-all active:scale-[0.985]">
              查看房間
            </a>
            <a href="#booking" className="px-7 py-3 border border-[#F5E8C7]/60 text-[#F5E8C7] rounded-full font-medium tracking-[0.5px] text-xs md:text-sm hover:bg-[#F5E8C7] hover:text-[#3F3A36] transition-all active:scale-[0.985]">
              表單詢問（較慢）
            </a>
          </div>
        </div>

        {/* 捲動提示 */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[#F5E8C7]/40 text-[9px] tracking-[2.5px]">
          SCROLL TO EXPLORE
        </div>
      </section>

      {/* 關於我們 + 位置 */}
      <section id="about" className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="text-[#8B7355] text-xs tracking-[4px] mb-3">A QUIET RETREAT BY THE STATION</div>
        <h2 className="text-5xl font-light tracking-tight mb-6 font-playfair">在福隆車站旁，<br />有一間溫柔的家。</h2>
        <p className="max-w-xl mx-auto text-base text-[#6B665F] leading-relaxed mb-4">
          福隆車站旁 30 秒日式民宿。2026年5月全新裝潢，溫潤和風空間，專注寧靜與細節。
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-[#8B7355]">
          <div>福隆車站步行 30 秒</div>
          <div>2026年5月全新裝潢</div>
          <div>LINE 官方確認訂房</div>
          <div>單車族友善 · 爬山玩水海邊</div>
          <div>和風家庭房僅此1間</div>
        </div>
      </section>

      {/* 1樓翻新歷程 - 讓客人體驗轉變的驚喜 */}
      <section id="renovation" className="bg-white py-16 border-t border-[#EDE8E0]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-[#8B7355]/10 text-[#8B7355] text-xs tracking-[3px] rounded-full mb-3">
              <span>2026.04 → 05</span>
              <span className="text-[10px] bg-[#8B7355] text-white px-2 py-0.5 rounded">FULL RENOVATION</span>
            </div>
            <h3 className="text-5xl font-light tracking-tight mb-3">1樓翻新歷程</h3>
            <p className="text-[#6B665F] max-w-sm mx-auto text-sm">
              2026年5月全新翻新，從老舊到溫潤日式。
            </p>
          </div>

          {/* 互動式時間軸 - 讓客人體驗「前中後」的驚喜轉變 */}
          <div className="mb-8">
            <div className="flex justify-center gap-2 mb-6">
              {[
                { key: 'before' as const, label: '翻新前', date: '2026.04' },
                { key: 'during' as const, label: '施工中', date: '2026.05.01' },
                { key: 'after' as const, label: '翻新後', date: '2026.05+' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setRenovationTab(tab.key)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                    renovationTab === tab.key 
                      ? 'bg-[#3F3A36] text-white shadow' 
                      : 'bg-[#F8F5F1] text-[#6B665F] hover:bg-[#EDE8E0]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className="text-[10px] opacity-70">{tab.date}</span>
                </button>
              ))}
            </div>

            {/* 動態故事文字 - 讓體驗更有溫度 */}
            <div className="text-center mb-6 min-h-[60px]">
              {renovationTab === 'before' && (
                <p className="text-[#6B665F] italic">這是翻新前的模樣，空間需要一次徹底的改變。</p>
              )}
              {renovationTab === 'during' && (
                <p className="text-[#6B665F] italic">施工進行中，我們一步步拆除舊的，打造新的。</p>
              )}
              {renovationTab === 'after' && (
                <p className="text-[#6B665F] italic">完成後的驚喜：溫暖、光線、細節，全部到位。</p>
              )}
            </div>

            {/* 動態圖片展示區 - 根據階段切換，讓體驗更有故事感 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(renovationTab === 'before' ? [
                { src: "/images/photo_2026-04-25_01-38-33.jpg", alt: "翻新前 - 舊空間" },
                { src: "/images/photo_2026-04-25_01-38-38.jpg", alt: "翻新前 - 原始狀態" },
                { src: "/images/photo_2026-04-26_16-17-21.jpg", alt: "翻新前 - 待更新區域" }
              ] : renovationTab === 'during' ? [
                { src: "/images/photo_2026-05-01_23-59-02.jpg", alt: "施工中 - 拆除進行" },
                { src: "/images/photo_2026-05-01_23-59-09.jpg", alt: "施工中 - 翻新過程" }
              ] : [
                { src: "/images/double_room.jpg", alt: "翻新後 - 溫潤雙人房（衛浴共用）" },
                { src: "/images/photo_2026-06-18_02-06-05.jpg", alt: "翻新後 - 和風4-6人家庭房（僅此1間，兩張雙人床，衛浴共用）" },
                { src: "/images/facilities.jpg", alt: "翻新後 - 公共設施區" },
                { src: "/images/hallway.jpg", alt: "翻新後 - 溫潤木質走廊" },
                { src: "/images/hallway2.jpg", alt: "翻新後 - 室內通道" },
                { src: "/images/hallway3.jpg", alt: "翻新後 - 走道細節" },
                { src: "/images/bathroom.jpg", alt: "翻新後 - 公共衛浴空間（洗髮精沐浴乳香皂）" },
                { src: "/images/double_room2.jpg", alt: "翻新後 - 雙人房內景（衛浴共用）" },
                { src: "/images/exterior3.jpg", alt: "翻新後 - 雙人房內景" },
                { src: "/images/exterior4.jpg", alt: "翻新後 - 雙人房另一視角" }
              ]).map((item, index) => (
                <div 
                  key={index} 
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-[#EDE8E0] cursor-pointer"
                  onClick={() => setModalImage(item.src)}
                >
                  <img 
                    src={item.src} 
                    alt={item.alt} 
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.08] group-hover:brightness-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <div className={`inline-block text-[10px] px-2 py-0.5 rounded mb-1.5 tracking-wider ${
                      renovationTab === 'before' ? 'bg-[#C4A77D]' : 
                      renovationTab === 'during' ? 'bg-[#8B7355]' : 'bg-[#3F3A36]'
                    }`}>
                      {renovationTab === 'before' ? 'BEFORE' : renovationTab === 'during' ? 'DURING' : 'AFTER'}
                    </div>
                    <div className="text-base font-light tracking-tight leading-tight">{item.alt}</div>
                  </div>
                  <div className="absolute top-3 right-3 text-white/70 group-hover:text-white text-xs tracking-widest flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                    點擊放大 <span>↗</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-[#6B665F] max-w-md mx-auto">
              親手打造的溫暖空間。
            </p>
            <div className="mt-4">
              <a href="#booking" className="inline-block px-6 py-2 text-sm border border-[#3F3A36] rounded-full hover:bg-[#3F3A36] hover:text-white transition-colors">
                體驗全新1樓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 房間介紹 - 更精緻的卡片 */}
      <section id="rooms" className="py-20 bg-[#F8F5F1]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="text-[#8B7355] text-xs tracking-[4px] mb-2">ROOMS</div>
            <h2 className="text-5xl font-light tracking-tight font-playfair">房間介紹</h2>
            <p className="mt-1 text-sm text-[#6B665F]">全館和式雅房（衛浴共用）：四間雙人房 + 和風4-6人家庭房（僅此1間）</p>
            <p className="mt-1 text-xs text-[#8B7355]">雙人房 NT$1,600/晚 ｜ 家庭房 NT$3,200起（4人）+NT$600/人（最多6人）｜ 包房平日 $8,800 / 假日 $9,200</p>
            <p className="mt-1 text-[10px] text-[#8B7355]">填寫後請回傳後4碼到 LINE @811mszbh 確認訂單</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 和鳴雙人房 */}
            <div className="card group border border-[#EDE8E0] rounded-3xl overflow-hidden bg-white">
              <div className="room-image aspect-[16/10] bg-[#EDE8E0]">
                {/* 使用用戶提供的照片 */}
                <img src="/images/double_room.jpg" alt="和鳴雙人房" className="w-full h-full object-cover" />
              </div>
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-3xl font-light tracking-tight">和鳴 · 雙人房</h3>
                    </div>
                    <div className="text-[#8B7355] text-sm">共 4 間（格局設備相同）</div>
                  </div>
                  <div className="text-right text-xs text-[#8B7355]">
                    2 人<br /><span className="opacity-70">衛浴共用</span>
                  </div>
                </div>
                <p className="text-[#6B665F] leading-relaxed mb-5 text-sm">
                  簡約和式雅房，木質溫潤。2026年5月全新裝潢，公共衛浴提供洗髮精沐浴乳香皂，每間房一台吹風機，不供一次性用品（環保）。單車停放安心。
                </p>

                {/* 價格呈現 - 漂亮卡片風格 */}
                <div className="mt-4 p-4 bg-[#F8F5F1] rounded-2xl border border-[#EDE8E0]">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-3xl font-light text-[#3F3A36]">NT$1,600</span>
                      <span className="text-sm text-[#8B7355] ml-1">/晚</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-[#8B7355]">雙人入住</div>
                      <div className="text-[10px] text-[#6B665F]">公共衛浴提供盥洗用品，每間房吹風機</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm mt-3">
                  <a 
                    href="https://line.me/ti/p/@811mszbh" 
                    target="_blank" 
                    className="px-6 py-2.5 bg-[#00C300] text-white rounded-full hover:bg-[#00A000] transition-colors text-xs font-medium"
                  >
LINE @811mszbh 回傳後4碼確認
                  </a>
                </div>
              </div>
            </div>

            {/* 和風4-6人家庭房（僅此1間，兩張雙人床） - 已更新新照片 */}
            <div className="card group border border-[#EDE8E0] rounded-3xl overflow-hidden bg-white">
              <div className="room-image aspect-[16/10] bg-[#EDE8E0]">
                <img src="/images/photo_2026-06-18_02-06-05.jpg" alt="和風4-6人家庭房" className="w-full h-full object-cover" />
              </div>
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-3xl font-light tracking-tight">和風4-6人家庭房</h3>
                      <span className="text-[10px] px-2 py-0.5 bg-[#8B7355] text-white rounded-full">僅此1間</span>
                    </div>
                    <div className="text-[#8B7355] text-sm">僅此1間，可容納 4–6 人（兩張雙人床）</div>
                  </div>
                  <div className="text-right text-xs text-[#8B7355]"><span className="opacity-70">衛浴共用</span></div>
                </div>
                <p className="text-[#6B665F] leading-relaxed mb-5 text-sm">
                  寬敞和風4-6人家庭房（僅此1間，兩張雙人床）。2026年5月全新裝潢，公共衛浴提供洗髮精沐浴乳香皂，每間房一台吹風機，不供一次性用品（環保）。單車停放安心。
                </p>

                {/* 價格呈現 - 漂亮卡片風格 */}
                <div className="mt-4 p-4 bg-[#F8F5F1] rounded-2xl border border-[#EDE8E0]">
                  <div className="flex items-baseline justify-between mb-1">
                    <div>
                      <span className="text-3xl font-light text-[#3F3A36]">NT$3,200</span>
                      <span className="text-sm text-[#8B7355] ml-1">起 /晚</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-[#8B7355]">僅此1間</div>
                      <div className="text-sm text-[#8B7355]">最少 4 人</div>
                    </div>
                  </div>
                  <div className="text-sm text-[#6B665F] mb-2">每增加 1 人 + NT$600（最多 6 人）</div>
                  <div className="text-[10px] text-[#8B7355]">和風4-6人家庭房（僅此1間，兩張雙人床），公共衛浴提供盥洗用品，每間房吹風機</div>
                </div>

                <div className="flex items-center justify-between text-sm mt-3">
                  <a 
                    href="https://line.me/ti/p/@811mszbh" 
                    target="_blank" 
                    className="px-6 py-2.5 bg-[#00C300] text-white rounded-full hover:bg-[#00A000] transition-colors text-xs font-medium"
                  >
LINE @811mszbh 回傳後4碼確認
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 包房方案 */}
      <section id="package" className="bg-white py-20 border-t border-[#EDE8E0]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="text-[#8B7355] text-xs tracking-[3px] mb-2">WHOLE HOUSE RENTAL</div>
          <h2 className="text-4xl font-light tracking-tight mb-3">包房方案（共5間）</h2>
          <p className="text-[#6B665F] mb-6 text-sm">全館和式雅房（衛浴共用），含和風4-6人家庭房1間。提供衛浴用品，每間房吹風機，不供一次性用品。適合家庭、團體或單車族。</p>

          <div className="flex flex-col md:flex-row gap-6 justify-center mb-8">
            <div className="bg-[#F8F5F1] p-8 rounded-3xl flex-1 max-w-xs mx-auto">
              <div className="text-2xl font-light text-[#3F3A36]">平日</div>
              <div className="text-5xl font-light tracking-tight mt-2 mb-1">NT$8,800</div>
              <div className="text-sm text-[#8B7355]">週一至週四</div>
            </div>
            <div className="bg-[#F8F5F1] p-8 rounded-3xl flex-1 max-w-xs mx-auto border-2 border-[#8B7355]">
              <div className="text-2xl font-light text-[#3F3A36]">假日</div>
              <div className="text-5xl font-light tracking-tight mt-2 mb-1">NT$9,200</div>
              <div className="text-sm text-[#8B7355]">週五、週六、假日</div>
            </div>
          </div>

          <div className="text-sm text-[#6B665F] mb-6">
            價格固定（特殊活動日另詢）。<br />
            單車停放空間充足。
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a 
              href="https://line.me/ti/p/@811mszbh" 
              target="_blank" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#00C300] text-white rounded-full text-sm font-medium hover:bg-[#00A000] transition-all"
            >
LINE @811mszbh 回傳後4碼確認
            </a>
            <a 
              href="tel:0912362533" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#3F3A36] text-white rounded-full text-sm font-medium hover:bg-[#2C2926] transition-all"
            >
              📞 包房專線 0912-362-533
            </a>
          </div>
          <p className="mt-3 text-xs text-[#8B7355]">或是有急事也可撥打此專線</p>
        </div>
      </section>

      {/* 設施 Amenities */}
      <section id="amenities" className="max-w-5xl mx-auto px-6 py-20 border-t border-[#EDE8E0]">
        <div className="text-center mb-12">
          <div className="text-[#8B7355] text-xs tracking-[3px]">AMENITIES</div>
          <h2 className="text-4xl font-light tracking-tight">溫暖的細節</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 text-center">
          {[
            "日式木質裝潢", "舒適寢具", "獨立冷氣", "免費 WiFi",
            "公共衛浴（洗髮精・沐浴乳・香皂）", "每間房一台吹風機", "不供一次性用品（提倡環保）", "單車專屬停放區"
          ].map((item, i) => (
            <div key={i} className="text-[#6B665F]">
              <div className="mx-auto mb-3 w-9 h-px bg-[#8B7355]" />
              <div className="text-sm tracking-wide">{item}</div>
            </div>
          ))}
        </div>

        {/* 單車族與周邊 */}
        <div className="mt-8 bg-[#F8F5F1] p-6 rounded-3xl">
          <div className="text-center mb-4">
            <div className="text-[#8B7355] text-xs tracking-[3px] mb-1">單車 · 戶外友善</div>
            <h3 className="text-xl font-light tracking-tight">單車停放 · 爬山玩水海邊</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div className="flex gap-4">
              <div className="text-2xl">🚲</div>
              <div>
                <div className="font-medium text-[#3F3A36] mb-1">單車停放無憂</div>
                <div className="text-[#6B665F] text-xs">室內/遮雨專屬空間。</div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl">🏔️</div>
              <div>
                <div className="font-medium text-[#3F3A36] mb-1">爬山步道</div>
                <div className="text-[#6B665F] text-xs">附近輕鬆健行路線。</div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl">💦</div>
              <div>
                <div className="font-medium text-[#3F3A36] mb-1">玩水溯溪</div>
                <div className="text-[#6B665F] text-xs">河岸玩水，清涼首選。提供毛巾淋浴。</div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl">🏖️</div>
              <div>
                <div className="font-medium text-[#3F3A36] mb-1">海邊 5 分鐘</div>
                <div className="text-[#6B665F] text-xs">海水浴場步行可達，沙灘夕陽。</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 重點特色 */}
      <section className="max-w-5xl mx-auto px-6 py-10 border-t border-[#EDE8E0]">
        <div className="text-center mb-6">
          <div className="text-[#8B7355] text-xs tracking-[3px] mb-1">KEY POINTS</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          {[
            { icon: "🛠️", title: "2026年5月全新裝潢", desc: "公共空間全面翻新，更現代舒適" },
            { icon: "🔒", title: "官方 LINE 確認", desc: "填寫後請回傳後4碼到 @811mszbh 確認訂單" },
            { icon: "🧼", title: "每日徹底清潔 + 環保", desc: "公共衛浴提供洗髮精沐浴乳香皂，每間房吹風機，不供一次性用品" },
            { icon: "🏔️🏖️", title: "單車友善 + 周邊景點", desc: "室內停車 · 爬山玩水海邊步行/單車可達" },
          ].map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="text-2xl">{item.icon}</div>
              <div>
                <div className="font-medium text-[#3F3A36] mb-1">{item.title}</div>
                <div className="text-[#6B665F] text-xs leading-relaxed">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 位置 */}
      <section id="location" className="bg-white py-16 border-t border-[#EDE8E0]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-[#8B7355] text-xs tracking-[4px] mb-3">LOCATION</div>
          <h2 className="text-4xl font-light tracking-tight mb-4">福隆車站前 30 秒</h2>
          <p className="text-lg text-[#6B665F] mb-8">
            <a 
              href="https://www.google.com/maps/search/?api=1&query=%E6%96%B0%E5%8C%97%E5%B8%82%E8%B2%A2%E5%AF%AE%E5%8D%80%E7%A6%8F%E9%9A%86%E8%A1%972%E5%B7%B71-2%E8%99%9F" 
              target="_blank" 
              className="hover:underline hover:text-[#3F3A36] transition-colors"
            >
              新北市貢寮區福隆街2巷1-2號
            </a>
          </p>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#F8F5F1] px-4 py-1.5 text-sm text-[#3F3A36]">
            <span>🚉</span>
            <span>福隆火車站出站大門口，立馬右轉直走就會看到招牌</span>
          </div>
          
          <div className="bg-[#F8F5F1] p-8 rounded-3xl text-left max-w-md mx-auto">
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between"><span>福隆海水浴場</span> <span className="text-[#8B7355]">步行 5 分鐘 · 海邊玩水</span></li>
              <li className="flex justify-between"><span>貢寮老街</span> <span className="text-[#8B7355]">車程 10 分鐘</span></li>
              <li className="flex justify-between"><span>九份老街</span> <span className="text-[#8B7355]">車程 35 分鐘</span></li>
              <li className="flex justify-between"><span>登山步道</span> <span className="text-[#8B7355]">附近輕鬆爬山路線</span></li>
              <li className="flex justify-between"><span>單車道</span> <span className="text-[#8B7355]">東北角海岸自行車道起點</span></li>
            </ul>
          </div>

          <div className="mt-8 text-center">
            <a 
              href="https://line.me/ti/p/@811mszbh" 
              target="_blank" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#00C300] text-white rounded-full text-sm font-medium hover:bg-[#00A000] transition-all"
            >
LINE @811mszbh 回傳後4碼確認
            </a>
          </div>
        </div>
      </section>

      {/* 訂房詢問表單 - 保持原有功能但更美 */}
      <section id="booking" className="max-w-2xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <div className="text-[#8B7355] text-xs tracking-[4px] mb-2">BOOKING</div>
          <h2 className="text-5xl font-light tracking-tight mb-2">訂房請加入 LINE 官方（必須）</h2>
          <p className="text-[#6B665F] font-medium">必須加入 LINE 官方 <span className="text-[#00C300]">@811mszbh</span> 才能完成訂房（未加入無法確認）</p>
          <p className="text-xs text-[#8B7355] mt-1">填寫後請回傳後4碼到 LINE @811mszbh 確認訂單</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-3xl border border-[#EDE8E0] space-y-7">
          {/* 姓名電話 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium tracking-widest text-[#8B7355] mb-1.5">姓名</label>
              <input type="text" name="name" required className="w-full border border-[#D1C9BE] rounded-2xl px-5 py-3.5 text-base" placeholder="您的姓名" />
            </div>
            <div>
              <label className="block text-xs font-medium tracking-widest text-[#8B7355] mb-1.5">聯絡電話</label>
              <input type="tel" name="phone" required className="w-full border border-[#D1C9BE] rounded-2xl px-5 py-3.5 text-base" placeholder="0912345678" inputMode="numeric" maxLength={10} onInput={(e) => { const t = e.currentTarget; t.value = t.value.replace(/\D/g, ''); }} />
            </div>
          </div>

          {/* 日期 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium tracking-widest text-[#8B7355] mb-1.5">入住日期</label>
              <input type="date" name="checkInDate" required className="w-full border border-[#D1C9BE] rounded-2xl px-5 py-3.5" />
            </div>
            <div>
              <label className="block text-xs font-medium tracking-widest text-[#8B7355] mb-1.5">退房日期</label>
              <input type="date" name="checkOutDate" required className="w-full border border-[#D1C9BE] rounded-2xl px-5 py-3.5" />
            </div>
          </div>

          {/* 房型與人數 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium tracking-widest text-[#8B7355] mb-1.5">房型</label>
              <select name="roomType" required className="w-full border border-[#D1C9BE] rounded-2xl px-5 py-3.5 bg-white">
                <option value="">請選擇</option>
                <option value="和鳴雙人房">和鳴雙人房（共4間，衛浴共用）— NT$1,600/晚</option>
                <option value="和風4-6人家庭房">和風4-6人家庭房（僅此1間，兩張雙人床，衛浴共用）— NT$3,200起（4人）+NT$600/人</option>
                <option value="包房方案">包房方案（共5間，衛浴共用）— 平日 NT$8,800 / 假日 NT$9,200（價格固定，特殊活動日另詢）</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium tracking-widest text-[#8B7355] mb-1.5">人數</label>
              <input type="number" name="numberOfPeople" required min="1" className="w-full border border-[#D1C9BE] rounded-2xl px-5 py-3.5" placeholder="2" />
            </div>
          </div>

          <div className="bg-[#E8F5E9] border-2 border-[#4CAF50] rounded-2xl p-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">📱</span>
              <div className="text-sm font-semibold text-[#2E7D32]">
                必須加入 LINE @811mszbh 並回傳後4碼確認訂單
              </div>
            </div>
          </div>

          <a 
            href="https://line.me/ti/p/@811mszbh" 
            target="_blank"
            className="block w-full text-center bg-[#00C300] hover:bg-[#00A000] text-white py-3.5 rounded-2xl text-sm font-medium transition-all"
          >
            📱 立即加入 LINE 官方 @811mszbh
          </a>

          <div>
            <label className="block text-xs font-medium tracking-widest text-[#8B7355] mb-1.5">備註</label>
            <textarea name="note" rows={3} className="w-full border border-[#D1C9BE] rounded-2xl px-5 py-4 resize-y" placeholder="特殊需求、到達時間等"></textarea>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-[#3F3A36] text-white text-sm tracking-[2px] hover:bg-[#2C2926] active:scale-[0.99] transition-all disabled:opacity-60"
          >
            {isSubmitting ? "送出中..." : "送出詢問"}
          </button>

          {/* 成功 / 錯誤訊息 */}
          {submitStatus === 'success' && referenceNumber && (
            <div className="p-8 bg-green-50 rounded-3xl text-center border border-green-100">
              <p className="font-medium mb-2">✅ 表單已收到（僅為詢問）</p>
              <p className="text-3xl font-semibold tracking-widest mb-1 text-[#3F3A36]">{referenceNumber}</p>
              <p className="text-sm text-[#6B665F] mb-3">請回傳訂單後4碼 <span className="font-bold text-[#3F3A36]">{referenceNumber.slice(-4)}</span> 到 LINE @811mszbh 確認訂單</p>
              <p className="text-xs text-[#8B7355] mb-6">⚠️ 必須加入 LINE 官方，未加入無法確認訂房</p>
              <a 
                href="https://line.me/ti/p/@811mszbh" 
                target="_blank" 
                className="inline-flex items-center justify-center bg-[#00C300] text-white w-full py-3.5 rounded-2xl font-medium hover:bg-[#00A000]"
              >
                📱 立即加入 LINE 官方 @811mszbh
              </a>
            </div>
          )}
          {submitStatus === 'error' && <p className="text-center text-red-600">送出失敗，請加入 LINE @811mszbh 回傳後4碼確認訂單。</p>}
        </form>
      </section>

      {/* 浮動 LINE 按鈕 */}
      <a 
        href="https://line.me/ti/p/@811mszbh" 
        target="_blank"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#00C300] text-white px-5 py-3 rounded-full shadow-lg hover:bg-[#00A000] transition-all font-medium text-xs md:text-sm"
      >
        <span>📱 立即加入 LINE @811mszbh</span>
      </a>

      {/* Footer */}
      <footer className="border-t border-[#EDE8E0] py-12 text-sm text-[#8B7355]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-y-6 text-center md:text-left">
          <div>
            <div className="font-medium text-[#3F3A36]">一間屋 · 駅前宿</div>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=%E6%96%B0%E5%8C%97%E5%B8%82%E8%B2%A2%E5%AF%AE%E5%8D%80%E7%A6%8F%E9%9A%86%E8%A1%972%E5%B7%B71-2%E8%99%9F" 
              target="_blank" 
              className="mt-1 block hover:underline hover:text-[#3F3A36] transition-colors"
            >
              新北市貢寮區福隆街2巷1-2號
            </a>
            <div className="text-xs">出站右轉直走 30 秒即達</div>
          </div>
          <div className="space-y-1">
            <a 
              href="https://line.me/ti/p/@811mszbh" 
              target="_blank" 
              className="block text-[#00C300] hover:underline font-medium"
            >
              LINE 官方 @811mszbh（回傳後4碼確認訂單）
            </a>
            <a 
              href="tel:0912362533" 
              className="block hover:text-[#3F3A36] font-medium"
            >
              包房 / 急事專線 0912-362-533
            </a>
          </div>
          <div className="text-xs text-[#8B7355]/70 md:text-right">© {new Date().getFullYear()} 一間屋・駅前宿</div>
        </div>
      </footer>

      {/* 圖片燈箱 - 點擊翻新照片時彈出大圖，增強體驗感 */}
      {modalImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
          onClick={() => setModalImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <img 
              src={modalImage} 
              alt="放大檢視" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" 
            />
            <button 
              onClick={() => setModalImage(null)}
              className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/80 rounded-full w-10 h-10 flex items-center justify-center text-2xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </main>
  );
}