"use client";

import React from "react";
import Link from "next/link";
import { ChapterData } from "@/types/story";

interface StoryHeaderProps {
  currentChapter: ChapterData;
  activeChapterIndex?: number;
  totalChapters?: number;
  isInteractive: boolean;
  onToggleInteractive: () => void;
  isMuted?: boolean;
  onToggleMuted?: () => void;
}

export default function StoryHeader({
  currentChapter,
  isInteractive,
  onToggleInteractive,
}: StoryHeaderProps) {
  const isLight = currentChapter.theme === "light";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between transition-colors duration-700 pointer-events-auto ${isLight ? "text-[#17191D]" : "text-[#F1EFE9]"
        }`}
    >
      {/* Brand Identity */}
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="group flex flex-col tracking-[0.35em] uppercase font-serif text-lg md:text-xl font-light hover:opacity-80 transition-opacity"
        >
          <span className="font-semibold tracking-[0.4em]">CHRONOS</span>
          <span
            className={`text-[9px] tracking-[0.25em] font-sans -mt-1 ${isLight ? "text-[#17191D]/60" : "text-[#B8BDC4]/60"
              }`}
          >
            GENÈVE · ATELIER 01
          </span>
        </Link>
      </div>

      {/* Chapter Title (Number indicator removed) */}
      <div className="hidden md:flex items-center text-xs tracking-[0.3em] uppercase font-mono font-semibold text-white/90">
        <span>{currentChapter.title}</span>
      </div>

      {/* Controls & CTAs (Sound system removed) */}
      <div className="flex items-center gap-3 md:gap-5">

        {/* 360° Free Exploration Toggle */}
        <button
          onClick={onToggleInteractive}
          className={`px-3 py-1.5 rounded-full border text-[11px] tracking-[0.2em] uppercase font-mono transition-all flex items-center gap-1.5 cursor-pointer ${isInteractive
              ? "bg-[#B6A078] text-[#090A0C] border-[#B6A078] font-bold shadow-lg"
              : isLight
                ? "border-[#17191D]/30 hover:border-[#17191D] hover:bg-black/5"
                : "border-white/20 hover:border-white hover:bg-white/5"
            }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${isInteractive ? "bg-[#090A0C] animate-ping" : "bg-[#B6A078]"
              }`}
          />
          {isInteractive ? "Exit 360°" : "360° View"}
        </button>

        {/* Collection Link */}
        <Link
          href="/collection"
          className={`px-3.5 py-1.5 rounded-full text-[11px] tracking-[0.2em] uppercase font-mono transition-all cursor-pointer ${isLight
              ? "bg-[#17191D] text-[#F1EFE9] hover:bg-black"
              : "bg-[#F1EFE9] text-[#090A0C] hover:bg-white"
            }`}
        >
          Collection
        </Link>
      </div>
    </header>
  );
}
