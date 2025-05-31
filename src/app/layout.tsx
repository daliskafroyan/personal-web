import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Royyan - Software Developer",
  description: "Software developer passionate about crafting high-performance solutions with engineering excellence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${robotoMono.variable}`}>
      <body className={`${robotoMono.className}`}>
        {children}
      </body>
    </html>
  );
}
