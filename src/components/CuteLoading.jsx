import { useEffect, useState } from 'react'
import { getRandomMessage } from '../utils/messages'

/**
 * Cute loading screen dengan animasi lucu 🌸
 */
export default function CuteLoading({ message, fullscreen = false }) {
  const [dots, setDots] = useState('')
  const [loadingMsg, setLoadingMsg] = useState(message || getRandomMessage('loading'))
  const [bounce, setBounce] = useState(0)

  useEffect(() => {
    // Animated dots
    const dotInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 400)

    // Bounce animation counter
    const bounceInterval = setInterval(() => {
      setBounce(prev => (prev + 1) % 3)
    }, 300)

    // Change message every 3s
    const msgInterval = setInterval(() => {
      setLoadingMsg(message || getRandomMessage('loading'))
    }, 3000)

    return () => {
      clearInterval(dotInterval)
      clearInterval(bounceInterval)
      clearInterval(msgInterval)
    }
  }, [message])

  const emojis = ['🌸', '🌺', '🌷']

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center cute-bg">
        <div className="cute-card p-8 text-center max-w-sm mx-4">
          <div className="flex justify-center gap-4 mb-6">
            {emojis.map((emoji, i) => (
              <span
                key={i}
                className="text-5xl transition-transform duration-300"
                style={{
                  transform: bounce === i ? 'translateY(-20px) scale(1.2)' : 'translateY(0) scale(1)',
                  display: 'inline-block',
                }}
              >
                {emoji}
              </span>
            ))}
          </div>
          <p className="font-cute text-lg text-[#e63980] dark:text-[#ff8cc7] font-bold">
            {loadingMsg}{dots}
          </p>
          <div className="mt-6 flex justify-center gap-2">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-gradient-to-br from-[#ff6ba8] to-[#a770ff]"
                style={{
                  animation: `loadingDot 1.4s ease-in-out ${i * 0.16}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="flex justify-center gap-3 mb-4">
        {emojis.map((emoji, i) => (
          <span
            key={i}
            className="text-4xl transition-transform duration-300"
            style={{
              transform: bounce === i ? 'translateY(-15px) scale(1.15)' : 'translateY(0) scale(1)',
              display: 'inline-block',
            }}
          >
            {emoji}
          </span>
        ))}
      </div>
      <p className="font-cute text-base text-[#e63980] dark:text-[#ff8cc7] font-bold">
        {loadingMsg}{dots}
      </p>
    </div>
  )
}

/**
 * Inline cute spinner (kecil)
 */
export function CuteSpinner({ size = 'md', className = '' }) {
  const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }[size]

  return (
    <div className={`relative ${sizeClass} ${className}`}>
      <div 
        className="absolute inset-0 rounded-full border-2 border-[#ff6ba8]/30 dark:border-[#ff8cc7]/30"
      />
      <div 
        className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#ff6ba8] dark:border-t-[#ff8cc7]"
        style={{
          animation: 'spin 0.8s linear infinite',
        }}
      />
    </div>
  )
}

// Add loading animation styles
if (typeof document !== 'undefined' && !document.getElementById('cute-loading-styles')) {
  const style = document.createElement('style')
  style.id = 'cute-loading-styles'
  style.textContent = `
    @keyframes loadingDot {
      0%, 80%, 100% {
        transform: scale(0.8);
        opacity: 0.5;
      }
      40% {
        transform: scale(1.2);
        opacity: 1;
      }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `
  document.head.appendChild(style)
}
