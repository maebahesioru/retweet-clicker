"use client";

import { ACHIEVEMENTS } from "@/hooks/useGameState";

type AchievementsPageProps = {
  unlockedAchievements: string[];
  totalClicks: number;
  totalCrits: number;
  totalJackpots: number;
};

export function AchievementsPage({ unlockedAchievements, totalClicks, totalCrits, totalJackpots }: AchievementsPageProps) {
  const unlockedCount = unlockedAchievements.length;
  const totalCount = ACHIEVEMENTS.length;

  return (
    <div className="p-4">
      <h2 className="font-bold text-lg mb-2">🏆 実績</h2>
      <p className="theme-muted text-sm mb-4">解除: {unlockedCount} / {totalCount}</p>

      {/* 統計 */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="theme-card rounded-xl p-3 text-center">
          <div className="text-2xl">🖱️</div>
          <div className="text-sm theme-muted">クリック</div>
          <div className="font-bold">{totalClicks.toLocaleString()}</div>
        </div>
        <div className="theme-card rounded-xl p-3 text-center">
          <div className="text-2xl">💥</div>
          <div className="text-sm theme-muted">クリティカル</div>
          <div className="font-bold">{totalCrits.toLocaleString()}</div>
        </div>
        <div className="theme-card rounded-xl p-3 text-center">
          <div className="text-2xl">🎰</div>
          <div className="text-sm theme-muted">ジャックポット</div>
          <div className="font-bold">{totalJackpots.toLocaleString()}</div>
        </div>
      </div>

      {/* 実績リスト */}
      <div className="space-y-2">
        {ACHIEVEMENTS.map((ach) => {
          const unlocked = unlockedAchievements.includes(ach.id);
          return (
            <div key={ach.id}
              className={`p-3 rounded-xl border flex items-center gap-3 transition-all
                ${unlocked ? "border-yellow-500/50 bg-yellow-500/10" : "theme-border opacity-50"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl
                ${unlocked ? "bg-yellow-500/20" : "theme-card"}`}>
                {unlocked ? ach.icon : "🔒"}
              </div>
              <div className="flex-1">
                <div className={`font-bold ${unlocked ? "text-yellow-400" : "theme-muted"}`}>
                  {ach.name}
                </div>
                <div className="text-sm theme-muted">{ach.description}</div>
              </div>
              {unlocked && <span className="text-yellow-400">✓</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
