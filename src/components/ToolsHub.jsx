import { useState } from 'react'
import { Calculator, Receipt, Building2, Landmark, BookOpenCheck, TableProperties } from 'lucide-react'
import FiscalRecon from './FiscalRecon'

const fmt = (n) => `Rp ${Math.round(n || 0).toLocaleString('id-ID')}`

const PTKP_TABLE = [
  { status: 'TK/0', label: 'Belum nikah, 0 tanggungan', value: 54000000 },
  { status: 'TK/1', label: 'Belum nikah, 1 tanggungan', value: 58500000 },
  { status: 'TK/2', label: 'Belum nikah, 2 tanggungan', value: 63000000 },
  { status: 'TK/3', label: 'Belum nikah, 3 tanggungan', value: 67500000 },
  { status: 'K/0', label: 'Sudah nikah, 0 tanggungan', value: 58500000 },
  { status: 'K/1', label: 'Sudah nikah, 1 tanggungan', value: 63000000 },
  { status: 'K/2', label: 'Sudah nikah, 2 tanggungan', value: 67500000 },
  { status: 'K/3', label: 'Sudah nikah, 3 tanggungan', value: 72000000 },
]

function pph21Layers(pkp) {
  const layers = [
    { label: 'Lapisan 1 • 0–60 jt', cap: 60000000, rate: 0.05 },
    { label: 'Lapisan 2 • 60–250 jt', cap: 250000000, rate: 0.15 },
    { label: 'Lapisan 3 • 250–500 jt', cap: 500000000, rate: 0.25 },
    { label: 'Lapisan 4 • >500 jt', cap: Infinity, rate: 0.3 },
  ]
  let prev = 0, tax = 0
  const rows = []
  for (const l of layers) {
    if (pkp <= prev) break
    const taxable = Math.min(pkp, l.cap) - prev
    const t = taxable * l.rate
    tax += t
    rows.push({ ...l, taxable, tax: t })
    prev = l.cap
  }
  return { rows, tax }
}

function Panel({ children }) {
  return <div className="bg-white rounded-2xl border border-pink-100 p-4 sm:p-5">{children}</div>
}

function NumInput({ label, value, onChange, min = 0, max = 1000000000, step = 500000, emoji = '💰' }) {
  return (
    <div className="bg-[#fff8ec] rounded-2xl p-4">
      <label className="text-xs font-bold text-[#c9a05a] block mb-2">{emoji} {label}</label>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-pink-500"
      />
      <div className="font-cute text-xl font-extrabold text-[#5b4a68] mt-1">{fmt(value)}</div>
    </div>
  )
}

