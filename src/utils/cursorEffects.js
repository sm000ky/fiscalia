/**
 * Cute cursor trail effects untuk TaxQuest 🌸✨
 */

class ParticleTrail {
  constructor() {
    this.particles = []
    this.emojis = ['🌸', '✨', '💕', '🌺', '💖', '⭐', '🎀', '💫']
    this.canvas = null
    this.ctx = null
    this.enabled = true
    this.init()
  }

  init() {
    if (typeof window === 'undefined') return
    
    this.canvas = document.createElement('canvas')
    this.canvas.style.position = 'fixed'
    this.canvas.style.top = '0'
    this.canvas.style.left = '0'
    this.canvas.style.width = '100vw'
    this.canvas.style.height = '100vh'
    this.canvas.style.pointerEvents = 'none'
    this.canvas.style.zIndex = '9999'
    document.body.appendChild(this.canvas)
    
    this.ctx = this.canvas.getContext('2d')
    this.resize()
    
    window.addEventListener('resize', () => this.resize())
    window.addEventListener('mousemove', (e) => this.addParticle(e.clientX, e.clientY))
    window.addEventListener('touchmove', (e) => {
      if (e.touches[0]) {
        this.addParticle(e.touches[0].clientX, e.touches[0].clientY)
      }
    })
    
    this.animate()
  }

  resize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  addParticle(x, y) {
    if (!this.enabled || Math.random() > 0.3) return // 30% spawn rate
    
    const emoji = this.emojis[Math.floor(Math.random() * this.emojis.length)]
    this.particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 2,
      vy: -1 - Math.random() * 2,
      life: 1,
      emoji,
      size: 12 + Math.random() * 8,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.1,
    })
  }

  animate() {
    if (!this.ctx) return
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    
    this.particles = this.particles.filter((p) => {
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.1 // gravity
      p.life -= 0.015
      p.rotation += p.rotationSpeed
      
      if (p.life <= 0) return false
      
      this.ctx.save()
      this.ctx.globalAlpha = p.life
      this.ctx.font = `${p.size}px Arial`
      this.ctx.translate(p.x, p.y)
      this.ctx.rotate(p.rotation)
      this.ctx.fillText(p.emoji, 0, 0)
      this.ctx.restore()
      
      return true
    })
    
    requestAnimationFrame(() => this.animate())
  }

  toggle(enabled) {
    this.enabled = enabled
  }

  destroy() {
    if (this.canvas) {
      this.canvas.remove()
    }
  }
}

let trail = null

export function initCursorTrail() {
  if (!trail) {
    trail = new ParticleTrail()
  }
  return trail
}

export function toggleCursorTrail(enabled) {
  if (trail) {
    trail.toggle(enabled)
  }
}

export function destroyCursorTrail() {
  if (trail) {
    trail.destroy()
    trail = null
  }
}
