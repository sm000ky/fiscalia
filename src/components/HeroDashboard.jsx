import { useState, useEffect } from 'react'
import { User, DollarSign, Calendar, Sparkles, Pencil, Shuffle, X, Trophy, Swords, CreditCard } from 'lucide-react'
import PlayerCardModal from './PlayerCardModal'
import LeaderboardModal from './LeaderboardModal'
import { getPlayerAvatar } from '../utils/leaderboardApi'
import {
  DEFAULT_NICKNAME,
  getUserProfile,
  saveUserProfile,
  isFirstTimeUser,
  getGachaGreeting,
  getQuizHistory,
} from '../utils/greetingStorage'

const CAT_LABEL = {
  roasting: '🔥 Roasting Tipis',
  motivasi: '💪 Motivasi Ngawur',
  fakta: '🤓 Fakta Absurd',
}

function readHeroXP() {
  try {
    return Number(localStorage.getItem('taxquest_hero_xp')) || 850
  } catch {
    return 850
  }
}

export default function HeroDashboard() {
  const [profile, setProfile] = useState(() => getUserProfile())
  const [showModal, setShowModal] = useState(() => isFirstTimeUser())
  const [draft, setDraft] = useState('')
  const [editing, setEditing] = useState(false)
  const [editDraft, setEditDraft] = useState('')
  const [greet, setGreet] = useState(() => getGachaGreeting(getUserProfile().name))
  const [heroXP, setHeroXP] = useState(() => readHeroXP())
  const [history, setHistory] = useState(() => getQuizHistory())
  const [showCard, setShowCard] = useState(false)
  const [showBoard, setShowBoard] = useState(false)
  const [avatar, setAvatar] = useState(() => {
    try { return getPlayerAvatar() } catch { return '🧙‍♂️' }
  })

  // Persisted XP: ikuti event dari QuizArena + refresh aman
  useEffect(() => {
    const sync = () => {
      setHeroXP(readHeroXP())
      setHistory(getQuizHistory())
    }
    const onXp = () => sync()
    const onStorage = (e) => {
      if (!e || !e.key || e.key === 'taxquest_hero_xp' || e.key === 'taxquest_quiz_history') sync()
    }
    window.addEventListener('taxquest:xp', onXp)
    window.addEventListener('storage', onStorage)
    const onAvatar = (e) => { if (e?.detail?.avatar) setAvatar(e.detail.avatar) }
    window.addEventListener('taxquest:avatar', onAvatar)
    sync()
    return () => {
      window.removeEventListener('taxquest:xp', onXp)
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('taxquest:avatar', onAvatar)
    }
  }, [])

  const level = Math.max(1, Math.floor(heroXP / 1000) + 1)
  const xpInLevel = heroXP % 1000
  const best = history.reduce((m, h) => Math.max(m, Number(h.score) || 0), 0)

  const applyName = (raw) => {
    const saved = saveUserProfile(raw)
    const next = { name: saved.name, isDefault: false, updatedAt: saved.updatedAt }
    setProfile(next)
    setGreet(getGachaGreeting(saved.name))
    return saved
  }

  const submitOnboarding = () => {
    applyName(draft || DEFAULT_NICKNAME)
    setDraft('')
    setShowModal(false)
  }

  const submitEdit = () => {
    if (!editDraft.trim()) {
      setEditing(false)
      return
    }
    applyName(editDraft)
    setEditDraft('')
    setEditing(false)
  }

  const shuffleGreet = () => setGreet(getGachaGreeting(profile.name))

  const quotes = [
    'Debit di kiri, kredit di kanan, hidup tenang! 🌷',
    'PPh 21 TER? Gampang banget! 💕',
    'Koreksi fiskal itu cardio ✨',
    'Rencanakan pajak dengan manis, bukan ngemplang! 🍰',
  ]
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

  return (
    <div className="space-y-3">
      {/* Onboarding modal untuk user baru */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm pop-in">
          <div className="cute-card max-w-md w-full p-6 sm:p-8 text-center relative">
            <div className="text-6xl mb-2 select-none">⚔️</div>
            <h2 className="font-cute text-2xl font-extrabold text-[#5b4a68]">
              Welcome Ksatria Pajak! 🌸
            </h2>
            <p className="text-sm text-[#a08bb0] mt-1 mb-4">
              Sebelum bertarung lawan Monster Pajak, kenalan dulu yuk — masukkan Nickname kesukaanmu, Darling 💕
            </p>
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitOnboarding()}
              maxLength={24}
              placeholder={DEFAULT_NICKNAME}
              className="w-full bg-[#fff8ec] rounded-2xl border-2 border-pink-200 px-4 py-3 text-center font-cute font-bold text-lg text-[#5b4a68] focus:outline-none focus:border-[#ff6ba8] transition-all"
            />
            <button onClick={submitOnboarding} className="cute-btn cute-btn-pink w-full mt-3 px-6 py-3.5 text-base">
              ✨ Gas Masuk Arena!
            </button>
            <p className="text-[11px] text-[#c4b3d1] mt-2">Bisa diganti kapan aja via tombol ✏️ di profil</p>
          </div>
        </div>
      )}

      <div className="cute-card p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button
            onClick={() => setShowCard(true)}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-[#ffd1e0] to-[#e3d4ff] flex items-center justify-center shrink-0 text-5xl transition-all hover:scale-105"
            title="Buka kartu profil"
            aria-label="Buka kartu profil"
          >
            {avatar || <User size={44} className="text-[#e85d9e]" />}
          </button>
          <div className="flex-1 w-full text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              {editing ? (
                <span className="flex items-center gap-1.5">
                  <input
                    autoFocus
                    value={editDraft}
                    onChange={(e) => setEditDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') submitEdit()
                      if (e.key === 'Escape') setEditing(false)
                    }}
                    maxLength={24}
                    placeholder={profile.name}
                    className="bg-[#fff8ec] rounded-xl border-2 border-pink-200 px-3 py-1.5 font-cute font-bold text-[#5b4a68] text-lg focus:outline-none focus:border-[#ff6ba8] w-44"
                  />
                  <button
                    onClick={submitEdit}
                    className="cute-btn cute-btn-pink px-3 py-1.5 text-sm"
                    title="Simpan nama"
                  >
                    ✔
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="cute-btn bg-white text-[#a08bb0] border-2 border-pink-100 px-3 py-1.5 text-sm"
                    title="Batal"
                  >
                    <X size={14} />
                  </button>
                </span>
              ) : (
                <>
                  <h2 className="font-cute text-xl font-extrabold text-[#5b4a68]">{profile.name} 🌸</h2>
                  <button
                    onClick={() => {
                      setEditDraft(profile.isDefault ? '' : profile.name)
                      setEditing(true)
                    }}
                    className="w-7 h-7 rounded-full bg-[#f6f0ff] hover:bg-[#ece0ff] flex items-center justify-center text-[#7c5fc9] transition-all hover:scale-110"
                    title="Ganti nickname"
                    aria-label="Ganti nickname"
                  >
                    <Pencil size={13} />
                  </button>
                </>
              )}
            </div>
            <div className="flex gap-2 items-center justify-center sm:justify-start mt-1">
              <span className="chip bg-[#f6f0ff] text-[#7c5fc9] text-xs px-3 py-1">Level {level}</span>
              <div className="flex-1 bar-track h-3 max-w-[200px]">
                <div className="bar-xp h-full rounded-full transition-all duration-500" style={{ width: `${(xpInLevel / 1000) * 100}%` }} />
              </div>
              <span className="text-[11px] text-[#a08bb0]">{xpInLevel}/1000</span>
            </div>
            {/* Dynamic gacha greeting */}
            <div className="bg-[#fff3f8] border border-pink-100 rounded-2xl px-3 py-2.5 mt-3 flex items-start gap-2 text-left">
              <p className="text-sm text-[#5b4a68] font-semibold flex-1 leading-snug">💌 {greet.text}</p>
              <button
                onClick={shuffleGreet}
                className="shrink-0 w-7 h-7 rounded-full bg-white border border-pink-100 flex items-center justify-center text-[#e85d9e] transition-all hover:scale-110 hover:rotate-180 duration-300"
                title="Acak sapaan baru"
                aria-label="Acak sapaan baru"
              >
                <Shuffle size={13} />
              </button>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-1.5">
              <span className="text-[11px] text-[#c4b3d1]">{CAT_LABEL[greet.category] || ''}</span>
              <span className="text-[11px] text-[#c4b3d1]">•</span>
              <span className="text-[11px] text-[#c4b3d1] flex items-center gap-1">
                <Trophy size={11} /> {history.length} kuis • terbaik {best}
              </span>
              <span className="text-[11px] text-[#c4b3d1]">•</span>
              <span className="text-[11px] text-[#c4b3d1] flex items-center gap-1">
                <Swords size={11} /> {heroXP} XP total
              </span>
            </div>
            {/* Trophy leaderboard + kartu profil */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
              <button
                onClick={() => setShowBoard(true)}
                className="cute-btn cute-btn-pink px-4 py-2 text-xs flex items-center gap-1.5"
                title="Lihat papan peringkat"
              >
                <Trophy size={14} /> Leaderboard
              </button>
              <button
                onClick={() => setShowCard(true)}
                className="cute-btn cute-btn-lav px-4 py-2 text-xs flex items-center gap-1.5"
                title="Lihat kartu profil RPG"
              >
                <CreditCard size={14} /> Kartu Profil
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="bg-[#f6f0ff] rounded-2xl p-2.5 text-center">
                <p className="text-[11px] text-[#a08bb0]">💜 Energi</p>
                <p className="font-cute font-extrabold text-[#7c5fc9]">850/1000</p>
              </div>
              <div className="bg-[#fff8ec] rounded-2xl p-2.5 text-center">
                <p className="text-[11px] text-[#a08bb0]">🍰 Semangat</p>
                <p className="font-cute font-extrabold text-[#d99a2b]">65%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cute-card-lav p-5">
        <div className="flex items-start gap-2.5">
          <Sparkles size={20} className="text-[#7c5fc9] shrink-0 mt-0.5" />
          <div>
            <h3 className="font-cute font-bold text-[#7c5fc9] text-sm">Kata hari ini 💌</h3>
            <p className="text-[#5b4a68] font-semibold">{randomQuote}</p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div className="cute-card-mint p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <DollarSign size={18} className="text-[#1d9e6b]" />
            <h3 className="font-cute font-bold text-[#0d4a3a] text-sm">Kurs pajak 💚</h3>
          </div>
          {[['USD', 'Rp 15.750'], ['EUR', 'Rp 17.200'], ['JPY', 'Rp 112']].map(([c, v]) => (
            <div key={c} className="flex justify-between text-sm py-1 border-b border-white/60 last:border-0">
              <span className="text-[#5b8a78]">{c}</span>
              <span className="font-cute font-bold text-[#0d4a3a]">{v}</span>
            </div>
          ))}
        </div>

        <div className="cute-card p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Calendar size={18} className="text-[#e85d9e]" />
            <h3 className="font-cute font-bold text-[#5b4a68] text-sm">Jadwal hari ini 🌸</h3>
          </div>
          {[
            ['08:00 – 10:00', 'PPh Pasal 21', '#fff3f8'],
            ['13:00 – 15:00', 'Audit forensik', '#f6f0ff'],
          ].map(([t, s, bg]) => (
            <div key={t} className="rounded-xl p-2.5 mb-2 last:mb-0" style={{ background: bg }}>
              <p className="text-[11px] text-[#a08bb0]">{t}</p>
              <p className="font-cute font-bold text-[#5b4a68] text-sm">{s}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-[#ff7eb3] to-[#b388ff] rounded-3xl p-4 text-white text-center flex flex-col justify-center">
          <div className="text-4xl mb-1">💖</div>
          <p className="font-cute font-bold">Tetap semangat ya, {profile.name}!</p>
          <p className="text-xs opacity-90">Satu kuis sehari bikin pintar pajak ✨</p>
        </div>
      </div>

      {/* Modal kartu profil + leaderboard */}
      <PlayerCardModal isOpen={showCard} onClose={() => setShowCard(false)} player={null} />
      <LeaderboardModal isOpen={showBoard} onClose={() => setShowBoard(false)} initialMode="quiz" />
    </div>
  )
}
