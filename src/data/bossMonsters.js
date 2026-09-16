/**
 * Boss Monster Collection untuk TaxQuest 🎮👾
 * Setiap boss punya karakteristik unik bertema pajak
 */

export const bossMonsters = [
  {
    id: 'pph21_dragon',
    name: 'PPh 21 Dragon',
    emoji: '🐉',
    color: '#ff6ba8',
    hp: 100,
    description: 'Naga penjaga penghasilan karyawan',
    attacks: ['Potong Gaji', 'TER Blast', 'PTKP Shield'],
    weakness: 'Tunjangan Tidak Kena Pajak',
    reward: {
      badge: 'dragon_slayer',
      xp: 150,
      title: 'Pemburu Naga PPh'
    }
  },
  {
    id: 'ppn_octopus',
    name: 'PPN Octopus',
    emoji: '🐙',
    color: '#a770ff',
    hp: 100,
    description: 'Gurita 11% yang mencengkeram semua transaksi',
    attacks: ['Faktur Pajak Spray', 'Tentacle Wrap', '11% Crush'],
    weakness: 'Barang Tidak Kena PPN',
    reward: {
      badge: 'octopus_master',
      xp: 150,
      title: 'Master PPN'
    }
  },
  {
    id: 'fiscal_phoenix',
    name: 'Fiscal Phoenix',
    emoji: '🔥',
    color: '#ffb347',
    hp: 100,
    description: 'Burung api rekonsiliasi fiskal',
    attacks: ['Koreksi Positif', 'Beda Tetap Flame', 'Beda Waktu Storm'],
    weakness: 'Pembukuan Rapi',
    reward: {
      badge: 'phoenix_tamer',
      xp: 150,
      title: 'Ahli Rekonsiliasi'
    }
  },
  {
    id: 'tax_golem',
    name: 'Tax Golem',
    emoji: '🗿',
    color: '#7ac7f5',
    hp: 100,
    description: 'Raksasa batu pemungut pajak',
    attacks: ['Stone Crush', 'Tax Audit', 'Penalty Slam'],
    weakness: 'Pelaporan Tepat Waktu',
    reward: {
      badge: 'golem_crusher',
      xp: 150,
      title: 'Penunduk Golem'
    }
  },
  {
    id: 'pkp_wizard',
    name: 'PKP Wizard',
    emoji: '🧙‍♂️',
    color: '#4ade9f',
    hp: 100,
    description: 'Penyihir Pengusaha Kena Pajak',
    attacks: ['Magic Invoice', 'DPP Spell', 'Faktur Illusion'],
    weakness: 'NPWP Valid',
    reward: {
      badge: 'wizard_vanquisher',
      xp: 150,
      title: 'Penakluk Wizard'
    }
  }
]

export function getRandomBoss() {
  return bossMonsters[Math.floor(Math.random() * bossMonsters.length)]
}

export function getBossById(id) {
  return bossMonsters.find(b => b.id === id)
}
