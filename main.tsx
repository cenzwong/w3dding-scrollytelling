```react
import React, { useState, useEffect, useRef } from 'react';

// --- 資料結構 (Data Flow) ---
// 這裡模擬你提到的 data.json，抽離內容與 UI 邏輯
const storyData = [
  {
    id: 'hero',
    year: '',
    title: 'OUR STORY',
    subtitle: '一段關於時間與愛的紀錄',
    content: '向下滾動開始',
    img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2500&auto=format&fit=crop', // 婚紗/唯美空景
  },
  {
    id: 'childhood',
    year: '1998',
    title: '平行時空',
    subtitle: '我們在同一個城市長大，卻未曾相遇。',
    content: '那時的我喜歡在公園奔跑，而你總是在圖書館安靜地看書。我們呼吸著一樣的空氣，走過同一條街道，命運的齒輪卻還沒開始轉動。',
    img: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=2500&auto=format&fit=crop', // 模糊的童年/陽光
  },
  {
    id: 'highschool',
    year: '2010',
    title: '初次交集',
    subtitle: '那年秋天，中學的走廊。',
    content: '還記得第一次看到你，是因為你抱著一疊作業本撞到了我。沒有電影裡浪漫的慢動作，只有散落一地的紙張和我們尷尬的道歉。但那一刻，你的眼睛亮得讓我記到現在。',
    img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2500&auto=format&fit=crop', // 校園/課桌椅
  },
  {
    id: 'university',
    year: '2016',
    title: '各自飛翔，卻繫著線',
    subtitle: '倫敦與香港，9600公里的距離。',
    content: '大學時我們分隔兩地，時差有八個小時。我這裡的日出，是你那裡的深夜。無數個越洋視訊，把我們的世界緊緊連在一起。距離沒有讓我們疏遠，反而學會了珍惜。',
    img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2500&auto=format&fit=crop', // 城市夜景/機場/距離感
  },
  {
    id: 'proposal',
    year: '2024',
    title: '決定是你',
    subtitle: '冰島的極光下，時間彷彿靜止。',
    content: '零下十度的風吹得臉頰發痛，但當我單膝下跪，看到你眼裡的淚光倒映著綠色的極光時，我知道，這就是我想要共度餘生的畫面。你說了那句：「我願意」。',
    img: 'https://images.unsplash.com/photo-1518104593124-ac2e82a5eb9b?q=80&w=2500&auto=format&fit=crop', // 戒指/極光/浪漫場景
  },
  {
    id: 'wedding',
    year: '2026',
    title: '新的篇章',
    subtitle: '今天，我們站在這裡。',
    content: '這不是故事的結局，而是我們全新冒險的序章。謝謝你，願意成為我的家人。',
    img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2500&auto=format&fit=crop', // 婚禮佈置/牽手
  }
];

export default function App() {
  // 記錄當前顯示的章節 ID
  const [activeChapter, setActiveChapter] = useState(storyData[0].id);
  // 用於 Hero Section 的微縮放效果 (輕量級 Scroll tracking)
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // 1. 處理 Hero 區塊的輕量級視差滾動
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 2. 使用 IntersectionObserver 處理章節切換 (高效能，不依賴 Scroll 事件頻繁計算)
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // 當區塊進入視窗中間 20% 區域時觸發
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveChapter(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // 綁定所有章節元素
    const elements = document.querySelectorAll('.story-chapter');
    elements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-gray-800">
      
      {/* Z-Index: 0 
        背景圖片層 (Fixed) 
        這裡我們預先載入所有圖片，並透過 opacity 切換，這是達到 Apple-like 絲滑感的核心。
        避免了真實 DOM 的新增刪除，完全依賴 GPU 加速的 opacity 與 transform。
      */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden">
        {storyData.map((story) => (
          <img
            key={`img-${story.id}`}
            src={story.img}
            alt={story.title}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1500ms] ease-in-out
              ${activeChapter === story.id ? 'opacity-50 scale-100' : 'opacity-0 scale-110'}
            `}
            style={{
              // 針對 Hero 圖片加上微幅的往下捲動放大效果
              transform: story.id === 'hero' && activeChapter === 'hero' 
                ? `scale(${1 + scrollY * 0.0005})` 
                : '',
            }}
          />
        ))}
        {/* 全域暗色遮罩，確保白色文字永遠清晰 (Accessibility) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90"></div>
      </div>

      {/* Z-Index: 10 
        文字內容層 (Scrollable) 
      */}
      <div className="relative z-10">
        
        {/* Hero Section */}
        <section 
          id={storyData[0].id} 
          className="story-chapter h-screen flex flex-col items-center justify-center text-center px-6"
        >
          <div 
            className="flex flex-col items-center transition-opacity duration-1000"
            style={{ opacity: 1 - scrollY * 0.002 }} // 往下滾動時淡出
          >
            <h2 className="text-sm tracking-[0.5em] text-gray-400 mb-6 uppercase">{storyData[0].subtitle}</h2>
            <h1 className="text-5xl md:text-8xl font-light tracking-wider mb-12">
              {storyData[0].title}
            </h1>
            <div className="animate-bounce text-gray-500 mt-12 flex flex-col items-center gap-2">
              <span className="text-xs tracking-widest uppercase">{storyData[0].content}</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </section>

        {/* Story Chapters */}
        <div className="max-w-4xl mx-auto w-full pb-32">
          {storyData.slice(1).map((story, index) => (
            <section
              key={story.id}
              id={story.id}
              className={`story-chapter min-h-[120vh] flex flex-col justify-center px-6 md:px-12
                ${index % 2 === 0 ? 'items-start text-left' : 'items-end text-right'}
              `}
            >
              <div 
                className={`max-w-lg transition-all duration-1000 transform
                  ${activeChapter === story.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}
                `}
              >
                <div className="mb-4 flex items-center gap-4">
                  {/* 年份標籤 */}
                  <span className="text-3xl md:text-5xl font-extralight text-gray-500 font-serif">
                    {story.year}
                  </span>
                  <div className="h-px bg-gray-500 flex-grow max-w-[50px]"></div>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-medium mb-4 tracking-wide leading-tight">
                  {story.title}
                </h2>
                
                <h3 className="text-lg md:text-xl text-gray-300 mb-6 font-light">
                  {story.subtitle}
                </h3>
                
                <p className="text-base md:text-lg text-gray-400 leading-relaxed font-light">
                  {story.content}
                </p>
              </div>
            </section>
          ))}
        </div>

        {/* Footer */}
        <footer className="h-[50vh] flex items-center justify-center border-t border-white/10 bg-black backdrop-blur-sm">
          <p className="text-gray-500 tracking-widest text-sm uppercase">
            Thanks for being part of our story.
          </p>
        </footer>

      </div>
    </div>
  );
}

```
