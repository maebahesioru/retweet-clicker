import { useState, useEffect, useCallback } from "react";

export type FloatingText = {
  id: number;
  x: number;
  y: number;
  isCrit?: boolean;
  isJackpot?: boolean;
};

export const WORDS = [
  "草", "わかる", "それな", "まじ", "えぐい", "やばい", "神", "最高",
  "天才", "すごい", "なるほど", "確かに", "いいね", "拡散希望", "RT",
  "ワロタ", "www", "おもろい", "センスある", "好き"
];

export const QUOTE_WORDS = [
  "これはガチ", "マジでそれ", "完全に同意", "天才すぎる", "センスの塊",
  "これ好きすぎる", "わかりみが深い", "それはそう", "ほんまそれ", "激しく同意"
];

const STORAGE_KEY = "retweet-clicker-save";

// 実績定義
export type Achievement = {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (stats: AchievementStats) => boolean;
};

export type AchievementStats = {
  retweets: number;
  likes: number;
  bookmarks: number;
  replies: number;
  totalEngagement: number;
  clickPower: number;
  autoRetweet: number;
  verified: boolean;
  premiumBadge: boolean;
  critChance: number;
  gachaLuck: number;
  totalClicks: number;
  totalCrits: number;
  totalJackpots: number;
  maxCombo: number;
};

