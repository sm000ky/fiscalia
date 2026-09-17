import { useEffect, useState } from 'react'
import { X, Trophy, Medal, Search } from 'lucide-react'
import { GAME_MODES, getActiveModes } from '../data/gameModes'
import { fetchGlobalLeaderboard } from '../utils/leaderboardApi'
import PlayerCardModal from './PlayerCardModal'

function rankBadge(rank) {
  if (rank === 1) return '🥇'
  if (rank === 2) return '🥈'
  if (rank === 3) return '🥉'
  if (rank <= 10) return '🏅'
  return `#${rank}`
}

export default function LeaderboardModal({ isOpen, onClose, initialMode = 'quiz', initialPlayer = null }) {
  const modes = getActiveModes()
  const [mode, setMode] = useState(initialMode)
  const [board, setBoard] = useState([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [inspect, setInspect] = useState(initialPlayer)

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode)
      setInspect(initialPlayer)
      setQuery('')
    }
  }, [isOpen, initialMode, initialPlayer])

  useEffect(() => {
    if (!isOpen) return
    let alive = true
    setLoading(true)
    fetchGlobalLeaderboard(mode)
      .then((b) => {
        if (alive) setBoard(b)
      })
      .finally(() => {
        if (alive) setLoading(false)
      })
    return () => {
      alive = false
    }
  }, [isOpen, mode])

  if (!isOpen) return null

  const filtered = query.trim()
    ? board.filter((e) => e.name.toLowerCase().includes(query.trim().toLowerCase()))
    : board
  const modeInfo = GAME_MODES.find((m) => m.id === mode)

  return (
    <div
      className="fixed inset-0 z-[105] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm pop-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-3xl p-5 sm:p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-2 border-pink-100 dark:border-purple-800/50 shadow-2xl max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2">
          <Trophy size={22} className="text-[#e85d9e]" />
          <h2 className="font-cute text-xl font-extrabold text-[#5b4a68] dark:text-pink-200 flex-1">
            Papan Peringkat 🏆
          </h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#f6f0ff] hover:bg-[#ece0ff] flex items-center justify-center text-[#7c5fc9] transition-all hover:scale-110"
            aria-label="Tutup leaderboard"
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab filter per game mode */}
        <div className="flex gap-2 mt-3">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`cute-btn flex-1 px-3 py-2.5 text-sm flex items-center justify-center gap-1.5 ${
                mode === m.id ? 'cute-btn-pink' : 'bg-white text-[#a08bb0] border-2 border-pink-100'
              }`}
            >
              <span>{m.emoji}</span> {m.name}
            </button>
          ))}
        </div>

        <div className="relative mt-3">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c4b3d1]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama player..."
            className="w-full bg-[#fff8ec] dark:bg-slate-800 rounded-2xl border-2 border-pink-100 dark:border-purple-800 pl-9 pr-3 py-2.5 text-sm font-semibold text-[#5b4a68] dark:text-pink-100 focus:outline-none focus:border-[#ff6ba8]"
          />
        </div>

        <p className="text-[11px] text-[#a08bb0] mt-2">
          {modeInfo?.emoji} {modeInfo?.name} • skor dalam {modeInfo?.unit || 'poin'} • klik nama untuk intip kartu ✨
        </p>

        <div className="overflow-y-auto mt-2 space-y-2 pr-1">
          {loading && <p className="text-center text-sm text-[#a08bb0] py-6">Memuat papan peringkat... ⏳</p>}
          {!loading && filtered.length === 0 && (
            <p className="text-center text-sm text-[#a08bb0] py-6">Belum ada skor — jadilah yang pertama! 💪</p>
          )}
          {!loading &&
            filtered.map((e) => (
              <button
                key={`${e.name}-${e.score}-${e.date}`}
                onClick={() => setInspect(e)}
                className="w-full flex items-center gap-3 bg-white dark:bg-slate-800/70 border border-pink-100 dark:border-purple-800/40 rounded-2xl px-3 py-2.5 text-left transition-all hover:scale-[1.01] hover:shadow-lg"
              >
                <span className="text-lg w-10 text-center shrink-0">{rankBadge(e.rank)}</span>
                <span className="text-2xl shrink-0">{e.avatar || '🧙‍♂️'}</span>
                <span className="flex-1 min-w-0">
                  <span className="block font-cute font-bold text-[#5b4a68] dark:text-pink-100 truncate">
                    {e.name}
                  </span>
                  <span className="block text-[11px] text-[#a08bb0] truncate">{e.title}</span>
                </span>
                <span className="text-right shrink-0">
                  <span className="block font-cute font-extrabold text-[#e85d9e]">{e.score}</span>
                  <span className="flex items-center justify-end gap-1 text-[10px] text-[#c4b3d1]">
                    <Medal size={10} /> #{e.rank}
                  </span>
                </span>
              </button>
            ))}
        </div>
      </div>

      <PlayerCardModal isOpen={!!inspect} onClose={() => setInspect(null)} player={inspect} />
    </div>
  )
}
