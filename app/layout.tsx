import type { Metadata } from "next";
import { Geist_Mono, Outfit, Syne } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CHRONOS — Engineered for the Infinite | Luxury Chronograph Wristwatch",
  description:
    "An editorial 3D storytelling campaign for Chronos Collection 01. Engineered from aerospace titanium and technical ceramics with precision chronometric architecture.",
  openGraph: {
    title: "CHRONOS — Engineered for the Infinite",
    description:
      "A cinematic scroll-driven journey exploring the architecture, materials, and chronometric mechanics of Chronos Collection 01.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${syne.variable} ${geistMono.variable} antialiased dark`}
    >
      <body className="bg-[#090A0C] text-[#F1EFE9] selection:bg-[#B6A078]/30 selection:text-[#F1EFE9] w-full min-h-screen">
        {children}
      </body>
    </html>
  );
}
