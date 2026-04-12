"use client";

import { Shop } from "./Shop";

type ShopPageProps = {
  game: {
    retweets: number;
    prices: Record<string, number>;
    clickPower: number;
    autoRetweet: number;
    critChance: number;
    timeExtend: number;
    comboMultiplier: number;
    flameGuard: number;
    influencer: number;
    gachaLuck: number;
    autoReply: number;
    verified: boolean;
    trendCooldown: number;
    trendActive: boolean;
    multiClick: number;
    luckyTime: number;
    autoLike: number;
    autoBookmark: number;
    viralBoost: number;
    premiumBadge: boolean;
    buyUpgrade: (type: string) => void;
    activateTrend: () => void;
  };
};

export function ShopPage({ game }: ShopPageProps) {
  return (
    <div className="pb-4">
      <Shop
        retweets={game.retweets}
        prices={game.prices}
        upgrades={{
          clickPower: game.clickPower,
          autoRetweet: game.autoRetweet,
          critChance: game.critChance,
          timeExtend: game.timeExtend,
          comboMultiplier: game.comboMultiplier,
          flameGuard: game.flameGuard,
          influencer: game.influencer,
          gachaLuck: game.gachaLuck,
          autoReply: game.autoReply,
          verified: game.verified,
          trendCooldown: game.trendCooldown,
          trendActive: game.trendActive,
          multiClick: game.multiClick,
          luckyTime: game.luckyTime,
          autoLike: game.autoLike,
          autoBookmark: game.autoBookmark,
          viralBoost: game.viralBoost,
          premiumBadge: game.premiumBadge,
        }}
        buyUpgrade={game.buyUpgrade}
        activateTrend={game.activateTrend}
      />
    </div>
  );
}
