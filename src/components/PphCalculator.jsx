import { useState } from 'react'
import { Calculator, Users, TrendingUp } from 'lucide-react'

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

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-cyan-900 to-blue-900 border-4 border-neon-cyan p-6 shadow-pixel">
        <div className="flex items-center gap-3 mb-4">
          <Calculator className="text-neon-cyan" size={32} />
          <h2 className="font-pixel text-lg text-neon-cyan">PPH 21 TER CALCULATOR</h2>
        </div>
        <p className="font-retro text-sm text-gray-300">
          Hitung PPh 21 Tarif Efektif Rata-rata (TER) sesuai PMK 168/2023
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-black/80 border-4 border-neon-purple p-4 shadow-pixel">
            <label className="font-pixel text-xs text-neon-purple block mb-2">GAJI POKOK</label>
            <input
              type="range"
              min="4000000"
              max="20000000"
              step="100000"
              value={gaji}
              onChange={(e) => setGaji(Number(e.target.value))}
              className="w-full"
            />
            <div className="font-pixel text-sm text-white mt-2 text-right">
              Rp {gaji.toLocaleString('id-ID')}
            </div>
          </div>

          <div className="bg-black/80 border-4 border-neon-yellow p-4 shadow-pixel">
            <label className="font-pixel text-xs text-neon-yellow block mb-2">TUNJANGAN</label>
            <input
              type="range"
              min="0"
              max="10000000"
              step="100000"
              value={tunjangan}
              onChange={(e) => setTunjangan(Number(e.target.value))}
              className="w-full"
            />
            <div className="font-pixel text-sm text-white mt-2 text-right">
              Rp {tunjangan.toLocaleString('id-ID')}
            </div>
          </div>

          <div className="bg-black/80 border-4 border-neon-pink p-4 shadow-pixel">
            <label className="font-pixel text-xs text-neon-pink block mb-2">STATUS PTKP</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-black text-white border-2 border-neon-pink p-2 font-retro"
            >
              <option value="TK/0">TK/0 - Tidak Kawin Tanpa Tanggungan</option>
              <option value="TK/1">TK/1 - Tidak Kawin 1 Tanggungan</option>
              <option value="K/0">K/0 - Kawin Tanpa Tanggungan</option>
              <option value="K/1">K/1 - Kawin 1 Tanggungan</option>
              <option value="K/2">K/2 - Kawin 2 Tanggungan</option>
              <option value="K/3">K/3 - Kawin 3 Tanggungan</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-purple-900 to-pink-900 border-4 border-neon-pink p-6 shadow-pixel">
            <h3 className="font-pixel text-sm text-neon-pink mb-4">HASIL KALKULASI</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-retro text-sm text-gray-300">Penghasilan Bruto</span>
                <span className="font-pixel text-sm text-white">Rp {bruto.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-retro text-sm text-gray-300">Kategori TER</span>
                <span className="font-pixel text-lg text-neon-cyan">{getKategoriTER()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-retro text-sm text-gray-300">Tarif TER</span>
                <span className="font-pixel text-lg text-neon-yellow">{getPersenTER()}%</span>
              </div>
              <div className="border-t-2 border-neon-pink pt-3 flex justify-between items-center">
                <span className="font-pixel text-sm text-neon-pink">PPH 21</span>
                <span className="font-pixel text-lg text-red-400">Rp {Math.round(pph21).toLocaleString('id-ID')}</span>
              </div>
              <div className="bg-neon-cyan/20 border-2 border-neon-cyan p-3 flex justify-between items-center">
                <span className="font-pixel text-sm text-neon-cyan">TAKE HOME PAY</span>
                <span className="font-pixel text-lg text-neon-cyan">Rp {Math.round(takeHome).toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>

          <div className="bg-black/80 border-4 border-neon-yellow p-4 shadow-pixel">
            <h3 className="font-pixel text-xs text-neon-yellow mb-3">GRAFIK POTONGAN</h3>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-retro text-xs text-gray-400">Jan-Nov (per bulan)</span>
                  <span className="font-retro text-xs text-white">Rp {Math.round(pph21).toLocaleString('id-ID')}</span>
                </div>
                <div className="bg-gray-800 h-6 border-2 border-neon-purple relative overflow-hidden">
                  <div 
                    className="bg-neon-purple h-full transition-all"
                    style={{ width: `${(pph21 / bruto) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-retro text-xs text-gray-400">Desember (True Up)</span>
                  <span className="font-retro text-xs text-white">Variable</span>
                </div>
                <div className="bg-gray-800 h-6 border-2 border-neon-cyan relative overflow-hidden">
                  <div className="bg-neon-cyan h-full w-1/2 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
