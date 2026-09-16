import { User, DollarSign, Calendar, Sparkles } from 'lucide-react'

export default function HeroDashboard() {
  const quotes = [
    'Debit di kiri, kredit di kanan, hidup tenang! 🌷',
    'PPh 21 TER? Gampang banget! 💕',
    'Koreksi fiskal itu cardio ✨',
    'Rencanakan pajak dengan manis, bukan ngemplang! 🍰',
  ]
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

  return (
    <div className="space-y-3">
      <div className="cute-card p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#ffd1e0] to-[#e3d4ff] flex items-center justify-center shrink-0">
            <User size={44} className="text-[#e85d9e]" />
          </div>
          <div className="flex-1 w-full text-center sm:text-left">
            <h2 className="font-cute text-xl font-extrabold text-[#5b4a68]">Pejuang Pajak 🌸</h2>
            <div className="flex gap-2 items-center justify-center sm:justify-start mt-1">
              <span className="chip bg-[#f6f0ff] text-[#7c5fc9] text-xs px-3 py-1">Level 42</span>
              <div className="flex-1 bar-track h-3 max-w-[200px]">
                <div className="bar-xp h-full rounded-full" style={{ width: '75%' }} />
              </div>
              <span className="text-[11px] text-[#a08bb0]">7500/10000</span>
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
          <p className="font-cute font-bold">Tetap semangat ya!</p>
          <p className="text-xs opacity-90">Satu kuis sehari bikin pintar pajak ✨</p>
        </div>
      </div>
    </div>
  )
}
