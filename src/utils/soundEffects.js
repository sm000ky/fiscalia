/**
 * Retro 8-Bit Sound Effects Generator
 * Pure Web Audio API - No external files needed
 */

let audioContext = null

// Initialize AudioContext
function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioContext
}

/**
 * Play correct answer sound (chiptune coin/high-pitch synth)
 */
export function playCorrectSound() {
  try {
    const ctx = getAudioContext()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    // High-pitch coin sound
    oscillator.frequency.setValueAtTime(800, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1)
    
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)
    
    oscillator.type = 'square'
    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.15)
  } catch (e) {
    console.warn('Sound not available:', e)
  }
}

/**
 * Play wrong answer sound (bass explosion/low-pitch error)
 */
export function playWrongSound() {
  try {
    const ctx = getAudioContext()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    // Low-pitch explosion
    oscillator.frequency.setValueAtTime(200, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.3)
    
    gainNode.gain.setValueAtTime(0.4, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)
    
    oscillator.type = 'sawtooth'
    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.3)
  } catch (e) {
    console.warn('Sound not available:', e)
  }
}

/**
 * Play button click sound (retro blip)
 */
export function playClickSound() {
  try {
    const ctx = getAudioContext()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    // Short blip
    oscillator.frequency.setValueAtTime(600, ctx.currentTime)
    
    gainNode.gain.setValueAtTime(0.2, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05)
    
    oscillator.type = 'square'
    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.05)
  } catch (e) {
    console.warn('Sound not available:', e)
  }
}

/**
 * Play combo streak sound (power-up)
 */
export function playComboSound() {
  try {
    const ctx = getAudioContext()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    // Rising power-up
    oscillator.frequency.setValueAtTime(400, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(1600, ctx.currentTime + 0.2)
    
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25)
    
    oscillator.type = 'triangle'
    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.25)
  } catch (e) {
    console.warn('Sound not available:', e)
  }
}

/**
 * Play level up sound (victory fanfare)
 */
export function playLevelUpSound() {
  try {
    const ctx = getAudioContext()
    
    // Play sequence of notes
    const notes = [523, 659, 784, 1047] // C, E, G, C (octave up)
    notes.forEach((freq, i) => {
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)
      
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.15)
      gainNode.gain.setValueAtTime(0.25, ctx.currentTime + i * 0.15)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.15 + 0.15)
      
      oscillator.type = 'square'
      oscillator.start(ctx.currentTime + i * 0.15)
      oscillator.stop(ctx.currentTime + i * 0.15 + 0.15)
    })
  } catch (e) {
    console.warn('Sound not available:', e)
  }
}
