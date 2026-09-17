import { useRef, useState } from 'react'
import { X, Camera, Check, Dices } from 'lucide-react'
import { AVATARS, getLevelFrame, getRandomTaxQuote, getRpgTitle } from '../data/gameModes'
import { getUserProfile } from '../utils/greetingStorage'
import { getPlayerAvatar, savePlayerAvatar, getPlayerRank } from '../utils/leaderboardApi'

/* Gacha Trading Card palettes — locked hex themes */
export const CARD_PALETTES = [
  {
    id: 'obsidian_cyan',
    name: 'Obsidian Cyan',
    bg: 'linear-gradient(135deg, #0b141f 0%, #12303f 55%, #0e4a5f 100%)',
    bgGradient: 'linear-gradient(135deg, #0b141f 0%, #12303f 55%, #0e4a5f 100%)',
    borderColor: '#00e5ff',
    accent: '#00e5ff',
    accentHex: '#00e5ff',
    glowColor: 'rgba(0,229,255,0.65)',
    glowHex: 'rgba(0,229,255,0.65)',
    glow: '0 0 18px rgba(0,229,255,0.65), 0 0 46px rgba(0,229,255,0.28)',
  },
  {
    id: 'cyber_sakura',
    name: 'Cyber Sakura',
    bg: 'linear-gradient(135deg, #1c0b2b 0%, #4c1d95 55%, #9d2c6b 100%)',
    bgGradient: 'linear-gradient(135deg, #1c0b2b 0%, #4c1d95 55%, #9d2c6b 100%)',
    borderColor: '#ff7ac0',
    accent: '#ff7ac0',
    accentHex: '#ff7ac0',
    glowColor: 'rgba(255,122,192,0.65)',
    glowHex: 'rgba(255,122,192,0.65)',
    glow: '0 0 18px rgba(255,122,192,0.65), 0 0 46px rgba(167,110,255,0.30)',
  },
  {
    id: 'golden_dirjen',
    name: 'Golden Dirjen',
    bg: 'linear-gradient(135deg, #191104 0%, #5c430c 55%, #a97e12 100%)',
    bgGradient: 'linear-gradient(135deg, #191104 0%, #5c430c 55%, #a97e12 100%)',
    borderColor: '#ffd75e',
    accent: '#ffd75e',
    accentHex: '#ffd75e',
    glowColor: 'rgba(255,215,94,0.65)',
    glowHex: 'rgba(255,215,94,0.65)',
    glow: '0 0 18px rgba(255,215,94,0.65), 0 0 46px rgba(255,180,40,0.30)',
  },
  {
    id: 'void_mint',
    name: 'Void Mint',
    bg: 'linear-gradient(135deg, #031712 0%, #0b4a3e 55%, #0f766e 100%)',
    bgGradient: 'linear-gradient(135deg, #031712 0%, #0b4a3e 55%, #0f766e 100%)',
    borderColor: '#5ef2c4',
    accent: '#5ef2c4',
    accentHex: '#5ef2c4',
    glowColor: 'rgba(94,242,196,0.6)',
    glowHex: 'rgba(94,242,196,0.6)',
    glow: '0 0 18px rgba(94,242,196,0.6), 0 0 46px rgba(45,212,168,0.30)',
  },
]

function readPalette() {
  try {
    const id = localStorage.getItem('taxquest_card_palette')
    return CARD_PALETTES.find((p) => p.id === id) || CARD_PALETTES[2]
  } catch {
    return CARD_PALETTES[2]
  }
}

function playGachaSound() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    const ctx = new Ctx()
    const notes = [523.25, 659.25, 783.99, 1046.5]
    notes.forEach((f, i) => {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = 'triangle'
      o.frequency.value = f
      g.gain.value = 0.12
      o.connect(g)
      g.connect(ctx.destination)
      o.start(ctx.currentTime + i * 0.07)
      o.stop(ctx.currentTime + i * 0.07 + 0.12)
    })
    setTimeout(() => ctx.close(), 600)
  } catch { /* abaikan */ }
}

function readHeroXP() {
  try {
    return Number(localStorage.getItem('taxquest_hero_xp')) || 850
  } catch {
    return 850
  }
}

