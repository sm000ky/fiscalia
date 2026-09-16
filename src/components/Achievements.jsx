import { useState } from 'react'
import { Trophy, Star } from 'lucide-react'

const ACHIEVEMENTS = [
  { id: 'tax_novice', name: 'Langkah Pertama 🌷', description: 'Selesaikan kuis pertamamu', icon: '🎓', requirement: { type: 'quiz_completed', count: 1 } },
  { id: 'combo_master', name: 'Kombo Master 🔥', description: 'Dapat 5 jawaban beruntun', icon: '⚡', requirement: { type: 'max_streak', count: 5 } },
  { id: 'fiscal_warrior', name: 'Pejuang Pajak ⚔️', description: 'Raih 800+ poin dalam satu kuis', icon: '💖', requirement: { type: 'high_score', count: 800 } },
  { id: 'perfect_score', name: 'Sempurna! 💯', description: 'Jawab semua 10 soal dengan benar', icon: '🌟', requirement: { type: 'perfect_quiz', count: 10 } },
  { id: 'calculator_pro', name: 'Ahli Hitung 🧮', description: 'Pakai kalkulator 5 kali', icon: '🍰', requirement: { type: 'calculator_used', count: 5 } },
  { id: 'boss_slayer', name: 'Penakluk Monster 🧸', description: 'Kalahkan Monster Pajak', icon: '🏅', requirement: { type: 'boss_defeated', count: 1 } },
]

export default function Achievements({ isOpen, onClose }) {
  const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
    try { return JSON.parse(localStorage.getItem('taxquest_achievements')) || [] } catch { return [] }
  })
  const [stats, setStats] = useState(() => {
    try { return JSON.parse(localStorage.getItem('taxquest_stats')) || {} } catch { return {} }
  })

  if (!isOpen) return null
  const isUnlocked = (id) => unlockedAchievements.includes(id)
  const getProgress = (a) => {
    const { type, count } = a.requirement
    return Math.min(Math.round(((stats[type] || 0) / count) * 100), 100)
  }

  return (
    <div className="fixed inset-0 bg-[#5b4a68]/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-[#fff7fb] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-8 pop-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-1">
          <h2 className="font-cute text-2xl font-extrabold text-[#5b4a68]">🏆 Koleksi Lencana</h2>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-[#fff3f8] text-[#e85d9e] font-cute font-extrabold text-lg">✕</button>
        </div>
        <p className="text-sm text-[#a08bb0] mb-5">Kumpulin semuanya ya, semangat! 💕</p>

        <div className="grid sm:grid-cols-2 gap-3">
          {ACHIEVEMENTS.map((a) => {
            const unlocked = isUnlocked(a.id)
            const progress = getProgress(a)
            return (
              <div key={a.id} className={`rounded-2xl p-4 border-2 ${unlocked ? 'bg-white border-[#ffd1e0]' : 'bg-white/60 border-pink-50'}`}>
                <div className="flex items-start gap-3">
                  <div className={`text-4xl ${unlocked ? '' : 'grayscale opacity-40'}`}>{a.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-cute font-bold ${unlocked ? 'text-[#e85d9e]' : 'text-[#c4b3d1]'}`}>{a.name}</h3>
                    <p className="text-xs text-[#a08bb0] mb-2">{a.description}</p>
                    {!unlocked && (
                      <>
                        <div className="bar-track h-2">
                          <div className="bar-boss h-full rounded-full transition-all" style={{ width: `${progress}%` }} />
                        </div>
                        <div className="text-[11px] text-[#c4b3d1] mt-1">{progress}%</div>
                      </>
                    )}
                    {unlocked && (
                      <div className="chip inline-flex items-center gap-1 bg-[#e9faf3] text-[#1d9e6b] text-[11px] px-2.5 py-1">
                        <Trophy size={12} /> Terbuka!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-4 bg-white rounded-2xl border border-purple-100 p-5">
          <h3 className="font-cute font-bold text-[#7c5fc9] mb-3 flex items-center gap-1.5"><Star size={16} /> Statistik kamu</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            {[
              [stats.quiz_completed || 0, 'Kuis selesai'],
              [stats.max_streak || 0, 'Kombo max'],
              [stats.high_score || 0, 'Skor tertinggi'],
              [unlockedAchievements.length, 'Lencana'],
            ].map(([v, l]) => (
              <div key={l} className="bg-[#f6f0ff] rounded-2xl p-3">
                <div className="font-cute text-2xl font-extrabold text-[#7c5fc9]">{v}</div>
                <div className="text-[11px] text-[#a08bb0]">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function unlockAchievement(achievementId) {
  try {
    const unlocked = JSON.parse(localStorage.getItem('taxquest_achievements')) || []
    if (!unlocked.includes(achievementId)) {
      unlocked.push(achievementId)
      localStorage.setItem('taxquest_achievements', JSON.stringify(unlocked))
      try { import('../utils/soundEffects').then(m => m.playLevelUpSound?.()) } catch {}
      return true
    }
  } catch {}
  return false
}

export function updateStats(statType, value) {
  try {
    const stats = JSON.parse(localStorage.getItem('taxquest_stats')) || {}
    if (statType === 'max_streak' || statType === 'high_score') {
      stats[statType] = Math.max(stats[statType] || 0, value)
    } else {
      stats[statType] = (stats[statType] || 0) + value
    }
    localStorage.setItem('taxquest_stats', JSON.stringify(stats))
    ACHIEVEMENTS.forEach((a) => {
      const { type, count } = a.requirement
      if ((stats[type] || 0) >= count) unlockAchievement(a.id)
    })
  } catch {}
}
