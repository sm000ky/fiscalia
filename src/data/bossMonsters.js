/**
 * Boss Monster Collection untuk TaxQuest 🎮👾
 * Setiap boss punya karakteristik unik bertema pajak.
 * Stage 1-3: monster reguler acak • Stage Boss: Raja Tunggakan Pajak.
 */

export const bossMonsters = [
  {
    id: 'slime_ppn',
    name: 'Slime PPN 11%',
    emoji: '🧪',
    color: '#4ade9f',
    hp: 100,
    stage: 'reguler',
    description: 'Slime kenyal pemungut PPN 11% di setiap transaksi',
    attacks: ['Faktur Pajak Spray', 'Lendir 11%', 'DPP Slime Crush'],
    weakness: 'Faktur Pajak',
    reward: {
      badge: 'slime_master',
      xp: 100,
      title: 'Master PPN'
    }
  },
  {
    id: 'naga_denda',
    name: 'Naga Denda Daluwarsa',
    emoji: '🐉',
    color: '#ff6ba8',
    hp: 100,
    stage: 'reguler',
    description: 'Naga penjaga denda & daluwarsa penagihan pajak',
    attacks: ['Denda Blast', 'Napas Daluwarsa', 'Cakar Sanksi'],
    weakness: 'Tax Amnesty',
    reward: {
      badge: 'dragon_slayer',
      xp: 120,
      title: 'Pemburu Naga PPh'
    }
  },
  {
    id: 'phantom_audit',
    name: 'Phantom Tax Audit',
    emoji: '👻',
    color: '#a770ff',
    hp: 100,
    stage: 'reguler',
    description: 'Hantu audit yang gentayangan cari salah saji',
    attacks: ['SP2D Haunt', 'Koreksi Seram', 'Jurnal Hantu'],
    weakness: 'Pembukuan Rapi',
    reward: {
      badge: 'phantom_tamer',
      xp: 120,
      title: 'Penakluk Audit'
    }
  },
  {
    id: 'raja_tunggakan',
    name: 'Raja Tunggakan Pajak',
    emoji: '👹',
    color: '#e63980',
    hp: 120,
    stage: 'boss',
    description: 'Raja iblis tunggakan — Boss Level pamungkas!',
    attacks: ['Tunggakan Slam', 'Bunga Iblis 2%', 'Sita Mahkota'],
    weakness: 'Pelunasan + Surat Setoran Pajak',
    reward: {
      badge: 'tunggakan_crusher',
      xp: 200,
      title: 'Penakluk Raja Tunggakan'
    }
  },
]

export function getRandomBoss() {
  return bossMonsters[Math.floor(Math.random() * bossMonsters.length)]
}

/** Monster reguler acak untuk stage kuis (tanpa boss final). */
export function getRandomStageMonster() {
  const pool = bossMonsters.filter((b) => b.stage !== 'boss')
  return pool[Math.floor(Math.random() * pool.length)]
}

/** Boss pamungkas untuk stage akhir. */
export function getFinalBoss() {
  return bossMonsters.find((b) => b.stage === 'boss') || bossMonsters[bossMonsters.length - 1]
}

/**
 * Pilih monster sesuai stage kuis: stage awal = reguler acak,
 * stage akhir (soal >= 8 dari 10) = boss final.
 */
export function getMonsterForStage(questionIndex = 0, totalQuestions = 10) {
  if (questionIndex >= totalQuestions - 3) return getFinalBoss()
  return getRandomStageMonster()
}

export function getBossById(id) {
  return bossMonsters.find(b => b.id === id)
}
