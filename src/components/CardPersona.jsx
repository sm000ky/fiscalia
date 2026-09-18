// CardPersona — Persona 5. Brutalist: merah pekat/hitam/putih, italic/bold, sudut tajam, miring agresif.
export default function CardPersona({ data = {} }) {
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
    frameLabel = 'Persona',
  } = data

  return (
    <div
      className="w-[360px]"
      style={{ width: 360, flexShrink: 0, background: '#0a0a0a', border: '3px solid #fff', padding: 0, fontFamily: 'Arial Black, Arial, sans-serif', position: 'relative', overflow: 'hidden' }}
    >
      {/* strip merah miring atas */}
      <div style={{ background: '#e60012', transform: 'rotate(-2deg) scale(1.05)', padding: '10px 18px', borderBottom: '3px solid #fff' }}>
        <div className="flex justify-between items-center gap-2 min-w-0">
          <div className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis text-[10px]" style={{ color: '#fff', fontWeight: 900, fontStyle: 'italic', letterSpacing: '0.14em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>
            TAXQUEST • PLAYER CARD
          </div>
          <div className="whitespace-nowrap flex-shrink-0 shrink-0" style={{ background: '#0a0a0a', color: '#ffe600', fontSize: 11, fontWeight: 900, fontStyle: 'italic', padding: '4px 10px', border: '2px solid #ffe600', transform: 'rotate(2deg)', maxWidth: '58%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            ★ {rankTitle}
          </div>
        </div>
      </div>

      {/* Body miring agresif */}
      <div style={{ padding: '16px 18px 18px', transform: 'rotate(-1deg)' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div className="flex items-center justify-center flex-shrink-0" style={{ width: 78, height: 78, background: '#e60012', border: '3px solid #fff', boxShadow: '5px 5px 0 #ffe600', fontSize: 42, transform: 'rotate(4deg)' }}>
            {avatar}
          </div>
          <div style={{ minWidth: 0, flex: 1, transform: 'rotate(1deg)' }}>
            <h3 className="whitespace-nowrap overflow-hidden text-ellipsis" style={{ color: '#fff', fontSize: 24, fontWeight: 900, fontStyle: 'italic', textShadow: '3px 3px 0 #e60012', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {name}
            </h3>
            <div className="whitespace-nowrap overflow-hidden text-ellipsis" style={{ color: '#ffe600', fontSize: 11, fontWeight: 900, fontStyle: 'italic', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {rank !== '—' ? `RANK #${rank} // PHANTOM THIEVES OF TAXES` : 'PHANTOM THIEVES OF TAXES'}!
            </div>
          </div>
        </div>

        {/* Stat blok tajam */}
        <div className="grid grid-cols-3 gap-2" style={{ marginTop: 14 }}>
          {[
            ['LV', level, '#e60012'],
            ['XP', heroXP, '#0a0a0a'],
            ['BDG', badgesCount, '#0a0a0a'],
          ].map(([l, v, bg], i) => (
            <div key={l} className="text-center" style={{ background: i === 0 ? bg : '#fff', border: '3px solid #0a0a0a', boxShadow: '4px 4px 0 #e60012', padding: '8px 2px', transform: i === 1 ? 'rotate(1.5deg)' : 'rotate(-1.5deg)' }}>
              <div className="whitespace-nowrap overflow-hidden text-ellipsis" style={{ color: i === 0 ? '#fff' : '#e60012', fontSize: 10, fontWeight: 900, fontStyle: 'italic', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l}</div>
              <div style={{ color: i === 0 ? '#ffe600' : '#0a0a0a', fontSize: 20, fontWeight: 900, fontStyle: 'italic' }}>{v}</div>
            </div>
          ))}
        </div>

        {/* Quote speech */}
        <div style={{ marginTop: 12, background: '#fff', border: '3px solid #0a0a0a', boxShadow: '4px 4px 0 #0a0a0a', padding: '10px 12px', transform: 'rotate(1deg)' }}>
          <p className="whitespace-nowrap overflow-hidden text-ellipsis" style={{ color: '#0a0a0a', fontSize: 12, fontWeight: 900, fontStyle: 'italic', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            “{isSelf ? quote || 'BAYAR PAJAK ATAU RASAKAN!' : `BEST: ${best} PTS`}”
          </p>
        </div>
        <div className="whitespace-nowrap overflow-hidden text-ellipsis" style={{ marginTop: 10, color: '#fff', fontSize: 10, fontWeight: 900, fontStyle: 'italic', textAlign: 'right', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          ⚡ taxquest.vercel.app
        </div>
      </div>
      {/* strip bawah */}
      <div style={{ background: '#ffe600', borderTop: '3px solid #fff', padding: '4px 0' }} />
    </div>
  )
}
