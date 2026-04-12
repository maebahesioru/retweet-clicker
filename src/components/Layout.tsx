"use client";

import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  currentPage: "home" | "shop" | "achievements" | "settings";
  onNavigate: (page: "home" | "shop" | "achievements" | "settings") => void;
  retweets: number;
  theme: "black" | "darkblue" | "light";
};

export function Layout({ children, currentPage, onNavigate, retweets, theme }: LayoutProps) {
  return (
    <div data-theme={theme} className="min-h-screen theme-bg theme-text flex flex-col">
      {/* ヘッダー */}
      <header className="theme-border border-b px-4 py-3 sticky top-0 theme-bg/80 backdrop-blur-md z-10">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">リツイートクリッカー</h1>
          <div className="text-green-500 font-bold">{retweets.toLocaleString()} RT</div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 max-w-xl mx-auto w-full">
        {children}
      </main>

      {/* ボトムナビゲーション */}
      <nav className="theme-border border-t theme-bg/95 backdrop-blur-md sticky bottom-0 z-10">
        <div className="max-w-xl mx-auto flex">
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className={`flex-1 flex flex-col items-center py-3 transition-colors ${
              currentPage === "home" ? "theme-text" : "theme-muted hover:opacity-70"
            }`}
          >
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
              {currentPage === "home" ? (
                <path d="M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z"/>
              ) : (
                <path d="M12 9c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm0 6c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm0-13.304L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM19 19.5c0 .276-.224.5-.5.5h-13c-.276 0-.5-.224-.5-.5V8.429l7-4.375 7 4.375V19.5z"/>
              )}
            </svg>
            <span className="text-xs mt-1">ホーム</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate("shop")}
            className={`flex-1 flex flex-col items-center py-3 transition-colors ${
              currentPage === "shop" ? "theme-text" : "theme-muted hover:opacity-70"
            }`}
          >
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
              {currentPage === "shop" ? (
                <path d="M7.5 2C5.57 2 4 3.57 4 5.5V6h16v-.5C20 3.57 18.43 2 16.5 2h-9zM4 8v11.5C4 20.88 5.12 22 6.5 22h11c1.38 0 2.5-1.12 2.5-2.5V8H4zm8 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/>
              ) : (
                <path d="M7.5 2C5.57 2 4 3.57 4 5.5V6h16v-.5C20 3.57 18.43 2 16.5 2h-9zM6 5.5C6 4.67 6.67 4 7.5 4h9c.83 0 1.5.67 1.5 1.5V4H6v1.5zM4 8v11.5C4 20.88 5.12 22 6.5 22h11c1.38 0 2.5-1.12 2.5-2.5V8H4zm2 2h12v9.5c0 .28-.22.5-.5.5h-11c-.28 0-.5-.22-.5-.5V10zm6 1c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
              )}
            </svg>
            <span className="text-xs mt-1">ショップ</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate("achievements")}
            className={`flex-1 flex flex-col items-center py-3 transition-colors ${
              currentPage === "achievements" ? "theme-text" : "theme-muted hover:opacity-70"
            }`}
          >
            <span className="text-2xl">{currentPage === "achievements" ? "🏆" : "🏅"}</span>
            <span className="text-xs mt-1">実績</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate("settings")}
            className={`flex-1 flex flex-col items-center py-3 transition-colors ${
              currentPage === "settings" ? "theme-text" : "theme-muted hover:opacity-70"
            }`}
          >
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
              {currentPage === "settings" ? (
                <path d="M10.54 1.75h2.92l1.57 2.36c.11.17.32.25.53.21l2.53-.59 2.17 2.17-.58 2.54c-.05.2.04.41.21.53l2.36 1.57v2.92l-2.36 1.57c-.17.12-.26.33-.21.53l.58 2.54-2.17 2.17-2.53-.59c-.21-.04-.42.04-.53.21l-1.57 2.36h-2.92l-1.58-2.36c-.11-.17-.32-.25-.52-.21l-2.54.59-2.17-2.17.59-2.54c.04-.2-.05-.41-.21-.53L1.75 13.46v-2.92l2.36-1.57c.16-.12.25-.33.21-.53l-.59-2.54 2.17-2.17 2.54.59c.2.04.41-.04.52-.21l1.58-2.36zm1.46 5.75c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5z"/>
              ) : (
                <path d="M10.54 1.75h2.92l1.57 2.36c.11.17.32.25.53.21l2.53-.59 2.17 2.17-.58 2.54c-.05.2.04.41.21.53l2.36 1.57v2.92l-2.36 1.57c-.17.12-.26.33-.21.53l.58 2.54-2.17 2.17-2.53-.59c-.21-.04-.42.04-.53.21l-1.57 2.36h-2.92l-1.58-2.36c-.11-.17-.32-.25-.52-.21l-2.54.59-2.17-2.17.59-2.54c.04-.2-.05-.41-.21-.53L1.75 13.46v-2.92l2.36-1.57c.16-.12.25-.33.21-.53l-.59-2.54 2.17-2.17 2.54.59c.2.04.41-.04.52-.21l1.58-2.36zm1.46 5.75c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 2c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5z"/>
              )}
            </svg>
            <span className="text-xs mt-1">設定</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
