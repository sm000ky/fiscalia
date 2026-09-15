import { useState } from 'react'
import { BookOpen, Info, Plus, Minus } from 'lucide-react'

const reconData = {
  positif: [
    { item: "Biaya Entertainment 50%", pasal: "UU PPh Pasal 6 ayat (1) huruf a", alasan: "Hanya 50% yang boleh dikurangkan" },
    { item: "Sanksi Pajak/Denda", pasal: "UU PPh Pasal 9 ayat (1) huruf c", alasan: "Tidak boleh dikurangkan sebagai biaya" },
    { item: "Sumbangan (non zakat)", pasal: "UU PPh Pasal 9 ayat (1) huruf g", alasan: "Tidak termasuk dalam daftar biaya yang diperbolehkan" },
    { item: "Natura/Kenikmatan", pasal: "UU PPh Pasal 9 ayat (1) huruf e", alasan: "Penggantian dalam bentuk natura bukan biaya" },
    { item: "Penyusutan Fiscal < Komersial", pasal: "UU PPh Pasal 11", alasan: "Selisih penyusutan ditambahkan kembali" }
  ],
  negatif: [
    { item: "Penghasilan yang telah dipotong PPh Final", pasal: "UU PPh Pasal 4 ayat (2)", alasan: "Penghasilan final tidak dikenakan PPh lagi" },
    { item: "Dividen yang sudah kena PPh", pasal: "UU PPh Pasal 4 ayat (3) huruf f", alasan: "Penghasilan tidak kena pajak (exempt income)" },
    { item: "Penyusutan Fiscal > Komersial", pasal: "UU PPh Pasal 11", alasan: "Selisih penyusutan dikurangkan" },
    { item: "Kompensasi Kerugian Tahun Lalu", pasal: "UU PPh Pasal 6 ayat (2)", alasan: "Kerugian 5 tahun sebelumnya boleh dikompensasi" }
  ]
}

export default function FiscalRecon() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-cyan-900 to-blue-900 border-4 border-neon-cyan p-6 shadow-pixel">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="text-neon-cyan" size={32} />
          <h2 className="font-pixel text-lg text-neon-cyan">FISCAL RECON MATRIX</h2>
        </div>
        <p className="font-retro text-sm text-gray-300">
          Interactive cheatsheet untuk rekonsiliasi fiskal. Klik item untuk detail!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Koreksi Positif */}
        <div className="bg-gradient-to-br from-red-900 to-orange-900 border-4 border-red-500 p-6 shadow-pixel">
          <div className="flex items-center gap-2 mb-4">
            <Plus className="text-red-400" size={24} />
            <h3 className="font-pixel text-sm text-red-400">KOREKSI POSITIF</h3>
          </div>
          <p className="font-retro text-xs text-gray-300 mb-4">
            Menambah Laba Fiskal (Penghasilan Kena Pajak naik)
          </p>
          
          <div className="space-y-2">
            {reconData.positif.map((item, i) => (
              <button
                key={i}
                onClick={() => setSelected(item)}
                className="w-full bg-black/50 border-2 border-red-400 p-3 text-left hover:bg-red-700 transition-all retro-button shadow-pixel-sm"
              >
                <p className="font-pixel text-xs text-white">{item.item}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Koreksi Negatif */}
        <div className="bg-gradient-to-br from-green-900 to-teal-900 border-4 border-green-500 p-6 shadow-pixel">
          <div className="flex items-center gap-2 mb-4">
            <Minus className="text-green-400" size={24} />
            <h3 className="font-pixel text-sm text-green-400">KOREKSI NEGATIF</h3>
          </div>
          <p className="font-retro text-xs text-gray-300 mb-4">
            Mengurangi Laba Fiskal (Penghasilan Kena Pajak turun)
          </p>
          
          <div className="space-y-2">
            {reconData.negatif.map((item, i) => (
              <button
                key={i}
                onClick={() => setSelected(item)}
                className="w-full bg-black/50 border-2 border-green-400 p-3 text-left hover:bg-green-700 transition-all retro-button shadow-pixel-sm"
              >
                <p className="font-pixel text-xs text-white">{item.item}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="bg-gradient-to-br from-purple-900 to-pink-900 border-4 border-neon-pink p-6 shadow-pixel animate-pulse">
          <div className="flex items-start gap-3 mb-4">
            <Info className="text-neon-pink flex-shrink-0" size={24} />
            <div>
              <h3 className="font-pixel text-sm text-neon-pink mb-2">DETAIL INFO</h3>
              <p className="font-retro text-lg text-white mb-3">{selected.item}</p>
            </div>
          </div>
          
          <div className="bg-black/50 border-2 border-neon-cyan p-4 mb-3">
            <p className="font-pixel text-xs text-neon-cyan mb-2">DASAR HUKUM</p>
            <p className="font-retro text-sm text-white">{selected.pasal}</p>
          </div>
          
          <div className="bg-black/50 border-2 border-neon-yellow p-4">
            <p className="font-pixel text-xs text-neon-yellow mb-2">ALASAN</p>
            <p className="font-retro text-sm text-white">{selected.alasan}</p>
          </div>
          
          <button
            onClick={() => setSelected(null)}
            className="mt-4 w-full bg-neon-pink text-black font-pixel text-xs py-2 retro-button border-2 border-black shadow-pixel-sm"
          >
            TUTUP
          </button>
        </div>
      )}

      {/* Formula Quick Reference */}
      <div className="bg-black/80 border-4 border-neon-yellow p-6 shadow-pixel">
        <h3 className="font-pixel text-sm text-neon-yellow mb-4">FORMULA REKONSILIASI</h3>
        <div className="bg-gray-900 border-2 border-neon-yellow p-4 font-retro text-sm text-white space-y-2">
          <p>Laba Komersial (sebelum pajak)</p>
          <p className="text-red-400">+ Koreksi Positif</p>
          <p className="text-green-400">- Koreksi Negatif</p>
          <p className="border-t-2 border-neon-yellow pt-2 font-pixel text-neon-yellow">
            = Laba/Rugi Fiskal
          </p>
          <p className="text-gray-400 text-xs mt-3">
            * Laba Fiskal x Tarif PPh Badan = PPh Terutang
          </p>
        </div>
      </div>
    </div>
  )
}
