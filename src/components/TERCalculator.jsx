import { useState } from 'react'
import { Calculator, Wallet, Users } from 'lucide-react'

export default function TERCalculator() {
  const [grossSalary, setGrossSalary] = useState(10000000)
  const [ptkpStatus, setPtkpStatus] = useState('TK/0')

  const ptkpValues = {
    'TK/0': 54000000, 'TK/1': 58500000, 'TK/2': 63000000, 'TK/3': 67500000,
    'K/0': 58500000, 'K/1': 63000000, 'K/2': 67500000, 'K/3': 72000000,
  }

  const getTERCategory = (annualGross) => {
    if (annualGross <= 60000000) return 'A'
    if (annualGross <= 250000000) return 'B'
    return 'C'
  }

  const terRates = {
    'A': { 'TK/0': 0.5, 'TK/1': 0.5, 'TK/2': 0.5, 'TK/3': 0.5, 'K/0': 0, 'K/1': 0, 'K/2': 0, 'K/3': 0 },
    'B': { 'TK/0': 3, 'TK/1': 2.5, 'TK/2': 2, 'TK/3': 1.5, 'K/0': 2.5, 'K/1': 2, 'K/2': 1.5, 'K/3': 1 },
    'C': { 'TK/0': 6, 'TK/1': 5.5, 'TK/2': 5, 'TK/3': 4.5, 'K/0': 5.5, 'K/1': 5, 'K/2': 4.5, 'K/3': 4 },
  }

  const annualGross = grossSalary * 12
  const terCategory = getTERCategory(annualGross)
  const terRate = terRates[terCategory][ptkpStatus]
  const monthlyTER = Math.round((grossSalary * terRate) / 100)

  const ptkp = ptkpValues[ptkpStatus]
  const pkp = Math.max(0, annualGross - ptkp)
  let annualTax = 0
  if (pkp <= 60000000) annualTax = pkp * 0.05
  else if (pkp <= 250000000) annualTax = 3000000 + (pkp - 60000000) * 0.15
  else if (pkp <= 500000000) annualTax = 31500000 + (pkp - 250000000) * 0.25
  else annualTax = 94000000 + (pkp - 500000000) * 0.30

  const terJanuaryNovember = monthlyTER * 11
  const decemberTax = Math.round(annualTax - terJanuaryNovember)
  const ptkpOptions = ['TK/0', 'TK/1', 'TK/2', 'TK/3', 'K/0', 'K/1', 'K/2', 'K/3']
  const money = (n) => `Rp ${Math.round(n).toLocaleString('id-ID')}`

  return (
    <div className="max-w-4xl mx-auto">
      <div className="cute-card p-6 sm:p-8 mb-4 text-center pop-in">
        <div className="text-5xl mb-2 select-none">🧮</div>
        <h2 className="font-cute text-2xl sm:text-3xl font-extrabold text-[#5b4a68]">Kalkulator PPh 21</h2>
        <p className="text-sm text-[#a08bb0] mt-1">Geser slider gaji, hasilnya langsung keluar ✨</p>
      </div>

      <div className="grid md:grid-cols-2 gap-3 sm:gap-4 mb-4">
        <div className="cute-card p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-3">
            <Wallet size={20} className="text-[#e85d9e]" />
            <span className="font-cute font-bold text-[#5b4a68]">Gaji Bruto / Bulan</span>
          </div>
          <input
            type="range" min="5000000" max="50000000" step="500000"
            value={grossSalary}
            onChange={(e) => setGrossSalary(Number(e.target.value))}
            className="w-full accent-pink-500"
          />
          <div className="bg-[#fff3f8] rounded-2xl p-4 mt-3 text-center">
            <div className="font-cute text-2xl font-extrabold text-[#e85d9e]">{money(grossSalary)}</div>
            <div className="text-xs text-[#a08bb0]">per bulan • {money(annualGross)} / tahun</div>
          </div>
        </div>

        <div className="cute-card-lav p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-3">
            <Users size={20} className="text-[#7c5fc9]" />
            <span className="font-cute font-bold text-[#5b4a68]">Status PTKP</span>
          </div>
          <div className="grid grid-cols-4 gap-2 mb-3">
            {ptkpOptions.map((status) => (
              <button
                key={status}
                onClick={() => setPtkpStatus(status)}
                className={`rounded-full py-2.5 text-xs sm:text-sm font-cute font-bold transition-all ${
                  ptkpStatus === status ? 'cute-btn-lav cute-btn px-1' : 'bg-[#f6f0ff] text-[#a08bb0]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          <div className="bg-white rounded-2xl border border-purple-100 p-4 text-center">
            <div className="text-xs text-[#a08bb0]">Kategori TER kamu</div>
            <div className="font-cute text-4xl font-extrabold text-[#7c5fc9]">{terCategory}</div>
            <div className="text-xs text-[#a08bb0]">Tarif {terRate}% • PTKP {money(ptkp)}</div>
          </div>
        </div>
      </div>

      <div className="cute-card-mint p-5 sm:p-6">
        <h3 className="font-cute text-xl font-extrabold text-[#0d4a3a] mb-4 text-center">💚 Hasil Hitungan</h3>
        <div className="grid sm:grid-cols-3 gap-3 mb-4">
          {[
            ['🍰 Jan – Nov / bln', money(monthlyTER)],
            ['🎀 Desember', money(decemberTax)],
            ['🌟 Total setahun', money(annualTax)],
          ].map(([label, val]) => (
            <div key={label} className="bg-white rounded-2xl p-4 text-center">
              <div className="text-xs text-[#a08bb0]">{label}</div>
              <div className="font-cute text-lg font-extrabold text-[#0d4a3a] break-words">{val}</div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-4">
          <div className="text-xs text-[#a08bb0] mb-2">Perbandingan potongan</div>
          {[
            ['Jan – Nov', monthlyTER, '#8ecae6'],
            ['Desember', Math.max(0, decemberTax), '#ff7eb3'],
          ].map(([label, val, color]) => {
            const mx = Math.max(monthlyTER, Math.max(0, decemberTax), 1)
            return (
              <div key={label} className="mb-2 last:mb-0">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#8b7a99]">{label}</span>
                  <span className="font-cute font-bold text-[#5b4a68]">{money(val)}</span>
                </div>
                <div className="bar-track h-3">
                  <div className="h-full rounded-full transition-all" style={{ width: `${(val / mx) * 100}%`, background: color }} />
                </div>
              </div>
            )
          })}
        </div>
        <p className="text-[11px] text-[#a08bb0] text-center mt-3 flex items-center justify-center gap-1">
          <Calculator size={12} /> Estimasi sederhana • Desember = pajak setahun − TER Jan–Nov
        </p>
      </div>
    </div>
  )
}
