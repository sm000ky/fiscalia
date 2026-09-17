// CardDegen — Cyberpunk/Web3. Gelap + neon/glow, glassmorphism (backdrop-blur), layout asimetris.
export default function CardDegen({ data = {} }) {
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
    frameLabel = 'Degen',
  } = data

  return (
    <div
      className="w-[360px]"
      style={{
        width: 360,
        flexShrink: 0,
        background: 'linear-gradient(140deg, #05010f 0%, #12033b 50%, #041b2b 100%)',
        border: '1px solid rgba(0,229,255,0.5)',
        boxShadow: '0 0 24px rgba(0,229,255,0.35), 0 0 60px rgba(178,75,243,0.25), inset 0 0 40px rgba(0,229,255,0.06)',
        padding: 20,
        fontFamily: 'system-ui, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* garis neon diagonal dekoratif */}
      <div style={{ position: 'absolute', top: -30, right: -30, width: 150, height: 150, background: 'radial-gradient(circle, rgba(178,75,243,0.4), transparent 70%)' }} />
      <div style={{ position: 'absolute', bottom: -40, left: -40, width: 170, height: 170, background: 'radial-gradient(circle, rgba(0,229,255,0.3), transparent 70%)' }} />

      {/* Header asimetris */}
      <div className="flex justify-between items-center gap-2 min-w-0" style={{ position: 'relative' }}>
        <div
          className="text-left flex-1 whitespace-nowrap overflow-hidden text-ellipsis text-[10px]"
          style={{ color: '#00e5ff', fontWeight: 800, letterSpacing: '0.2em', textShadow: '0 0 8px #00e5ff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}
        >
          TAXQUEST • PLAYER CARD
        </div>
        <div
          className="whitespace-nowrap flex-shrink-0 shrink-0"
          style={{ background: 'rgba(0,229,255,0.12)', border: '1px solid #00e5ff', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 999, boxShadow: '0 0 12px rgba(0,229,255,0.5)', backdropFilter: 'blur(8px)', maxWidth: '60%', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          ◆ {rankTitle}
        </div>
      </div>

      {/* Body asimetris: avatar kiri, nama kanan */}
      <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 16, position: 'relative' }}>
        <div
          className="flex items-center justify-center flex-shrink-0"
          style={{ width: 84, height: 84, borderRadius: 18, transform: 'rotate(-6deg)', background: 'rgba(255,255,255,0.06)', border: '1.5px solid #b24bf3', boxShadow: '0 0 18px rgba(178,75,243,0.7)', backdropFilter: 'blur(10px)', fontSize: 44 }}
        >
          {avatar}
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <h3
            className="whitespace-nowrap overflow-hidden text-ellipsis"
            style={{ color: '#fff', fontSize: 24, fontWeight: 900, background: 'linear-gradient(90deg, #00e5ff, #b24bf3)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {name}
          </h3>
          <div className="whitespace-nowrap overflow-hidden text-ellipsis" style={{ color: '#9be9ff', fontSize: 11, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {rank !== '—' ? `RANK #${rank} // ${frameLabel}` : `// ${frameLabel} MODE`} • LV {level}
          </div>
          <div style={{ marginTop: 6, height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ width: `${Math.min(100, (heroXP % 1000) / 10)}%`, height: '100%', background: 'linear-gradient(90deg, #00e5ff, #b24bf3)', boxShadow: '0 0 10px #00e5ff' }} />
          </div>
        </div>
      </div>

      {/* Stat glass asimetris */}
      <div className="grid grid-cols-3 gap-2" style={{ marginTop: 14, position: 'relative' }}>
        {[
          ['LVL', level, '#00e5ff'],
          ['XP', heroXP, '#b24bf3'],
          ['NFT-BDG', badgesCount, '#4bfff3'],
        ].map(([l, v, c], i) => (
          <div
            key={l}
            className="text-center"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid ${c}66`,
              borderRadius: i === 1 ? 4 : 14,
              padding: '10px 2px',
              backdropFilter: 'blur(10px)',
              transform: i === 1 ? 'translateY(-4px)' : 'none',
              boxShadow: `0 0 14px ${c}44`,
              marginTop: i === 0 ? 6 : 0,
            }}
          >
            <div className="whitespace-nowrap overflow-hidden text-ellipsis" style={{ color: '#9be9ff', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l}</div>
            <div style={{ color: c, fontSize: 20, fontWeight: 900, textShadow: `0 0 10px ${c}` }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Quote terminal */}
      <div style={{ marginTop: 12, background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(0,229,255,0.35)', borderRadius: 10, padding: '10px 12px', backdropFilter: 'blur(10px)', position: 'relative' }}>
        <p className="whitespace-nowrap overflow-hidden text-ellipsis" style={{ color: '#4bfff3', fontSize: 12, fontFamily: 'monospace', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {'>'} {isSelf ? quote || 'ape_in --tax 100%' : `best_score = ${best}`}
          <span style={{ animation: 'blink 1s infinite' }}>_</span>
        </p>
      </div>
      <div className="whitespace-nowrap overflow-hidden text-ellipsis" style={{ marginTop: 10, color: '#5b6b8c', fontSize: 10, textAlign: 'right', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', position: 'relative' }}>
        DEGEN // taxquest.vercel.app ⬢
      </div>
    </div>
  )
}
