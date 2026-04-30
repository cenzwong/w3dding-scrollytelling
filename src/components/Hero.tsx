import React from 'react';
import type { StoryData } from '../data/story';

interface HeroProps {
  story: StoryData;
  scrollY: number;
}

export function Hero({ story, scrollY }: HeroProps) {
  return (
    <section
      id={story.id}
      className="story-chapter h-screen flex flex-col items-center justify-center text-center px-6"
    >
      <div
        className="flex flex-col items-center transition-opacity duration-1000"
        style={{ opacity: Math.max(0, 1 - scrollY * 0.002) }} // Fade out on scroll down
      >
        <h2 className="text-sm tracking-[0.5em] text-gray-400 mb-6 uppercase">{story.subtitle}</h2>
        <h1 className="text-5xl md:text-8xl font-light tracking-wider mb-12">
          {story.title}
        </h1>
        <div className="animate-bounce text-gray-500 mt-12 flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest uppercase">{story.content}</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
