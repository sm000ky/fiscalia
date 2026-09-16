import { useState, useEffect } from 'react'
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
    { id: 'quest', name: 'QUEST', icon: '⚔️' },
    { id: 'calculator', name: 'TER CALC', icon: '📊' },
    { id: 'tools', name: 'TOOLS', icon: '🧰' },
    { id: 'cheatsheet', name: 'SHEET', icon: '📚' },
  ]

  return (
    <div className="min-h-screen arcade-bg">
      {/* Header */}
      <header className="border-b-4 border-cyan-400 bg-black/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-3 py-3 sm:px-4 sm:py-4">
          <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-4">
            <div className="min-w-0">
              <h1 className="font-pixel text-lg sm:text-2xl md:text-3xl neon-cyan neon-text truncate">
                TAXQUEST 8-BIT
              </h1>
              <p className="font-retro text-xs text-gray-400 mt-1">Tax Mastery RPG</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Level Badge */}
              <div className="bg-purple-900/60 border-2 border-purple-400 px-4 py-2 pixel-box-pink">
                <div className="font-pixel text-xs text-purple-300">LEVEL</div>
                <div className="font-pixel text-2xl neon-yellow">{heroLevel}</div>
              </div>
              
              {/* Achievements Button */}
              <button
                onClick={() => setShowAchievements(true)}
                className="retro-button bg-yellow-600 border-4 border-yellow-400 px-4 py-2 font-pixel text-sm hover:scale-105 transition-transform"
              >
                🏆 BADGES
              </button>
              
              {/* XP Bar */}
              <div className="hidden sm:block">
                <div className="font-pixel text-xs text-cyan-400 mb-1">XP: {xpInLevel}/{maxXP}</div>
                <div className="bg-gray-900 h-4 w-32 lg:w-48 border-2 border-cyan-400 relative overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 h-full transition-all duration-300"
                    style={{width: `${(xpInLevel/maxXP)*100}%`}}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-black/60 border-b-4 border-purple-500 sticky top-[72px] sm:top-[76px] z-40">
        <div className="mx-auto max-w-7xl px-3 sm:px-4">
          <div className="flex gap-2 overflow-x-auto py-3 sm:py-4 -mx-3 px-3 sm:mx-0 sm:px-0" style={{ WebkitOverflowScrolling: 'touch' }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`retro-button px-6 py-3 font-pixel text-sm whitespace-nowrap border-4 flex items-center gap-2 transition-all ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-cyan-400 text-white scale-105' 
                    : 'bg-gray-800 border-gray-600 text-gray-400'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-3 py-5 sm:px-4 sm:py-8">
        {activeTab === 'quest' && <QuizArena />}

        {activeTab === 'calculator' && <TERCalculator />}

        {activeTab === 'tools' && <ToolsHub />}
        
        {activeTab === 'cheatsheet' && (
          <div className="max-w-4xl mx-auto">
            <div className="arcade-bg pixel-box-cyan p-8">
              <h2 className="font-pixel text-3xl neon-pink mb-6 text-center">TAX CHEATSHEET</h2>
              
              {/* PPh 21 TER */}
              <div className="bg-black/40 border-4 border-pink-500 p-6 mb-6">
                <h3 className="font-pixel text-xl neon-cyan mb-4">PPh 21 - TARIF EFEKTIF RATA-RATA (TER)</h3>
                <div className="space-y-3 font-retro text-gray-200">
                  <div className="grid grid-cols-3 gap-4 bg-purple-900/40 p-3 border-2 border-purple-500">
                    <div className="font-pixel text-yellow-400">Category A</div>
                    <div>Annual ≤ Rp 60 juta</div>
                    <div className="text-right font-pixel neon-cyan">0% - 0.5%</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 bg-purple-900/40 p-3 border-2 border-purple-500">
                    <div className="font-pixel text-yellow-400">Category B</div>
                    <div>Annual Rp 60jt - 250jt</div>
                    <div className="text-right font-pixel neon-cyan">0% - 3%</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 bg-purple-900/40 p-3 border-2 border-purple-500">
                    <div className="font-pixel text-yellow-400">Category C</div>
                    <div>Annual &gt; Rp 250 juta</div>
                    <div className="text-right font-pixel neon-cyan">1% - 6%</div>
                  </div>
                </div>
              </div>

              {/* PPh 21 Regular */}
              <div className="bg-black/40 border-4 border-cyan-500 p-6 mb-6">
                <h3 className="font-pixel text-xl neon-yellow mb-4">PPh 21 - TARIF REGULER</h3>
                <div className="space-y-2 font-retro text-gray-200">
                  <div className="flex justify-between bg-cyan-900/40 p-3 border-2 border-cyan-600">
                    <span>Layer 1: Rp 0 - 60 juta</span>
                    <span className="font-pixel neon-pink">5%</span>
                  </div>
                  <div className="flex justify-between bg-cyan-900/40 p-3 border-2 border-cyan-600">
                    <span>Layer 2: Rp 60 juta - 250 juta</span>
                    <span className="font-pixel neon-pink">15%</span>
                  </div>
                  <div className="flex justify-between bg-cyan-900/40 p-3 border-2 border-cyan-600">
                    <span>Layer 3: Rp 250 juta - 500 juta</span>
                    <span className="font-pixel neon-pink">25%</span>
                  </div>
                  <div className="flex justify-between bg-cyan-900/40 p-3 border-2 border-cyan-600">
                    <span>Layer 4: &gt; Rp 500 juta</span>
                    <span className="font-pixel neon-pink">30%</span>
                  </div>
                </div>
              </div>

              {/* PPN */}
              <div className="bg-black/40 border-4 border-yellow-500 p-6">
                <h3 className="font-pixel text-xl neon-pink mb-4">PPN - PAJAK PERTAMBAHAN NILAI</h3>
                <div className="bg-yellow-900/40 p-6 border-2 border-yellow-600 text-center">
                  <div className="font-pixel text-sm text-yellow-300 mb-2">Current Standard Rate</div>
                  <div className="font-pixel text-6xl neon-yellow">11%</div>
                  <div className="font-retro text-sm text-gray-400 mt-2">Effective since April 1, 2022</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-yellow-400 bg-black/80 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="font-pixel text-xs neon-yellow">
            MADE WITH <span className="neon-pink blink">♥</span> FOR TAX WARRIORS
          </p>
          <p className="font-retro text-sm text-gray-400 mt-2">
            Built with React + Vite • Powered by Tax Knowledge
          </p>
        </div>
      </footer>
      
      {/* Achievements Modal */}
      <Achievements isOpen={showAchievements} onClose={() => setShowAchievements(false)} />
    </div>
  )
}

export default App
