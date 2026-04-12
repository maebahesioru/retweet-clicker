"use client";

import { useState, useCallback } from "react";
import { FloatingText, QUOTE_WORDS } from "@/hooks/useGameState";

type TweetCardProps = {
  retweets: number;
  likes: number;
  bookmarks: number;
  replies: number;
  totalEngagement: number;
  effectiveClickPower: number;
  critChance: number;
  gachaLuck: number;
  globalMultiplier: number;
  timeExtend: number;
  comboMultiplier: number;
  multiClick: number;
  luckyBonus: number;
  setRetweets: (fn: (prev: number) => number) => void;
  setLikes: (fn: (prev: number) => number) => void;
  setBookmarks: (fn: (prev: number) => number) => void;
  addClick: (crits: number, jackpots: number) => void;
  onReplyClick: () => void;
  onQuoteStart: (word: string, time: number) => void;
};

export function TweetCard({
  retweets, likes, bookmarks, replies, totalEngagement,
  effectiveClickPower, critChance, gachaLuck, globalMultiplier, timeExtend, comboMultiplier,
  multiClick, luckyBonus,
  setRetweets, setLikes, setBookmarks, addClick, onReplyClick, onQuoteStart
}: TweetCardProps) {
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [likeFloats, setLikeFloats] = useState<FloatingText[]>([]);
  const [bookmarkFloats, setBookmarkFloats] = useState<FloatingText[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);
  const [isBookmarkAnimating, setIsBookmarkAnimating] = useState(false);
  const [showRepostMenu, setShowRepostMenu] = useState(false);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const clickCount = 1 + multiClick; // マルチクリック判定
    const effectiveCritChance = critChance * 0.1 + luckyBonus * 0.01; // ラッキータイムボーナス
    const effectiveGachaChance = gachaLuck * 0.02 + luckyBonus * 0.01;
    
    let totalPower = 0;
    let hasCrit = false;
    let hasJackpot = false;
    let critCount = 0;
    let jackpotCount = 0;
    
    for (let i = 0; i < clickCount; i++) {
      const isCrit = Math.random() < effectiveCritChance;
      const isJackpot = Math.random() < effectiveGachaChance;
      let power = isCrit ? effectiveClickPower * 5 : effectiveClickPower;
      if (isJackpot) power *= 10;
      power = Math.floor(power * globalMultiplier);
      totalPower += power;
      if (isCrit) { hasCrit = true; critCount++; }
      if (isJackpot) { hasJackpot = true; jackpotCount++; }
    }
    
    setRetweets((prev) => prev + totalPower);
    addClick(critCount, jackpotCount);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 150);

    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setFloatingTexts((prev) => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top, isCrit: hasCrit, isJackpot: hasJackpot }]);
    setTimeout(() => setFloatingTexts((prev) => prev.filter((t) => t.id !== id)), 800);
  }, [effectiveClickPower, critChance, gachaLuck, globalMultiplier, setRetweets, multiClick, luckyBonus, addClick]);

  const handleLike = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setLikes((prev) => prev + 1);
    setIsLikeAnimating(true);
    setTimeout(() => setIsLikeAnimating(false), 150);
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setLikeFloats((prev) => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setLikeFloats((prev) => prev.filter((t) => t.id !== id)), 800);
  }, [setLikes]);

  const handleBookmark = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setBookmarks((prev) => prev + 1);
    setIsBookmarkAnimating(true);
    setTimeout(() => setIsBookmarkAnimating(false), 150);
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setBookmarkFloats((prev) => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setBookmarkFloats((prev) => prev.filter((t) => t.id !== id)), 800);
  }, [setBookmarks]);

  return (
    <article className="theme-border border-b p-4">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img src="/avatar.png" alt="アバター" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1 text-sm">
            <span className="font-bold">マニアヤマ</span>
            <span className="theme-muted">@YamayamaMr · 今</span>
          </div>
          <p className="mt-1 text-[15px]">いいねおねがいします！</p>

              {/* 画像 */}
              <div className="mt-3 rounded-2xl overflow-hidden theme-border border">
                <img src="/miyama.jpg" alt="投稿画像" className="w-full max-h-72 object-cover object-top" />
              </div>

          <div className="flex justify-between mt-3 max-w-md theme-muted">
            {/* リプライ */}
            <button onClick={onReplyClick} className="flex items-center gap-2 group">
              <div className={`p-2 rounded-full ${replies > 0 ? "text-cyan-400" : ""} group-hover:bg-cyan-500/10`}>
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current group-hover:text-cyan-400">
                  {replies > 0 ? (
                    <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01z"/>
                  ) : (
                    <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"/>
                  )}
                </svg>
              </div>
              <span className={`text-sm ${replies > 0 ? "text-cyan-400" : ""}`}>{replies}</span>
            </button>

            {/* リツイート */}
            <div className="relative">
              <button onClick={() => setShowRepostMenu(!showRepostMenu)}
                className={`flex items-center gap-2 group transition-transform ${isAnimating ? "scale-125" : ""}`}>
                <div className={`p-2 rounded-full ${retweets > 0 ? "text-green-500" : ""} group-hover:bg-green-500/10`}>
                  <svg viewBox="0 0 24 24" className={`w-5 h-5 fill-current group-hover:text-green-500 ${isAnimating ? "text-green-400" : ""}`}>
                    <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"/>
                  </svg>
                </div>
                <span className={`text-sm ${retweets > 0 ? "text-green-500" : ""}`}>{retweets.toLocaleString()}</span>
              </button>
              
              {showRepostMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowRepostMenu(false)} />
                  <div className="absolute top-full left-0 mt-2 theme-bg theme-border border rounded-xl shadow-lg overflow-hidden z-50 min-w-[150px]">
                    <button onClick={(e) => { handleClick(e); setShowRepostMenu(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:opacity-70 transition-colors">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                        <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"/>
                      </svg>
                      <span className="font-bold">リポスト</span>
                    </button>
                    <button onClick={() => {
                      setShowRepostMenu(false);
                      const word = QUOTE_WORDS[Math.floor(Math.random() * QUOTE_WORDS.length)];
                      onQuoteStart(word, 8 + timeExtend);
                    }} className="w-full flex items-center gap-3 px-4 py-3 hover:opacity-70 transition-colors">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                        <path d="M14.23 2.854c.98-.977 2.56-.977 3.54 0l3.38 3.378c.97.977.97 2.559 0 3.536L9.91 21H3v-6.914L14.23 2.854zm2.12 1.414c-.19-.195-.51-.195-.7 0L5 14.914V19h4.09L19.73 8.354c.2-.196.2-.512 0-.708l-3.38-3.378z"/>
                      </svg>
                      <span className="font-bold">引用する</span>
                    </button>
                  </div>
                </>
              )}
              
              {floatingTexts.map((ft) => (
                <span key={ft.id}
                  className={`absolute font-bold pointer-events-none animate-float ${ft.isJackpot ? "text-2xl text-red-500" : ft.isCrit ? "text-yellow-400 text-lg" : "text-green-500 text-sm"}`}
                  style={{ left: ft.x, top: ft.y }}>
                  {ft.isJackpot ? `🎰JACKPOT!` : ft.isCrit ? `💥CRIT!` : `+${effectiveClickPower}`}
                </span>
              ))}
            </div>

            {/* いいね */}
            <div className="relative">
              <button onClick={handleLike} className={`flex items-center gap-2 group transition-transform ${isLikeAnimating ? "scale-125" : ""}`}>
                <div className={`p-2 rounded-full ${likes > 0 ? "text-pink-500" : ""} group-hover:bg-pink-500/10`}>
                  <svg viewBox="0 0 24 24" className={`w-5 h-5 fill-current group-hover:text-pink-500 ${isLikeAnimating ? "text-pink-400" : ""}`}>
                    {likes > 0 ? (
                      <path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"/>
                    ) : (
                      <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91z"/>
                    )}
                  </svg>
                </div>
                <span className={`text-sm ${likes > 0 ? "text-pink-500" : ""}`}>{likes.toLocaleString()}</span>
              </button>
              {likeFloats.map((ft) => (
                <span key={ft.id} className="absolute text-pink-500 font-bold text-sm pointer-events-none animate-float" style={{ left: ft.x, top: ft.y }}>+1</span>
              ))}
            </div>

            {/* 閲覧数 */}
            <button className="flex items-center gap-2 group">
              <div className="p-2 rounded-full group-hover:bg-blue-500/10">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current group-hover:text-blue-500">
                  <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"/>
                </svg>
              </div>
              <span className="text-sm">{totalEngagement.toLocaleString()}</span>
            </button>

            {/* ブックマーク */}
            <div className="relative">
              <button onClick={handleBookmark} className={`flex items-center gap-1 group transition-transform ${isBookmarkAnimating ? "scale-125" : ""}`} title="ブックマーク">
                <div className={`p-2 rounded-full ${bookmarks > 0 ? "text-blue-500" : ""} group-hover:bg-blue-500/10`}>
                  <svg viewBox="0 0 24 24" className={`w-5 h-5 fill-current group-hover:text-blue-500 ${isBookmarkAnimating ? "text-blue-400" : ""}`}>
                    {bookmarks > 0 ? (
                      <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5z"/>
                    ) : (
                      <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"/>
                    )}
                  </svg>
                </div>
                <span className={`text-sm ${bookmarks > 0 ? "text-blue-500" : ""}`}>{bookmarks.toLocaleString()}</span>
              </button>
              {bookmarkFloats.map((ft) => (
                <span key={ft.id} className="absolute text-blue-500 font-bold text-sm pointer-events-none animate-float" style={{ left: ft.x, top: ft.y }}>+1</span>
              ))}
            </div>

            {/* シェア */}
            <button className="p-2 rounded-full hover:bg-blue-500/10 group" title="シェア">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current group-hover:text-blue-500">
                <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
