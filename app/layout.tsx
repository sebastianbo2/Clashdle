import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Suspense } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SupercellFont = localFont({
  src: "../public/fonts/Supercell-Magic Regular.ttf",
  weight: "400",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Clashdle - Clash of Clans",
  description: "Guess the daily Clash of Clans troop",
  icons: {
    icon: "/webicon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${SupercellFont.className} antialiased`}
      >
        <Suspense>
        {children}
        </Suspense>
      </body>
    </html>
  );
}
