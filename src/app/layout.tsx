import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LUMINA XP - Adaptive Experience Platform",
  description: "Esperienze che si adattano. Adaptive Experience Platform for Companies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-background text-foreground overflow-x-hidden selection:bg-accent selection:text-background">
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}