export const ACHIEVEMENTS: Achievement[] = [
  // RT系
  { id: "first_rt", name: "はじめてのRT", description: "初めてリツイートする", icon: "🔄", condition: (s) => s.retweets >= 1 },
  { id: "rt_100", name: "拡散開始", description: "100 RTを達成", icon: "📢", condition: (s) => s.retweets >= 100 },
  { id: "rt_500", name: "じわじわ拡散", description: "500 RTを達成", icon: "📣", condition: (s) => s.retweets >= 500 },
  { id: "rt_1000", name: "バズの予感", description: "1,000 RTを達成", icon: "🔥", condition: (s) => s.retweets >= 1000 },
  { id: "rt_5000", name: "プチバズ", description: "5,000 RTを達成", icon: "🎆", condition: (s) => s.retweets >= 5000 },
  { id: "rt_10000", name: "トレンド入り", description: "10,000 RTを達成", icon: "📈", condition: (s) => s.retweets >= 10000 },
  { id: "rt_50000", name: "大バズ", description: "50,000 RTを達成", icon: "💫", condition: (s) => s.retweets >= 50000 },
  { id: "rt_100000", name: "インフルエンサー", description: "100,000 RTを達成", icon: "⭐", condition: (s) => s.retweets >= 100000 },
  { id: "rt_500000", name: "メガバズ", description: "500,000 RTを達成", icon: "🌟", condition: (s) => s.retweets >= 500000 },
  { id: "rt_1000000", name: "伝説のツイート", description: "1,000,000 RTを達成", icon: "👑", condition: (s) => s.retweets >= 1000000 },
  { id: "rt_5000000", name: "歴史に残る", description: "5,000,000 RTを達成", icon: "🏆", condition: (s) => s.retweets >= 5000000 },
  { id: "rt_10000000", name: "世界を動かす", description: "10,000,000 RTを達成", icon: "🌍", condition: (s) => s.retweets >= 10000000 },
  { id: "rt_100000000", name: "神話級", description: "100,000,000 RTを達成", icon: "🌌", condition: (s) => s.retweets >= 100000000 },
  
  // いいね系
  { id: "like_50", name: "ちょっと人気", description: "50 いいねを達成", icon: "💕", condition: (s) => s.likes >= 50 },
  { id: "like_100", name: "愛されツイート", description: "100 いいねを達成", icon: "💗", condition: (s) => s.likes >= 100 },
  { id: "like_500", name: "いいね収集家", description: "500 いいねを達成", icon: "💓", condition: (s) => s.likes >= 500 },
  { id: "like_1000", name: "いいねマスター", description: "1,000 いいねを達成", icon: "💖", condition: (s) => s.likes >= 1000 },
  { id: "like_5000", name: "愛され上手", description: "5,000 いいねを達成", icon: "💘", condition: (s) => s.likes >= 5000 },
  { id: "like_10000", name: "愛の伝道師", description: "10,000 いいねを達成", icon: "💝", condition: (s) => s.likes >= 10000 },
  { id: "like_50000", name: "いいね神", description: "50,000 いいねを達成", icon: "❤️‍🔥", condition: (s) => s.likes >= 50000 },
  { id: "like_100000", name: "愛の化身", description: "100,000 いいねを達成", icon: "💟", condition: (s) => s.likes >= 100000 },
  
  // ブックマーク系
  { id: "bookmark_50", name: "メモ代わり", description: "50 ブックマークを達成", icon: "📌", condition: (s) => s.bookmarks >= 50 },
  { id: "bookmark_100", name: "保存される価値", description: "100 ブックマークを達成", icon: "🔖", condition: (s) => s.bookmarks >= 100 },
  { id: "bookmark_500", name: "コレクション", description: "500 ブックマークを達成", icon: "📁", condition: (s) => s.bookmarks >= 500 },
  { id: "bookmark_1000", name: "永久保存版", description: "1,000 ブックマークを達成", icon: "📚", condition: (s) => s.bookmarks >= 1000 },
  { id: "bookmark_5000", name: "殿堂入り", description: "5,000 ブックマークを達成", icon: "🏛️", condition: (s) => s.bookmarks >= 5000 },
  { id: "bookmark_10000", name: "国宝級", description: "10,000 ブックマークを達成", icon: "🏺", condition: (s) => s.bookmarks >= 10000 },
  
  // リプライ系
  { id: "reply_10", name: "会話デビュー", description: "10 リプライを達成", icon: "💭", condition: (s) => s.replies >= 10 },
  { id: "reply_50", name: "会話上手", description: "50 リプライを達成", icon: "💬", condition: (s) => s.replies >= 50 },
  { id: "reply_100", name: "おしゃべり", description: "100 リプライを達成", icon: "🗨️", condition: (s) => s.replies >= 100 },
  { id: "reply_200", name: "コミュ力の鬼", description: "200 リプライを達成", icon: "🗣️", condition: (s) => s.replies >= 200 },
  { id: "reply_500", name: "リプ職人", description: "500 リプライを達成", icon: "✍️", condition: (s) => s.replies >= 500 },
  { id: "reply_1000", name: "会話の達人", description: "1,000 リプライを達成", icon: "🎭", condition: (s) => s.replies >= 1000 },
  { id: "reply_5000", name: "リプ神", description: "5,000 リプライを達成", icon: "📝", condition: (s) => s.replies >= 5000 },
  
  // エンゲージメント系
  { id: "engagement_500", name: "反応あり", description: "総エンゲージメント500達成", icon: "📱", condition: (s) => s.totalEngagement >= 500 },
  { id: "engagement_1000", name: "エンゲージャー", description: "総エンゲージメント1,000達成", icon: "📊", condition: (s) => s.totalEngagement >= 1000 },
  { id: "engagement_10000", name: "注目の的", description: "総エンゲージメント10,000達成", icon: "🎯", condition: (s) => s.totalEngagement >= 10000 },
  { id: "engagement_50000", name: "SNSの達人", description: "総エンゲージメント50,000達成", icon: "🏅", condition: (s) => s.totalEngagement >= 50000 },
  { id: "engagement_200000", name: "ソーシャルキング", description: "総エンゲージメント200,000達成", icon: "🎖️", condition: (s) => s.totalEngagement >= 200000 },
  { id: "engagement_1000000", name: "SNS皇帝", description: "総エンゲージメント1,000,000達成", icon: "👸", condition: (s) => s.totalEngagement >= 1000000 },
  
  // アップグレード系
  { id: "click_power_5", name: "クリック入門", description: "クリック強化Lv5達成", icon: "✊", condition: (s) => s.clickPower >= 5 },
  { id: "click_power_10", name: "クリック職人", description: "クリック強化Lv10達成", icon: "💪", condition: (s) => s.clickPower >= 10 },
  { id: "click_power_25", name: "クリックマスター", description: "クリック強化Lv25達成", icon: "🦾", condition: (s) => s.clickPower >= 25 },
  { id: "click_power_50", name: "クリック神", description: "クリック強化Lv50達成", icon: "⚡", condition: (s) => s.clickPower >= 50 },
  { id: "click_power_100", name: "クリック超神", description: "クリック強化Lv100達成", icon: "🔱", condition: (s) => s.clickPower >= 100 },
  { id: "auto_rt_1", name: "初めてのBot", description: "自動RTBot Lv1達成", icon: "🔧", condition: (s) => s.autoRetweet >= 1 },
  { id: "auto_rt_5", name: "Bot導入", description: "自動RTBot Lv5達成", icon: "🤖", condition: (s) => s.autoRetweet >= 5 },
  { id: "auto_rt_15", name: "Bot軍団", description: "自動RTBot Lv15達成", icon: "🦿", condition: (s) => s.autoRetweet >= 15 },
  { id: "auto_rt_30", name: "Bot帝国", description: "自動RTBot Lv30達成", icon: "🏭", condition: (s) => s.autoRetweet >= 30 },
  { id: "auto_rt_50", name: "Bot王国", description: "自動RTBot Lv50達成", icon: "🏰", condition: (s) => s.autoRetweet >= 50 },
  { id: "verified", name: "認証済み", description: "認証バッジを取得", icon: "✓", condition: (s) => s.verified },
  { id: "premium", name: "プレミアム会員", description: "プレミアムバッジを取得", icon: "👑", condition: (s) => s.premiumBadge },
  { id: "crit_5", name: "運がいい", description: "クリティカル率50%", icon: "🍀", condition: (s) => s.critChance >= 5 },
  { id: "crit_max", name: "運命を操る者", description: "クリティカル率MAX", icon: "💥", condition: (s) => s.critChance >= 10 },
  { id: "gacha_5", name: "くじ運あり", description: "ガチャ運50%", icon: "🎲", condition: (s) => s.gachaLuck >= 5 },
  { id: "gacha_max", name: "ギャンブラー", description: "ガチャ運MAX", icon: "🎰", condition: (s) => s.gachaLuck >= 10 },
  
  // クリック統計系
  { id: "clicks_100", name: "クリック開始", description: "100回クリック", icon: "👇", condition: (s) => s.totalClicks >= 100 },
  { id: "clicks_1000", name: "連打マスター", description: "1,000回クリック", icon: "🖱️", condition: (s) => s.totalClicks >= 1000 },
  { id: "clicks_5000", name: "クリック好き", description: "5,000回クリック", icon: "🖲️", condition: (s) => s.totalClicks >= 5000 },
  { id: "clicks_10000", name: "指が止まらない", description: "10,000回クリック", icon: "👆", condition: (s) => s.totalClicks >= 10000 },
  { id: "clicks_50000", name: "クリック中毒", description: "50,000回クリック", icon: "🔨", condition: (s) => s.totalClicks >= 50000 },
  { id: "clicks_100000", name: "人間連打機", description: "100,000回クリック", icon: "⌨️", condition: (s) => s.totalClicks >= 100000 },
  { id: "clicks_500000", name: "クリックの鬼", description: "500,000回クリック", icon: "👊", condition: (s) => s.totalClicks >= 500000 },
  { id: "clicks_1000000", name: "クリック神話", description: "1,000,000回クリック", icon: "🦸", condition: (s) => s.totalClicks >= 1000000 },
  { id: "crits_10", name: "クリティカル入門", description: "10回クリティカル", icon: "⭐", condition: (s) => s.totalCrits >= 10 },
  { id: "crits_100", name: "クリティカルハンター", description: "100回クリティカル", icon: "💫", condition: (s) => s.totalCrits >= 100 },
  { id: "crits_500", name: "クリティカルマニア", description: "500回クリティカル", icon: "✨", condition: (s) => s.totalCrits >= 500 },
  { id: "crits_2000", name: "クリティカル神", description: "2,000回クリティカル", icon: "🌟", condition: (s) => s.totalCrits >= 2000 },
  { id: "crits_10000", name: "クリティカル伝説", description: "10,000回クリティカル", icon: "☀️", condition: (s) => s.totalCrits >= 10000 },
  { id: "jackpot_1", name: "初ジャックポット", description: "1回ジャックポット", icon: "🎁", condition: (s) => s.totalJackpots >= 1 },
  { id: "jackpot_10", name: "大当たり", description: "10回ジャックポット", icon: "🎯", condition: (s) => s.totalJackpots >= 10 },
  { id: "jackpot_50", name: "ジャックポットマスター", description: "50回ジャックポット", icon: "💎", condition: (s) => s.totalJackpots >= 50 },
  { id: "jackpot_200", name: "幸運の女神", description: "200回ジャックポット", icon: "🍀", condition: (s) => s.totalJackpots >= 200 },
  { id: "jackpot_1000", name: "ジャックポット神", description: "1,000回ジャックポット", icon: "🌈", condition: (s) => s.totalJackpots >= 1000 },
  
  // バランス系
  { id: "balance_rt", name: "RT特化型", description: "RT比率50%以上", icon: "🔄", condition: (s) => s.totalEngagement > 100 && s.retweets / s.totalEngagement >= 0.5 },
  { id: "balance_like", name: "いいね特化型", description: "いいね比率50%以上", icon: "💗", condition: (s) => s.totalEngagement > 100 && s.likes / s.totalEngagement >= 0.5 },
  { id: "balance_bookmark", name: "ブクマ特化型", description: "ブクマ比率50%以上", icon: "🔖", condition: (s) => s.totalEngagement > 100 && s.bookmarks / s.totalEngagement >= 0.5 },
  { id: "balance_reply", name: "リプ特化型", description: "リプ比率50%以上", icon: "💬", condition: (s) => s.totalEngagement > 100 && s.replies / s.totalEngagement >= 0.5 },
  { id: "balance_perfect", name: "完璧なバランス", description: "全比率20-30%の範囲内", icon: "⚖️", condition: (s) => {
    if (s.totalEngagement < 100) return false;
    const rt = s.retweets / s.totalEngagement;
    const like = s.likes / s.totalEngagement;
    const bm = s.bookmarks / s.totalEngagement;
    const rep = s.replies / s.totalEngagement;
    return rt >= 0.2 && rt <= 0.3 && like >= 0.2 && like <= 0.3 && bm >= 0.2 && bm <= 0.3 && rep >= 0.2 && rep <= 0.3;
  }},
  
  // 隠し・特殊実績
  { id: "secret_777", name: "ラッキーセブン", description: "RTが777の倍数", icon: "7️⃣", condition: (s) => s.retweets > 0 && s.retweets % 777 === 0 },
  { id: "secret_1111", name: "ゾロ目マスター", description: "RTが1111の倍数", icon: "1️⃣", condition: (s) => s.retweets > 0 && s.retweets % 1111 === 0 },
  { id: "secret_allmax", name: "完全体", description: "クリティカルとガチャ運両方MAX", icon: "🌈", condition: (s) => s.critChance >= 10 && s.gachaLuck >= 10 },
  { id: "secret_double", name: "ダブルバッジ", description: "認証とプレミアム両方取得", icon: "💫", condition: (s) => s.verified && s.premiumBadge },
  { id: "secret_nolike", name: "ファボなしRT", description: "RT1000以上でいいね0", icon: "🚫", condition: (s) => s.retweets >= 1000 && s.likes === 0 },
  { id: "secret_onlylike", name: "いいね狂", description: "いいね1000以上でRT0", icon: "💖", condition: (s) => s.likes >= 1000 && s.retweets === 0 },
  { id: "secret_equal", name: "完全一致", description: "RT・いいね・ブクマ・リプが全て同数(100以上)", icon: "🎯", condition: (s) => s.retweets >= 100 && s.retweets === s.likes && s.likes === s.bookmarks && s.bookmarks === s.replies },
  { id: "secret_power100", name: "パワー100", description: "クリック力が100以上", icon: "💯", condition: (s) => s.clickPower >= 100 },
  { id: "secret_millionaire", name: "RT長者", description: "RT100万以上保持", icon: "💰", condition: (s) => s.retweets >= 1000000 },
  { id: "secret_grinder", name: "努力の人", description: "クリック10万回かつRT10万以上", icon: "🏋️", condition: (s) => s.totalClicks >= 100000 && s.retweets >= 100000 },
];

