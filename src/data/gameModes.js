/**
 * gameModes.js — Registry modular mode permainan TaxQuest 🎮
 * Quiz Arena & Boss Battle aktif; mode baru tinggal tambah entri.
 */

export const GAME_MODES = [
  {
    id: 'quiz',
    name: 'Quiz Arena',
    emoji: '✨',
    desc: 'Jawab 10 soal pajak, kumpulkan poin + kombo!',
    active: true,
    unit: 'poin',
  },
  {
    id: 'boss',
    name: 'Boss Battle',
    emoji: '👾',
    desc: 'Kalahkan Monster Pajak & rebut bonus XP!',
    active: true,
    unit: 'XP',
  },
  // --- Slot extensible untuk mode masa depan ---
  {
    id: 'fiscal-race',
    name: 'Fiscal Race',
    emoji: '🏁',
    desc: 'Segera hadir — balapan rekonsiliasi fiskal!',
    active: false,
    comingSoon: true,
    unit: 'poin',
  },
  {
    id: 'audit-sprint',
    name: 'Audit Sprint',
    emoji: '🔍',
    desc: 'Segera hadir — temukan salah saji secepat kilat!',
    active: false,
    comingSoon: true,
    unit: 'poin',
  },
]

export function getGameMode(id) {
  return GAME_MODES.find((m) => m.id === id) || null
}

export function getActiveModes() {
  return GAME_MODES.filter((m) => m.active)
}

export function isModeActive(id) {
  return !!getGameMode(id)?.active
}

/**
 * Gelar RPG berdasarkan peringkat leaderboard.
 * Rank 1: 👑 Dirjen Pajak Bayangan
 * Rank 2-5: ⚔️ Auditor Senior Berbahaya
 * Rank 6-10: 📜 Ksatria Tax Planning
 * Rest: 🛡️ Wajib Pajak Taat
 */
export function getRpgTitle(rank) {
  const r = Number(rank) || 999
  if (r === 1) return '👑 Dirjen Pajak Bayangan'
  if (r >= 2 && r <= 5) return '⚔️ Auditor Senior Berbahaya'
  if (r >= 6 && r <= 10) return '📜 Ksatria Tax Planning'
  return '🛡️ Wajib Pajak Taat'
}

/** Frame glowing kartu profil sesuai Level Hero. */
export function getLevelFrame(level) {
  const lv = Number(level) || 1
  if (lv >= 8) {
    return {
      label: 'Mythic Gold',
      border: 'linear-gradient(135deg,#ffd700,#ff9d00,#fff3b0)',
      glow: '0 0 0 3px rgba(255,215,0,.55), 0 0 35px rgba(255,180,0,.55)',
    }
  }
  if (lv >= 5) {
    return {
      label: 'Epic Purple',
      border: 'linear-gradient(135deg,#b388ff,#7c5fc9,#e3d4ff)',
      glow: '0 0 0 3px rgba(167,112,255,.5), 0 0 30px rgba(124,95,201,.5)',
    }
  }
  if (lv >= 3) {
    return {
      label: 'Rare Sky',
      border: 'linear-gradient(135deg,#7ac7f5,#5eb3e6,#d6f0ff)',
      glow: '0 0 0 3px rgba(94,179,230,.5), 0 0 25px rgba(94,179,230,.45)',
    }
  }
  return {
    label: 'Cute Pink',
    border: 'linear-gradient(135deg,#ff7eb3,#ff9ec6,#ffd1e0)',
    glow: '0 0 0 3px rgba(255,107,168,.45), 0 0 22px rgba(255,107,168,.4)',
  }
}

export const AVATARS = ['🧙‍♂️', '🦁', '🐱', '🦊', '🕵️']

export const TAX_QUOTES = [
  'Debit di kiri, kredit di kanan, hidup tenang! 🌷',
  'PPh 21 TER? Gampang banget! 💕',
  'Koreksi fiskal itu cardio ✨',
  'Rencanakan pajak dengan manis, bukan ngemplang! 🍰',
  'Jurnal balance, hati ikut senang! 💖',
  'SPT tepat waktu, hidup bebas denda! 🎉',
  'NPWP itu diskon PPh 23 — 2% vs 4%! 🤑',
  'Satu kuis sehari bikin pintar pajak ✨',
]

export function getRandomTaxQuote() {
  return TAX_QUOTES[Math.floor(Math.random() * TAX_QUOTES.length)]
}
