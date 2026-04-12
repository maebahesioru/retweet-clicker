"use client";

import { useState } from "react";

type SettingsPageProps = {
  exportSave: () => string;
  importSave: (code: string) => boolean;
  resetSave: () => void;
  theme: "black" | "darkblue" | "light";
  changeTheme: (theme: "black" | "darkblue" | "light") => void;
};

export function SettingsPage({ exportSave, importSave, resetSave, theme, changeTheme }: SettingsPageProps) {
  const [importCode, setImportCode] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleExport = () => {
    const code = exportSave();
    navigator.clipboard.writeText(code);
    setMessage({ type: "success", text: "セーブコードをコピーしました！" });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleImport = () => {
    if (!importCode.trim()) {
      setMessage({ type: "error", text: "コードを入力してください" });
      return;
    }
    const success = importSave(importCode.trim());
    if (success) {
      setMessage({ type: "success", text: "データを読み込みました！" });
      setImportCode("");
    } else {
      setMessage({ type: "error", text: "無効なコードです" });
    }
    setTimeout(() => setMessage(null), 3000);
  };

  const handleReset = () => {
    resetSave();
    setShowResetConfirm(false);
    setMessage({ type: "success", text: "データをリセットしました" });
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="font-bold text-lg">⚙️ 設定</h2>

      {message && (
        <div className={`p-3 rounded-xl ${message.type === "success" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
          {message.text}
        </div>
      )}

      {/* テーマ設定 */}
      <div className="theme-border border rounded-2xl p-4">
        <h3 className="font-bold mb-3">🎨 テーマ</h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => changeTheme("black")}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${
              theme === "black" 
                ? "bg-white text-black" 
                : "theme-card theme-border border hover:opacity-80"
            }`}
          >
            ブラック
          </button>
          <button
            type="button"
            onClick={() => changeTheme("darkblue")}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${
              theme === "darkblue" 
                ? "bg-blue-500 text-white" 
                : "theme-card theme-border border hover:opacity-80"
            }`}
          >
            ダークブルー
          </button>
          <button
            type="button"
            onClick={() => changeTheme("light")}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${
              theme === "light" 
                ? "bg-blue-500 text-white" 
                : "theme-card theme-border border hover:opacity-80"
            }`}
          >
            ライト
          </button>
        </div>
      </div>

      {/* エクスポート */}
      <div className="theme-border border rounded-2xl p-4">
        <h3 className="font-bold mb-2">📤 データをエクスポート</h3>
        <p className="text-sm theme-muted mb-3">
          セーブコードをコピーして、別のブラウザで読み込めます
        </p>
        <button
          type="button"
          onClick={handleExport}
          className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold transition-colors"
        >
          セーブコードをコピー
        </button>
      </div>

      {/* インポート */}
      <div className="theme-border border rounded-2xl p-4">
        <h3 className="font-bold mb-2">📥 データをインポート</h3>
        <p className="text-sm theme-muted mb-3">
          別のブラウザからコピーしたセーブコードを貼り付けてください
        </p>
        <textarea
          value={importCode}
          onChange={(e) => setImportCode(e.target.value)}
          placeholder="セーブコードを貼り付け..."
          className="w-full theme-card theme-border border rounded-xl p-3 mb-3 resize-none h-24 focus:outline-none focus:border-blue-500"
        />
        <button
          type="button"
          onClick={handleImport}
          className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-colors"
        >
          データを読み込む
        </button>
      </div>

      {/* リセット */}
      <div className="border border-red-400 rounded-2xl p-4">
        <h3 className="font-bold mb-2 text-red-500">🗑️ データリセット</h3>
        <p className="text-sm theme-muted mb-3">
          すべての進捗が削除されます。この操作は取り消せません。
        </p>
        {showResetConfirm ? (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-colors"
            >
              本当にリセット
            </button>
            <button
              type="button"
              onClick={() => setShowResetConfirm(false)}
              className="flex-1 py-3 theme-card hover:opacity-80 rounded-xl font-bold transition-colors"
            >
              キャンセル
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="w-full py-3 theme-card hover:bg-red-500 hover:text-white rounded-xl font-bold transition-colors text-red-500"
          >
            データをリセット
          </button>
        )}
      </div>
    </div>
  );
}
