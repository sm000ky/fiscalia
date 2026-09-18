// CardJoker — Retro arcade ala Balatro. Merah/hitam pekat, kartu remi, kotak tajam tanpa rounded, avatar agak ke atas.
export default function CardJoker({ data = {} }) {
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
    frameLabel = 'Joker',
  } = data

  return (
    <div
      className="w-[360px] text-center"
      style={{
        width: 360,
        flexShrink: 0,
        background: '#0d0d0f',
        border: '4px solid #e63946',
        outline: '2px solid #f1fa8c',
        outlineOffset: -8,
        padding: 20,
        fontFamily: '"Courier New", monospace',
        boxShadow: '8px 8px 0 #e63946',
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center gap-2 min-w-0" style={{ borderBottom: '2px dashed #e63946', paddingBottom: 8 }}>
        <div
          className="text-left flex-1 whitespace-nowrap overflow-hidden text-ellipsis text-[10px]"
          style={{ color: '#f1fa8c', fontWeight: 700, letterSpacing: '0.1em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}
        >
          TAXQUEST • PLAYER CARD
        </div>
        <div
          className="whitespace-nowrap flex-shrink-0 shrink-0"
          style={{ background: '#e63946', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 8px', maxWidth: '60%', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          ♥ {rankTitle}
        </div>
      </div>

      {/* Avatar agak ke atas — strip arcade */}
      <div style={{ marginTop: 10, background: 'repeating-linear-gradient(45deg, #e63946 0 8px, #0d0d0f 8px 16px)', padding: 6 }}>
        <div
          className="mx-auto flex items-center justify-center"
          style={{ width: 76, height: 76, background: '#f1fa8c', border: '3px solid #0d0d0f', fontSize: 42, marginTop: -16 }}
        >
          {avatar}
        </div>
      </div>

      {/* Nama ala kartu remi */}
      <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#e63946', fontSize: 22, fontWeight: 900 }}>♠</span>
        <h3
          className="whitespace-nowrap overflow-hidden text-ellipsis"
          style={{ color: '#fff', fontSize: 24, fontWeight: 900, letterSpacing: '0.06em', textShadow: '3px 3px 0 #e63946', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingLeft: 8, paddingRight: 8, flex: 1, minWidth: 0 }}
        >
          {name}
        </h3>
        <span style={{ color: '#e63946', fontSize: 22, fontWeight: 900 }}>♥</span>
      </div>
      {(rank !== '—' || true) && (
        <div className="whitespace-nowrap overflow-hidden text-ellipsis" style={{ marginTop: 2, color: '#f1fa8c', fontSize: 11, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {rank !== '—' ? `RANK #${rank} • ALL IN ON TAXES` : 'ALL IN ON TAXES'}
        </div>
      )}

      {/* Stat kotak tajam */}
      <div className="grid grid-cols-3 gap-0" style={{ marginTop: 12, border: '2px solid #f1fa8c' }}>
        {[
          ['★ LV', level, '#e63946'],
          ['⚡ XP', heroXP, '#f1fa8c'],
          ['🏅 BDG', badgesCount, '#4ade9f'],
        ].map(([l, v, c]) => (
          <div key={l} className="text-center" style={{ background: '#16161a', borderRight: '2px solid #f1fa8c', padding: '10px 2px' }}>
            <div className="whitespace-nowrap overflow-hidden text-ellipsis" style={{ color: '#8a8a93', fontSize: 10, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l}</div>
            <div style={{ color: c, fontSize: 20, fontWeight: 900 }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Quote marquee */}
      <div style={{ marginTop: 10, background: '#e63946', padding: '8px 10px' }}>
        <p className="whitespace-nowrap overflow-hidden text-ellipsis" style={{ color: '#fff', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          ▶ {isSelf ? quote || 'INSERT COIN, BAYAR PAJAK!' : `BEST: ${best} PTS`} ◀
        </p>
      </div>
      <div className="whitespace-nowrap overflow-hidden text-ellipsis" style={{ marginTop: 8, color: '#8a8a93', fontSize: 10, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        ♠ taxquest.vercel.app ♥
      </div>
    </div>
  )
}
