import { useState, useEffect } from 'react'
import { Sparkles, Trophy, Calculator, Wrench, BookHeart, Home } from 'lucide-react'
import QuizArena from './components/QuizArena'
import TERCalculator from './components/TERCalculator'
import Achievements from './components/Achievements'
import ToolsHub from './components/ToolsHub'

function App() {
  const [activeTab, setActiveTab] = useState('quest')
  const [showAchievements, setShowAchievements] = useState(false)
  const maxXP = 1000
  // Persistent hero progress: every quiz completion adds XP, localStorage-backed.
  const [heroXP, setHeroXP] = useState(() => {
    try {
      return Number(localStorage.getItem('taxquest_hero_xp')) || 850
    } catch { return 850 }
  })
  const heroLevel = Math.max(1, Math.floor(heroXP / 1000) + 1)
  const xpInLevel = heroXP % 1000

  useEffect(() => {
    const onXp = (e) => {
      const add = Number(e?.detail?.xp) || 0
      if (add <= 0) return
      setHeroXP((prev) => {
        const next = prev + add
        try { localStorage.setItem('taxquest_hero_xp', String(next)) } catch {}
        return next
      })
    }
    window.addEventListener('taxquest:xp', onXp)
    return () => window.removeEventListener('taxquest:xp', onXp)
  }, [])

  const tabs = [
    { id: 'home', name: 'Beranda', icon: Home },
    { id: 'quest', name: 'Kuis', icon: Sparkles },
    { id: 'calculator', name: 'Kalkulator', icon: Calculator },
    { id: 'tools', name: 'Tools', icon: Wrench },
    { id: 'cheatsheet', name: 'Catatan', icon: BookHeart },
  ]

  return (
    <div className="min-h-screen cute-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100">
        <div className="mx-auto max-w-6xl px-4 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            <div className="floaty text-4xl sm:text-5xl select-none">🌸</div>
            <div className="min-w-0 flex-1">
              <h1 className="font-cute text-xl sm:text-2xl font-extrabold text-[#e85d9e] leading-tight truncate">
                TaxQuest 💗 Belajar Pajak Jadi Seru
              </h1>
              <p className="text-xs sm:text-sm text-[#a08bb0]">Kuis + kalkulator pajak yang manis & gampang dipakai</p>
            </div>

            <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-[#ffe3ec] to-[#f3ecff] rounded-2xl px-3 py-2">
              <Trophy size={18} className="text-[#e85d9e]" />
              <div className="leading-tight">
                <div className="font-cute text-sm font-bold text-[#5b4a68]">Level {heroLevel}</div>
                <div className="text-[11px] text-[#a08bb0]">{xpInLevel}/{maxXP} XP</div>
              </div>
            </div>

            <button
              onClick={() => setShowAchievements(true)}
              className="cute-btn cute-btn-pink px-4 py-2.5 text-sm flex items-center gap-1.5"
            >
              🏆 <span className="hidden sm:inline">Lencana</span>
            </button>
          </div>

          {/* XP bar selalu kelihatan di HP */}
          <div className="sm:hidden mt-2">
            <div className="bar-track h-2.5">
              <div className="bar-xp h-full rounded-full transition-all duration-300" style={{ width: `${(xpInLevel / maxXP) * 100}%` }} />
            </div>
            <div className="text-[11px] text-[#a08bb0] mt-1">Level {heroLevel} • {xpInLevel}/{maxXP} XP</div>
          </div>
          <div className="hidden sm:block mt-2 max-w-xs ml-auto">
            <div className="bar-track h-2.5">
              <div className="bar-xp h-full rounded-full transition-all duration-300" style={{ width: `${(xpInLevel / maxXP) * 100}%` }} />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-[76px] sm:top-[92px] z-40 bg-white/60 backdrop-blur-md border-b border-pink-100">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex gap-2 overflow-x-auto py-3" style={{ WebkitOverflowScrolling: 'touch' }}>
            {tabs.map((tab) => {
              const Icon = tab.icon
              const active = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`cute-btn px-5 py-2.5 text-sm whitespace-nowrap flex items-center gap-2 ${
                    active ? 'cute-btn-pink' : 'bg-white text-[#a08bb0] border-2 border-pink-100'
                  }`}
                >
                  <Icon size={16} />
                  {tab.name}
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-5 sm:py-8">
        {activeTab === 'home' && (
          <div className="max-w-4xl mx-auto text-center">
            <div className="cute-card p-6 sm:p-10 pop-in">
              <div className="text-6xl sm:text-7xl mb-4 floaty select-none">🌷</div>
              <h2 className="font-cute text-2xl sm:text-3xl font-extrabold text-[#5b4a68] mb-2">
                Hai, selamat datang di TaxQuest! 💕
              </h2>
              <p className="text-sm sm:text-base text-[#a08bb0] mb-6 max-w-xl mx-auto">
                Belajar perpajakan Indonesia sambil main — jawab kuis lucu, hitung pajak pakai kalkulator saku, dan kumpulkan lencana. Semuanya tersimpan otomatis di HP kamu.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={() => setActiveTab('quest')} className="cute-btn cute-btn-pink px-8 py-3.5 text-base">
                  ✨ Mulai Kuis
                </button>
                <button onClick={() => setActiveTab('calculator')} className="cute-btn cute-btn-lav px-8 py-3.5 text-base">
                  🧮 Hitung Pajak
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4">
              {[
                { emoji: '🎀', title: 'Kuis Seru', desc: '10 soal fresh tiap main, ada penjelasan tiap jawaban' },
                { emoji: '🍰', title: 'Kalkulator Saku', desc: 'PPN, PPh 21, UMKM — geser slider, langsung keluar hasil' },
                { emoji: '🏅', title: 'Lencana & Level', desc: 'Naik level tiap selesai kuis, kumpulin semua lencana' },
              ].map((c) => (
                <div key={c.title} className="cute-card p-5 text-center">
                  <div className="text-4xl mb-2 select-none">{c.emoji}</div>
                  <div className="font-cute font-bold text-[#5b4a68]">{c.title}</div>
                  <div className="text-sm text-[#a08bb0] mt-1">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'quest' && <QuizArena />}

        {activeTab === 'calculator' && <TERCalculator />}

        {activeTab === 'tools' && <ToolsHub />}

        {activeTab === 'cheatsheet' && (
          <div className="max-w-4xl mx-auto">
            <div className="cute-card-lav p-6 sm:p-8">
              <h2 className="font-cute text-2xl sm:text-3xl font-extrabold text-[#7c5fc9] mb-1 text-center">📒 Catatan Pajak</h2>
              <p className="text-sm text-[#a08bb0] text-center mb-6">Ringkasan tarif yang paling sering dipakai</p>

              {/* PPh 21 TER */}
              <div className="bg-white rounded-2xl border border-purple-100 p-5 mb-4">
                <h3 className="font-cute text-lg font-bold text-[#7c5fc9] mb-3">💜 PPh 21 — Tarif Efektif (TER)</h3>
                <div className="space-y-2">
                  {[
                    ['Kategori A', 'Gaji ≤ Rp 60 jt/thn', '0% – 0,5%'],
                    ['Kategori B', 'Rp 60 jt – 250 jt', '0% – 3%'],
                    ['Kategori C', 'Gaji > Rp 250 jt', '1% – 6%'],
                  ].map(([a, b, c]) => (
                    <div key={a} className="grid grid-cols-3 gap-2 bg-[#f6f0ff] rounded-xl px-3 py-2.5 text-sm items-center">
                      <div className="font-cute font-bold text-[#7c5fc9]">{a}</div>
                      <div className="text-[#8b7a99]">{b}</div>
                      <div className="text-right font-cute font-bold text-[#5b4a68]">{c}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PPh 21 Reguler */}
              <div className="bg-white rounded-2xl border border-pink-100 p-5 mb-4">
                <h3 className="font-cute text-lg font-bold text-[#e85d9e] mb-3">🌸 PPh 21 — Tarif Progresif</h3>
                <div className="space-y-2">
                  {[
                    ['Rp 0 – 60 jt', '5%'],
                    ['Rp 60 – 250 jt', '15%'],
                    ['Rp 250 – 500 jt', '25%'],
                    ['Di atas Rp 500 jt', '30%'],
                  ].map(([a, b]) => (
                    <div key={a} className="flex justify-between bg-[#fff3f8] rounded-xl px-3 py-2.5 text-sm">
                      <span className="text-[#8b7a99]">{a}</span>
                      <span className="font-cute font-bold text-[#e85d9e]">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* PPN */}
              <div className="bg-white rounded-2xl border border-amber-100 p-5">
                <h3 className="font-cute text-lg font-bold text-[#d99a2b] mb-3">🍯 PPN</h3>
                <div className="bg-[#fff8ec] rounded-2xl p-5 text-center">
                  <div className="text-xs text-[#c9a05a] mb-1">Tarif standar saat ini</div>
                  <div className="font-cute text-5xl font-extrabold text-[#d99a2b]">11%</div>
                  <div className="text-xs text-[#c9a05a] mt-1">Berlaku sejak 1 April 2022</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-pink-100 bg-white/70 py-6 mt-8">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="font-cute font-bold text-[#e85d9e]">
            Dibuat dengan 💗 untuk pejuang pajak
          </p>
          <p className="text-xs text-[#c4b3d1] mt-1">
            React + Vite • Soal AI fresh • Bisa offline
          </p>
        </div>
      </footer>

      {/* Achievements Modal */}
      <Achievements isOpen={showAchievements} onClose={() => setShowAchievements(false)} />
    </div>
  )
}

export default App
