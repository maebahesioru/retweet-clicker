type BalanceMeterProps = {
  rtRatio: number;
  likeRatio: number;
  bookmarkRatio: number;
  replyRatio: number;
  rtMultiplier: number;
  shopDiscount: number;
  autoMultiplier: number;
  replyMultiplier: number;
};

export function BalanceMeter({
  rtRatio, likeRatio, bookmarkRatio, replyRatio,
  rtMultiplier, shopDiscount, autoMultiplier, replyMultiplier
}: BalanceMeterProps) {
  return (
    <div className="theme-border border-b p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm theme-muted">エンゲージメントバランス</span>
      </div>
      <div className="h-2 theme-card rounded-full overflow-hidden flex">
        <div className="bg-green-500 transition-all duration-300" style={{ width: `${rtRatio * 100}%` }} />
        <div className="bg-pink-500 transition-all duration-300" style={{ width: `${likeRatio * 100}%` }} />
        <div className="bg-blue-500 transition-all duration-300" style={{ width: `${bookmarkRatio * 100}%` }} />
        <div className="bg-cyan-500 transition-all duration-300" style={{ width: `${replyRatio * 100}%` }} />
      </div>
      <div className="flex justify-between mt-2 text-xs">
        <span className="text-green-400">🔄{(rtRatio * 100).toFixed(0)}%</span>
        <span className="text-pink-400">💗{(likeRatio * 100).toFixed(0)}%</span>
        <span className="text-blue-400">🔖{(bookmarkRatio * 100).toFixed(0)}%</span>
        <span className="text-cyan-400">💬{(replyRatio * 100).toFixed(0)}%</span>
      </div>
      <div className="grid grid-cols-4 gap-2 mt-3 text-xs text-center">
        <div className="bg-green-500/10 rounded p-2">
          <div className="text-green-400">クリック効率</div>
          <div className="font-bold">x{rtMultiplier.toFixed(2)}</div>
          <div className="text-red-400 text-[10px]">自動RT-{Math.floor(rtRatio * 100)}%</div>
        </div>
        <div className="bg-pink-500/10 rounded p-2">
          <div className="text-pink-400">ショップ割引</div>
          <div className="font-bold">{Math.floor(shopDiscount * 100)}%OFF</div>
          <div className="text-red-400 text-[10px]">自動価格+{Math.floor(likeRatio * 100)}%</div>
        </div>
        <div className="bg-blue-500/10 rounded p-2">
          <div className="text-blue-400">自動RT効率</div>
          <div className="font-bold">x{autoMultiplier.toFixed(2)}</div>
          <div className="text-red-400 text-[10px]">価格+{Math.floor(bookmarkRatio * 100)}%</div>
        </div>
        <div className="bg-cyan-500/10 rounded p-2">
          <div className="text-cyan-400">全体効率</div>
          <div className="font-bold">x{replyMultiplier.toFixed(2)}</div>
          <div className="text-red-400 text-[10px]">クリック-{Math.floor(replyRatio * 100)}%</div>
        </div>
      </div>
    </div>
  );
}