type GameSave = {
  retweets: number;
  likes: number;
  bookmarks: number;
  replies: number;
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
  multiClick: number;
  luckyTime: number;
  autoLike: number;
  autoBookmark: number;
  viralBoost: number;
  premiumBadge: boolean;
  // 実績用統計
  totalClicks: number;
  totalCrits: number;
  totalJackpots: number;
  unlockedAchievements: string[];
};

const loadSave = (): GameSave | null => {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export function useGameState() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // エンゲージメント
  const [retweets, setRetweets] = useState(0);
  const [likes, setLikes] = useState(0);
  const [bookmarks, setBookmarks] = useState(0);
  const [replies, setReplies] = useState(0);

  // アップグレード
  const [clickPower, setClickPower] = useState(1);
  const [autoRetweet, setAutoRetweet] = useState(0);
  const [critChance, setCritChance] = useState(0);
  const [timeExtend, setTimeExtend] = useState(0);
  const [comboMultiplier, setComboMultiplier] = useState(0);
  const [flameGuard, setFlameGuard] = useState(0);
  const [influencer, setInfluencer] = useState(0);
  const [gachaLuck, setGachaLuck] = useState(0);
  const [autoReply, setAutoReply] = useState(0);
  const [verified, setVerified] = useState(false);
  const [multiClick, setMultiClick] = useState(0);
  const [luckyTime, setLuckyTime] = useState(0);
  const [autoLike, setAutoLike] = useState(0);
  const [autoBookmark, setAutoBookmark] = useState(0);
  const [viralBoost, setViralBoost] = useState(0);
  const [premiumBadge, setPremiumBadge] = useState(false);

  // 実績用統計
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalCrits, setTotalCrits] = useState(0);
  const [totalJackpots, setTotalJackpots] = useState(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);

  // テーマ
  const [theme, setTheme] = useState<"black" | "darkblue" | "light">("black");

  // トレンド
  const [trendCooldown, setTrendCooldown] = useState(0);
  const [trendActive, setTrendActive] = useState(false);

  // ロード
  useEffect(() => {
    const save = loadSave();
    if (save) {
      setRetweets(save.retweets);
      setLikes(save.likes);
      setBookmarks(save.bookmarks);
      setReplies(save.replies);
      setClickPower(save.clickPower);
      setAutoRetweet(save.autoRetweet);
      setCritChance(save.critChance);
      setTimeExtend(save.timeExtend);
      setComboMultiplier(save.comboMultiplier);
      setFlameGuard(save.flameGuard);
      setInfluencer(save.influencer);
      setGachaLuck(save.gachaLuck);
      setAutoReply(save.autoReply);
      setVerified(save.verified);
      setMultiClick(save.multiClick || 0);
      setLuckyTime(save.luckyTime || 0);
      setAutoLike(save.autoLike || 0);
      setAutoBookmark(save.autoBookmark || 0);
      setViralBoost(save.viralBoost || 0);
      setPremiumBadge(save.premiumBadge || false);
      setTotalClicks(save.totalClicks || 0);
      setTotalCrits(save.totalCrits || 0);
      setTotalJackpots(save.totalJackpots || 0);
      setUnlockedAchievements(save.unlockedAchievements || []);
    }
    // テーマ読み込み
    const savedTheme = localStorage.getItem("retweet-clicker-theme") as "black" | "darkblue" | "light" | null;
    if (savedTheme) setTheme(savedTheme);
    setIsLoaded(true);
  }, []);

  // 自動セーブ（5秒ごと）
  useEffect(() => {
    if (!isLoaded) return;
    const save: GameSave = {
      retweets, likes, bookmarks, replies,
      clickPower, autoRetweet, critChance, timeExtend, comboMultiplier,
      flameGuard, influencer, gachaLuck, autoReply, verified,
      multiClick, luckyTime, autoLike, autoBookmark, viralBoost, premiumBadge,
      totalClicks, totalCrits, totalJackpots, unlockedAchievements
    };
    const timer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(save));
    }, 5000);
    return () => clearTimeout(timer);
  }, [isLoaded, retweets, likes, bookmarks, replies, clickPower, autoRetweet, critChance, timeExtend, comboMultiplier, flameGuard, influencer, gachaLuck, autoReply, verified, multiClick, luckyTime, autoLike, autoBookmark, viralBoost, premiumBadge, totalClicks, totalCrits, totalJackpots, unlockedAchievements]);

  // エクスポート（セーブコード生成）
  const exportSave = useCallback(() => {
    const save: GameSave = {
      retweets, likes, bookmarks, replies,
      clickPower, autoRetweet, critChance, timeExtend, comboMultiplier,
      flameGuard, influencer, gachaLuck, autoReply, verified,
      multiClick, luckyTime, autoLike, autoBookmark, viralBoost, premiumBadge,
      totalClicks, totalCrits, totalJackpots, unlockedAchievements
    };
    return btoa(JSON.stringify(save));
  }, [retweets, likes, bookmarks, replies, clickPower, autoRetweet, critChance, timeExtend, comboMultiplier, flameGuard, influencer, gachaLuck, autoReply, verified, multiClick, luckyTime, autoLike, autoBookmark, viralBoost, premiumBadge, totalClicks, totalCrits, totalJackpots, unlockedAchievements]);

  // インポート（セーブコード読み込み）
  const importSave = useCallback((code: string): boolean => {
    try {
      const save: GameSave = JSON.parse(atob(code));
      setRetweets(save.retweets);
      setLikes(save.likes);
      setBookmarks(save.bookmarks);
      setReplies(save.replies);
      setClickPower(save.clickPower);
      setAutoRetweet(save.autoRetweet);
      setCritChance(save.critChance);
      setTimeExtend(save.timeExtend);
      setComboMultiplier(save.comboMultiplier);
      setFlameGuard(save.flameGuard);
      setInfluencer(save.influencer);
      setGachaLuck(save.gachaLuck);
      setAutoReply(save.autoReply);
      setVerified(save.verified);
      setMultiClick(save.multiClick || 0);
      setLuckyTime(save.luckyTime || 0);
      setAutoLike(save.autoLike || 0);
      setAutoBookmark(save.autoBookmark || 0);
      setViralBoost(save.viralBoost || 0);
      setPremiumBadge(save.premiumBadge || false);
      setTotalClicks(save.totalClicks || 0);
      setTotalCrits(save.totalCrits || 0);
      setTotalJackpots(save.totalJackpots || 0);
      setUnlockedAchievements(save.unlockedAchievements || []);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(save));
      return true;
    } catch {
      return false;
    }
  }, []);

  // データリセット
  const resetSave = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setRetweets(0);
    setLikes(0);
    setBookmarks(0);
    setReplies(0);
    setClickPower(1);
    setAutoRetweet(0);
    setCritChance(0);
    setTimeExtend(0);
    setComboMultiplier(0);
    setFlameGuard(0);
    setInfluencer(0);
    setGachaLuck(0);
    setAutoReply(0);
    setVerified(false);
    setMultiClick(0);
    setLuckyTime(0);
    setAutoLike(0);
    setAutoBookmark(0);
    setViralBoost(0);
    setPremiumBadge(false);
    setTotalClicks(0);
    setTotalCrits(0);
    setTotalJackpots(0);
    setUnlockedAchievements([]);
  }, []);

  // バランス計算
  const totalEngagement = retweets + likes + bookmarks + replies;
  const rtRatio = totalEngagement > 0 ? retweets / totalEngagement : 0.25;
  const likeRatio = totalEngagement > 0 ? likes / totalEngagement : 0.25;
  const bookmarkRatio = totalEngagement > 0 ? bookmarks / totalEngagement : 0.25;
  const replyRatio = totalEngagement > 0 ? replies / totalEngagement : 0.25;

  const replyMultiplier = 1 + replyRatio * 0.5;
  const replyPenalty = 1 - replyRatio;
  const rtMultiplier = 0.5 + rtRatio * 1.5;
  const effectiveClickPower = Math.max(1, Math.floor(clickPower * rtMultiplier * replyPenalty));
  const shopDiscount = Math.min(likeRatio * 0.5, 0.5);
  const rtAutoPenalty = 1 - rtRatio;
  const likePenalty = 1 + likeRatio;
  const autoMultiplier = (0.5 + bookmarkRatio * 2.5) * replyMultiplier * rtAutoPenalty;
  const priceMultiplier = 1 + bookmarkRatio;
  const globalMultiplier = (1 + influencer * 0.2) * (verified ? 1.5 : 1) * (premiumBadge ? 2 : 1) * (trendActive ? 2 : 1) * (1 + viralBoost * 0.1);
  const luckyBonus = luckyTime * 5; // ラッキータイムによる確率ボーナス(%)

  // 価格計算
  const prices = {
    click: Math.floor(10 * Math.pow(1.5, clickPower - 1) * (1 - shopDiscount) * priceMultiplier),
    auto: Math.floor(50 * Math.pow(1.8, autoRetweet) * (1 - shopDiscount) * priceMultiplier * likePenalty),
    crit: Math.floor(100 * Math.pow(2, critChance) * (1 - shopDiscount) * priceMultiplier),
    time: Math.floor(200 * Math.pow(1.6, timeExtend) * (1 - shopDiscount) * priceMultiplier),
    combo: Math.floor(300 * Math.pow(2.2, comboMultiplier) * (1 - shopDiscount) * priceMultiplier),
    flameGuard: Math.floor(150 * Math.pow(1.8, flameGuard) * (1 - shopDiscount) * priceMultiplier),
    influencer: Math.floor(500 * Math.pow(2.5, influencer) * (1 - shopDiscount) * priceMultiplier),
    gacha: Math.floor(80 * Math.pow(1.5, gachaLuck) * (1 - shopDiscount) * priceMultiplier),
    autoReply: Math.floor(400 * Math.pow(2, autoReply) * (1 - shopDiscount) * priceMultiplier),
    verified: Math.floor(10000 * (1 - shopDiscount) * priceMultiplier),
    multiClick: Math.floor(250 * Math.pow(2, multiClick) * (1 - shopDiscount) * priceMultiplier),
    luckyTime: Math.floor(180 * Math.pow(1.7, luckyTime) * (1 - shopDiscount) * priceMultiplier),
    autoLike: Math.floor(300 * Math.pow(1.9, autoLike) * (1 - shopDiscount) * priceMultiplier),
    autoBookmark: Math.floor(350 * Math.pow(1.9, autoBookmark) * (1 - shopDiscount) * priceMultiplier),
    viralBoost: Math.floor(600 * Math.pow(2.3, viralBoost) * (1 - shopDiscount) * priceMultiplier),
    premiumBadge: Math.floor(50000 * (1 - shopDiscount) * priceMultiplier),
  };

  // 自動RT
  useEffect(() => {
    if (autoRetweet === 0) return;
    const interval = setInterval(() => {
      setRetweets((prev) => prev + Math.floor(autoRetweet * autoMultiplier * globalMultiplier));
    }, 1000);
    return () => clearInterval(interval);
  }, [autoRetweet, autoMultiplier, globalMultiplier]);

  // オートリプライ
  useEffect(() => {
    if (autoReply === 0) return;
    const interval = setInterval(() => {
      setReplies((prev) => prev + autoReply);
    }, 3000);
    return () => clearInterval(interval);
  }, [autoReply]);

  // オートいいね
  useEffect(() => {
    if (autoLike === 0) return;
    const interval = setInterval(() => {
      setLikes((prev) => prev + autoLike);
    }, 2000);
    return () => clearInterval(interval);
  }, [autoLike]);

  // オートブックマーク
  useEffect(() => {
    if (autoBookmark === 0) return;
    const interval = setInterval(() => {
      setBookmarks((prev) => prev + autoBookmark);
    }, 2500);
    return () => clearInterval(interval);
  }, [autoBookmark]);

  // トレンドクールダウン
  useEffect(() => {
    if (trendCooldown <= 0) return;
    const timer = setTimeout(() => setTrendCooldown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [trendCooldown]);

  // 購入関数
  const buyUpgrade = useCallback((type: string) => {
    const actions: Record<string, () => void> = {
      click: () => { if (retweets >= prices.click) { setRetweets(p => p - prices.click); setClickPower(p => p + 1); }},
      auto: () => { if (retweets >= prices.auto) { setRetweets(p => p - prices.auto); setAutoRetweet(p => p + 1); }},
      crit: () => { if (retweets >= prices.crit && critChance < 10) { setRetweets(p => p - prices.crit); setCritChance(p => p + 1); }},
      time: () => { if (retweets >= prices.time) { setRetweets(p => p - prices.time); setTimeExtend(p => p + 1); }},
      combo: () => { if (retweets >= prices.combo) { setRetweets(p => p - prices.combo); setComboMultiplier(p => p + 1); }},
      flameGuard: () => { if (retweets >= prices.flameGuard && flameGuard < 5) { setRetweets(p => p - prices.flameGuard); setFlameGuard(p => p + 1); }},
      influencer: () => { if (retweets >= prices.influencer) { setRetweets(p => p - prices.influencer); setInfluencer(p => p + 1); }},
      gacha: () => { if (retweets >= prices.gacha && gachaLuck < 10) { setRetweets(p => p - prices.gacha); setGachaLuck(p => p + 1); }},
      autoReply: () => { if (retweets >= prices.autoReply) { setRetweets(p => p - prices.autoReply); setAutoReply(p => p + 1); }},
      verified: () => { if (retweets >= prices.verified && !verified) { setRetweets(p => p - prices.verified); setVerified(true); }},
      multiClick: () => { if (retweets >= prices.multiClick && multiClick < 5) { setRetweets(p => p - prices.multiClick); setMultiClick(p => p + 1); }},
      luckyTime: () => { if (retweets >= prices.luckyTime) { setRetweets(p => p - prices.luckyTime); setLuckyTime(p => p + 1); }},
      autoLike: () => { if (retweets >= prices.autoLike) { setRetweets(p => p - prices.autoLike); setAutoLike(p => p + 1); }},
      autoBookmark: () => { if (retweets >= prices.autoBookmark) { setRetweets(p => p - prices.autoBookmark); setAutoBookmark(p => p + 1); }},
      viralBoost: () => { if (retweets >= prices.viralBoost) { setRetweets(p => p - prices.viralBoost); setViralBoost(p => p + 1); }},
      premiumBadge: () => { if (retweets >= prices.premiumBadge && !premiumBadge) { setRetweets(p => p - prices.premiumBadge); setPremiumBadge(true); }},
    };
    actions[type]?.();
  }, [retweets, prices, critChance, flameGuard, gachaLuck, verified, multiClick, premiumBadge]);

  const activateTrend = useCallback(() => {
    if (trendCooldown === 0) {
      setTrendActive(true);
      setTimeout(() => setTrendActive(false), 10000);
      setTrendCooldown(60);
    }
  }, [trendCooldown]);

  // 統計更新関数
  const addClick = useCallback((crits: number, jackpots: number) => {
    setTotalClicks(p => p + 1);
    if (crits > 0) setTotalCrits(p => p + crits);
    if (jackpots > 0) setTotalJackpots(p => p + jackpots);
  }, []);

  // 実績チェック
  const checkAchievements = useCallback(() => {
    const stats: AchievementStats = {
      retweets, likes, bookmarks, replies, totalEngagement,
      clickPower, autoRetweet, verified, premiumBadge, critChance, gachaLuck,
      totalClicks, totalCrits, totalJackpots, maxCombo: 0
    };
    const newUnlocked: string[] = [];
    ACHIEVEMENTS.forEach(ach => {
      if (!unlockedAchievements.includes(ach.id) && ach.condition(stats)) {
        newUnlocked.push(ach.id);
      }
    });
    if (newUnlocked.length > 0) {
      setUnlockedAchievements(prev => [...prev, ...newUnlocked]);
    }
    return newUnlocked;
  }, [retweets, likes, bookmarks, replies, totalEngagement, clickPower, autoRetweet, verified, premiumBadge, critChance, gachaLuck, totalClicks, totalCrits, totalJackpots, unlockedAchievements]);

  // 定期的に実績チェック
  useEffect(() => {
    if (!isLoaded) return;
    checkAchievements();
  }, [isLoaded, retweets, likes, bookmarks, replies, clickPower, autoRetweet, verified, premiumBadge, critChance, gachaLuck, totalClicks, totalCrits, totalJackpots, checkAchievements]);

  // テーマ変更
  const changeTheme = useCallback((newTheme: "black" | "darkblue" | "light") => {
    setTheme(newTheme);
    localStorage.setItem("retweet-clicker-theme", newTheme);
  }, []);

  return {
    // State
    retweets, setRetweets, likes, setLikes, bookmarks, setBookmarks, replies, setReplies,
    clickPower, setClickPower, autoRetweet, critChance, timeExtend, comboMultiplier,
    flameGuard, influencer, gachaLuck, autoReply, verified,
    multiClick, luckyTime, autoLike, autoBookmark, viralBoost, premiumBadge,
    trendCooldown, trendActive,
    isLoaded,
    // 実績
    totalClicks, totalCrits, totalJackpots, unlockedAchievements,
    // テーマ
    theme, changeTheme,
    // Computed
    totalEngagement, rtRatio, likeRatio, bookmarkRatio, replyRatio,
    rtMultiplier, replyMultiplier, shopDiscount, autoMultiplier, effectiveClickPower, globalMultiplier, luckyBonus,
    prices,
    // Actions
    buyUpgrade, activateTrend, exportSave, importSave, resetSave, addClick, checkAchievements,
  };
}
