"use client";

import React, { useState } from "react";
import Link from "next/link";

interface WatchReference {
  ref: string;
  name: string;
  price: string;
  edition: string;
  materials: string;
  caseSize: string;
  waterResistance: string;
  reserve: string;
  description: string;
  tag: string;
}

const REFERENCES: WatchReference[] = [
  {
    ref: "REF. CH-01-TI",
    name: "CHRONOS TITAN OBSIDIAN",
    price: "$18,500 USD",
    edition: "Limited to 250 Specimens",
    materials: "Grade 5 Titanium & Sintered Obsidian Ceramic",
    caseSize: "41.5 mm / 11.2 mm",
    waterResistance: "200 M / 660 FT",
    reserve: "65 Hours Power Reserve",
    description:
      "The flagship chronometer featuring bead-blasted aerospace titanium, dual-tone ceramic bracelet links, and high-contrast red telemetry markers.",
    tag: "FEATURED CAMPAIGN REFERENCE",
  },
  {
    ref: "REF. CH-02-CP",
    name: "CHRONOS CHAMPAGNE SOLEIL",
    price: "$22,800 USD",
    edition: "Limited to 100 Specimens",
    materials: "Titanium Chassis with Muted Champagne Gold Accents",
    caseSize: "41.5 mm / 11.2 mm",
    waterResistance: "200 M / 660 FT",
    reserve: "65 Hours Power Reserve",
    description:
      "Subtle warm metallic reflections paired with an ivory satin dial, faceted gold hands, and hand-finished chamfered edges.",
    tag: "ATELIER BESPOKE",
  },
  {
    ref: "REF. CH-03-GR",
    name: "CHRONOS PURE GRAPHITE",
    price: "$19,200 USD",
    edition: "Limited to 150 Specimens",
    materials: "Monobloc Matte Ceramic & DLC Titanium",
    caseSize: "41.5 mm / 11.2 mm",
    waterResistance: "200 M / 660 FT",
    reserve: "65 Hours Power Reserve",
    description:
      "A stealth study in monochrome engineering. Non-reflective bead-blasted ceramic with anthracite luminescence.",
    tag: "TECHNICAL EDITION",
  },
];

