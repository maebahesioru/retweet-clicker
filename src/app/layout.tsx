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

// rebuild trigger
export const metadata: Metadata = {
  metadataBase: new URL("https://retweet-clicker.hikamer.f5.si"),
  icons: { icon: "/icon.svg" },
  title: "リツイートクリッカー",
  description: "リツイートをひたすらクリックするゲーム。アップグレードを購入してリツイート数を増やそう！",
  keywords: ["リツイートクリッカー", "クリッカーゲーム", "放置ゲーム", "ブラウザゲーム"],
  openGraph: {
    title: "リツイートクリッカー",
    description: "リツイートをひたすらクリックするゲーム。アップグレードを購入してリツイート数を増やそう！",
    type: "website",
    images: ["/avatar.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "リツイートクリッカー",
    description: "リツイートをひたすらクリックするゲーム。アップグレードを購入してリツイート数を増やそう！",
    images: ["/avatar.png"],
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
      </body>
    </html>
  );
}
