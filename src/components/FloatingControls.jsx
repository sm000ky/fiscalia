import { useState, useEffect } from 'react'
import { Volume2, VolumeX, Sparkles, Music, Wand2 } from 'lucide-react'

/**
 * Floating settings button dengan mini controls 🎮✨
 */
export default function FloatingControls() {
  const [isOpen, setIsOpen] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [cursorTrailEnabled, setCursorTrailEnabled] = useState(true)
  const [musicEnabled, setMusicEnabled] = useState(false)

  useEffect(() => {
    // Load saved preferences
    try {
      const saved = localStorage.getItem('taxquest_settings')
      if (saved) {
        const settings = JSON.parse(saved)
        setSoundEnabled(settings.sound ?? true)
        setCursorTrailEnabled(settings.cursorTrail ?? true)
        setMusicEnabled(settings.music ?? false)
      }
    } catch (e) {
      // ignore
    }
  }, [])

  const saveSettings = (key, value) => {
    try {
      const saved = localStorage.getItem('taxquest_settings')
      const settings = saved ? JSON.parse(saved) : {}
      settings[key] = value
      localStorage.setItem('taxquest_settings', JSON.stringify(settings))
    } catch (e) {
      // ignore
    }
  }

  const toggleSound = () => {
    const newValue = !soundEnabled
    setSoundEnabled(newValue)
    saveSettings('sound', newValue)
    window.dispatchEvent(new CustomEvent('taxquest:soundToggle', { detail: { enabled: newValue } }))
  }

  const toggleCursorTrail = () => {
    const newValue = !cursorTrailEnabled
    setCursorTrailEnabled(newValue)
    saveSettings('cursorTrail', newValue)
    window.dispatchEvent(new CustomEvent('taxquest:cursorTrailToggle', { detail: { enabled: newValue } }))
  }

  const toggleMusic = () => {
    const newValue = !musicEnabled
    setMusicEnabled(newValue)
    saveSettings('music', newValue)
    window.dispatchEvent(new CustomEvent('taxquest:musicToggle', { detail: { enabled: newValue } }))
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Control buttons - slide up when open */}
      <div 
        className={`transition-all duration-300 ease-out ${
          isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-3 mb-3">
          {/* Sound toggle */}
          <button
            onClick={toggleSound}
            className={`cute-btn cute-btn-pink w-12 h-12 flex items-center justify-center shadow-lg transition-all ${
              !soundEnabled ? 'opacity-50' : ''
            }`}
            title={soundEnabled ? 'Matikan suara' : 'Nyalakan suara'}
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>

          {/* Cursor trail toggle */}
          <button
            onClick={toggleCursorTrail}
            className={`cute-btn cute-btn-lav w-12 h-12 flex items-center justify-center shadow-lg transition-all ${
              !cursorTrailEnabled ? 'opacity-50' : ''
            }`}
            title={cursorTrailEnabled ? 'Matikan cursor trail' : 'Nyalakan cursor trail'}
          >
            <Sparkles size={20} />
          </button>

          {/* Music toggle */}
          <button
            onClick={toggleMusic}
            className={`cute-btn cute-btn-mint w-12 h-12 flex items-center justify-center shadow-lg transition-all ${
              !musicEnabled ? 'opacity-50' : ''
            }`}
            title={musicEnabled ? 'Matikan musik' : 'Nyalakan musik'}
          >
            <Music size={20} />
          </button>
        </div>
      </div>

      {/* Main toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cute-btn cute-btn-pink w-14 h-14 flex items-center justify-center shadow-2xl transition-all hover:rotate-12"
        title="Pengaturan"
      >
        <Wand2 
          size={24} 
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Floating particles around button */}
      {isOpen && (
        <>
          <span className="absolute -top-2 -left-2 text-2xl animate-pulse">✨</span>
          <span className="absolute -top-2 -right-2 text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>💫</span>
          <span className="absolute -bottom-2 -left-2 text-2xl animate-pulse" style={{ animationDelay: '1s' }}>🌸</span>
        </>
      )}
    </div>
  )
}

/**
 * Settings badge untuk header (alternatif compact)
 */
export function SettingsBadge() {
  const [soundEnabled, setSoundEnabled] = useState(true)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('taxquest_settings')
      if (saved) {
        const settings = JSON.parse(saved)
        setSoundEnabled(settings.sound ?? true)
      }
    } catch (e) {
      // ignore
    }

    const handleToggle = (e) => {
      setSoundEnabled(e.detail.enabled)
    }

    window.addEventListener('taxquest:soundToggle', handleToggle)
    return () => window.removeEventListener('taxquest:soundToggle', handleToggle)
  }, [])

  const toggleSound = () => {
    const newValue = !soundEnabled
    setSoundEnabled(newValue)
    try {
      const saved = localStorage.getItem('taxquest_settings')
      const settings = saved ? JSON.parse(saved) : {}
      settings.sound = newValue
      localStorage.setItem('taxquest_settings', JSON.stringify(settings))
    } catch (e) {
      // ignore
    }
    window.dispatchEvent(new CustomEvent('taxquest:soundToggle', { detail: { enabled: newValue } }))
  }

  return (
    <button
      onClick={toggleSound}
      className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-slate-700 dark:to-purple-900 flex items-center justify-center text-[#7c5fc9] dark:text-purple-300 transition-all hover:scale-105"
      title={soundEnabled ? 'Matikan suara' : 'Nyalakan suara'}
    >
      {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
    </button>
  )
}
