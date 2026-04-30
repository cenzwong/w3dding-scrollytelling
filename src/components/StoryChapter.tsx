import React from 'react';
import type { StoryData } from '../data/story';

interface StoryChapterProps {
  story: StoryData;
  activeChapter: string;
  isEven: boolean;
}

export function StoryChapter({ story, activeChapter, isEven }: StoryChapterProps) {
  return (
    <section
      id={story.id}
      className={`story-chapter min-h-[120vh] flex flex-col justify-center px-6 md:px-12
        ${isEven ? 'items-start text-left' : 'items-end text-right'}
      `}
    >
      <div
        className={`max-w-lg transition-all duration-1000 transform
          ${activeChapter === story.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}
        `}
      >
        <div className={`mb-4 flex items-center gap-4 ${isEven ? '' : 'flex-row-reverse'}`}>
          {/* Year tag */}
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
  );
}
