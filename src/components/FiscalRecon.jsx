import { useState } from 'react'
import { BookOpen, Info } from 'lucide-react'

const reconData = {
  positif: [
    { item: 'Biaya entertainment 50%', pasal: 'UU PPh Pasal 6 ayat (1) huruf a', alasan: 'Hanya 50% yang boleh dikurangkan' },
    { item: 'Sanksi pajak / denda', pasal: 'UU PPh Pasal 9 ayat (1) huruf c', alasan: 'Tidak boleh dikurangkan sebagai biaya' },
    { item: 'Sumbangan (non zakat)', pasal: 'UU PPh Pasal 9 ayat (1) huruf g', alasan: 'Tidak termasuk biaya yang diperbolehkan' },
    { item: 'Natura / kenikmatan', pasal: 'UU PPh Pasal 9 ayat (1) huruf e', alasan: 'Penggantian dalam bentuk natura bukan biaya' },
    { item: 'Penyusutan fiskal < komersial', pasal: 'UU PPh Pasal 11', alasan: 'Selisih penyusutan ditambahkan kembali' },
  ],
  negatif: [
    { item: 'Penghasilan kena PPh final', pasal: 'UU PPh Pasal 4 ayat (2)', alasan: 'Penghasilan final tidak dikenakan PPh lagi' },
    { item: 'Dividen yang sudah kena PPh', pasal: 'UU PPh Pasal 4 ayat (3) huruf f', alasan: 'Penghasilan bukan objek pajak' },
    { item: 'Penyusutan fiskal > komersial', pasal: 'UU PPh Pasal 11', alasan: 'Selisih penyusutan dikurangkan' },
    { item: 'Kompensasi rugi tahun lalu', pasal: 'UU PPh Pasal 6 ayat (2)', alasan: 'Rugi 5 tahun sebelumnya boleh dikompensasi' },
  ],
}

export default function FiscalRecon() {
  const [selected, setSelected] = useState(null)

  const col = (title, emoji, items, active, bg, border) => (
    <div className="bg-white rounded-2xl border-2 p-4" style={{ borderColor: border }}>
      <h3 className="font-cute font-bold mb-1" style={{ color: active }}>{emoji} {title}</h3>
      <p className="text-[11px] text-[#a08bb0] mb-3">{title === 'Koreksi Positif' ? 'Bikin laba fiskal naik ➕' : 'Bikin laba fiskal turun ➖'}</p>
      <div className="space-y-2">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setSelected(item)}
            className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-[#5b4a68] transition-all hover:scale-[1.01]"
            style={{ background: bg }}
          >
            {item.item}
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-3">
      <div className="bg-gradient-to-r from-[#b388ff] to-[#8ecae6] rounded-2xl p-5 text-white text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <BookOpen size={22} />
          <h2 className="font-cute text-lg font-extrabold">Matriks Rekonsiliasi Fiskal 📊</h2>
        </div>
        <p className="text-xs opacity-90">Ketuk kartunya buat lihat dasar hukumnya!</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {col('Koreksi Positif', '➕', reconData.positif, '#e85d9e', '#fff3f8', '#ffd1e0')}
        {col('Koreksi Negatif', '➖', reconData.negatif, '#1d9e6b', '#e9faf3', '#b8f0d4')}
      </div>

      {selected && (
        <div className="cute-card-lav p-5 pop-in">
          <div className="flex items-start gap-2.5 mb-3">
            <Info size={22} className="text-[#7c5fc9] shrink-0 mt-0.5" />
            <div>
              <div className="text-[11px] font-bold text-[#a08bb0]">DETAIL</div>
              <div className="font-cute font-bold text-[#5b4a68] text-lg leading-snug">{selected.item}</div>
            </div>
          </div>
          <div className="bg-[#f6f0ff] rounded-xl p-3 mb-2 text-sm">
            <span className="text-[11px] font-bold text-[#7c5fc9] block">📜 DASAR HUKUM</span>
            <span className="text-[#5b4a68]">{selected.pasal}</span>
          </div>
          <div className="bg-[#fff8ec] rounded-xl p-3 text-sm">
            <span className="text-[11px] font-bold text-[#d99a2b] block">💡 ALASAN</span>
            <span className="text-[#5b4a68]">{selected.alasan}</span>
          </div>
          <button onClick={() => setSelected(null)} className="cute-btn cute-btn-lav w-full mt-3 py-3 text-sm">
            Tutup 💕
          </button>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-amber-100 p-5">
        <h3 className="font-cute font-bold text-[#d99a2b] mb-3">🍯 Rumus cepat</h3>
        <div className="text-sm space-y-1.5 text-[#5b4a68]">
          <p>Laba komersial (sebelum pajak)</p>
          <p className="text-[#e85d9e] font-bold">+ Koreksi positif</p>
          <p className="text-[#1d9e6b] font-bold">− Koreksi negatif</p>
          <p className="border-t border-amber-100 pt-2 font-cute font-extrabold text-[#d99a2b]">= Laba fiskal × tarif PPh = pajak terutang ✨</p>
        </div>
      </div>
    </div>
  )
}