export default function CollectionPage() {
  const [selectedRef, setSelectedRef] = useState<WatchReference>(REFERENCES[0]);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#090A0C] text-[#F1EFE9] flex flex-col font-sans">
      {/* Top Header */}
      <header className="px-6 md:px-16 py-6 border-b border-white/10 flex items-center justify-between">
        <Link
          href="/"
          className="group flex flex-col tracking-[0.35em] uppercase font-serif text-lg font-light"
        >
          <span className="font-semibold tracking-[0.4em]">CHRONOS</span>
          <span className="text-[9px] tracking-[0.25em] font-sans -mt-1 text-[#B8BDC4]/60">
            COLLECTION DOSSIER
          </span>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-[#B6A078] hover:text-white transition-colors"
        >
          <svg
            className="w-4 h-4 rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
          <span>RETURN TO 3D EXPERIENCE</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-16 py-12 md:py-20">
        {/* Editorial Heading */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#B6A078]">
              CHRONOS HOROLOGY · SERIES 01
            </span>
            <div className="h-[1px] w-12 bg-[#B6A078]/40" />
          </div>

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-4">
            THE CHRONOS ARCHIVE
          </h1>
          <p className="text-base md:text-lg font-light text-[#B8BDC4] max-w-2xl leading-relaxed">
            Each specimen is handcrafted to order in our Swiss atelier.
            Engineered with microscopic tolerance, proprietary materials, and
            uncompromising chronometric precision.
          </p>
        </div>

        {/* Reference Selector Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {REFERENCES.map((item) => {
            const isCurrent = item.ref === selectedRef.ref;

            return (
              <div
                key={item.ref}
                onClick={() => setSelectedRef(item)}
                className={`p-6 rounded-lg border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? "bg-[#17191D] border-[#B6A078] shadow-2xl scale-[1.02]"
                    : "bg-[#121417] border-white/10 hover:border-white/30"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono tracking-widest text-[#B6A078] uppercase">
                      {item.tag}
                    </span>
                    <span className="text-xs font-mono text-[#B8BDC4]">
                      {item.ref}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-light mb-2">
                    {item.name}
                  </h3>
                  <p className="text-xs font-light text-[#B8BDC4]/80 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                  <span className="text-lg font-serif text-[#F1EFE9]">
                    {item.price}
                  </span>
                  <span
                    className={`text-[10px] font-mono tracking-wider uppercase px-2 py-1 rounded ${
                      isCurrent
                        ? "bg-[#B6A078] text-[#090A0C] font-bold"
                        : "text-[#B8BDC4]"
                    }`}
                  >
                    {isCurrent ? "SELECTED" : "VIEW DETAILS"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Specification Dossier */}
        <div className="bg-[#121417] border border-white/10 rounded-xl p-8 md:p-12 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 mb-8 gap-4">
            <div>
              <span className="text-xs font-mono tracking-[0.25em] text-[#B6A078] uppercase block mb-1">
                TECHNICAL SPECIFICATIONS
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-light">
                {selectedRef.name}
              </h2>
            </div>

            <button
              onClick={() => setIsInquiryOpen(true)}
              className="px-6 py-3 rounded-full bg-[#B6A078] text-[#090A0C] font-mono text-xs tracking-[0.2em] uppercase font-bold hover:bg-white transition-colors cursor-pointer self-start md:self-auto"
            >
              REQUEST PRIVATE ACQUISITION
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8BDC4]/60">
                CASE ARCHITECTURE
              </span>
              <h4 className="font-serif text-lg text-[#F1EFE9]">
                {selectedRef.caseSize}
              </h4>
              <p className="text-xs text-[#B8BDC4] font-light">
                Aerospace Grade 5 Titanium monobloc housing.
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8BDC4]/60">
                COMPOSITION & MATERIALS
              </span>
              <h4 className="font-serif text-lg text-[#F1EFE9]">
                {selectedRef.materials}
              </h4>
              <p className="text-xs text-[#B8BDC4] font-light">
                High-density sintering at 1,450°C.
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8BDC4]/60">
                DEPTH & RESISTANCE
              </span>
              <h4 className="font-serif text-lg text-[#F1EFE9]">
                {selectedRef.waterResistance}
              </h4>
              <p className="text-xs text-[#B8BDC4] font-light">
                Hydrostatic triple-seal screw-down crown.
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8BDC4]/60">
                CHRONOMETRY & POWER
              </span>
              <h4 className="font-serif text-lg text-[#F1EFE9]">
                {selectedRef.reserve}
              </h4>
              <p className="text-xs text-[#B8BDC4] font-light">
                28,800 vph (4Hz) column-wheel chronograph.
              </p>
            </div>
          </div>
        </div>

        {/* Private Concierge Acquisition Modal */}
        {isInquiryOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="bg-[#17191D] border border-white/20 rounded-2xl max-w-lg w-full p-8 shadow-2xl relative">
              <button
                onClick={() => {
                  setIsInquiryOpen(false);
                  setSubmitted(false);
                }}
                className="absolute top-6 right-6 text-white/50 hover:text-white cursor-pointer"
              >
                ✕
              </button>

              {!submitted ? (
                <div>
                  <span className="text-xs font-mono tracking-[0.2em] text-[#B6A078] uppercase block mb-1">
                    CONCIERGE INQUIRY
                  </span>
                  <h3 className="font-serif text-2xl font-light mb-2">
                    Reserve {selectedRef.name}
                  </h3>
                  <p className="text-xs font-light text-[#B8BDC4] mb-6">
                    Our atelier will contact you personally within 24 hours to
                    confirm serial allocation and bespoke configuration.
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubmitted(true);
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#B8BDC4] mb-1">
                        Full Name
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Julian Vance"
                        className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-lg text-sm text-[#F1EFE9] focus:outline-none focus:border-[#B6A078]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#B8BDC4] mb-1">
                        Private Email
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="e.g. client@private.com"
                        className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-lg text-sm text-[#F1EFE9] focus:outline-none focus:border-[#B6A078]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#B8BDC4] mb-1">
                        Preferred Atelier City
                      </label>
                      <select className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-lg text-sm text-[#F1EFE9] focus:outline-none focus:border-[#B6A078]">
                        <option value="geneva">Geneva (Rue du Rhône)</option>
                        <option value="newyork">New York (Madison Avenue)</option>
                        <option value="tokyo">Tokyo (Ginza)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 mt-2 rounded-lg bg-[#B6A078] text-[#090A0C] font-mono text-xs tracking-[0.2em] uppercase font-bold hover:bg-white transition-colors cursor-pointer"
                    >
                      CONFIRM ALLOCATION REQUEST
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6">
                  <span className="w-12 h-12 rounded-full bg-[#B6A078]/20 text-[#B6A078] flex items-center justify-center mx-auto mb-4 text-xl">
                    ✓
                  </span>
                  <h3 className="font-serif text-2xl font-light mb-2">
                    Inquiry Received
                  </h3>
                  <p className="text-xs font-light text-[#B8BDC4] max-w-xs mx-auto mb-6">
                    A private allocation officer will reach out with your
                    specimen certificate and personal delivery timeline.
                  </p>
                  <button
                    onClick={() => {
                      setIsInquiryOpen(false);
                      setSubmitted(false);
                    }}
                    className="px-6 py-2.5 rounded-full border border-white/20 text-xs font-mono uppercase tracking-wider hover:bg-white/10"
                  >
                    Close Dossier
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs font-mono text-[#B8BDC4]/60 gap-4">
        <span>CHRONOS HOROLOGY LTD. ALL RIGHTS RESERVED.</span>
        <div className="flex items-center gap-6">
          <span>5-YEAR INTERNATIONAL WARRANTY</span>
          <span>·</span>
          <span>SWISS COSC CERTIFIED</span>
        </div>
      </footer>
    </div>
  );
}
