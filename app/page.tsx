"use client";
import React, { useState, useEffect } from 'react';
import { storyData } from '../src/data/story';
import { Hero } from '../src/components/Hero';
import { StoryChapter } from '../src/components/StoryChapter';

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

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
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
          /* eslint-disable-next-line @next/next/no-img-element */
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
        <Hero story={storyData[0]} scrollY={scrollY} />

        {/* Story Chapters */}
        <div className="max-w-4xl mx-auto w-full pb-32">
          {storyData.slice(1).map((story, index) => (
            <StoryChapter
              key={story.id}
              story={story}
              activeChapter={activeChapter}
              isEven={index % 2 === 0}
            />
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
