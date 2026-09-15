import { useState } from 'react'
import { Calculator, TrendingUp, DollarSign } from 'lucide-react'

export default function TERCalculator() {
  const [grossSalary, setGrossSalary] = useState(10000000)
  const [ptkpStatus, setPtkpStatus] = useState('TK/0')

  // PTKP values
  const ptkpValues = {
    'TK/0': 54000000,
    'TK/1': 58500000,
    'TK/2': 63000000,
    'TK/3': 67500000,
    'K/0': 58500000,
    'K/1': 63000000,
    'K/2': 67500000,
    'K/3': 72000000
  }

  // TER Category based on annual gross salary
  const getTERCategory = (annualGross) => {
    if (annualGross <= 60000000) return 'A'
    if (annualGross <= 250000000) return 'B'
    return 'C'
  }

  // TER Rates (simplified)
  const terRates = {
    'A': { 'TK/0': 0.5, 'TK/1': 0.5, 'TK/2': 0.5, 'TK/3': 0.5, 'K/0': 0, 'K/1': 0, 'K/2': 0, 'K/3': 0 },
    'B': { 'TK/0': 3, 'TK/1': 2.5, 'TK/2': 2, 'TK/3': 1.5, 'K/0': 2.5, 'K/1': 2, 'K/2': 1.5, 'K/3': 1 },
    'C': { 'TK/0': 6, 'TK/1': 5.5, 'TK/2': 5, 'TK/3': 4.5, 'K/0': 5.5, 'K/1': 5, 'K/2': 4.5, 'K/3': 4 }
  }

  const annualGross = grossSalary * 12
  const terCategory = getTERCategory(annualGross)
  const terRate = terRates[terCategory][ptkpStatus]
  const monthlyTER = Math.round((grossSalary * terRate) / 100)

  // December calculation (regular)
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

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="arcade-bg pixel-box-cyan p-6 mb-6 text-center">
        <Calculator className="w-16 h-16 mx-auto mb-4 neon-cyan" />
        <h2 className="font-pixel text-3xl neon-pink mb-2">TER CALCULATOR</h2>
        <p className="font-retro text-lg text-gray-300">
          Calculate Your PPh 21 with Tarif Efektif Rata-rata
        </p>
      </div>

      {/* Input Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Gross Salary Slider */}
        <div className="arcade-bg pixel-box-pink p-6">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="neon-yellow" size={24} />
            <span className="font-pixel text-lg neon-cyan">GAJI BRUTO</span>
          </div>
          
          <div className="mb-4">
            <input
              type="range"
              min="5000000"
              max="50000000"
              step="500000"
              value={grossSalary}
              onChange={(e) => setGrossSalary(Number(e.target.value))}
              className="w-full h-4 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
          </div>

          <div className="bg-black/40 border-2 border-pink-500 p-4">
            <div className="font-pixel text-2xl neon-yellow text-center">
              Rp {grossSalary.toLocaleString('id-ID')}
            </div>
            <div className="font-retro text-sm text-gray-400 text-center mt-1">
              per bulan
            </div>
          </div>
        </div>

        {/* PTKP Status */}
        <div className="arcade-bg pixel-box-cyan p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="neon-pink" size={24} />
            <span className="font-pixel text-lg neon-yellow">STATUS PTKP</span>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-4">
            {ptkpOptions.map((status) => (
              <button
                key={status}
                onClick={() => setPtkpStatus(status)}
                className={`retro-button px-3 py-2 font-pixel text-sm border-4 transition-all ${
                  ptkpStatus === status
                    ? 'bg-cyan-600 border-cyan-300 text-white scale-105'
                    : 'bg-gray-800 border-gray-600 text-gray-400'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="bg-black/40 border-2 border-cyan-400 p-4 text-center">
            <div className="font-retro text-sm text-gray-400 mb-1">TER Category</div>
            <div className={`font-pixel text-4xl ${
              terCategory === 'A' ? 'neon-cyan' : terCategory === 'B' ? 'neon-yellow' : 'neon-pink'
            }`}>
              TER {terCategory}
            </div>
            <div className="font-retro text-xs text-gray-500 mt-1">
              Rate: {terRate}%
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="arcade-bg pixel-box-pink p-6">
        <h3 className="font-pixel text-xl neon-cyan mb-6 text-center">
          CALCULATION RESULTS
        </h3>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-purple-900/40 border-4 border-purple-500 p-4">
            <div className="font-pixel text-sm text-purple-300 mb-2">MONTHLY TER</div>
            <div className="font-pixel text-xl text-white">Rp {monthlyTER.toLocaleString('id-ID')}</div>
            <div className="font-retro text-xs text-gray-400 mt-1">Jan - Nov</div>
          </div>

          <div className="bg-yellow-900/40 border-4 border-yellow-500 p-4">
            <div className="font-pixel text-sm text-yellow-300 mb-2">DECEMBER TAX</div>
            <div className="font-pixel text-xl text-white">Rp {decemberTax.toLocaleString('id-ID')}</div>
            <div className="font-retro text-xs text-gray-400 mt-1">Final calculation</div>
          </div>

          <div className="bg-cyan-900/40 border-4 border-cyan-500 p-4">
            <div className="font-pixel text-sm text-cyan-300 mb-2">ANNUAL TOTAL</div>
            <div className="font-pixel text-xl text-white">Rp {Math.round(annualTax).toLocaleString('id-ID')}</div>
            <div className="font-retro text-xs text-gray-400 mt-1">Yearly PPh 21</div>
          </div>
        </div>

        {/* Visual Comparison */}
        <div className="bg-black/40 border-2 border-pink-500 p-6">
          <h4 className="font-pixel text-sm neon-yellow mb-4">MONTHLY COMPARISON</h4>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-retro text-sm text-gray-300">Jan - Nov (TER)</span>
                <span className="font-pixel text-xs neon-cyan">Rp {monthlyTER.toLocaleString('id-ID')}</span>
              </div>
              <div className="bg-gray-900 h-6 border-2 border-cyan-400 relative overflow-hidden">
                <div 
                  className="bg-cyan-500 h-full"
                  style={{width: `${(monthlyTER / Math.max(monthlyTER, decemberTax)) * 100}%`}}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-retro text-sm text-gray-300">December (Final)</span>
                <span className="font-pixel text-xs neon-pink">Rp {decemberTax.toLocaleString('id-ID')}</span>
              </div>
              <div className="bg-gray-900 h-6 border-2 border-pink-400 relative overflow-hidden">
                <div 
                  className="bg-pink-500 h-full"
                  style={{width: `${(decemberTax / Math.max(monthlyTER, decemberTax)) * 100}%`}}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
