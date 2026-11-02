"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CHAPTERS } from "@/data/chapters";
import { WatchTransform } from "@/types/story";
import WatchCanvas from "./WatchCanvas";
import StoryHeader from "./StoryHeader";
import StoryProgress from "./StoryProgress";
import StorySectionOverlay from "./StorySectionOverlay";

// Register ScrollTrigger safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Utility: interpolate between two numbers
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// Utility: interpolate hex colors
function lerpColor(a: string, b: string, t: number): string {
  const ah = parseInt(a.replace("#", ""), 16);
  const bh = parseInt(b.replace("#", ""), 16);

  const ar = (ah >> 16) & 255;
  const ag = (ah >> 8) & 255;
  const ab = ah & 255;

  const br = (bh >> 16) & 255;
  const bg = (bh >> 8) & 255;
  const bb = bh & 255;

  const rr = Math.round(ar + (br - ar) * t);
  const rg = Math.round(ag + (bg - ag) * t);
  const rb = Math.round(ab + (bb - ab) * t);

  return `rgb(${rr}, ${rg}, ${rb})`;
}

// Smooth easing curve (smoothstep)
function smoothstep(min: number, max: number, value: number): number {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

export default function StoryExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [bgColor, setBgColor] = useState(CHAPTERS[0].bgColor);

  // Audio Context for subtle luxury acoustic feedback
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Mutable watch transform ref that is updated on scroll and read by Canvas useFrame
  const transformRef = useRef<WatchTransform>({
    ...CHAPTERS[0].transform,
  });

  // Sound generator using Web Audio API
  const playChapterChime = useCallback(() => {
    if (isMuted || typeof window === "undefined") return;

    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext)();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      // Luxury soft metallic frequency
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch {
      // Audio playback silently gracefully fails if blocked
    }
  }, [isMuted]);

  // Responsive mobile check and reduced motion detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const motionHandler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", motionHandler);

    return () => {
      window.removeEventListener("resize", checkMobile);
      mediaQuery.removeEventListener("change", motionHandler);
    };
  }, []);

  // Jump to specific chapter smoothly
  const handleSelectChapter = useCallback((index: number) => {
    if (!containerRef.current) return;

    const totalHeight =
      containerRef.current.scrollHeight - window.innerHeight;
    const targetScroll = (index / (CHAPTERS.length - 1)) * totalHeight;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  }, []);

  // Keyboard navigation (1-7 for chapters, J/K or Up/Down for next/prev)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        document.activeElement?.tagName === "SELECT"
      ) {
        return;
      }

      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= CHAPTERS.length) {
        handleSelectChapter(num - 1);
      } else if (e.key === "ArrowDown" || e.key === "j") {
        if (activeChapterIndex < CHAPTERS.length - 1) {
          handleSelectChapter(activeChapterIndex + 1);
        }
      } else if (e.key === "ArrowUp" || e.key === "k") {
        if (activeChapterIndex > 0) {
          handleSelectChapter(activeChapterIndex - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeChapterIndex, handleSelectChapter]);

  // Master GSAP ScrollTrigger timeline
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: prefersReducedMotion ? 2.2 : 1.6,
        onUpdate: (self) => {
          if (isInteractive) return;

          const progress = self.progress; // 0 to 1
          const totalChapters = CHAPTERS.length;
          const totalIntervals = totalChapters - 1;

          // Determine chapter segment
          const exactPos = progress * totalIntervals;
          const fromIndex = Math.min(Math.floor(exactPos), totalIntervals - 1);
          const toIndex = Math.min(fromIndex + 1, totalIntervals);
          const rawT = exactPos - fromIndex;
          const normalizedT = Math.min(1, rawT / 0.82);
          const t = smoothstep(0, 1, normalizedT);

          // Get transforms based on screen size
          const fromTransform = isMobile
            ? CHAPTERS[fromIndex].mobileTransform
            : CHAPTERS[fromIndex].transform;
          const toTransform = isMobile
            ? CHAPTERS[toIndex].mobileTransform
            : CHAPTERS[toIndex].transform;

          // Interpolate watch transform smoothly
          transformRef.current = {
            posX: lerp(fromTransform.posX, toTransform.posX, t),
            posY: lerp(fromTransform.posY, toTransform.posY, t),
            posZ: lerp(fromTransform.posZ, toTransform.posZ, t),
            rotX: prefersReducedMotion
              ? fromTransform.rotX
              : lerp(fromTransform.rotX, toTransform.rotX, t),
            rotY: prefersReducedMotion
              ? fromTransform.rotY
              : lerp(fromTransform.rotY, toTransform.rotY, t),
            rotZ: prefersReducedMotion
              ? fromTransform.rotZ
              : lerp(fromTransform.rotZ, toTransform.rotZ, t),
            scale: lerp(fromTransform.scale, toTransform.scale, t),
            lightIntensity: lerp(
              fromTransform.lightIntensity,
              toTransform.lightIntensity,
              t
            ),
          };

          // Interpolate background color
          const fromBg = CHAPTERS[fromIndex].bgColor;
          const toBg = CHAPTERS[toIndex].bgColor;
          const blendedColor = lerpColor(fromBg, toBg, t);
          setBgColor(blendedColor);

          // Active chapter index for text overlays
          const nearestIndex = Math.min(
            Math.round(progress * totalIntervals),
            totalIntervals
          );
          setActiveChapterIndex((prev) => {
            if (prev !== nearestIndex) {
              playChapterChime();
            }
            return nearestIndex;
          });
        },
      });

      // Refresh ScrollTrigger to ensure accurate layout metrics
      ScrollTrigger.refresh();
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [isMobile, isInteractive, prefersReducedMotion, playChapterChime]);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScrollNext = () => {
    handleSelectChapter(1);
  };

  const currentChapter = CHAPTERS[activeChapterIndex];
  const isLightTheme = currentChapter.theme === "light";

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${CHAPTERS.length * 170}vh` }}
    >
      {/* Sticky Viewport Container */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden transition-colors duration-700 ease-out"
        style={{ backgroundColor: bgColor }}
      >
        {/* Subtle Luxury Grain & Vignette */}
        <div className="absolute inset-0 bg-grain pointer-events-none z-10" />
        <div
          className={`absolute inset-0 pointer-events-none z-10 transition-opacity duration-1000 ${isLightTheme
            ? "bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.4)_0%,rgba(210,205,195,0.6)_100%)] opacity-80"
            : "bg-[radial-gradient(ellipse_at_center,rgba(25,27,33,0.3)_0%,rgba(5,6,8,0.85)_100%)] opacity-90"
            }`}
        />

        {/* Persistent 3D WebGL Canvas */}
        <WatchCanvas
          transformRef={transformRef}
          isInteractive={isInteractive}
          onModelLoaded={() => ScrollTrigger.refresh()}
        />


        {/* Global Navigation Header (Number indicator and sound system removed) */}
        <StoryHeader
          currentChapter={currentChapter}
          activeChapterIndex={activeChapterIndex}
          totalChapters={CHAPTERS.length}
          isInteractive={isInteractive}
          onToggleInteractive={() => setIsInteractive((prev) => !prev)}
        />

        {/* Chapter Progress Rail */}
        <StoryProgress
          chapters={CHAPTERS}
          activeChapterIndex={activeChapterIndex}
          onSelectChapter={handleSelectChapter}
          isLightTheme={isLightTheme}
        />

        {/* Interactive Mode Banner if active */}
        {isInteractive && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-[#121418]/95 border border-[#B6A078]/60 backdrop-blur-md shadow-2xl flex items-center gap-4 text-xs font-mono tracking-widest uppercase text-white">
            <span className="w-2 h-2 rounded-full bg-[#B6A078] animate-ping" />
            <span>360° INSPECTION MODE — DRAG TO ROTATE & ZOOM</span>
            <button
              onClick={() => setIsInteractive(false)}
              className="px-3 py-1 rounded-full bg-[#B6A078] text-[#07080A] font-bold hover:bg-white transition-colors cursor-pointer"
            >
              RESUME STORY
            </button>
          </div>
        )}

        {/* The 7 Story Overlays */}
        {!isInteractive &&
          CHAPTERS.map((ch, idx) => (
            <StorySectionOverlay
              key={ch.id}
              chapter={ch}
              isActive={idx === activeChapterIndex}
              onScrollToTop={handleScrollToTop}
              onScrollNext={handleScrollNext}
            />
          ))}
      </div>
    </div>
  );
}
