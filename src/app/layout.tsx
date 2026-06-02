import type { Metadata, Viewport } from "next";
import { Bebas_Neue, DM_Sans, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { EVENT } from "@/lib/constants";

// Tipografia fiel ao Media Kit — condensada e impactante
const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["600", "700", "800"],
  variable: "--font-barlow",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://xzone2026.com.br"),
  title: {
    default: `${EVENT.fullName} — ${EVENT.tagline}`,
    template: `%s | ${EVENT.name}`,
  },
  description: `${EVENT.name}: ${EVENT.date}. Torneios de eSports, Cosplay, Dubladores, Game Jam, Área Geek e muito mais. Compre seu ingresso agora!`,
  keywords: ["X-Zone", "evento gamer", "evento geek", "Goiânia", "eSports", "cosplay", "anime", "games", "2026"],
  authors: [{ name: "X-Zone" }],
  openGraph: {
    title: `${EVENT.fullName} — ${EVENT.tagline}`,
    description: `O maior evento gamer e geek de Goiânia. ${EVENT.date} · ${EVENT.time}.`,
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "X-Zone 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${EVENT.fullName}`,
    description: `O maior evento gamer e geek de Goiânia. ${EVENT.date}.`,
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#20CD5C",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${bebasNeue.variable} ${barlowCondensed.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        {children}
      </body>
    </html>
  );
}