function PpnTool() {
  const [nominal, setNominal] = useState(1000000)
  const [mode, setMode] = useState('exclude')
  const dpp = mode === 'exclude' ? nominal : nominal / 1.11
  const ppn = dpp * 0.11
  const total = dpp + ppn
  return (
    <div>
      <NumInput label="Nominal Transaksi" emoji="🧾" value={nominal} onChange={setNominal} min={100000} max={100000000} step={100000} />
      <div className="grid grid-cols-2 gap-2 my-3">
        {[
          { id: 'exclude', label: '💛 Harga belum +PPN' },
          { id: 'include', label: '💚 Harga sudah +PPN' },
        ].map((m) => (
          <button
            key={m.id} onClick={() => setMode(m.id)}
            className={`cute-btn px-3 py-3 text-xs sm:text-sm ${mode === m.id ? 'cute-btn-pink' : 'bg-[#fdf1f7] text-[#a08bb0]'}`}
          >{m.label}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {[
          ['💜 DPP', dpp, '#f6f0ff', '#7c5fc9'],
          ['🌟 PPN 11%', ppn, '#fff8ec', '#d99a2b'],
          ['💖 Total bayar', total, '#fff3f8', '#e85d9e'],
        ].map(([label, val, bg, fg]) => (
          <div key={label} className="rounded-2xl p-4 text-center" style={{ background: bg }}>
            <div className="text-xs text-[#a08bb0]">{label}</div>
            <div className="font-cute text-base sm:text-lg font-extrabold break-words" style={{ color: fg }}>{fmt(val)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Pph21Tool() {
  const [annual, setAnnual] = useState(120000000)
  const [status, setStatus] = useState('TK/0')
  const ptkp = PTKP_TABLE.find((p) => p.status === status)?.value || 54000000
  const pkp = Math.max(0, Math.floor((annual - ptkp) / 1000) * 1000)
  const { rows, tax } = pph21Layers(pkp)
  return (
    <div>
      <NumInput label="Penghasilan Bruto Setahun" emoji="💼" value={annual} onChange={setAnnual} min={12000000} max={1000000000} step={1000000} />
      <div className="text-xs font-bold text-[#7c5fc9] mt-3 mb-2">💜 Status PTKP</div>
      <div className="grid grid-cols-4 gap-2 mb-3">
        {PTKP_TABLE.map((p) => (
          <button
            key={p.status} onClick={() => setStatus(p.status)}
            className={`rounded-full py-2 text-[11px] sm:text-xs font-cute font-bold ${status === p.status ? 'cute-btn cute-btn-lav px-1' : 'bg-[#f6f0ff] text-[#a08bb0]'}`}
          >{p.status}</button>
        ))}
      </div>
      <div className="bg-[#f6f0ff] rounded-2xl p-3.5 mb-3 text-sm flex justify-between">
        <span className="text-[#8b7a99]">PTKP {status} • PKP</span>
        <span className="font-cute font-bold text-[#5b4a68]">{fmt(pkp)}</span>
      </div>
      <div className="space-y-2 mb-3">
        {rows.map((r) => (
          <div key={r.label} className="flex justify-between items-center bg-[#fdf1f7] rounded-xl px-3 py-2.5 text-sm">
            <span className="text-[#8b7a99]">{r.label} <span className="text-[#c4b3d1]">({r.rate * 100}%)</span></span>
            <span className="font-cute font-bold text-[#5b4a68] whitespace-nowrap ml-2">{fmt(r.tax)}</span>
          </div>
        ))}
        {rows.length === 0 && <div className="text-center py-3 text-[#a08bb0]">PKP masih nol — belum ada pajak 🎉</div>}
      </div>
      <div className="bg-gradient-to-r from-[#ff7eb3] to-[#b388ff] rounded-2xl p-4 text-center text-white">
        <div className="text-xs opacity-90">PPh 21 setahun</div>
        <div className="font-cute text-2xl sm:text-3xl font-extrabold">{fmt(tax)}</div>
        <div className="text-xs opacity-90">≈ {fmt(tax / 12)} / bulan</div>
      </div>
    </div>
  )
}

function UmkmTool() {
  const [omzet, setOmzet] = useState(200000000)
  const tax = omzet * 0.005
  return (
    <div>
      <NumInput label="Omzet Bruto Sebulan" emoji="🏪" value={omzet} onChange={setOmzet} min={1000000} max={400000000} step={1000000} />
      <div className="bg-[#e9faf3] rounded-2xl p-3.5 my-3 text-sm text-[#0d4a3a]">
        Tarif PPh Final UMKM <b>0,5%</b> × omzet (PP 55/2022). Berlaku untuk omzet s.d. Rp 4,8 M/thn.
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <div className="rounded-2xl p-4 text-center bg-gradient-to-br from-[#4fd1a5] to-[#7fe3c3] text-white">
          <div className="text-xs opacity-90">Pajak bulan ini</div>
          <div className="font-cute text-base sm:text-xl font-extrabold break-words">{fmt(tax)}</div>
        </div>
        <div className="rounded-2xl p-4 text-center bg-gradient-to-br from-[#8ecae6] to-[#b388ff] text-white">
          <div className="text-xs opacity-90">Estimasi setahun</div>
          <div className="font-cute text-base sm:text-xl font-extrabold break-words">{fmt(tax * 12)}</div>
        </div>
      </div>
    </div>
  )
}

function PtkpTool() {
  return (
    <div className="space-y-2">
      {PTKP_TABLE.map((p) => (
        <div key={p.status} className="flex justify-between items-center bg-[#f6f0ff] rounded-xl px-3 py-3 text-sm">
          <div>
            <span className="chip bg-white text-[#d99a2b] text-[11px] px-2.5 py-0.5 mr-2">{p.status}</span>
            <span className="text-[#8b7a99]">{p.label}</span>
          </div>
          <span className="font-cute font-bold text-[#5b4a68] text-xs sm:text-sm whitespace-nowrap ml-2">{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  )
}

const TABS = [
  { id: 'ppn', name: 'PPN 11%', icon: Receipt, emoji: '🧾' },
  { id: 'pph21', name: 'PPh 21', icon: Calculator, emoji: '💼' },
  { id: 'umkm', name: 'UMKM 0,5%', icon: Building2, emoji: '🏪' },
  { id: 'recon', name: 'Rekon', icon: BookOpenCheck, emoji: '📊' },
  { id: 'ptkp', name: 'PTKP', icon: TableProperties, emoji: '📋' },
]

export default function ToolsHub() {
  const [tab, setTab] = useState('ppn')
  return (
    <div className="max-w-4xl mx-auto">
      <div className="cute-card p-5 sm:p-6 mb-3 text-center pop-in">
        <div className="text-4xl mb-1 select-none">🛠️</div>
        <h2 className="font-cute text-xl sm:text-2xl font-extrabold text-[#5b4a68] flex items-center justify-center gap-2">
          <Landmark size={22} className="text-[#e85d9e]" /> Kotak Perkakas Pajak
        </h2>
        <p className="text-sm text-[#a08bb0] mt-1">Kalkulator saku — akurat, offline, tanpa login 💕</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center" style={{ WebkitOverflowScrolling: 'touch' }}>
        {TABS.map((t) => (
          <button
            key={t.id} onClick={() => setTab(t.id)}
            className={`cute-btn px-4 py-2.5 text-xs sm:text-sm whitespace-nowrap ${tab === t.id ? 'cute-btn-pink' : 'bg-white text-[#a08bb0] border-2 border-pink-100'}`}
          >
            {t.emoji} {t.name}
          </button>
        ))}
      </div>

      <div className="cute-card p-4 sm:p-6">
        {tab === 'ppn' && <PpnTool />}
        {tab === 'pph21' && <Pph21Tool />}
        {tab === 'umkm' && <UmkmTool />}
        {tab === 'recon' && <FiscalRecon />}
        {tab === 'ptkp' && <PtkpTool />}
      </div>
    </div>
  )
}

export { Panel }
