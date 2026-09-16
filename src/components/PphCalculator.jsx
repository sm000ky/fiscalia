import { useState } from 'react'
import { Calculator, Users } from 'lucide-react'

export default function PphCalculator() {
  const [gaji, setGaji] = useState(8000000)
  const [tunjangan, setTunjangan] = useState(2000000)
  const [status, setStatus] = useState('TK/0')

  const bruto = gaji + tunjangan

  const getKategoriTER = () => {
    if (status.startsWith('TK') || status === 'K/0') return 'A'
    if (status === 'K/1' || status === 'K/2') return 'B'
    return 'C'
  }

  const getPersenTER = () => {
    const kategori = getKategoriTER()
    if (bruto <= 5400000) return 0
    if (bruto <= 5650000) return kategori === 'A' ? 0.25 : (kategori === 'B' ? 0.25 : 0.5)
    if (bruto <= 5950000) return kategori === 'A' ? 0.5 : (kategori === 'B' ? 0.5 : 1)
    if (bruto <= 6300000) return kategori === 'A' ? 0.75 : (kategori === 'B' ? 0.75 : 1.5)
    if (bruto <= 6750000) return kategori === 'A' ? 1 : (kategori === 'B' ? 1 : 2)
    if (bruto <= 7500000) return kategori === 'A' ? 1.25 : (kategori === 'B' ? 1.25 : 2.5)
    if (bruto <= 8550000) return kategori === 'A' ? 1.5 : (kategori === 'B' ? 1.5 : 3)
    if (bruto <= 9650000) return kategori === 'A' ? 1.75 : (kategori === 'B' ? 1.75 : 3.5)
    if (bruto <= 10050000) return kategori === 'A' ? 2 : (kategori === 'B' ? 2 : 4)
    if (bruto <= 10350000) return kategori === 'A' ? 2.25 : (kategori === 'B' ? 2.25 : 4.5)
    if (bruto <= 10700000) return kategori === 'A' ? 2.5 : (kategori === 'B' ? 2.5 : 5)
    if (bruto <= 11050000) return kategori === 'A' ? 3 : (kategori === 'B' ? 3 : 6)
    if (bruto <= 11600000) return kategori === 'A' ? 3.5 : (kategori === 'B' ? 3.5 : 7)
    return kategori === 'A' ? 5 : (kategori === 'B' ? 5 : 6)
  }

  const pph21 = bruto * (getPersenTER() / 100)
  const takeHome = bruto - pph21
  const money = (n) => `Rp ${Math.round(n).toLocaleString('id-ID')}`

  const slider = (label, emoji, value, set, min, max, step) => (
    <div className="bg-white rounded-2xl border border-pink-100 p-4">
      <label className="text-xs font-bold text-[#e85d9e] block mb-2">{emoji} {label}</label>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(Number(e.target.value))} className="w-full accent-pink-500" />
      <div className="font-cute font-bold text-[#5b4a68] mt-1 text-right">{money(value)}</div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto">
      <div className="cute-card p-5 sm:p-6 mb-3 text-center pop-in">
        <div className="text-4xl mb-1 select-none">💼</div>
        <h2 className="font-cute text-xl sm:text-2xl font-extrabold text-[#5b4a68] flex items-center justify-center gap-2">
          <Calculator size={22} className="text-[#e85d9e]" /> PPh 21 Take-Home Pay
        </h2>
        <p className="text-sm text-[#a08bb0] mt-1">Sesuai PMK 168/2023 • geser & langsung lihat hasilnya</p>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div className="space-y-3">
          {slider('Gaji pokok', '💜', gaji, setGaji, 4000000, 20000000, 100000)}
          {slider('Tunjangan', '🌟', tunjangan, setTunjangan, 0, 10000000, 100000)}
          <div className="cute-card-lav p-4">
            <label className="text-xs font-bold text-[#7c5fc9] flex items-center gap-1 mb-2"><Users size={14} /> STATUS PTKP</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full bg-white rounded-xl border border-purple-100 p-3 text-sm text-[#5b4a68] font-semibold">
              <option value="TK/0">Belum nikah, tanpa tanggungan</option>
              <option value="TK/1">Belum nikah, 1 tanggungan</option>
              <option value="K/0">Sudah nikah, tanpa tanggungan</option>
              <option value="K/1">Sudah nikah, 1 tanggungan</option>
              <option value="K/2">Sudah nikah, 2 tanggungan</option>
              <option value="K/3">Sudah nikah, 3 tanggungan</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          <div className="bg-gradient-to-br from-[#ff7eb3] to-[#b388ff] rounded-3xl p-5 text-white">
            <h3 className="font-cute font-bold mb-3 opacity-90">💖 Hasil kalkulasi</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="opacity-80">Bruto</span><b>{money(bruto)}</b></div>
              <div className="flex justify-between"><span className="opacity-80">Kategori TER</span><b>{getKategoriTER()} • {getPersenTER()}%</b></div>
              <div className="flex justify-between"><span className="opacity-80">PPh 21</span><b>{money(pph21)}</b></div>
              <div className="bg-white/25 rounded-2xl p-3 flex justify-between items-center mt-1">
                <span className="font-cute font-bold">💚 Take-home pay</span>
                <span className="font-cute text-xl font-extrabold">{money(takeHome)}</span>
              </div>
            </div>
          </div>

          <div className="cute-card-mint p-4">
            <h3 className="font-cute font-bold text-[#0d4a3a] text-sm mb-2">🍰 Porsi potongan</h3>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#8b7a99]">Pajak vs gaji bersih</span>
              <span className="font-cute font-bold text-[#0d4a3a]">{money(pph21)}</span>
            </div>
            <div className="bar-track h-3">
              <div className="h-full rounded-full transition-all" style={{ width: `${bruto ? (pph21 / bruto) * 100 : 0}%`, background: 'linear-gradient(90deg,#b388ff,#ff7eb3)' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
