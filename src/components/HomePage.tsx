"use client";

import { TweetCard } from "./TweetCard";
import { BalanceMeter } from "./BalanceMeter";
import { EffectDescription } from "./EffectDescription";

type HomePageProps = {
  game: {
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
    rtRatio: number;
    likeRatio: number;
    bookmarkRatio: number;
    replyRatio: number;
    rtMultiplier: number;
    shopDiscount: number;
    autoMultiplier: number;
    replyMultiplier: number;
    setRetweets: (fn: (prev: number) => number) => void;
    setLikes: (fn: (prev: number) => number) => void;
    setBookmarks: (fn: (prev: number) => number) => void;
    addClick: (crits: number, jackpots: number) => void;
  };
  onReplyClick: () => void;
  onQuoteStart: (word: string, time: number) => void;
};

export function HomePage({ game, onReplyClick, onQuoteStart }: HomePageProps) {
  return (
    <>
      <TweetCard
        retweets={game.retweets}
        likes={game.likes}
        bookmarks={game.bookmarks}
        replies={game.replies}
        totalEngagement={game.totalEngagement}
        effectiveClickPower={game.effectiveClickPower}
        critChance={game.critChance}
        gachaLuck={game.gachaLuck}
        globalMultiplier={game.globalMultiplier}
        timeExtend={game.timeExtend}
        comboMultiplier={game.comboMultiplier}
        multiClick={game.multiClick}
        luckyBonus={game.luckyBonus}
        setRetweets={game.setRetweets}
        setLikes={game.setLikes}
        setBookmarks={game.setBookmarks}
        addClick={game.addClick}
        onReplyClick={onReplyClick}
        onQuoteStart={onQuoteStart}
      />

      <BalanceMeter
        rtRatio={game.rtRatio}
        likeRatio={game.likeRatio}
        bookmarkRatio={game.bookmarkRatio}
        replyRatio={game.replyRatio}
        rtMultiplier={game.rtMultiplier}
        shopDiscount={game.shopDiscount}
        autoMultiplier={game.autoMultiplier}
        replyMultiplier={game.replyMultiplier}
      />

      <EffectDescription />
    </>
  );
}
