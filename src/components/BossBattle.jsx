/**
 * Boss Battle Component - Monster unik bertema pajak 🎮👾
 */
import { useState, useEffect } from 'react'
import { Swords, Shield, Sparkles } from 'lucide-react'

export default function BossBattle({ boss, playerHP, onAttack, onDefend }) {
  const [bossShake, setBossShake] = useState(false)
  const [attackEffect, setAttackEffect] = useState(null)

  useEffect(() => {
    if (attackEffect) {
      setTimeout(() => setAttackEffect(null), 800)
    }
  }, [attackEffect])

  const handleAttack = () => {
    setBossShake(true)
    setAttackEffect('player')
    setTimeout(() => setBossShake(false), 400)
    onAttack?.()
  }

  const handleDefend = () => {
    setAttackEffect('boss')
    onDefend?.()
  }

  return (
    <div className="relative">
      {/* Boss Display */}
      <div className="text-center mb-6">
        <div 
          className={`text-8xl mb-3 inline-block transition-all duration-300 ${
            bossShake ? 'animate-[shake_0.4s]' : ''
          }`}
          style={{
            filter: boss.hp <= 30 ? 'brightness(0.7) contrast(1.2)' : 'none',
          }}
        >
          {boss.emoji}
        </div>
        
        <h3 
          className="font-cute text-2xl font-bold mb-2" 
          style={{ color: boss.color }}
        >
          {boss.name}
        </h3>
        
        <p className="text-sm text-[#a08bb0] dark:text-purple-300 mb-3">
          {boss.description}
        </p>

        {/* Boss HP Bar */}
        <div className="max-w-md mx-auto">
          <div className="bar-track h-4">
            <div 
              className="bar-boss h-full rounded-full transition-all duration-500"
              style={{ 
                width: `${boss.hp}%`,
                background: `linear-gradient(90deg, ${boss.color}, ${boss.color}dd)`
              }}
            />
          </div>
          <div className="text-xs text-[#a08bb0] mt-1">
            Boss HP: {boss.hp}/100
          </div>
        </div>
      </div>

      {/* Attack Effects */}
      {attackEffect && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="text-6xl animate-[ping_0.8s_ease-out]">
            {attackEffect === 'player' ? '💥' : '🛡️'}
          </div>
        </div>
      )}

      {/* Boss Info Card */}
      <div className="cute-card p-4 mb-4 text-sm">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="font-bold text-[#ff6ba8] dark:text-[#ff8cc7] mb-1">⚔️ Serangan:</div>
            <ul className="text-xs text-[#a08bb0] dark:text-purple-300 space-y-0.5">
              {boss.attacks.map((atk, i) => (
                <li key={i}>• {atk}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-bold text-[#4ade9f] dark:text-[#5efcb3] mb-1">🎯 Kelemahan:</div>
            <p className="text-xs text-[#a08bb0] dark:text-purple-300">
              {boss.weakness}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Boss reward display
export function BossReward({ boss, show, onClose }) {
  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="cute-card p-8 max-w-md text-center pop-in">
        <div className="text-7xl mb-4">{boss.emoji}</div>
        <h3 className="font-cute text-2xl font-bold text-[#e63980] dark:text-[#ff8cc7] mb-2">
          {boss.name} Dikalahkan! 🎉
        </h3>
        
        <div className="my-6 p-4 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl">
          <div className="text-6xl mb-2">🏆</div>
          <div className="font-cute text-lg font-bold text-[#ffb347] mb-2">
            {boss.reward.title}
          </div>
          <div className="text-sm text-[#a08bb0]">
            +{boss.reward.xp} XP
          </div>
        </div>

        <button
          onClick={onClose}
          className="cute-btn cute-btn-pink px-8 py-3"
        >
          Lanjut! ✨
        </button>
      </div>
    </div>
  )
}
