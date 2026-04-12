"use client";

import { useState, useEffect } from "react";
import { useGameState, WORDS } from "@/hooks/useGameState";
import { Layout } from "@/components/Layout";
import { HomePage } from "@/components/HomePage";
import { ShopPage } from "@/components/ShopPage";
import { AchievementsPage } from "@/components/AchievementsPage";
import { SettingsPage } from "@/components/SettingsPage";
import { TypingModal } from "@/components/TypingModal";

export default function Home() {
  const game = useGameState();
  const [currentPage, setCurrentPage] = useState<"home" | "shop" | "achievements" | "settings">("home");
  
  // タイピングゲーム用
  const [showTypingGame, setShowTypingGame] = useState(false);
  const [targetWord, setTargetWord] = useState("");
  const [typedWord, setTypedWord] = useState("");
  const [typingTimeLeft, setTypingTimeLeft] = useState(0);
  
  // 引用用
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteTargetWord, setQuoteTargetWord] = useState("");
  const [quoteText, setQuoteText] = useState("");
  const [quoteTimeLeft, setQuoteTimeLeft] = useState(0);

  const startTypingGame = () => {
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    setTargetWord(word);
    setTypedWord("");
    setTypingTimeLeft(5 + game.timeExtend);
    setShowTypingGame(true);
  };

  const startQuote = (word: string, time: number) => {
    setQuoteTargetWord(word);
    setQuoteText("");
    setQuoteTimeLeft(time);
    setShowQuoteModal(true);
  };

  // タイピングタイマー
  useEffect(() => {
    if (!showTypingGame || typingTimeLeft <= 0) return;
    const timer = setTimeout(() => setTypingTimeLeft((prev) => prev - 1), 1000);
    if (typingTimeLeft === 1) {
      setTimeout(() => {
        const penalty = Math.max(1, game.clickPower - Math.floor((game.clickPower - 1) * (1 - game.flameGuard * 0.2)));
        game.setClickPower(penalty);
        setShowTypingGame(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [showTypingGame, typingTimeLeft, game]);

  // 引用タイマー
  useEffect(() => {
    if (!showQuoteModal || quoteTimeLeft <= 0) return;
    const timer = setTimeout(() => setQuoteTimeLeft((prev) => prev - 1), 1000);
    if (quoteTimeLeft === 1) {
      setTimeout(() => {
        const reduction = 0.5 + game.flameGuard * 0.1;
        game.setRetweets((prev) => Math.floor(prev * reduction));
        setShowQuoteModal(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [showQuoteModal, quoteTimeLeft, game]);

  const handleReplySuccess = () => {
    game.setReplies((prev) => prev + 1);
    setShowTypingGame(false);
    setTypedWord("");
  };

  const handleQuoteSuccess = () => {
    const bonus = 2 + game.comboMultiplier * 0.5;
    game.setRetweets((prev) => prev + Math.floor(game.effectiveClickPower * bonus));
    setShowQuoteModal(false);
    setQuoteText("");
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage} retweets={game.retweets} theme={game.theme}>
      {!game.isLoaded ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">読み込み中...</div>
        </div>
      ) : (
        <>
          {currentPage === "home" && (
            <HomePage
              game={game}
              onReplyClick={startTypingGame}
              onQuoteStart={startQuote}
            />
          )}

          {currentPage === "shop" && (
            <ShopPage game={game} />
          )}

          {currentPage === "achievements" && (
            <AchievementsPage
              unlockedAchievements={game.unlockedAchievements}
              totalClicks={game.totalClicks}
              totalCrits={game.totalCrits}
              totalJackpots={game.totalJackpots}
            />
          )}

          {currentPage === "settings" && (
            <SettingsPage
              exportSave={game.exportSave}
              importSave={game.importSave}
              resetSave={game.resetSave}
              theme={game.theme}
              changeTheme={game.changeTheme}
            />
          )}
        </>
      )}

      <TypingModal
        show={showTypingGame}
        targetWord={targetWord}
        typedWord={typedWord}
        timeLeft={typingTimeLeft}
        onType={setTypedWord}
        onClose={() => setShowTypingGame(false)}
        onSuccess={handleReplySuccess}
      />

      <TypingModal
        show={showQuoteModal}
        targetWord={quoteTargetWord}
        typedWord={quoteText}
        timeLeft={quoteTimeLeft}
        onType={setQuoteText}
        onClose={() => setShowQuoteModal(false)}
        onSuccess={handleQuoteSuccess}
        isQuote
      />
    </Layout>
  );
}
