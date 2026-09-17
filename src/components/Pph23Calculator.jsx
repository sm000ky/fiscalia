import { useState } from 'react'
import { Scissors, Copy, Check, Info, Wallet, Percent } from 'lucide-react'

const fmt = (n) => `Rp ${Math.round(n || 0).toLocaleString('id-ID')}`

const JENIS = [
  { id: 'jasa', label: 'Jasa / Sewa Harta', desc: 'Imbalan jasa, sewa tanah & bangunan, sewa harta selain tanah/bangunan', baseRate: 2, emoji: '🛠️' },
  { id: 'hadiah', label: 'Hadiah / Bunga / Dividen / Royalti', desc: 'Hadiah, bunga, dividen, royalti & sejenisnya', baseRate: 15, emoji: '🎁' },
]

export function calcPph23(bruto, baseRate, hasNpwp) {
  const dpp = Math.max(0, Number(bruto) || 0)
  const effectiveRate = baseRate * (hasNpwp ? 1 : 2)
  const potongan = (dpp * effectiveRate) / 100
  const netto = dpp - potongan
  return { dpp, effectiveRate, potongan, netto }
}

export default function Pph2326Calculator() {
  const [bruto, setBruto] = useState(10000000)
  const [jenisId, setJenisId] = useState('jasa')
  const [hasNpwp, setHasNpwp] = useState(true)
  const [copied, setCopied] = useState(false)

  const jenis = JENIS.find((j) => j.id === jenisId) || JENIS[0]
  const { dpp, effectiveRate, potongan, netto } = calcPph23(bruto, jenis.baseRate, hasNpwp)
  const potongPct = dpp > 0 ? (potongan / dpp) * 100 : 0

  const copyResult = async () => {
    const text =
      `TaxQuest • PPh 23/26 ✂️\n` +
      `Bruto: ${fmt(dpp)}\n` +
      `Jenis: ${jenis.label} (tarif normal ${jenis.baseRate}%)\n` +
      `NPWP: ${hasNpwp ? 'Ada' : 'Tidak ada (tarif +100%)'}\n` +
      `DPP: ${fmt(dpp)}\n` +
      `Tarif efektif: ${effectiveRate}%\n` +
      `Potongan PPh 23: ${fmt(potongan)}\n` +
      `Netto diterima: ${fmt(netto)}\n` +
      `Dasar hukum: Pasal 23 UU PPh No. 36 Tahun 2008`
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="pop-in">
      <div className="text-center mb-4">
        <div className="text-4xl mb-1 select-none">✂️</div>
        <h3 className="font-cute text-xl sm:text-2xl font-extrabold text-[#5b4a68] flex items-center justify-center gap-2">
          <Scissors size={22} className="text-[#e85d9e]" /> PPh 23 / 26 Withholding
        </h3>
        <p className="text-sm text-[#a08bb0] mt-1">Potong di sumber, terima bersih tanpa drama 💕</p>
        <span className="chip inline-flex items-center gap-1 bg-[#f6f0ff] text-[#7c5fc9] text-[11px] px-3 py-1 mt-2">
          <Info size={12} /> 📜 Dasar hukum: Pasal 23 UU PPh No. 36/2008
        </span>
      </div>

      <div className="bg-[#fff8ec] rounded-2xl p-4 mb-3">
        <label className="text-xs font-bold text-[#c9a05a] flex items-center gap-1 mb-2">
          <Wallet size={14} /> 💰 Penghasilan Bruto (Rp)
        </label>
        <input
          type="range" min={500000} max={500000000} step={500000} value={bruto}
          onChange={(e) => setBruto(Number(e.target.value))}
          className="w-full accent-pink-500"
        />
        <input
          type="number" min={0} value={bruto}
          onChange={(e) => setBruto(Math.max(0, Number(e.target.value) || 0))}
          className="w-full mt-2 bg-white rounded-xl border border-pink-100 px-3 py-2.5 text-sm font-bold text-[#5b4a68] focus:outline-none focus:border-[#ff6ba8] transition-all"
        />
        <div className="font-cute text-xl font-extrabold text-[#5b4a68] mt-1 text-center">{fmt(bruto)}</div>
      </div>

      <div className="text-xs font-bold text-[#7c5fc9] mt-1 mb-2">🛠️ Jenis Transaksi</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
        {JENIS.map((j) => (
          <button
            key={j.id} onClick={() => setJenisId(j.id)}
            className={`rounded-2xl px-3 py-3 text-left transition-all ${
              jenisId === j.id
                ? 'cute-btn cute-btn-pink'
                : 'bg-[#fdf1f7] text-[#a08bb0] border-2 border-transparent hover:border-pink-200'
            }`}
          >
            <div className="text-sm font-cute font-bold">{j.emoji} {j.label}</div>
            <div className={`text-[11px] mt-0.5 ${jenisId === j.id ? 'opacity-80' : 'text-[#c4b3d1]'}`}>
              Tarif normal {j.baseRate}%
            </div>
          </button>
        ))}
      </div>
      <div className="bg-[#f6f0ff] rounded-xl px-3 py-2.5 text-xs text-[#8b7a99] mb-3">
        {jenis.emoji} {jenis.desc}
      </div>

      <div className="text-xs font-bold text-[#7c5fc9] mb-2">🪪 Status NPWP Penerima</div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {[
          { id: true, label: '💚 Punya NPWP', sub: 'tarif normal' },
          { id: false, label: '🔥 Tanpa NPWP', sub: 'tarif +100%' },
        ].map((o) => (
          <button
            key={String(o.id)} onClick={() => setHasNpwp(o.id)}
            className={`rounded-2xl px-3 py-3 transition-all ${
              hasNpwp === o.id
                ? 'cute-btn cute-btn-lav'
                : 'bg-[#f6f0ff] text-[#a08bb0] border-2 border-transparent hover:border-purple-200'
            }`}
          >
            <div className="text-sm font-cute font-bold">{o.label}</div>
            <div className={`text-[11px] ${hasNpwp === o.id ? 'opacity-80' : 'text-[#c4b3d1]'}`}>{o.sub}</div>
          </button>
        ))}
      </div>
      {!hasNpwp && (
        <div className="bg-[#fff1f3] border border-pink-200 rounded-xl px-3 py-2.5 text-xs text-[#e63980] mb-3 text-center pop-in">
          ⚠️ Tanpa NPWP: tarif dipotong 100% lebih tinggi → {jenis.baseRate}% jadi {effectiveRate}%!
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
        {[
          ['💜 DPP', dpp, '#f6f0ff', '#7c5fc9'],
          ['🌟 Tarif efektif', null, '#fff8ec', '#d99a2b'],
          ['✂️ Potongan', potongan, '#fff3f8', '#e85d9e'],
          ['💚 Netto', netto, '#e9faf3', '#0d4a3a'],
        ].map(([label, val, bg, fg]) => (
          <div key={label} className="rounded-2xl p-4 text-center transition-all hover:-translate-y-0.5" style={{ background: bg }}>
            <div className="text-xs text-[#a08bb0]">{label}</div>
            <div className="font-cute text-base sm:text-lg font-extrabold break-words" style={{ color: fg }}>
              {val === null ? `${effectiveRate}%` : fmt(val)}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-pink-100 p-4 mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-[#8b7a99]">Porsi potongan vs bruto</span>
          <span className="font-cute font-bold text-[#5b4a68]">{fmt(potongan)} ({potongPct.toFixed(1)}%)</span>
        </div>
        <div className="bar-track h-3">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, potongPct)}%`, background: 'linear-gradient(90deg,#b388ff,#ff7eb3)' }}
          />
        </div>
        <div className="flex justify-between text-xs mt-2">
          <span className="text-[#8b7a99]">Formula: {fmt(dpp)} × {effectiveRate}%</span>
        </div>
      </div>

      <button
        onClick={copyResult}
        className={`cute-btn w-full px-4 py-3 text-sm flex items-center justify-center gap-2 ${copied ? 'cute-btn-lav' : 'cute-btn-pink'}`}
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
        {copied ? 'Tersalin! 📋✨' : '📋 Copy Result'}
      </button>

      <p className="text-[11px] text-[#a08bb0] text-center mt-3 flex items-center justify-center gap-1">
        <Percent size={12} /> Estimasi sederhana • Tanpa NPWP = tarif × 2 • PPh 26 WPLN umumnya 20% (lihat P3B)
      </p>
    </div>
  )
}
