import { useState, useEffect } from 'react'
import { Trophy, Star, Zap, Target, X } from 'lucide-react'
import { playLevelUpSound } from '../utils/soundEffects'

const ACHIEVEMENTS = [
  {
    id: 'tax_novice',
    name: 'Tax Novice',
    description: 'Complete your first quiz',
    icon: '🎓',
    requirement: { type: 'quiz_completed', count: 1 }
  },
  {
    id: 'combo_master',
    name: 'Combo Master',
    description: 'Achieve 5x streak',
    icon: '⚡',
    requirement: { type: 'max_streak', count: 5 }
  },
  {
    id: 'fiscal_warrior',
    name: 'Fiscal Warrior',
    description: 'Score 800+ points in a quiz',
    icon: '⚔️',
    requirement: { type: 'high_score', count: 800 }
  },
  {
    id: 'perfect_score',
    name: 'Perfect Score',
    description: 'Answer all 10 questions correctly',
    icon: '💯',
    requirement: { type: 'perfect_quiz', count: 10 }
  },
  {
    id: 'calculator_pro',
    name: 'Calculator Pro',
    description: 'Use TER Calculator 5 times',
    icon: '🧮',
    requirement: { type: 'calculator_used', count: 5 }
  },
  {
    id: 'boss_slayer',
    name: 'Boss Slayer',
    description: 'Defeat Tax Monster Boss',
    icon: '👾',
    requirement: { type: 'boss_defeated', count: 1 }
  }
]

export default function Achievements({ isOpen, onClose }) {
  const [unlockedAchievements, setUnlockedAchievements] = useState([])
  const [stats, setStats] = useState({})

  useEffect(() => {
    loadAchievements()
    loadStats()
  }, [])

  const loadAchievements = () => {
    const saved = localStorage.getItem('taxquest_achievements')
    if (saved) {
      setUnlockedAchievements(JSON.parse(saved))
    }
  }

  const loadStats = () => {
    const saved = localStorage.getItem('taxquest_stats')
    if (saved) {
      setStats(JSON.parse(saved))
    }
  }

  const isUnlocked = (achievementId) => {
    return unlockedAchievements.includes(achievementId)
  }

  const getProgress = (achievement) => {
    const { type, count } = achievement.requirement
    const current = stats[type] || 0
    return Math.min(Math.round((current / count) * 100), 100)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="arcade-bg pixel-box-cyan max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-pixel text-3xl neon-yellow">BADGES & ACHIEVEMENTS</h2>
          <button
            onClick={onClose}
            className="retro-button bg-red-600 border-4 border-red-400 p-2 hover:bg-red-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {ACHIEVEMENTS.map((achievement) => {
            const unlocked = isUnlocked(achievement.id)
            const progress = getProgress(achievement)

            return (
              <div
                key={achievement.id}
                className={`p-6 border-4 transition-all ${
                  unlocked
                    ? 'bg-yellow-900/40 border-yellow-500 pixel-box-pink'
                    : 'bg-gray-900/40 border-gray-600'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`text-5xl ${
                      unlocked ? 'grayscale-0' : 'grayscale opacity-50'
                    }`}
                  >
                    {achievement.icon}
                  </div>

                  <div className="flex-1">
                    <h3
                      className={`font-pixel text-lg mb-2 ${
                        unlocked ? 'neon-yellow' : 'text-gray-500'
                      }`}
                    >
                      {achievement.name}
                    </h3>
                    <p className="font-retro text-sm text-gray-300 mb-3">
                      {achievement.description}
                    </p>

                    {!unlocked && (
                      <div>
                        <div className="bg-gray-900 h-3 border-2 border-gray-600 relative overflow-hidden mb-1">
                          <div
                            className="bg-cyan-500 h-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <div className="font-pixel text-xs text-gray-400">
                          Progress: {progress}%
                        </div>
                      </div>
                    )}

                    {unlocked && (
                      <div className="flex items-center gap-2">
                        <Trophy className="text-yellow-400" size={16} />
                        <span className="font-pixel text-xs neon-cyan">UNLOCKED!</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-8 bg-black/40 border-4 border-purple-500 p-6">
          <h3 className="font-pixel text-xl neon-pink mb-4">YOUR STATS</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-retro">
            <div className="text-center">
              <div className="font-pixel text-2xl neon-cyan">{stats.quiz_completed || 0}</div>
              <div className="text-xs text-gray-400">Quizzes</div>
            </div>
            <div className="text-center">
              <div className="font-pixel text-2xl neon-yellow">{stats.max_streak || 0}</div>
              <div className="text-xs text-gray-400">Max Streak</div>
            </div>
            <div className="text-center">
              <div className="font-pixel text-2xl neon-pink">{stats.high_score || 0}</div>
              <div className="text-xs text-gray-400">High Score</div>
            </div>
            <div className="text-center">
              <div className="font-pixel text-2xl neon-cyan">{unlockedAchievements.length}</div>
              <div className="text-xs text-gray-400">Achievements</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper function to unlock achievement
export function unlockAchievement(achievementId) {
  const saved = localStorage.getItem('taxquest_achievements')
  const unlocked = saved ? JSON.parse(saved) : []
  
  if (!unlocked.includes(achievementId)) {
    unlocked.push(achievementId)
    localStorage.setItem('taxquest_achievements', JSON.stringify(unlocked))
    playLevelUpSound()
    return true
  }
  return false
}

// Helper function to update stats
export function updateStats(statType, value) {
  const saved = localStorage.getItem('taxquest_stats')
  const stats = saved ? JSON.parse(saved) : {}
  
  // Update stat (use max for some types)
  if (statType === 'max_streak' || statType === 'high_score') {
    stats[statType] = Math.max(stats[statType] || 0, value)
  } else {
    stats[statType] = (stats[statType] || 0) + value
  }
  
  localStorage.setItem('taxquest_stats', JSON.stringify(stats))
  
  // Check achievements
  checkAchievements(stats)
}

function checkAchievements(stats) {
  ACHIEVEMENTS.forEach((achievement) => {
    const { type, count } = achievement.requirement
    if ((stats[type] || 0) >= count) {
      unlockAchievement(achievement.id)
    }
  })
}
