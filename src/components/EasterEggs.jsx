import { useState, useEffect } from 'react'
import { celebrateAchievement } from '../utils/confetti'

/**
 * Hidden Easter Eggs untuk TaxQuest 🥚✨
 * - Klik emoji tertentu = surprise
 * - Konami code = secret mode
 * - Triple click logo = rainbow mode
 */
export default function EasterEggs() {
  const [konamiProgress, setKonamiProgress] = useState(0)
  const [secretUnlocked, setSecretUnlocked] = useState(false)
  const [showSecret, setShowSecret] = useState(false)

  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === konamiCode[konamiProgress]) {
        const next = konamiProgress + 1
        setKonamiProgress(next)
        
        if (next === konamiCode.length) {
          unlockSecret()
          setKonamiProgress(0)
        }
      } else {
        setKonamiProgress(0)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [konamiProgress])

  const unlockSecret = () => {
    if (secretUnlocked) return
    setSecretUnlocked(true)
    setShowSecret(true)
    celebrateAchievement()
    
    // Easter egg message
    const msg = document.createElement('div')
    msg.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      background: linear-gradient(135deg, #ff6ba8, #a770ff);
      color: white;
      padding: 2rem 3rem;
      border-radius: 2rem;
      font-family: 'Baloo 2', sans-serif;
      font-size: 1.5rem;
      font-weight: 700;
      z-index: 99999;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3), 0 0 40px rgba(255,107,168,0.5);
      animation: secretPop 0.5s ease forwards;
      text-align: center;
    `
    msg.innerHTML = `
      <div style="font-size: 3rem; margin-bottom: 0.5rem;">🎉🌈✨</div>
      <div>SECRET UNLOCKED!</div>
      <div style="font-size: 1rem; margin-top: 0.5rem; opacity: 0.9;">Kamu nemu Konami Code! 🎮</div>
      <div style="font-size: 0.9rem; margin-top: 1rem; opacity: 0.8;">Rainbow mode activated! 🌈</div>
    `
    
    const style = document.createElement('style')
    style.textContent = `
      @keyframes secretPop {
        0% { transform: translate(-50%, -50%) scale(0) rotate(-10deg); opacity: 0; }
        60% { transform: translate(-50%, -50%) scale(1.1) rotate(5deg); }
        100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 1; }
      }
      @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
      }
      .rainbow-mode * {
        animation: rainbow 3s linear infinite !important;
      }
    `
    
    document.head.appendChild(style)
    document.body.appendChild(msg)
    
    // Enable rainbow mode
    document.body.classList.add('rainbow-mode')
    
    setTimeout(() => {
      msg.style.animation = 'secretPop 0.5s ease reverse'
      setTimeout(() => msg.remove(), 500)
      setShowSecret(false)
    }, 4000)
  }

  return null
}

/**
 * Clickable emoji Easter egg
 */
export function EmojiEasterEgg({ emoji, onClick, className = '' }) {
  const [clicks, setClicks] = useState(0)
  const [lastClick, setLastClick] = useState(0)

  const handleClick = () => {
    const now = Date.now()
    
    // Reset if more than 2s between clicks
    if (now - lastClick > 2000) {
      setClicks(1)
    } else {
      setClicks(clicks + 1)
    }
    
    setLastClick(now)
    
    // Triple click = easter egg
    if (clicks + 1 >= 3) {
      onClick?.()
      setClicks(0)
      
      // Spawn random fun emojis
      const funEmojis = ['🎉', '✨', '🌈', '💫', '🎊', '🌟', '💖', '🎀']
      for (let i = 0; i < 12; i++) {
        setTimeout(() => {
          const span = document.createElement('span')
          span.textContent = funEmojis[Math.floor(Math.random() * funEmojis.length)]
          span.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            font-size: ${20 + Math.random() * 30}px;
            pointer-events: none;
            z-index: 9999;
            animation: emojiFloat 2s ease-out forwards;
          `
          document.body.appendChild(span)
          setTimeout(() => span.remove(), 2000)
        }, i * 100)
      }
      
      // Add animation style if not exists
      if (!document.getElementById('emoji-float-style')) {
        const style = document.createElement('style')
        style.id = 'emoji-float-style'
        style.textContent = `
          @keyframes emojiFloat {
            0% { transform: translateY(0) scale(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(-200px) scale(1.5) rotate(360deg); opacity: 0; }
          }
        `
        document.head.appendChild(style)
      }
    }
  }

  return (
    <span 
      onClick={handleClick}
      className={`cursor-pointer select-none transition-transform hover:scale-110 active:scale-95 ${className}`}
      title="Klik 3x cepat! 👀"
    >
      {emoji}
    </span>
  )
}
