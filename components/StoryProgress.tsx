"use client";

import React from "react";
import { ChapterData } from "@/types/story";

interface StoryProgressProps {
  chapters: ChapterData[];
  activeChapterIndex: number;
  onSelectChapter: (index: number) => void;
  isLightTheme: boolean;
}

export default function StoryProgress({
  chapters,
  activeChapterIndex,
  onSelectChapter,
  isLightTheme,
}: StoryProgressProps) {
  return (
    <aside
      aria-label="Story Chapter Navigation"
      className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-end gap-5 pointer-events-auto select-none"
    >
      <div className="relative flex flex-col items-center gap-4 py-3">
        {/* Continuous connecting line track */}
        <div className="absolute right-[5px] top-3 bottom-3 w-[1px] bg-white/15 pointer-events-none" />
        {/* Animated drawn connecting line that connects chapters */}
        <div
          className="absolute right-[5px] top-3 w-[1px] bg-gradient-to-b from-[#B6A078] to-[#B6A078] transition-all duration-700 ease-out pointer-events-none shadow-[0_0_8px_rgba(182,160,120,0.8)]"
          style={{
            height: `${Math.min(100, Math.max(0, (activeChapterIndex / Math.max(1, chapters.length - 1)) * 100))}%`,
          }}
        />
        {chapters.map((ch, idx) => {
          const isActive = idx === activeChapterIndex;

          return (
            <button
              key={ch.id}
              onClick={() => onSelectChapter(idx)}
              className="group relative flex items-center justify-end py-1.5 focus:outline-none cursor-pointer"
              aria-label={`Jump to Chapter ${ch.number}: ${ch.title}`}
            >
              {/* Tooltip on hover */}
              <div
                className={`absolute right-7 px-2.5 py-1 rounded text-[10px] tracking-[0.2em] uppercase font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-2 group-hover:translate-x-0 ${isLightTheme
                    ? "bg-[#17191D] text-[#F1EFE9] shadow-md"
                    : "bg-[#17191D]/90 text-[#F1EFE9] border border-white/10 shadow-xl backdrop-blur-md"
                  }`}
              >
                <span className="text-[#B6A078] mr-1.5">{ch.number}</span>
                {ch.title}
              </div>

              {/* Indicator Pip */}
              <div className="flex items-center gap-2">
                <span
                  className={`text-[9px] font-mono tracking-wider transition-all duration-300 ${isActive
                      ? "text-[#B6A078] font-bold opacity-100"
                      : "opacity-0 group-hover:opacity-60 text-current"
                    }`}
                >
                  {ch.number}
                </span>

                <div
                  className={`transition-all duration-500 rounded-full ${isActive
                      ? "w-2.5 h-2.5 bg-[#B6A078] scale-110 shadow-[0_0_12px_rgba(182,160,120,0.6)]"
                      : isLightTheme
                        ? "w-1.5 h-1.5 bg-[#17191D]/30 group-hover:bg-[#17191D]/70 group-hover:scale-125"
                        : "w-1.5 h-1.5 bg-white/20 group-hover:bg-white/60 group-hover:scale-125"
                    }`}
                />
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
