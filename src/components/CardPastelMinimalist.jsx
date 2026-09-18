// CardPastelMinimalist — Clean & Aesthetic. Sage green/krem matte, rapi, whitespace lega, elegan menenangkan.
export default function CardPastelMinimalist({ data = {} }) {
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
    frameLabel = 'Minimalist',
  } = data

  return (
    <div
      className="w-[360px] text-center"
      style={{ width: 360, flexShrink: 0, background: '#f5f1e8', border: '1px solid #d8cfc0', borderRadius: 16, padding: 32, fontFamily: 'Georgia, serif', boxShadow: '0 4px 24px rgba(120,110,90,0.12)' }}
    >
      {/* Header minimal */}
      <div className="flex justify-between items-center gap-2 min-w-0" style={{ paddingBottom: 16, borderBottom: '1px solid #e2d9c8' }}>
        <div className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis text-[10px]" style={{ color: '#8a8272', fontWeight: 600, letterSpacing: '0.28em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>
          TAXQUEST • PLAYER CARD
        </div>
        <div className="whitespace-nowrap flex-shrink-0 shrink-0" style={{ color: '#6b7f5e', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', maxWidth: '55%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {rankTitle}
        </div>
      </div>

      {/* Avatar tenang di tengah, banyak whitespace */}
      <div className="mx-auto flex items-center justify-center" style={{ marginTop: 28, width: 80, height: 80, borderRadius: '50%', background: '#e8e4d5', border: '1px solid #d8cfc0', fontSize: 40 }}>
        {avatar}
      </div>

      {/* Nama elegan */}
      <h3 className="whitespace-nowrap overflow-hidden text-ellipsis" style={{ marginTop: 16, color: '#3a3630', fontSize: 24, fontWeight: 400, letterSpacing: '0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingLeft: 12, paddingRight: 12 }}>
        {name}
      </h3>
      {rank !== '—' && (
        <div className="whitespace-nowrap overflow-hidden text-ellipsis" style={{ marginTop: 6, color: '#a09a8a', fontSize: 11, letterSpacing: '0.14em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          Nº {rank} — CALM & COMPLIANT
        </div>
      )}

      {/* Stat bersih sejajar */}
      <div className="grid grid-cols-3 gap-2" style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid #e2d9c8' }}>
        {[
          ['Level', level],
          ['Total XP', heroXP],
          ['Badges', badgesCount],
        ].map(([l, v]) => (
          <div key={l} className="text-center" style={{ padding: '4px 2px' }}>
            <div className="whitespace-nowrap overflow-hidden text-ellipsis" style={{ color: '#a09a8a', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l}</div>
            <div style={{ color: '#3a3630', fontSize: 22, fontWeight: 400, marginTop: 4 }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Quote tenang */}
      <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid #e2d9c8' }}>
        <p className="whitespace-nowrap overflow-hidden text-ellipsis" style={{ color: '#6b6558', fontSize: 13, fontStyle: 'italic', lineHeight: 1.6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {isSelf ? quote || 'Ketenangan dalam kepatuhan.' : `Terbaik: ${best} poin`}
        </p>
      </div>
      <div className="whitespace-nowrap overflow-hidden text-ellipsis" style={{ marginTop: 24, color: '#c4bcab', fontSize: 10, letterSpacing: '0.24em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        ✦ taxquest.vercel.app
      </div>
    </div>
  )
}
