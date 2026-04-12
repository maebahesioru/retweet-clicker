type ShopProps = {
  retweets: number;
  prices: Record<string, number>;
  upgrades: {
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
  };
  buyUpgrade: (type: string) => void;
  activateTrend: () => void;
};

const ShopItem = ({ 
  icon, name, desc, price, priceLabel, color, disabled, onClick 
}: {
  icon: string; name: string; desc: string; price: number; priceLabel?: string;
  color: string; disabled: boolean; onClick: () => void;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between
      ${!disabled ? `theme-border hover:opacity-80 cursor-pointer` : "theme-border opacity-50 cursor-not-allowed"}`}
  >
    <div className="flex items-center gap-3">
      <div className={`w-12 h-12 rounded-full bg-${color}-500/20 flex items-center justify-center text-2xl`}>{icon}</div>
      <div className="text-left">
        <div className="font-bold">{name}</div>
        <div className="text-sm theme-muted">{desc}</div>
      </div>
    </div>
    <div className={`text-${color}-500 font-bold`}>{priceLabel || `${price.toLocaleString()} RT`}</div>
  </button>
);

export function Shop({ retweets, prices, upgrades, buyUpgrade, activateTrend }: ShopProps) {
  const { clickPower, autoRetweet, critChance, timeExtend, comboMultiplier, flameGuard, influencer, gachaLuck, autoReply, verified, trendCooldown, trendActive, multiClick, luckyTime, autoLike, autoBookmark, viralBoost, premiumBadge } = upgrades;

  return (
    <div className="theme-border border-b p-4">
      <h2 className="font-bold text-lg mb-4">🛒 アップグレードショップ</h2>
      <div className="space-y-3">
        <ShopItem icon="💪" name="クリック強化" desc={`現在: ${clickPower} RT/クリック → ${clickPower + 1}`}
          price={prices.click} color="green" disabled={retweets < prices.click} onClick={() => buyUpgrade("click")} />
        
        <ShopItem icon="🤖" name="自動リツイートBot" desc={`現在: ${autoRetweet} RT/秒 → ${autoRetweet + 1}`}
          price={prices.auto} color="blue" disabled={retweets < prices.auto} onClick={() => buyUpgrade("auto")} />
        
        <ShopItem icon="💥" name="バズ運" desc={`クリティカル率: ${critChance * 10}% → ${Math.min((critChance + 1) * 10, 100)}%`}
          price={prices.crit} priceLabel={critChance >= 10 ? "MAX" : `${prices.crit.toLocaleString()} RT`}
          color="yellow" disabled={retweets < prices.crit || critChance >= 10} onClick={() => buyUpgrade("crit")} />
        
        <ShopItem icon="⏰" name="タイピング猶予" desc={`制限時間: +${timeExtend}秒 → +${timeExtend + 1}秒`}
          price={prices.time} color="purple" disabled={retweets < prices.time} onClick={() => buyUpgrade("time")} />
        
        <ShopItem icon="🔥" name="引用パワー" desc={`引用倍率: x${(2 + comboMultiplier * 0.5).toFixed(1)} → x${(2.5 + comboMultiplier * 0.5).toFixed(1)}`}
          price={prices.combo} color="orange" disabled={retweets < prices.combo} onClick={() => buyUpgrade("combo")} />
        
        <ShopItem icon="🛡️" name="炎上ガード" desc={`ペナルティ軽減: ${flameGuard * 20}% → ${Math.min((flameGuard + 1) * 20, 100)}%`}
          price={prices.flameGuard} priceLabel={flameGuard >= 5 ? "MAX" : `${prices.flameGuard.toLocaleString()} RT`}
          color="red" disabled={retweets < prices.flameGuard || flameGuard >= 5} onClick={() => buyUpgrade("flameGuard")} />
        
        <ShopItem icon="🌟" name="インフルエンサー" desc={`全体倍率: x${(1 + influencer * 0.2).toFixed(1)} → x${(1.2 + influencer * 0.2).toFixed(1)}`}
          price={prices.influencer} color="pink" disabled={retweets < prices.influencer} onClick={() => buyUpgrade("influencer")} />
        
        <ShopItem icon="🎰" name="ガチャ運" desc={`大当たり率: ${gachaLuck * 2}% → ${Math.min((gachaLuck + 1) * 2, 20)}% (x10)`}
          price={prices.gacha} priceLabel={gachaLuck >= 10 ? "MAX" : `${prices.gacha.toLocaleString()} RT`}
          color="amber" disabled={retweets < prices.gacha || gachaLuck >= 10} onClick={() => buyUpgrade("gacha")} />

        {/* トレンド入り */}
        <button onClick={activateTrend} disabled={trendCooldown > 0}
          className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between
            ${trendCooldown === 0 ? "border-cyan-500 bg-cyan-500/10 hover:bg-cyan-500/20 cursor-pointer" : "theme-border opacity-50 cursor-not-allowed"}`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-2xl">📈</div>
            <div className="text-left">
              <div className="font-bold">トレンド入り {trendActive && <span className="text-cyan-400">🔥発動中!</span>}</div>
              <div className="text-sm theme-muted">10秒間全効率x2 (CD: 60秒)</div>
            </div>
          </div>
          <div className="text-cyan-500 font-bold">{trendCooldown > 0 ? `${trendCooldown}秒` : "発動!"}</div>
        </button>

        <ShopItem icon="🔄" name="オートリプBot" desc={`3秒毎に自動リプ: ${autoReply} → ${autoReply + 1}`}
          price={prices.autoReply} color="teal" disabled={retweets < prices.autoReply} onClick={() => buyUpgrade("autoReply")} />

        {/* 認証バッジ */}
        <button type="button" onClick={() => buyUpgrade("verified")} disabled={retweets < prices.verified || verified}
          className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between
            ${retweets >= prices.verified && !verified ? "border-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20 cursor-pointer" : "theme-border opacity-50 cursor-not-allowed"}`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-2xl">💎</div>
            <div className="text-left">
              <div className="font-bold">認証バッジ {verified && <span className="text-yellow-400">✓取得済</span>}</div>
              <div className="text-sm theme-muted">永続で全効率x1.5</div>
            </div>
          </div>
          <div className="text-yellow-500 font-bold">{verified ? "取得済" : `${prices.verified.toLocaleString()} RT`}</div>
        </button>

        <ShopItem icon="🖱️" name="マルチクリック" desc={`1クリック判定: ${1 + multiClick}回 → ${Math.min(2 + multiClick, 6)}回`}
          price={prices.multiClick} priceLabel={multiClick >= 5 ? "MAX" : `${prices.multiClick.toLocaleString()} RT`}
          color="indigo" disabled={retweets < prices.multiClick || multiClick >= 5} onClick={() => buyUpgrade("multiClick")} />

        <ShopItem icon="⏱️" name="ラッキータイム" desc={`クリティカル/ガチャ確率+${luckyTime * 5}% → +${(luckyTime + 1) * 5}%`}
          price={prices.luckyTime} color="lime" disabled={retweets < prices.luckyTime} onClick={() => buyUpgrade("luckyTime")} />

        <ShopItem icon="💗" name="オートいいねBot" desc={`2秒毎に自動いいね: ${autoLike} → ${autoLike + 1}`}
          price={prices.autoLike} color="rose" disabled={retweets < prices.autoLike} onClick={() => buyUpgrade("autoLike")} />

        <ShopItem icon="🔖" name="オートブクマBot" desc={`2.5秒毎に自動ブクマ: ${autoBookmark} → ${autoBookmark + 1}`}
          price={prices.autoBookmark} color="sky" disabled={retweets < prices.autoBookmark} onClick={() => buyUpgrade("autoBookmark")} />

        <ShopItem icon="🚀" name="バイラルブースト" desc={`全体効率: +${viralBoost * 10}% → +${(viralBoost + 1) * 10}%`}
          price={prices.viralBoost} color="violet" disabled={retweets < prices.viralBoost} onClick={() => buyUpgrade("viralBoost")} />

        {/* プレミアムバッジ */}
        <button type="button" onClick={() => buyUpgrade("premiumBadge")} disabled={retweets < prices.premiumBadge || premiumBadge}
          className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between
            ${retweets >= prices.premiumBadge && !premiumBadge ? "border-amber-500 bg-amber-500/10 hover:bg-amber-500/20 cursor-pointer" : "theme-border opacity-50 cursor-not-allowed"}`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-2xl">👑</div>
            <div className="text-left">
              <div className="font-bold">プレミアムバッジ {premiumBadge && <span className="text-amber-400">✓取得済</span>}</div>
              <div className="text-sm theme-muted">永続で全効率x2</div>
            </div>
          </div>
          <div className="text-amber-500 font-bold">{premiumBadge ? "取得済" : `${prices.premiumBadge.toLocaleString()} RT`}</div>
        </button>
      </div>
    </div>
  );
}
