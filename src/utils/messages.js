/**
 * Random encouraging messages untuk TaxQuest 💕
 */

export const encouragingMessages = {
  correct: [
    'Keren banget Darling! 🌸',
    'Mantap! Kamu pinter! 💖',
    'Betul! Lanjut terus! ✨',
    'Asyik! Satu lagi! 🌺',
    'Hebat! Top banget! 🏆',
    'Wah pintar! 💕',
    'Benar! Kamu jago! 🎀',
    'Yes! Pertahankan! 🌷',
    'Oke banget! 💫',
    'Sempurna Darling! 🌟',
  ],
  
  wrong: [
    'Gapapa Darling, coba lagi! 💕',
    'Hampir! Semangat! 🌸',
    'Belum tepat, tapi oke! 💖',
    'Salah sedikit aja kok! ✨',
    'Terus coba, pasti bisa! 🌺',
    'Jangan nyerah ya! 💫',
    'Ayo lagi, kamu bisa! 🎀',
    'Ups! Lanjut yuk! 🌷',
    'Belum pas, gas lagi! 💕',
    'Tetap semangat! 🌟',
  ],
  
  combo: [
    'Kombo mantap! 🔥',
    'Beruntun terus! ⚡',
    'Unstoppable! 💪',
    'On fire Darling! 🌟',
    'Lagi panas nih! 🔥',
    'Streak gila! ⚡',
    'Gak ada obat! 💫',
    'Legend! 🏆',
    'Gokil! 🎯',
    'Godlike! ✨',
  ],
  
  victory: {
    perfect: [
      'SEMPURNA! Kamu genius! 🌟💕',
      'PERFECT SCORE! Luar biasa! 🏆✨',
      'FLAWLESS! Gak ada lawan! 💯🎊',
      'AMAZING! Keren maksimal! 🌈💖',
    ],
    great: [
      'HEBAT! Skor tinggi banget! 🎉',
      'BAGUS BANGET! Jago deh! 🌸',
      'KEREN! Hasil ciamik! 💫',
      'TOP! Mantap Darling! 🌺',
    ],
    good: [
      'BAGUS! Terus berlatih! 💕',
      'OKE! Lanjut belajar! 🌷',
      'LUMAYAN! Semangat! ✨',
      'GAK BURUK! Keep going! 🌸',
    ],
    tryAgain: [
      'Cobain lagi yuk! 💖',
      'Ayo latihan lagi! 🌺',
      'Jangan nyerah! 💫',
      'Semangat Darling! 🌸',
    ],
  },
  
  loading: [
    'Menyiapkan soal manis... 🌸',
    'Monster lagi dandan dulu... 💄',
    'Bikin soal seru nih... ✨',
    'Tunggu bentar ya... 💕',
    'Loading... tapi tetep cute! 🎀',
    'Sebentar, lagi masak soal... 🍰',
  ],
}

/**
 * Ambil random message dari kategori
 */
export function getRandomMessage(category, subCategory = null) {
  const messages = subCategory 
    ? encouragingMessages[category]?.[subCategory]
    : encouragingMessages[category]
  
  if (!messages || !Array.isArray(messages)) return ''
  return messages[Math.floor(Math.random() * messages.length)]
}

/**
 * Pilih message victory berdasarkan score
 */
export function getVictoryMessage(score, totalQuestions) {
  const accuracy = (score / (totalQuestions * 100)) * 100
  
  if (accuracy === 100) {
    return getRandomMessage('victory', 'perfect')
  } else if (accuracy >= 80) {
    return getRandomMessage('victory', 'great')
  } else if (accuracy >= 60) {
    return getRandomMessage('victory', 'good')
  } else {
    return getRandomMessage('victory', 'tryAgain')
  }
}