function readBadges() {
  try {
    return JSON.parse(localStorage.getItem('taxquest_achievements')) || []
  } catch {
    return []
  }
}

function readBest() {
  try {
    const s = JSON.parse(localStorage.getItem('taxquest_stats')) || {}
    return Number(s.high_score) || 0
  } catch {
    return 0
  }
}

export default function PlayerCardModal({ isOpen, onClose, player }) {
  const cardRef = useRef(null)
  const [avatar, setAvatar] = useState(() => (player?.avatar ? player.avatar : getPlayerAvatar()))
  const [quote] = useState(() => getRandomTaxQuote())
  const [saved, setSaved] = useState(false)
  const [palette, setPalette] = useState(() => readPalette())
  const [rolling, setRolling] = useState(false)

  if (!isOpen) return null

  const profile = (() => {
    try {
      return getUserProfile()
    } catch {
      return { name: 'WajibPajak#69' }
    }
  })()
  const name = player?.name || profile.name || 'WajibPajak#69'
  const isSelf = !player || player.name === profile.name
  const heroXP = isSelf ? readHeroXP() : Number(player.score) || 0
  const level = Math.max(1, Math.floor(heroXP / 1000) + 1)
  const rankInfo = player?.rank
    ? { rank: player.rank, title: player.title || getRpgTitle(player.rank) }
    : getPlayerRank(name, player?.mode || 'quiz') || { rank: '—', title: getRpgTitle(999) }
  const frame = getLevelFrame(level)
  const badges = isSelf ? readBadges() : player?.badges || []
  const best = isSelf ? readBest() : Number(player?.score) || 0
  const currentPalette = palette

  const pickAvatar = (e) => {
    setAvatar(e)
    if (isSelf) {
      savePlayerAvatar(e)
      try {
        window.dispatchEvent(new CustomEvent('taxquest:avatar', { detail: { avatar: e } }))
      } catch { /* abaikan */ }
    }
  }

  const gachaPalette = () => {
    if (rolling) return
    setRolling(true)
    playGachaSound()
    let ticks = 0
    const iv = setInterval(() => {
      setPalette(CARD_PALETTES[Math.floor(Math.random() * CARD_PALETTES.length)])
      ticks += 1
      if (ticks >= 8) {
        clearInterval(iv)
        const final = CARD_PALETTES[Math.floor(Math.random() * CARD_PALETTES.length)]
        setPalette(final)
        try { localStorage.setItem('taxquest_card_palette', final.id) } catch { /* abaikan */ }
        setRolling(false)
      }
    }, 90)
  }

  const downloadCard = async () => {
    try {
      window.scrollTo(0, 0)
      await document.fonts.ready;
      const { toPng } = await import('html-to-image')
      const el = cardRef.current
      if (!el) return
      const dataUrl = await toPng(el, {
        cacheBust: true,
        pixelRatio: 3,
        style: { margin: '0' },
      })
      const a = document.createElement('a')
      a.href = dataUrl
      a.download = `taxquest-card-${name.replace(/[^a-zA-Z0-9_-]+/g, '_')}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      console.error('Export card gagal:', err)
      alert('Yah, export gambar gagal — coba lagi ya Darling 💕')
    }
  }

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm pop-in"
      onClick={onClose}
    >
      <div className="max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
        {/* ===== CARD UTAMA — target langsung export, tanpa box hitam luar ===== */}
        <div
          ref={cardRef}
          className={`rounded-3xl p-5 text-center w-[360px] ${rolling ? 'animate-pulse' : ''}`}
          style={{ width: 360, flexShrink: 0, background: currentPalette.bgGradient, border: '2px solid ' + currentPalette.borderColor, boxShadow: '0 0 40px ' + currentPalette.glowColor }}
        >
          {/* Header row: kiri title, kanan rank badge */}
          <div className="flex justify-between items-center gap-2 min-w-0" style={{ minWidth: 0 }}>
            <div className="text-left text-white flex-1 whitespace-nowrap overflow-hidden text-ellipsis text-[10px]" style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', opacity: 0.75, textShadow: '0 1px 6px rgba(0,0,0,0.8)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>
              TAXQUEST • PLAYER CARD
            </div>
            <div
              className="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold whitespace-nowrap flex-shrink-0 shrink-0"
              style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${currentPalette.accent}88`, color: '#ffffff', textShadow: '0 1px 6px rgba(0,0,0,0.9)', maxWidth: '60%', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              <span>👑</span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{rankInfo.title}</span>
            </div>
          </div>

          {/* Avatar */}
          <div
            className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-5xl"
            style={{ marginTop: 16, background: 'rgba(0,0,0,0.45)', border: `3px solid ${currentPalette.accent}`, boxShadow: currentPalette.glow }}
          >
            {avatar}
          </div>

          {/* Nickname */}
          <h3
            className="font-cute text-2xl font-extrabold break-words"
            style={{ marginTop: 12, paddingBottom: 4, color: '#ffffff', textShadow: '0 2px 8px rgba(0,0,0,0.9)', lineHeight: 1.4, overflowWrap: 'anywhere', wordBreak: 'break-word', paddingLeft: 8, paddingRight: 8 }}
          >
            {name}
          </h3>
          {rankInfo.rank !== '—' && (
            <div className="text-[11px] text-white/80" style={{ marginTop: 2, textShadow: '0 1px 6px rgba(0,0,0,0.9)' }}>
              Peringkat #{rankInfo.rank} • Frame: {frame.label}
            </div>
          )}

          {/* Stat grid */}
          <div className="grid grid-cols-3 gap-2" style={{ marginTop: 14 }}>
            {[
              ['⭐ Level', level],
              ['⚡ Total XP', heroXP],
              ['🏅 Badges', Array.isArray(badges) ? badges.length : badges],
            ].map(([l, v]) => (
              <div
                key={l}
                className="text-center"
                style={{ minHeight: 78, padding: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.45)', border: '1.5px solid rgba(255,255,255,0.18)', borderRadius: 20 }}
              >
                <div className="text-[11px] text-white/75">{l}</div>
                <div className="font-cute text-lg font-extrabold" style={{ color: currentPalette.accentHex, textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>
                  {v}
                </div>
              </div>
            ))}
          </div>

          {/* Quote box — selebar stat grid */}
          <div className="rounded-2xl w-full" style={{ marginTop: 12, padding: '10px 16px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.2)', overflow: 'hidden' }}>
            <p className="text-xs text-white font-semibold" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.9)', overflowWrap: 'break-word', wordBreak: 'break-word', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              💌 {isSelf ? quote : `Skor terbaik: ${best} poin`}
            </p>
          </div>
          <div className="text-[10px] text-white/70 mt-3" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.9)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {currentPalette.name} • taxquest.vercel.app 💗
          </div>
        </div>

        {/* Avatar picker (hanya untuk kartu sendiri) */}
        {isSelf && (
          <div className="bg-white/90 backdrop-blur rounded-2xl p-3 mt-3 flex items-center justify-center gap-2">
            {AVATARS.map((e) => (
              <button
                key={e}
                onClick={() => pickAvatar(e)}
                className={`w-11 h-11 rounded-full text-2xl flex items-center justify-center transition-all hover:scale-110 ${
                  avatar === e ? 'bg-[#ffe3ec] ring-2 ring-[#ff6ba8]' : 'bg-[#f6f0ff]'
                }`}
                title={`Avatar ${e}`}
              >
                {e}
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-2 mt-3">
          <button
            onClick={gachaPalette}
            className="cute-btn bg-white text-[#7c5fc9] border-2 border-purple-200 px-4 py-3 text-sm flex items-center justify-center gap-2 flex-1"
            title="Kocok tema kartu"
          >
            <Dices size={16} />
            {rolling ? 'Mengocok...' : '🎲 Gacha Frame Color'}
          </button>
        </div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={downloadCard}
            className="cute-btn cute-btn-pink flex-1 px-4 py-3 text-sm flex items-center justify-center gap-2"
          >
            {saved ? <Check size={16} /> : <Camera size={16} />}
            {saved ? 'Tersimpan! 📸✨' : '📸 Download / Share Card'}
          </button>
          <button
            onClick={onClose}
            className="cute-btn bg-white text-[#a08bb0] border-2 border-pink-100 px-4 py-3 text-sm flex items-center justify-center"
            aria-label="Tutup"
          >
            <X size={16} />
          </button>
        </div>

      </div>
    </div>
  )
}
