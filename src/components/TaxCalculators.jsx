/**
 * Tax Calculator Tools - Kalkulator pajak praktis 🧮
 */
import { useState } from 'react'
import { Calculator, TrendingUp, Percent } from 'lucide-react'

// PPh 23 Calculator
export function PPh23Calculator() {
  const [bruto, setBruto] = useState('')
  const [tarif, setTarif] = useState('2')
  
  const pph23 = bruto ? (parseFloat(bruto) * (parseFloat(tarif) / 100)) : 0
  const netto = bruto ? parseFloat(bruto) - pph23 : 0

  return (
    <div className="cute-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="text-[#ff6ba8]" size={24} />
        <h3 className="font-cute text-lg font-bold text-[#e63980] dark:text-[#ff8cc7]">
          PPh 23 Calculator
        </h3>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-bold text-[#a08bb0] mb-1">
            Penghasilan Bruto (Rp)
          </label>
          <input
            type="number"
            value={bruto}
            onChange={(e) => setBruto(e.target.value)}
            placeholder="0"
            className="w-full px-4 py-2 rounded-xl border-2 border-pink-200 dark:border-purple-700 bg-white dark:bg-slate-800 text-[#4a3a58] dark:text-purple-100 focus:outline-none focus:border-[#ff6ba8]"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-[#a08bb0] mb-1">
            Tarif PPh 23
          </label>
          <select
            value={tarif}
            onChange={(e) => setTarif(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border-2 border-pink-200 dark:border-purple-700 bg-white dark:bg-slate-800 text-[#4a3a58] dark:text-purple-100"
          >
            <option value="2">2% - Jasa & Sewa</option>
            <option value="15">15% - Dividen, Bunga, Royalti</option>
          </select>
        </div>

        <div className="pt-3 border-t-2 border-pink-100 dark:border-purple-800">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-[#a08bb0]">PPh 23 ({tarif}%)</span>
            <span className="font-cute text-lg font-bold text-[#ff6ba8]">
              Rp {pph23.toLocaleString('id-ID')}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-[#4a3a58] dark:text-purple-200">
              Diterima (Netto)
            </span>
            <span className="font-cute text-xl font-bold text-[#4ade9f]">
              Rp {netto.toLocaleString('id-ID')}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// PPN Calculator Simple
export function PPNCalculator() {
  const [dpp, setDpp] = useState('')
  
  const ppn = dpp ? parseFloat(dpp) * 0.11 : 0
  const total = dpp ? parseFloat(dpp) + ppn : 0

  return (
    <div className="cute-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Percent className="text-[#a770ff]" size={24} />
        <h3 className="font-cute text-lg font-bold text-[#a770ff] dark:text-[#bd8fff]">
          Kalkulator PPN 11%
        </h3>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-bold text-[#a08bb0] mb-1">
            DPP / Harga Barang (Rp)
          </label>
          <input
            type="number"
            value={dpp}
            onChange={(e) => setDpp(e.target.value)}
            placeholder="0"
            className="w-full px-4 py-2 rounded-xl border-2 border-purple-200 dark:border-purple-700 bg-white dark:bg-slate-800 text-[#4a3a58] dark:text-purple-100 focus:outline-none focus:border-[#a770ff]"
          />
        </div>

        <div className="pt-3 border-t-2 border-purple-100 dark:border-purple-800">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-[#a08bb0]">PPN (11%)</span>
            <span className="font-cute text-lg font-bold text-[#a770ff]">
              Rp {ppn.toLocaleString('id-ID')}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-[#4a3a58] dark:text-purple-200">
              Total Bayar
            </span>
            <span className="font-cute text-xl font-bold text-[#ff6ba8]">
              Rp {total.toLocaleString('id-ID')}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// PTKP Quick Reference
export function PTKPReference() {
  const ptkpData = [
    { status: 'TK/0', desc: 'Tidak Kawin, Tanpa Tanggungan', value: '54,000,000' },
    { status: 'TK/1', desc: 'Tidak Kawin, 1 Tanggungan', value: '58,500,000' },
    { status: 'K/0', desc: 'Kawin, Tanpa Tanggungan', value: '58,500,000' },
    { status: 'K/1', desc: 'Kawin, 1 Tanggungan', value: '63,000,000' },
    { status: 'K/2', desc: 'Kawin, 2 Tanggungan', value: '67,500,000' },
  ]

  return (
    <div className="cute-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="text-[#4ade9f]" size={24} />
        <h3 className="font-cute text-lg font-bold text-[#4ade9f] dark:text-[#5efcb3]">
          PTKP 2024
        </h3>
      </div>

      <div className="space-y-2">
        {ptkpData.map((item, i) => (
          <div 
            key={i}
            className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-mint-50 to-green-50 dark:from-green-900/20 dark:to-mint-900/20"
          >
            <div>
              <div className="font-cute font-bold text-[#4ade9f]">
                {item.status}
              </div>
              <div className="text-xs text-[#a08bb0] dark:text-purple-300">
                {item.desc}
              </div>
            </div>
            <div className="font-cute text-sm font-bold text-[#4a3a58] dark:text-purple-200">
              Rp {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
