"use client";

import React from "react";
import Link from "next/link";
import { ChapterData } from "@/types/story";

interface StorySectionOverlayProps {
  chapter: ChapterData;
  isActive: boolean;
  onScrollToTop: () => void;
  onScrollNext: () => void;
}

export default function StorySectionOverlay({
  chapter,
  isActive,
  onScrollToTop,
  onScrollNext,
}: StorySectionOverlayProps) {
  return (
    <div
      aria-hidden={!isActive}
      className={`absolute inset-0 w-full h-full flex items-center justify-center px-6 md:px-16 lg:px-24 pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isActive
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-[0.98] pointer-events-none"
      } text-white`}
    >
      {/* ============================================================== */}
      {/* 01: THE OVERVIEW (Top / Hero View) */}
      {/* ============================================================== */}
      {chapter.id === "overview" && (
        <div className="w-full max-w-7xl mx-auto flex flex-col justify-between h-[86vh] py-6">
          {/* Animated architectural precision line */}
          <div
            className={`w-full flex items-center gap-3 transition-all duration-700 delay-100 ${
              isActive ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
            }`}
          >
            <div
              className={`h-[1px] w-24 bg-gradient-to-r from-[#B6A078] to-transparent ${
                isActive ? "animate-draw-line-h" : ""
              }`}
            />
            <span className="text-[11px] tracking-[0.3em] font-mono text-[#B6A078] font-semibold">
              ATELIER 01
            </span>
          </div>

          {/* Monumental Headline */}
          <div className="max-w-3xl mt-auto mb-10">
            <h1
              className={`font-display text-7xl sm:text-8xl md:text-9xl lg:text-[9.5rem] font-semibold tracking-tight leading-[0.85] mb-6 text-contrast-monumental transition-all duration-1000 delay-200 ${
                isActive ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
            >
              TIME,
              <br />
              <span className="text-[#B6A078] font-medium">REDEFINED.</span>
            </h1>
            <p
              className={`text-2xl md:text-3xl font-normal text-white/95 max-w-lg leading-snug text-contrast-body transition-all duration-700 delay-300 ${
                isActive ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              {chapter.description}
            </p>
          </div>

          {/* Bottom Prompt */}
          <div
            className={`flex items-center justify-between border-t border-white/20 pt-4 transition-all duration-700 delay-300 ${
              isActive ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B6A078] animate-pulse-subtle" />
              <span className="text-xs tracking-[0.3em] uppercase font-mono text-white/80 font-medium">
                GENÈVE HOROLOGY
              </span>
            </div>

            <button
              onClick={onScrollNext}
              className="relative px-6 py-3 rounded-full border border-[#B6A078]/40 hover:border-[#B6A078] bg-black/40 hover:bg-[#B6A078]/20 backdrop-blur-md flex items-center gap-3 text-xs md:text-sm tracking-[0.25em] uppercase font-mono text-[#B6A078] hover:text-white transition-all duration-300 cursor-pointer group font-semibold shimmer-effect hover:scale-105 active:scale-95 hover:shadow-[0_0_25px_rgba(182,160,120,0.5)]"
            >
              <span>SCROLL TO EXPLORE</span>
              <svg
                className="w-4 h-4 animate-bounce group-hover:translate-y-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 02: THE DIAMETER (Focus on 41.5mm Circular Case) */}
      {/* ============================================================== */}
      {chapter.id === "diameter" && (
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 lg:col-span-6 flex flex-col justify-center">
            {/* Animated drawing line */}
            <div
              className={`flex items-center gap-3 mb-5 transition-all duration-700 delay-100 ${
                isActive ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
              }`}
            >
              <div
                className={`h-[1px] w-20 bg-[#B6A078] ${
                  isActive ? "animate-draw-line-h" : ""
                }`}
              />
              <span className="text-xs font-mono tracking-[0.3em] text-[#B6A078] uppercase font-semibold">
                AEROSPACE GRADE 5
              </span>
            </div>

            <h2
              className={`font-display text-7xl sm:text-8xl md:text-9xl lg:text-[9.5rem] font-semibold tracking-tight leading-[0.85] mb-6 text-contrast-monumental transition-all duration-1000 delay-200 ${
                isActive ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
            >
              41.5 MM
              <br />
              <span className="text-[#B6A078] font-medium">DIAMETER.</span>
            </h2>

            <p
              className={`text-2xl md:text-3xl font-normal leading-snug text-white/95 max-w-md text-contrast-body transition-all duration-700 delay-300 ${
                isActive ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              {chapter.description}
            </p>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 03: THE PROFILE (Vertical Frontal View - No Backward) */}
      {/* ============================================================== */}
      {chapter.id === "thickness" && (
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 lg:col-span-6 flex flex-col justify-center">
            {/* Animated drawing line */}
            <div
              className={`flex items-center gap-3 mb-5 transition-all duration-700 delay-100 ${
                isActive ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
              }`}
            >
              <div
                className={`h-[1px] w-20 bg-[#B6A078] ${
                  isActive ? "animate-draw-line-h" : ""
                }`}
              />
              <span className="text-xs font-mono tracking-[0.3em] text-[#B6A078] uppercase font-semibold">
                ERGONOMIC PROFILE
              </span>
            </div>

            <h2
              className={`font-display text-7xl sm:text-8xl md:text-9xl lg:text-[9.5rem] font-semibold tracking-tight leading-[0.85] mb-6 text-contrast-monumental transition-all duration-1000 delay-200 ${
                isActive ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
            >
              11.2 MM
              <br />
              <span className="text-[#B6A078] font-medium">PROFILE.</span>
            </h2>

            <p
              className={`text-2xl md:text-3xl font-normal leading-snug text-white/95 max-w-md text-contrast-body transition-all duration-700 delay-300 ${
                isActive ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              {chapter.description}
            </p>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 04: THE BELT (Ceramic & Titanium Articulated Links) */}
      {/* ============================================================== */}
      {chapter.id === "belt" && (
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="hidden md:block md:col-span-5" />

          <div className="md:col-span-7 lg:col-span-6 md:ml-auto flex flex-col justify-center">
            {/* Animated drawing line */}
            <div
              className={`flex items-center gap-3 mb-5 transition-all duration-700 delay-100 ${
                isActive ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
              }`}
            >
              <div
                className={`h-[1px] w-20 bg-[#B6A078] ${
                  isActive ? "animate-draw-line-h" : ""
                }`}
              />
              <span className="text-xs font-mono tracking-[0.3em] text-[#B6A078] uppercase font-semibold">
                ARTICULATED LINKS
              </span>
            </div>

            <h2
              className={`font-display text-7xl sm:text-8xl md:text-9xl lg:text-[9.5rem] font-semibold tracking-tight leading-[0.85] mb-6 text-contrast-monumental transition-all duration-1000 delay-200 ${
                isActive ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
            >
              THE BELT.
              <br />
              <span className="text-[#B6A078] font-medium">ARTICULATED.</span>
            </h2>

            <p
              className={`text-2xl md:text-3xl font-normal leading-snug text-white/95 max-w-md text-contrast-body transition-all duration-700 delay-300 ${
                isActive ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              {chapter.description}
            </p>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 05: THE FACE (Macro Zoom into Dial) */}
      {/* ============================================================== */}
      {chapter.id === "dial" && (
        <div className="w-full max-w-7xl mx-auto h-[86vh] flex flex-col justify-between py-6">
          <div className="max-w-2xl">
            {/* Animated drawing line */}
            <div
              className={`flex items-center gap-3 mb-4 transition-all duration-700 delay-100 ${
                isActive ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
              }`}
            >
              <div
                className={`h-[1px] w-20 bg-[#B6A078] ${
                  isActive ? "animate-draw-line-h" : ""
                }`}
              />
              <span className="text-xs font-mono tracking-[0.3em] text-[#B6A078] uppercase font-semibold">
                HIGH CHRONOMETRY
              </span>
            </div>

            <h2
              className={`font-display text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-semibold tracking-tight leading-[0.85] mb-4 text-contrast-monumental transition-all duration-1000 delay-200 ${
                isActive ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
            >
              EVERY SECOND,
              <br />
              <span className="text-[#B6A078] font-medium">CONSIDERED.</span>
            </h2>

            <p
              className={`text-xl md:text-2xl font-normal text-white/95 leading-snug text-contrast-body transition-all duration-700 delay-300 ${
                isActive ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              {chapter.description}
            </p>
          </div>

          {/* Minimalist Feature Pips with rich interactive hover state */}
          <div
            className={`flex flex-wrap items-center gap-3 border-t border-white/20 pt-4 transition-all duration-700 delay-300 ${
              isActive ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <div className="group relative px-5 py-2.5 rounded-full bg-[#121418]/90 border border-white/15 hover:border-[#B6A078] backdrop-blur-md flex items-center gap-2.5 shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(182,160,120,0.45)] cursor-default">
              <span className="w-2 h-2 rounded-full bg-[#B6A078] group-hover:scale-125 transition-transform duration-300 shadow-[0_0_8px_#B6A078]" />
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-white font-semibold group-hover:text-[#B6A078] transition-colors">
                RED TELEMETRY SCALE
              </span>
            </div>

            <div className="group relative px-5 py-2.5 rounded-full bg-[#121418]/90 border border-white/15 hover:border-[#B6A078] backdrop-blur-md flex items-center gap-2.5 shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(182,160,120,0.45)] cursor-default">
              <span className="w-2 h-2 rounded-full bg-[#B6A078] group-hover:scale-125 transition-transform duration-300 shadow-[0_0_8px_#B6A078]" />
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-white font-semibold group-hover:text-[#B6A078] transition-colors">
                FACETED RHODIUM HANDS
              </span>
            </div>

            <div className="group relative px-5 py-2.5 rounded-full bg-[#121418]/90 border border-white/15 hover:border-[#B6A078] backdrop-blur-md flex items-center gap-2.5 shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(182,160,120,0.45)] cursor-default">
              <span className="w-2 h-2 rounded-full bg-[#B6A078] group-hover:scale-125 transition-transform duration-300 shadow-[0_0_8px_#B6A078]" />
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-white font-semibold group-hover:text-[#B6A078] transition-colors">
                SAPPHIRE CRYSTAL
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 06: THE CALIBRE (Engine / High-Beat Mechanism) */}
      {/* ============================================================== */}
      {chapter.id === "calibre" && (
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="hidden md:block md:col-span-5" />

          <div className="md:col-span-7 lg:col-span-6 md:ml-auto flex flex-col justify-center">
            {/* Animated drawing line */}
            <div
              className={`flex items-center gap-3 mb-5 transition-all duration-700 delay-100 ${
                isActive ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
              }`}
            >
              <div
                className={`h-[1px] w-20 bg-[#B6A078] ${
                  isActive ? "animate-draw-line-h" : ""
                }`}
              />
              <span className="text-xs font-mono tracking-[0.3em] text-[#B6A078] uppercase font-semibold">
                MECHANICAL ARCHITECTURE
              </span>
            </div>

            <h2
              className={`font-display text-7xl sm:text-8xl md:text-9xl lg:text-[9.5rem] font-semibold tracking-tight leading-[0.85] mb-6 text-contrast-monumental transition-all duration-1000 delay-200 ${
                isActive ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
            >
              CALIBRE 01.
              <br />
              <span className="text-[#B6A078] font-medium">ENGINE.</span>
            </h2>

            <p
              className={`text-2xl md:text-3xl font-normal leading-snug text-white/95 max-w-md text-contrast-body transition-all duration-700 delay-300 ${
                isActive ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              {chapter.description}
            </p>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 07: THE SIGNATURE FINALE (Triangular Composition) */}
      {/* ============================================================== */}
      {chapter.id === "signature" && (
        <div className="w-full max-w-7xl mx-auto h-[82vh] md:h-[84vh] flex flex-col justify-between pt-1 pb-4 relative pointer-events-none">
          {/* Upper Triangle: Top-Left ("MAKE EVERY") */}
          <div className="pt-1 md:pt-3 max-w-md text-left pointer-events-auto">
            <div
              className={`flex items-center gap-3 mb-2 transition-all duration-700 delay-100 ${
                isActive ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
              }`}
            >
              <div
                className={`h-[1px] w-14 bg-[#B6A078] ${
                  isActive ? "animate-draw-line-h" : ""
                }`}
              />
              <span className="text-[11px] font-mono tracking-[0.35em] text-[#B6A078] uppercase font-semibold">
                GENÈVE ATELIER
              </span>
            </div>

            <h2
              className={`font-display text-4xl sm:text-5xl md:text-6xl xl:text-[4.8rem] font-semibold tracking-tight leading-[0.88] text-contrast-monumental transition-all duration-1000 delay-200 ${
                isActive ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
              }`}
            >
              MAKE
              <br />
              EVERY
            </h2>
          </div>

          {/* Lower Triangle: Bottom-Right ("SECOND YOURS.") */}
          <div className="self-end max-w-lg text-right flex flex-col items-end pointer-events-auto pb-2">
            <h2
              className={`font-display text-4xl sm:text-5xl md:text-6xl xl:text-[4.8rem] font-semibold tracking-tight leading-[0.88] mb-2 text-[#B6A078] transition-all duration-1000 delay-300 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] ${
                isActive ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              SECOND
              <br />
              YOURS.
            </h2>

            <p
              className={`text-sm sm:text-base font-normal text-white/90 max-w-md mb-3 leading-snug text-contrast-body transition-all duration-700 delay-400 ${
                isActive ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              {chapter.description}
            </p>

            {/* Luxury CTAs */}
            <div
              className={`flex flex-col sm:flex-row items-center gap-3 transition-all duration-700 delay-500 ${
                isActive ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <Link
                href="/collection"
                className="relative px-7 py-3 rounded-full bg-white text-[#07080A] font-mono text-xs md:text-sm tracking-[0.22em] uppercase font-bold hover:bg-[#B6A078] hover:text-[#07080A] transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:shadow-[0_0_35px_rgba(182,160,120,0.8)] cursor-pointer shimmer-effect hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                EXPLORE THE WATCH
              </Link>

              <button
                onClick={onScrollToTop}
                className="relative group px-7 py-3 rounded-full border-2 border-white/40 hover:border-[#B6A078] text-white font-mono text-xs md:text-sm tracking-[0.22em] uppercase font-semibold bg-white/[0.04] hover:bg-white/[0.12] transition-all duration-300 cursor-pointer shimmer-effect hover:scale-105 active:scale-95 hover:shadow-[0_0_25px_rgba(182,160,120,0.4)] flex items-center gap-2.5 whitespace-nowrap"
              >
                <span>BACK TO THE BEGINNING</span>
                <svg
                  className="w-4 h-4 text-[#B6A078] transition-transform duration-300 group-hover:-translate-y-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="w-full border-t border-white/15 pt-2 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-white/60 tracking-wider pointer-events-auto">
            <span>CHRONOS HOROLOGY LTD. © 2026</span>
            <div className="flex items-center gap-4 my-0.5 sm:my-0 font-normal text-white/75">
              <span>GENEVA</span>
              <span>·</span>
              <span>TOKYO</span>
              <span>·</span>
              <span>NEW YORK</span>
            </div>
            <span>LIMITED 250 SPECIMENS</span>
          </div>
        </div>
      )}
    </div>
  );
}
