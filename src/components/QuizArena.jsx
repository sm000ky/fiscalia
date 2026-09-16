import { useState, useEffect } from 'react'
import { Trophy, Heart, Zap, X, CheckCircle } from 'lucide-react'
import { fetchAutoQuiz } from '../utils/quizGenerator'
import { playCorrectSound, playWrongSound, playClickSound, playComboSound } from '../utils/soundEffects'
import { updateStats, unlockAchievement } from './Achievements'

export default function QuizArena() {
  const [gameState, setGameState] = useState('menu') // menu, loading, playing, finished
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [hp, setHp] = useState(100)
  const [bossHp, setBossHp] = useState(100)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [isCorrect, setIsCorrect] = useState(null)
  const [screenShake, setScreenShake] = useState(false)
  const [userAnswers, setUserAnswers] = useState([]) // Track all answers

  const startQuest = async () => {
    playClickSound()
    
    // Clear old questions immediately
    setQuestions([])
    setUserAnswers([])
    setGameState('loading')
    setScore(0)
    setStreak(0)
    setHp(100)
    setBossHp(100)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    
    try {
      console.log('🎮 Fetching fresh 10 questions from API...')
      const quizData = await fetchAutoQuiz()
      console.log('✓ Received questions:', quizData.length)
      
      if (quizData.length >= 10) {
        setQuestions(quizData)
        setGameState('playing')
      } else {
        throw new Error('Not enough questions received')
      }
    } catch (error) {
      console.error('Failed to load quiz:', error)
      alert('Failed to fetch quiz from server. Please check connection and try again.')
      setGameState('menu')
    }
  }

  const handleAnswer = (answerIndex) => {
    if (selectedAnswer !== null) return
    
    setSelectedAnswer(answerIndex)
    const correct = answerIndex === questions[currentQuestion].answerIndex
    setIsCorrect(correct)
    
    // Record answer
    const newAnswer = {
      questionIndex: currentQuestion,
      selectedOption: answerIndex,
      isCorrect: correct
    }
    setUserAnswers(prev => [...prev, newAnswer])
    
    if (correct) {
      playCorrectSound()
      const multiplier = Math.min(streak + 1, 3)
      const points = 100 * multiplier
      setScore(score + points)
      setStreak(streak + 1)
      
      // Damage boss
      const damage = 10
      setBossHp(Math.max(0, bossHp - damage))
      
      // Combo sound
      if (multiplier >= 2) {
        setTimeout(() => playComboSound(), 200)
        
        // Update max streak stat
        updateStats('max_streak', streak + 1)
        
        // Unlock combo master
        if (streak + 1 >= 5) {
          unlockAchievement('combo_master')
        }
      }
    } else {
      playWrongSound()
      setHp(Math.max(0, hp - 20))
      setStreak(0)
      
      // Screen shake
      setScreenShake(true)
      setTimeout(() => setScreenShake(false), 500)
    }
    
    setShowExplanation(true)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setIsCorrect(null)
    } else {
      // Quiz finished - calculate final score explicitly
      const totalCorrect = userAnswers.filter(a => a.isCorrect).length + (isCorrect ? 1 : 0)
      const calculatedFinalScore = score + (isCorrect ? 100 * Math.min(streak + 1, 3) : 0)
      
      // Update stats with calculated values
      updateStats('quiz_completed', 1)
      updateStats('high_score', calculatedFinalScore)
      updateStats('max_streak', streak)
      
      // Check if boss defeated
      if (bossHp === 0) {
        unlockAchievement('boss_slayer')
      }
      
      // Check if perfect score
      if (totalCorrect === questions.length) {
        unlockAchievement('perfect_score')
      }
      
      // Check high score achievement
      if (calculatedFinalScore >= 800) {
        unlockAchievement('fiscal_warrior')
      }
      
      setGameState('finished')
    }
  }

  const getStreakLabel = () => {
    if (streak >= 3) return 'MEGA COMBO!'
    if (streak >= 2) return 'DOUBLE COMBO!'
    if (streak >= 1) return 'COMBO!'
    return ''
  }

  const getMultiplier = () => {
    return Math.min(streak + 1, 3)
  }

  // UI RENDER
  if (gameState === 'menu') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="arcade-bg pixel-box-pink p-8 text-center">
          <Trophy className="w-24 h-24 mx-auto mb-6 neon-yellow" />
          <h2 className="font-pixel text-3xl neon-pink mb-4">QUIZ ARENA</h2>
          <p className="font-retro text-xl text-gray-300 mb-6">
            Battle Tax Monsters and Prove Your Mastery!
          </p>
          
          <div className="bg-black/40 border-4 border-cyan-400 p-6 mb-6">
            <h3 className="font-pixel text-lg neon-cyan mb-4">GAME RULES</h3>
            <div className="text-left space-y-2 font-retro text-gray-300">
              <p>• Answer 10 challenging tax questions</p>
              <p>• Build combo streak for bonus points (x2, x3)</p>
              <p>• Wrong answer = -20 HP damage</p>
              <p>• Reach 0 HP = Game Over</p>
            </div>
          </div>

          <button
            onClick={startQuest}
            className="retro-button bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 font-pixel text-xl border-4 border-white hover:scale-105 transition-transform"
          >
            🎮 START NEW QUEST
          </button>
        </div>
      </div>
    )
  }

  if (gameState === 'loading') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="arcade-bg pixel-box-cyan p-12 text-center">
          <div className="glitch-effect mb-6">
            <Zap className="w-24 h-24 mx-auto neon-cyan" />
          </div>
          <h2 className="font-pixel text-2xl neon-cyan mb-4 blink">
            SUMMONING TAX MONSTERS...
          </h2>
          <div className="bg-gray-900 h-6 border-4 border-cyan-400 relative overflow-hidden">
            <div className="bg-cyan-400 h-full animate-pulse" style={{width: '60%'}}></div>
          </div>
        </div>
      </div>
    )
  }

  if (gameState === 'finished') {
    // Calculate accurate final stats
    const totalCorrect = userAnswers.filter(a => a.isCorrect).length
    const totalQuestions = questions.length
    const accuracy = Math.round((totalCorrect / totalQuestions) * 100)
    
    const finalGrade = score >= 400 ? 'S-RANK' : score >= 300 ? 'A-RANK' : score >= 200 ? 'B-RANK' : 'C-RANK'
    const gradeColor = score >= 400 ? 'neon-yellow' : score >= 300 ? 'neon-pink' : score >= 200 ? 'neon-cyan' : 'text-gray-400'
    
    return (
      <div className="max-w-4xl mx-auto">
        <div className="arcade-bg pixel-box-pink p-8 text-center">
          <Trophy className={`w-32 h-32 mx-auto mb-6 ${gradeColor}`} />
          <h2 className="font-pixel text-4xl neon-pink mb-4">QUEST COMPLETE!</h2>
          
          <div className="bg-black/40 border-4 border-yellow-400 p-8 mb-6">
            <div className="font-pixel text-6xl neon-yellow mb-4">{finalGrade}</div>
            <div className="font-pixel text-3xl text-white mb-6">SCORE: {score}</div>
            
            <div className="grid grid-cols-2 gap-4 text-left font-retro text-lg mb-4">
              <div className="bg-purple-900/40 p-4 border-2 border-purple-500">
                <span className="text-purple-300">Questions:</span>
                <span className="float-right text-white font-bold">{totalQuestions}</span>
              </div>
              <div className="bg-green-900/40 p-4 border-2 border-green-500">
                <span className="text-green-300">Correct:</span>
                <span className="float-right text-white font-bold">{totalCorrect}</span>
              </div>
              <div className="bg-red-900/40 p-4 border-2 border-red-500">
                <span className="text-red-300">Wrong:</span>
                <span className="float-right text-white font-bold">{totalQuestions - totalCorrect}</span>
              </div>
              <div className="bg-cyan-900/40 p-4 border-2 border-cyan-500">
                <span className="text-cyan-300">Accuracy:</span>
                <span className="float-right text-white font-bold">{accuracy}%</span>
              </div>
            </div>
            
            <div className="bg-yellow-900/40 p-4 border-2 border-yellow-500">
              <div className="font-pixel text-sm neon-cyan mb-2">
                Benar {totalCorrect} dari {totalQuestions} Soal
              </div>
            </div>
          </div>

          <button
            onClick={startQuest}
            className="retro-button bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-4 font-pixel text-xl border-4 border-white"
          >
            RETRY QUEST
          </button>
        </div>
      </div>
    )
  }

  // PLAYING STATE
  const question = questions[currentQuestion]
  const multiplier = getMultiplier()

  return (
    <div className={`max-w-4xl mx-auto ${screenShake ? 'screen-shake' : ''}`}>
      {/* Boss Monster UI */}
      <div className="arcade-bg pixel-box-pink p-6 mb-6 text-center">
        <div className="boss-float mb-4">
          <div className="boss-monster">👾</div>
        </div>
        <div className="font-pixel text-lg neon-pink mb-2">TAX MONSTER BOSS</div>
        <div className="bg-gray-900 h-6 border-4 border-red-500 relative overflow-hidden mb-2">
          <div 
            className="bg-gradient-to-r from-red-600 to-red-400 h-full transition-all duration-300"
            style={{width: `${bossHp}%`}}
          ></div>
        </div>
        <div className="font-pixel text-sm text-red-400">BOSS HP: {bossHp}/100</div>
      </div>

      {/* Header Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* HP Bar */}
        <div className="arcade-bg pixel-box-pink p-4">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="text-red-500" size={20} />
            <span className="font-pixel text-sm text-white">HP</span>
          </div>
          <div className="bg-red-900 h-4 border-2 border-red-500 relative overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${hp > 50 ? 'bg-red-500' : 'bg-red-700 animate-pulse'}`}
              style={{width: `${hp}%`}}
            ></div>
          </div>
          <span className="font-pixel text-xs text-white">{hp}/100</span>
        </div>

        {/* Score */}
        <div className="arcade-bg pixel-box-cyan p-4 text-center">
          <span className="font-pixel text-sm neon-cyan">SCORE</span>
          <div className="font-pixel text-2xl neon-yellow">{score}</div>
        </div>

        {/* Streak */}
        <div className="arcade-bg pixel-box-pink p-4 text-center">
          <span className="font-pixel text-sm neon-pink">COMBO</span>
          <div className="font-pixel text-2xl neon-cyan">
            {streak > 0 && `x${multiplier}`}
            {streak === 0 && '-'}
          </div>
          {streak >= 2 && (
            <div className="font-pixel text-xs neon-yellow blink">{getStreakLabel()}</div>
          )}
        </div>
      </div>

      {/* Question Card */}
      <div className="arcade-bg pixel-box-cyan p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="font-pixel text-sm neon-cyan">
            QUESTION {currentQuestion + 1}/{questions.length}
          </span>
          <Trophy className="neon-yellow" size={24} />
        </div>

        <h3 className="font-retro text-2xl text-white mb-6">
          {question.question}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option, idx) => {
            let btnClass = 'bg-gray-800 border-gray-600 text-white hover:bg-gray-700'
            
            if (selectedAnswer !== null) {
              if (idx === question.answerIndex) {
                btnClass = 'bg-green-600 border-green-400 text-white'
              } else if (idx === selectedAnswer && !isCorrect) {
                btnClass = 'bg-red-600 border-red-400 text-white'
              } else {
                btnClass = 'bg-gray-900 border-gray-700 text-gray-500'
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={selectedAnswer !== null}
                className={`retro-button px-6 py-4 font-retro text-lg border-4 text-left transition-all ${btnClass}`}
              >
                <span className="font-pixel mr-2">
                  {String.fromCharCode(65 + idx)}.
                </span>
                {option}
              </button>
            )
          })}
        </div>
      </div>

      {/* Explanation Modal */}
      {showExplanation && (
        <div className="arcade-bg pixel-box-pink p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            {isCorrect ? (
              <>
                <CheckCircle className="text-green-400" size={32} />
                <span className="font-pixel text-2xl neon-cyan">CORRECT!</span>
                {streak >= 2 && (
                  <span className="font-pixel text-xl neon-yellow blink ml-auto">
                    +{100 * multiplier} pts
                  </span>
                )}
              </>
            ) : (
              <>
                <X className="text-red-400" size={32} />
                <span className="font-pixel text-2xl neon-pink">WRONG!</span>
                <span className="font-pixel text-xl text-red-400 ml-auto">-20 HP</span>
              </>
            )}
          </div>

          <div className="bg-black/40 border-2 border-cyan-400 p-4 mb-4">
            <p className="font-retro text-lg text-gray-200">{question.explanation}</p>
          </div>

          <button
            onClick={nextQuestion}
            className="retro-button bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 font-pixel text-lg border-4 border-white w-full"
          >
            {currentQuestion < questions.length - 1 ? 'NEXT QUESTION' : 'FINISH QUEST'}
          </button>
        </div>
      )}
    </div>
  )
}
