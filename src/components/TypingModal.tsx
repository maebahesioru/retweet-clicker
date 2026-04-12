type TypingModalProps = {
  show: boolean;
  targetWord: string;
  typedWord: string;
  timeLeft: number;
  onType: (value: string) => void;
  onClose: () => void;
  onSuccess: () => void;
  isQuote?: boolean;
};

export function TypingModal({ show, targetWord, typedWord, timeLeft, onType, onClose, onSuccess, isQuote }: TypingModalProps) {
  if (!show) return null;

  const isCorrect = typedWord === targetWord;

  return (
    <div className="fixed inset-0 bg-gray-600/50 flex items-start justify-center pt-12 z-50">
      <div className="bg-black border border-gray-800 rounded-2xl w-full max-w-xl mx-4">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <button onClick={onClose} className="text-white hover:bg-gray-800 rounded-full p-2" title="閉じる">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"/>
            </svg>
          </button>
          <span className="text-cyan-500 font-bold">残り {timeLeft}秒</span>
        </div>

        {isQuote ? (
          <div className="p-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-lg">👤</div>
              <div className="flex-1">
                <div className="text-gray-500 text-sm mb-2">
                  入力してね → <span className="text-green-400 font-bold text-lg">{targetWord}</span>
                </div>
                <input
                  type="text"
                  value={typedWord}
                  onChange={(e) => onType(e.target.value)}
                  className="w-full bg-transparent text-xl focus:outline-none placeholder-gray-600"
                  placeholder="コメントを追加"
                  autoFocus
                />
                <div className="border border-gray-700 rounded-2xl p-3 mt-3">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full overflow-hidden">
                      <img src="/avatar.png" alt="アバター" className="w-full h-full object-cover" />
                    </div>
                    <span className="font-bold text-sm">マニアヤマ</span>
                    <span className="text-gray-500 text-sm">@YamayamaMr · 今</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-300">いいねおねがいします！</p>
                </div>
                <div className="flex items-center gap-2 mt-3 text-cyan-500 text-sm">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zM12 20.25c-4.56 0-8.25-3.69-8.25-8.25S7.44 3.75 12 3.75s8.25 3.69 8.25 8.25-3.69 8.25-8.25 8.25z"/>
                  </svg>
                  <span>全員が返信できます</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 border-b border-gray-800">
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src="/avatar.png" alt="アバター" className="w-full h-full object-cover" />
              </div>
                <div className="w-0.5 bg-gray-700 flex-1 mt-2"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1 text-sm">
                  <span className="font-bold">マニアヤマ</span>
                  <span className="text-gray-500">@YamayamaMr · 今</span>
                </div>
                <p className="mt-1 text-[15px]">いいねおねがいします！</p>
              </div>
            </div>
          </div>
        )}

        {!isQuote && (
          <div className="p-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-lg">👤</div>
              <div className="flex-1">
                <div className="text-gray-500 text-sm mb-2">
                  入力してね → <span className="text-cyan-400 font-bold text-lg">{targetWord}</span>
                </div>
                <input
                  type="text"
                  value={typedWord}
                  onChange={(e) => onType(e.target.value)}
                  className="w-full bg-transparent text-xl focus:outline-none placeholder-gray-600"
                  autoFocus
                  placeholder="リプライを入力..."
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between p-4 border-t border-gray-800">
          <div className="flex gap-4 text-cyan-500 opacity-50">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13z"/></svg>
          </div>
          <button
            onClick={onSuccess}
            disabled={!isCorrect}
            className={`px-4 py-1.5 rounded-full font-bold transition-all
              ${isCorrect ? "bg-white text-black hover:bg-gray-200" : "bg-gray-600 text-gray-400 cursor-not-allowed"}`}
          >
            ポストする
          </button>
        </div>
      </div>
    </div>
  );
}
