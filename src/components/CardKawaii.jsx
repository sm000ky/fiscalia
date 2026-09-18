// CardKawaii — Cute/Girly. Pastel pink/soft blue, rounded-3xl, soft shadow, terpusat/bubbly.
export default function CardKawaii({ data = {} }) {
  const {
    name = 'WajibPajak#69',
    avatar = '🦊',
    level = 1,
    heroXP = 0,
    badgesCount = 0,
    quote = '',
    best = 0,
    isSelf = true,
    rankTitle = 'Wajib Pajak Taat',
    rank = '—',
    frameLabel = 'Kawaii',
  } = data

  return (
    <div
      className="w-[360px] text-center rounded-3xl"
      style={{ width: 360, flexShrink: 0, background: 'linear-gradient(160deg, #fff0f6 0%, #ffd6e8 45%, #cfe8ff 100%)', border: '3px solid #fff', borderRadius: 28, padding: 22, fontFamily: "'Baloo 2','Nunito',system-ui,sans-serif", boxShadow: '0 12px 32px rgba(255,107,168,0.35)' }}
    >
      {/* Header pill */}
      <div className="flex justify-between items-center gap-2 min-w-0">
        <div className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis text-[10px] rounded-full" style={{ background: '#fff', color: '#e63980', fontWeight: 800, letterSpacing: '0.1em', padding: '5px 12px', boxShadow: '0 3px 10px rgba(255,107,168,0.25)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>
          🌸 TAXQUEST • PLAYER CARD
        </div>
        <div className="whitespace-nowrap flex-shrink-0 shrink-0 rounded-full" style={{ background: 'linear-gradient(135deg, #ff6ba8, #a770ff)', color: '#fff', fontSize: 11, fontWeight: 800, padding: '6px 12px', boxShadow: '0 3px 10px rgba(167,112,255,0.4)', maxWidth: '55%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          💗 {rankTitle}
        </div>
      </div>

      {/* Avatar bubbly tengah */}
      <div className="mx-auto flex items-center justify-center rounded-full" style={{ marginTop: 16, width: 92, height: 92, background: '#fff', border: '4px solid #ffb3d4', boxShadow: '0 0 0 5px #fff, 0 8px 20px rgba(255,107,168,0.4)', fontSize: 48 }}>
        {avatar}
      </div>

      {/* Nama */}
      <h3 className="whitespace-nowrap overflow-hidden text-ellipsis" style={{ marginTop: 10, color: '#7c3f8c', fontSize: 26, fontWeight: 800, textShadow: '0 2px 0 #fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingLeft: 10, paddingRight: 10 }}>
        {name} 💕
      </h3>
      {rank !== '—' && (
        <div className="whitespace-nowrap overflow-hidden text-ellipsis" style={{ marginTop: 2, color: '#a770ff', fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          ✿ Rank #{rank} • SPARKLING TAX CUTIE ✿
        </div>
      )}

      {/* Stat bubbly */}
      <div className="grid grid-cols-3 gap-2" style={{ marginTop: 14 }}>
        {[
          ['🌷 Level', level, '#ffe3ec'],
          ['☁️ XP', heroXP, '#e3f2ff'],
          ['🎀 Badge', badgesCount, '#f3e8ff'],
        ].map(([l, v, bg]) => (
          <div key={l} className="text-center rounded-3xl" style={{ background: bg, border: '2px solid #fff', borderRadius: 22, padding: '10px 4px', boxShadow: '0 5px 14px rgba(255,107,168,0.2)' }}>
            <div className="whitespace-nowrap overflow-hidden text-ellipsis" style={{ color: '#9a6aa8', fontSize: 10, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l}</div>
            <div style={{ color: '#e63980', fontSize: 20, fontWeight: 800 }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Quote pill */}
      <div className="rounded-3xl" style={{ marginTop: 12, background: '#fff', border: '2px solid #ffd6e8', borderRadius: 22, padding: '10px 16px', boxShadow: '0 5px 14px rgba(255,107,168,0.2)' }}>
        <p className="whitespace-nowrap overflow-hidden text-ellipsis" style={{ color: '#7c3f8c', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          💌 {isSelf ? quote || 'Pajak manis, hati manis!' : `Best: ${best} pts`} ✨
        </p>
      </div>
      <div className="whitespace-nowrap overflow-hidden text-ellipsis" style={{ marginTop: 10, color: '#c49ac9', fontSize: 10, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        💗 taxquest.vercel.app
      </div>
    </div>
  )
}
