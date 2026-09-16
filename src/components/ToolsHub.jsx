import { useState } from 'react'
import { Calculator, Receipt, Building2, Landmark, BookOpenCheck, TableProperties } from 'lucide-react'
import FiscalRecon from './FiscalRecon'

const fmt = (n) => `Rp ${Math.round(n || 0).toLocaleString('id-ID')}`

const PTKP_TABLE = [
  { status: 'TK/0', label: 'Tidak kawin, 0 tanggungan', value: 54000000 },
  { status: 'TK/1', label: 'Tidak kawin, 1 tanggungan', value: 58500000 },
  { status: 'TK/2', label: 'Tidak kawin, 2 tanggungan', value: 63000000 },
  { status: 'TK/3', label: 'Tidak kawin, 3 tanggungan', value: 67500000 },
  { status: 'K/0', label: 'Kawin, 0 tanggungan', value: 58500000 },
  { status: 'K/1', label: 'Kawin, 1 tanggungan', value: 63000000 },
  { status: 'K/2', label: 'Kawin, 2 tanggungan', value: 67500000 },
  { status: 'K/3', label: 'Kawin, 3 tanggungan', value: 72000000 },
]

function pph21Layers(pkp) {
  const layers = [
    { label: 'Layer 1 (0–60 jt)', cap: 60000000, rate: 0.05 },
    { label: 'Layer 2 (60–250 jt)', cap: 250000000, rate: 0.15 },
    { label: 'Layer 3 (250–500 jt)', cap: 500000000, rate: 0.25 },
    { label: 'Layer 4 (>500 jt)', cap: Infinity, rate: 0.3 },
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

function Card({ children, color = 'cyan' }) {
  const map = {
    cyan: 'pixel-box-cyan',
    pink: 'pixel-box-pink',
  }
  return <div className={`arcade-bg ${map[color]} p-4 sm:p-6 mb-4 sm:mb-6`}>{children}</div>
}

function NumInput({ label, value, onChange, min = 0, max = 1000000000, step = 500000 }) {
  return (
    <div className="bg-black/40 border-2 border-purple-500 p-3 sm:p-4">
      <label className="font-pixel text-[10px] sm:text-xs text-purple-300 block mb-2">{label}</label>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-4 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-fuchsia-500"
      />
      <div className="font-pixel text-base sm:text-xl text-white mt-2 break-words">{fmt(value)}</div>
    </div>
  )
}

function PpnTool() {
  const [nominal, setNominal] = useState(1000000)
  const [mode, setMode] = useState('exclude') // exclude = harga belum termasuk PPN
  const dpp = mode === 'exclude' ? nominal : nominal / 1.11
  const ppn = dpp * 0.11
  const total = dpp + ppn
  return (
    <div>
      <NumInput label="NOMINAL TRANSAKSI" value={nominal} onChange={setNominal} min={100000} max={100000000} step={100000} />
      <div className="grid grid-cols-2 gap-2 my-4">
        {[
          { id: 'exclude', label: 'Belum +PPN' },
          { id: 'include', label: 'Sudah +PPN' },
        ].map((m) => (
          <button
            key={m.id} onClick={() => setMode(m.id)}
            className={`retro-button px-3 py-3 font-pixel text-[10px] sm:text-xs border-4 ${mode === m.id ? 'bg-cyan-600 border-cyan-300 text-white' : 'bg-gray-800 border-gray-600 text-gray-400'}`}
          >{m.label}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: 'DPP', value: dpp, c: 'purple' },
          { label: 'PPN 11%', value: ppn, c: 'yellow' },
          { label: 'TOTAL', value: total, c: 'cyan' },
        ].map((r) => (
          <div key={r.label} className={`bg-${r.c}-900/40 border-4 border-${r.c}-500 p-4`}>
            <div className="font-pixel text-[10px] sm:text-xs text-gray-300 mb-1">{r.label}</div>
            <div className="font-pixel text-sm sm:text-base text-white break-words">{fmt(r.value)}</div>
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
      <NumInput label="PENGHASILAN BRUTO TAHUNAN" value={annual} onChange={setAnnual} min={12000000} max={1000000000} step={1000000} />
      <div className="font-pixel text-[10px] sm:text-xs text-purple-300 mt-4 mb-2">STATUS PTKP</div>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {PTKP_TABLE.map((p) => (
          <button
            key={p.status} onClick={() => setStatus(p.status)}
            className={`retro-button px-2 py-2 font-pixel text-[10px] sm:text-xs border-4 ${status === p.status ? 'bg-cyan-600 border-cyan-300 text-white' : 'bg-gray-800 border-gray-600 text-gray-400'}`}
          >{p.status}</button>
        ))}
      </div>
      <div className="bg-black/40 border-2 border-cyan-400 p-3 sm:p-4 mb-4 font-retro text-base sm:text-lg">
        <div className="flex justify-between"><span className="text-gray-300">PTKP {status}</span><span className="text-white">{fmt(ptkp)}</span></div>
        <div className="flex justify-between"><span className="text-gray-300">PKP</span><span className="text-white">{fmt(pkp)}</span></div>
      </div>
      <div className="space-y-2 mb-4">
        {rows.map((r) => (
          <div key={r.label} className="flex justify-between items-center bg-purple-900/40 p-3 border-2 border-purple-500 font-retro text-sm sm:text-base">
            <span className="text-gray-200">{r.label} <span className="text-gray-500">({r.rate * 100}%)</span></span>
            <span className="font-pixel text-[10px] sm:text-xs text-white whitespace-nowrap ml-2">{fmt(r.tax)}</span>
          </div>
        ))}
        {rows.length === 0 && <div className="font-retro text-gray-400 text-center py-2">PKP nihil — tidak ada pajak terutang 🎉</div>}
      </div>
      <div className="bg-yellow-900/40 border-4 border-yellow-500 p-4 text-center">
        <div className="font-pixel text-[10px] sm:text-xs text-yellow-300 mb-1">PPH 21 TAHUNAN</div>
        <div className="font-pixel text-xl sm:text-2xl neon-yellow break-words">{fmt(tax)}</div>
        <div className="font-retro text-sm text-gray-400 mt-1">≈ {fmt(tax / 12)} / bulan</div>
      </div>
    </div>
  )
}

function UmkmTool() {
  const [omzet, setOmzet] = useState(200000000)
  const tax = omzet * 0.005
  return (
    <div>
      <NumInput label="OMZET BRUTO BULANAN" value={omzet} onChange={setOmzet} min={1000000} max={400000000} step={1000000} />
      <div className="bg-black/40 border-2 border-green-400 p-3 sm:p-4 my-4 font-retro text-base sm:text-lg text-gray-300">
        Tarif PPh Final UMKM (PP 55/2022): <span className="font-pixel text-green-400">0.5%</span> × omzet bruto.
        Berlaku untuk omzet ≤ Rp 4,8 M/tahun, maksimal 7 tahun pajak.
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-green-900/40 border-4 border-green-500 p-4 text-center">
          <div className="font-pixel text-[10px] sm:text-xs text-green-300 mb-1">PPH BULAN INI</div>
          <div className="font-pixel text-base sm:text-xl text-white break-words">{fmt(tax)}</div>
        </div>
        <div className="bg-cyan-900/40 border-4 border-cyan-500 p-4 text-center">
          <div className="font-pixel text-[10px] sm:text-xs text-cyan-300 mb-1">EST. SETAHUN</div>
          <div className="font-pixel text-base sm:text-xl text-white break-words">{fmt(tax * 12)}</div>
        </div>
      </div>
    </div>
  )
}

function PtkpTool() {
  return (
    <div className="space-y-2">
      {PTKP_TABLE.map((p) => (
        <div key={p.status} className="flex justify-between items-center bg-cyan-900/40 p-3 border-2 border-cyan-600 font-retro text-sm sm:text-lg">
          <div>
            <span className="font-pixel text-[10px] sm:text-xs text-yellow-400 mr-2">{p.status}</span>
            <span className="text-gray-300">{p.label}</span>
          </div>
          <span className="font-pixel text-[10px] sm:text-xs text-white whitespace-nowrap ml-2">{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  )
}

const TABS = [
  { id: 'ppn', name: 'PPN 11%', icon: Receipt },
  { id: 'pph21', name: 'PPh 21', icon: Calculator },
  { id: 'umkm', name: 'UMKM 0.5%', icon: Building2 },
  { id: 'recon', name: 'REKON', icon: BookOpenCheck },
  { id: 'ptkp', name: 'PTKP', icon: TableProperties },
]

export default function ToolsHub() {
  const [tab, setTab] = useState('ppn')
  return (
    <div className="max-w-5xl mx-auto">
      <Card color="pink">
        <div className="flex items-center gap-3 justify-center">
          <Landmark className="neon-yellow" size={28} />
          <h2 className="font-pixel text-xl sm:text-2xl neon-pink">TAX TOOLKIT</h2>
        </div>
        <p className="font-retro text-base sm:text-lg text-gray-300 text-center mt-2">
          Kalkulator pajak saku — akurat, offline, tanpa login
        </p>
      </Card>

      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 -mx-3 px-3 sm:mx-0 sm:px-0" style={{ WebkitOverflowScrolling: 'touch' }}>
        {TABS.map((t) => {
          const Icon = t.icon
          return (
            <button
              key={t.id} onClick={() => setTab(t.id)}
              className={`retro-button px-4 py-3 font-pixel text-[10px] sm:text-xs whitespace-nowrap border-4 flex items-center gap-2 ${tab === t.id ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-cyan-400 text-white' : 'bg-gray-800 border-gray-600 text-gray-400'}`}
            >
              <Icon size={16} />{t.name}
            </button>
          )
        })}
      </div>

      <Card color="cyan">
        {tab === 'ppn' && <PpnTool />}
        {tab === 'pph21' && <Pph21Tool />}
        {tab === 'umkm' && <UmkmTool />}
        {tab === 'recon' && <FiscalRecon />}
        {tab === 'ptkp' && <PtkpTool />}
      </Card>
    </div>
  )
}
