export function EffectDescription() {
  return (
    <div className="p-4 theme-muted text-sm theme-border border-b">
      <h3 className="font-bold theme-text mb-3">📊 エンゲージメント効果</h3>
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <span className="text-green-500">🔄 RT</span>
          <div>
            <span className="text-green-400">✓ クリック効率UP (最大x2)</span>
            <span className="text-red-400 ml-2">✗ 自動RT効率DOWN (最大-100%)</span>
          </div>
        </div>
        <div className="text-gray-500 text-xs ml-6 mb-1">
          └ 引用RT: タイピング成功でRT x2倍 / 失敗でRT半減⚠️
        </div>
        <div className="flex items-start gap-2">
          <span className="text-pink-500">💗 いいね</span>
          <div>
            <span className="text-pink-400">✓ ショップ割引 (最大50%OFF)</span>
            <span className="text-red-400 ml-2">✗ 自動RT価格UP (最大+100%)</span>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-blue-500">🔖 ブクマ</span>
          <div>
            <span className="text-blue-400">✓ 自動RT効率UP (最大x3)</span>
            <span className="text-red-400 ml-2">✗ 価格上昇 (最大+100%)</span>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-cyan-500">💬 リプ</span>
          <div>
            <span className="text-cyan-400">✓ 全体効率UP (最大x1.5)</span>
            <span className="text-red-400 ml-2">✗ クリック効率DOWN (最大-100%)</span>
          </div>
        </div>
        <div className="text-gray-500 text-xs ml-6 mb-1">
          └ タイピング失敗でクリック力1にリセット⚠️
        </div>
      </div>
      <p className="mt-3 text-xs text-gray-500">※ 各比率によってボーナス/ペナルティが変動します</p>
    </div>
  );
}
