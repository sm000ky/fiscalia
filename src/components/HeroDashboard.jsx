import { User, Coffee, TrendingUp, DollarSign, Calendar, Sparkles } from 'lucide-react'

export default function HeroDashboard() {
  const quotes = [
    "Debit di kiri, Kredit di kanan, hidup tenang!",
    "PPh 21 TER? Easy peasy lemon squeezy!",
    "Koreksi Fiskal is my cardio",
    "Audit Trail? More like Audit TALE!",
    "Tax Planning > Tax Evasion (always!)",
  ]

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

  return (
    <div className="space-y-6">
      {/* Character Profile Card */}
      <div className="bg-gradient-to-br from-purple-900 to-pink-900 border-4 border-neon-pink p-6 shadow-pixel">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-32 h-32 bg-neon-cyan border-4 border-white flex items-center justify-center">
            <User size={64} className="text-purple-900" />
          </div>
          
          <div className="flex-1 space-y-3">
            <h2 className="font-pixel text-xl text-neon-yellow">TAX SORCERER</h2>
            <div className="flex gap-4 items-center">
              <span className="font-pixel text-sm text-white">LVL 42</span>
              <div className="flex-1 bg-gray-800 h-6 border-2 border-neon-cyan relative">
                <div className="bg-neon-cyan h-full w-3/4"></div>
                <span className="absolute inset-0 flex items-center justify-center font-pixel text-xs text-black">
                  7500/10000 EXP
                </span>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/50 p-2 border-2 border-neon-purple">
                <p className="font-retro text-sm text-gray-400">Mana</p>
                <p className="font-pixel text-lg text-neon-purple">850/1000</p>
              </div>
              <div className="bg-black/50 p-2 border-2 border-yellow-500">
                <p className="font-retro text-sm text-gray-400">Ngantuk Meter</p>
                <p className="font-pixel text-lg text-yellow-500">35%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Quote */}
      <div className="bg-black/80 border-4 border-neon-yellow p-6 shadow-pixel">
        <div className="flex items-start gap-3">
          <Sparkles className="text-neon-yellow flex-shrink-0" size={24} />
          <div>
            <h3 className="font-pixel text-sm text-neon-yellow mb-2">DAILY WISDOM</h3>
            <p className="font-retro text-xl text-white">{randomQuote}</p>
          </div>
        </div>
      </div>

      {/* Quick Access Widgets */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Kurs Pajak Widget */}
        <div className="bg-gradient-to-br from-cyan-900 to-blue-900 border-4 border-neon-cyan p-4 shadow-pixel">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="text-neon-cyan" size={20} />
            <h3 className="font-pixel text-xs text-neon-cyan">KURS PAJAK</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-retro text-sm text-gray-300">USD</span>
              <span className="font-pixel text-sm text-white">Rp 15.750</span>
            </div>
            <div className="flex justify-between">
              <span className="font-retro text-sm text-gray-300">EUR</span>
              <span className="font-pixel text-sm text-white">Rp 17.200</span>
            </div>
            <div className="flex justify-between">
              <span className="font-retro text-sm text-gray-300">JPY</span>
              <span className="font-pixel text-sm text-white">Rp 112</span>
            </div>
          </div>
        </div>

        {/* Schedule Widget */}
        <div className="bg-gradient-to-br from-purple-900 to-pink-900 border-4 border-neon-pink p-4 shadow-pixel">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="text-neon-pink" size={20} />
            <h3 className="font-pixel text-xs text-neon-pink">HARI INI</h3>
          </div>
          <div className="space-y-2">
            <div className="bg-black/50 p-2 border-l-4 border-neon-pink">
              <p className="font-retro text-xs text-gray-400">08:00 - 10:00</p>
              <p className="font-pixel text-xs text-white">PPh Pasal 21</p>
            </div>
            <div className="bg-black/50 p-2 border-l-4 border-neon-cyan">
              <p className="font-retro text-xs text-gray-400">13:00 - 15:00</p>
              <p className="font-pixel text-xs text-white">Audit Forensik</p>
            </div>
          </div>
        </div>

        {/* Quick Calculator */}
        <div className="bg-gradient-to-br from-yellow-900 to-orange-900 border-4 border-neon-yellow p-4 shadow-pixel">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="text-neon-yellow" size={20} />
            <h3 className="font-pixel text-xs text-neon-yellow">QUICK CALC</h3>
          </div>
          <div className="space-y-2">
            <input 
              type="number" 
              placeholder="Penghasilan Bruto"
              className="w-full bg-black/50 border-2 border-neon-yellow p-2 text-white font-retro text-sm"
            />
            <button className="w-full bg-neon-yellow text-black font-pixel text-xs py-2 retro-button border-2 border-black shadow-pixel-sm hover:bg-yellow-300">
              HITUNG PPH 21
            </button>
            <div className="bg-black/50 p-2 text-center">
              <p className="font-retro text-xs text-gray-400">Hasil</p>
              <p className="font-pixel text-lg text-neon-yellow">Rp 0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="bg-black/80 border-4 border-neon-purple p-6 shadow-pixel">
        <h3 className="font-pixel text-sm text-neon-purple mb-4">BADGES EARNED</h3>
        <div className="flex flex-wrap gap-3">
          {['Rookie Auditor', 'Tax Master', 'Quiz Champion', 'PPh 21 Expert', 'Rekonsiliasi Pro'].map((badge, i) => (
            <div key={i} className="bg-gradient-to-br from-purple-600 to-pink-600 border-2 border-white px-3 py-2 shadow-pixel-sm">
              <span className="font-pixel text-xs text-white">{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
