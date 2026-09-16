/**
 * Confetti celebrations untuk TaxQuest 🎊
 * Menggunakan canvas-confetti library
 */

import confetti from 'canvas-confetti'

/**
 * Confetti kecil pas jawaban benar
 */
export function celebrateCorrect() {
  confetti({
    particleCount: 30,
    spread: 60,
    origin: { y: 0.6 },
    colors: ['#ff7eb3', '#b388ff', '#7fe3c3', '#ffc98b'],
    ticks: 100,
  })
}

/**
 * Confetti medium pas combo/streak
 */
export function celebrateCombo() {
  confetti({
    particleCount: 50,
    spread: 80,
    origin: { y: 0.55 },
    colors: ['#ff9ec6', '#c4a7ff', '#90f0d6', '#ffd6a5'],
    ticks: 150,
    startVelocity: 35,
  })
}

/**
 * Confetti besar pas quiz selesai dengan skor tinggi
 */
export function celebrateVictory() {
  const duration = 2500
  const end = Date.now() + duration

  const frame = () => {
    confetti({
      particleCount: 7,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#ff7eb3', '#b388ff', '#7fe3c3'],
    })
    confetti({
      particleCount: 7,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#ffc98b', '#8ecae6', '#ff9ec6'],
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  }
  frame()
}

/**
 * Confetti epic pas unlock achievement
 */
export function celebrateAchievement() {
  const count = 200
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#ff7eb3', '#b388ff', '#7fe3c3', '#ffc98b', '#8ecae6'],
  }

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    })
  }

  fire(0.25, { spread: 26, startVelocity: 55 })
  fire(0.2, { spread: 60 })
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 })
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
  fire(0.1, { spread: 120, startVelocity: 45 })
}

/**
 * Sparkle effect untuk button hover (subtle)
 */
export function sparkle(x, y) {
  confetti({
    particleCount: 5,
    spread: 30,
    origin: { x: x / window.innerWidth, y: y / window.innerHeight },
    colors: ['#ff9ec6', '#c4a7ff', '#90f0d6'],
    ticks: 50,
    gravity: 0.5,
    scalar: 0.6,
    startVelocity: 10,
  })
}
