// CardTimekeeper — Vintage elegan ala Reverse:1999. Sepia/gold, serif kaku, border elegan, avatar tengah.
export default function CardTimekeeper({ data = {} }) {
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
    frameLabel = 'Timekeeper',
  } = data

  return (
    <div
      className="w-[360px] text-center"
      style={{
        width: 360,
        flexShrink: 0,
        background: 'linear-gradient(160deg, #1a1206 0%, #3d2c10 45%, #8a6d2b 75%, #d9b45b 100%)',
        border: '3px double #e8c876',
        outline: '1px solid #6b4f1a',
        outlineOffset: 3,
        padding: 20,
        fontFamily: 'Georgia, "Times New Roman", serif',
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center gap-2 min-w-0">
        <div
          className="text-left flex-1 whitespace-nowrap overflow-hidden text-ellipsis text-[10px]"
          style={{ color: '#f3e2b3', fontWeight: 700, letterSpacing: '0.22em', opacity: 0.9, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}
        >
          TAXQUEST • PLAYER CARD
        </div>
        <div
          className="flex items-center gap-1 whitespace-nowrap flex-shrink-0 shrink-0"
          style={{ border: '1px solid #e8c876', color: '#f7e8c3', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 2, background: 'rgba(0,0,0,0.45)', maxWidth: '60%', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          <span>◈</span>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{rankTitle}</span>
        </div>
      </div>

      <div style={{ margin: '10px auto 0', width: 72, height: 1, background: '#e8c876', opacity: 0.7 }} />

      {/* Avatar tengah */}
      <div
        className="mx-auto flex items-center justify-center"
        style={{ marginTop: 14, width: 84, height: 84, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, #f7e8c3, #b98f3e 70%)', border: '2px solid #f3e2b3', boxShadow: '0 0 0 4px rgba(0,0,0,0.35), 0 0 22px rgba(232,200,118,0.55)', fontSize: 44 }}
      >
        {avatar}
      </div>

      {/* Nama */}
      <h3
        className="whitespace-nowrap overflow-hidden text-ellipsis"
        style={{ marginTop: 10, color: '#fdf3d8', fontSize: 26, fontWeight: 700, letterSpacing: '0.04em', textShadow: '0 2px 6px rgba(0,0,0,0.8)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingLeft: 8, paddingRight: 8 }}
      >
        {name}
      </h3>
      {rank !== '—' ? (
        <div style={{ marginTop: 2, color: '#e8d5a3', fontSize: 11, letterSpacing: '0.12em' }}>
          No. {rank} • RESTORING THE TAX ERA
        </div>
      ) : (
        <div style={{ marginTop: 2, color: '#e8d5a3', fontSize: 11, letterSpacing: '0.12em' }}>
          RESTORING THE TAX ERA
        </div>
      )}

      {/* Stat — kolom klasik bergaris */}
      <div className="grid grid-cols-3 gap-2" style={{ marginTop: 14 }}>
        {[
          ['✦ LEVEL', level],
          ['✦ TOTAL XP', heroXP],
          ['✦ BADGES', badgesCount],
        ].map(([l, v]) => (
          <div key={l} className="text-center" style={{ border: '1px solid #c9a44c', background: 'rgba(20,12,2,0.6)', padding: '10px 4px', borderRadius: 2 }}>
            <div className="whitespace-nowrap overflow-hidden text-ellipsis" style={{ color: '#d9bd7f', fontSize: 10, letterSpacing: '0.14em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l}</div>
            <div style={{ color: '#ffe9b0', fontSize: 20, fontWeight: 700 }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Quote */}
      <div style={{ marginTop: 12, border: '1px solid #c9a44c', background: 'rgba(20,12,2,0.55)', padding: '10px 14px', borderRadius: 2 }}>
        <p className="whitespace-nowrap overflow-hidden text-ellipsis" style={{ color: '#f7e8c3', fontSize: 12, fontStyle: 'italic', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          “{isSelf ? quote || 'Waktu tak menunggu pajak.' : `Skor terbaik: ${best} poin`}”
        </p>
      </div>
      <div className="whitespace-nowrap overflow-hidden text-ellipsis" style={{ marginTop: 10, color: '#cbb26a', fontSize: 10, letterSpacing: '0.18em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        ◈ taxquest.vercel.app
      </div>
    </div>
  )
}
