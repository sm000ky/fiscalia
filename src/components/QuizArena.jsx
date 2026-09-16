import { useState, useEffect } from 'react'
import { Heart, Trophy, CheckCircle, X, Sparkles, Star } from 'lucide-react'
import { fetchAutoQuiz } from '../utils/quizGenerator'
import { playCorrectSound, playWrongSound, playClickSound, playComboSound } from '../utils/soundEffects'
import { updateStats, unlockAchievement } from './Achievements'
import { celebrateCorrect, celebrateCombo, celebrateVictory } from '../utils/confetti'
import { getRandomMessage, getVictoryMessage } from '../utils/messages'
import CuteLoading from './CuteLoading'
import BossBattle, { BossReward } from './BossBattle'
import { getRandomBoss } from '../data/bossMonsters'

export default function QuizArena() {
  const [gameState, setGameState] = useState('menu')
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [hp, setHp] = useState(100)
  const [bossHp, setBossHp] = useState(100)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [isCorrect, setIsCorrect] = useState(null)
  const [shake, setShake] = useState(false)
  const [userAnswers, setUserAnswers] = useState([])
  const [encourageMsg, setEncourageMsg] = useState('')
  const [showEncourage, setShowEncourage] = useState(false)
  const [boss, setBoss] = useState(null)
  const [showBossReward, setShowBossReward] = useState(false)

  const startQuest = async () => {
    playClickSound()
    const randomBoss = getRandomBoss()
    setBoss(randomBoss)
    
    setQuestions([])
    setUserAnswers([])
    setGameState('loading')
    setScore(0); setStreak(0); setHp(100); setBossHp(100)
    setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false)
    try {
      const quizData = await fetchAutoQuiz()
      if (quizData.length >= 10) {
        setQuestions(quizData)
        setGameState('playing')
      } else {
        throw new Error('Not enough questions received')
      }
    } catch (error) {
      console.error('Failed to load quiz:', error)
      alert('Yah soal lagi dimuat nih, coba lagi sebentar ya Darling 💕\n\n(Server lagi sibuk bikin soal yang seru!)')
      setGameState('menu')
    }
  }

  const handleAnswer = (answerIndex) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(answerIndex)
    const correct = answerIndex === questions[currentQuestion].answerIndex
    setIsCorrect(correct)
    setUserAnswers(prev => [...prev, { questionIndex: currentQuestion, selectedOption: answerIndex, isCorrect: correct }])
    if (correct) {
      playCorrectSound()
      celebrateCorrect()
      const multiplier = Math.min(streak + 1, 3)
      setScore(score + 100 * multiplier)
      setStreak(streak + 1)
      setBossHp(Math.max(0, bossHp - 10))
      
      // Encouraging message
      const msg = multiplier >= 2 ? getRandomMessage('combo') : getRandomMessage('correct')
      setEncourageMsg(msg)
      setShowEncourage(true)
      setTimeout(() => setShowEncourage(false), 2000)
      
      if (multiplier >= 2) {
        setTimeout(() => {
          playComboSound()
          celebrateCombo()
        }, 200)
        updateStats('max_streak', streak + 1)
        if (streak + 1 >= 5) unlockAchievement('combo_master')
      }
    } else {
      playWrongSound()
      setHp(Math.max(0, hp - 20))
      setStreak(0)
      setShake(true)
      setTimeout(() => setShake(false), 400)
      
      // Encouraging message untuk wrong answer
      const msg = getRandomMessage('wrong')
      setEncourageMsg(msg)
      setShowEncourage(true)
      setTimeout(() => setShowEncourage(false), 2000)
    }
    setShowExplanation(true)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null); setShowExplanation(false); setIsCorrect(null)
    } else {
      const finalScore = score
      updateStats('quiz_completed', 1)
      updateStats('high_score', finalScore)
      updateStats('max_streak', streak)
      try { window.dispatchEvent(new CustomEvent('taxquest:xp', { detail: { xp: finalScore } })) } catch {}
      if (bossHp === 0) {
        unlockAchievement('boss_slayer')
        setShowBossReward(true)
      }
      if (userAnswers.filter(a => a.isCorrect).length + (isCorrect ? 0 : 0) >= questions.length) unlockAchievement('perfect_score')
      if (finalScore >= 800) unlockAchievement('fiscal_warrior')
      setGameState('finished')
    }
  }

  const streakText = streak >= 3 ? '🔥 Kombo Mega!' : streak >= 2 ? '✨ Kombo Ganda!' : streak >= 1 ? '💫 Kombo!' : ''
  const multiplier = Math.min(streak + 1, 3)

  if (gameState === 'menu') {
    const flowers = ['🌸', '🌺', '🌻', '🌷', '🏵️', '💐']
    const menuFlower = flowers[Math.floor(Math.random() * flowers.length)]
    return (
      <div className="max-w-3xl mx-auto w-full">
        <div className="cute-card p-6 sm:p-10 text-center pop-in">
          <div className="text-6xl sm:text-7xl mb-3 floaty select-none">{menuFlower}</div>
          <h2 className="font-cute text-2xl sm:text-3xl font-extrabold text-[#5b4a68]">Arena Kuis 💕</h2>
          <p className="text-sm sm:text-base text-[#a08bb0] mt-1 mb-6">Kalahkan Monster Pajak yang gemas bareng aku!</p>
          <div className="bg-[#fff3f8] border border-pink-100 rounded-2xl p-5 mb-6 text-left">
            <div className="font-cute font-bold text-[#e85d9e] mb-3">📜 Cara main</div>
            <ul className="space-y-2 text-sm text-[#8b7a99]">
              <li>🌸 Jawab 10 soal pajak yang seru</li>
              <li>🔥 Jawaban beruntun = poin bonus ×2, ×3</li>
              <li>💔 Salah jawab = hati -20</li>
              <li>💖 Hati habis = coba lagi ya, semangat!</li>
            </ul>
          </div>
          <button onClick={startQuest} className="cute-btn cute-btn-pink w-full sm:w-auto px-10 py-4 text-lg">
            ✨ Mulai Petualangan
          </button>
          <p className="text-xs text-[#c4b3d1] mt-3">Soal baru tiap main • bisa offline juga</p>
        </div>
      </div>
    )
  }

  if (gameState === 'loading') {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="cute-card-lav p-10 sm:p-14 text-center pop-in">
          <CuteLoading />
        </div>
      </div>
    )
  }

  if (gameState === 'finished') {
    const totalCorrect = userAnswers.filter(a => a.isCorrect).length
    const totalQuestions = questions.length
    const accuracy = totalQuestions ? Math.round((totalCorrect / totalQuestions) * 100) : 0
    const bossDefeated = bossHp <= 0
    
    // Show boss reward if defeated
    if (bossDefeated && boss && showBossReward) {
      return <BossReward boss={boss} show={true} onClose={() => {
        setShowBossReward(false)
        // Award XP
        window.dispatchEvent(new CustomEvent('taxquest:xp', { detail: { xp: boss.reward.xp } }))
      }} />
    }
    
    const grade = score >= 400
      ? { t: 'Luar Biasa! 🌟', d: 'Kamu bintang pajak hari ini!' }
      : score >= 300
      ? { t: 'Hebat Banget! 💖', d: 'Sedikit lagi sempurna!' }
      : score >= 200
      ? { t: 'Bagus! 🌸', d: 'Terus latihan ya!' }
      : { t: 'Semangat! 🍀', d: 'Coba lagi, pasti bisa!' }
    return (
      <div className="max-w-3xl mx-auto">
        <div className="cute-card p-6 sm:p-10 text-center pop-in">
          <div className="text-6xl sm:text-7xl mb-3 select-none">🏆</div>
          <h2 className="font-cute text-2xl sm:text-3xl font-extrabold text-[#5b4a68]">{grade.t}</h2>
          <p className="text-sm text-[#a08bb0] mb-4">{grade.d}</p>
          <div className="font-cute text-5xl font-extrabold text-[#e85d9e] mb-6">{score} <span className="text-lg text-[#c4b3d1]">poin</span></div>
          <div className="grid grid-cols-2 gap-3 text-left mb-6">
            {[
              ['💜 Total soal', totalQuestions, '#f6f0ff', '#7c5fc9'],
              ['💚 Benar', totalCorrect, '#e9faf3', '#1d9e6b'],
              ['🌸 Kurang tepat', totalQuestions - totalCorrect, '#fff3f8', '#e85d9e'],
              ['✨ Akurasi', `${accuracy}%`, '#fff8ec', '#d99a2b'],
            ].map(([label, val, bg, fg]) => (
              <div key={label} className="rounded-2xl p-4" style={{ background: bg }}>
                <div className="text-xs text-[#a08bb0]">{label}</div>
                <div className="font-cute text-2xl font-extrabold" style={{ color: fg }}>{val}</div>
              </div>
            ))}
          </div>
          <button onClick={startQuest} className="cute-btn cute-btn-lav w-full sm:w-auto px-10 py-4 text-lg">
            🔄 Main Lagi
          </button>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  if (!question) return null

  return (
    <div className={`max-w-3xl mx-auto w-full ${shake ? 'soft-shake' : ''}`}>
      {/* Boss Battle Display */}
      {boss && (
        <div className="mb-4">
          <BossBattle 
            boss={{...boss, hp: bossHp}} 
            playerHP={hp}
            onAttack={() => {}}
            onDefend={() => {}}
          />
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3">
        <div className="cute-card p-3 text-center">
          <div className="flex items-center justify-center gap-1 text-xs text-[#a08bb0]"><Heart size={14} className="text-[#ff7eb3]" /> Hati</div>
          <div className="bar-track h-2.5 mt-1.5">
            <div className="bar-hp h-full rounded-full transition-all" style={{ width: `${hp}%` }} />
          </div>
          <div className="font-cute font-bold text-[#5b4a68] text-sm mt-1">{hp}/100</div>
        </div>
        <div className="cute-card-mint p-3 text-center">
          <div className="text-xs text-[#a08bb0]">⭐ Skor</div>
          <div className="font-cute text-xl font-extrabold text-[#0d4a3a]">{score}</div>
        </div>
        <div className="cute-card p-3 text-center">
          <div className="text-xs text-[#a08bb0]">🔥 Kombo</div>
          <div className="font-cute text-xl font-extrabold text-[#e85d9e]">{streak > 0 ? `×${multiplier}` : '–'}</div>
          {streakText && <div className="text-[11px] font-bold text-[#e85d9e]">{streakText}</div>}
        </div>
      </div>

      {/* Question */}
      <div className="cute-card p-5 sm:p-6 mb-3">
        <div className="flex justify-between items-center mb-3">
          <span className="chip bg-[#f6f0ff] text-[#7c5fc9] text-xs px-3 py-1">Soal {currentQuestion + 1}/{questions.length}</span>
          <span className="text-xs text-[#c4b3d1] flex items-center gap-1"><Star size={12} /> {100 * multiplier} poin</span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-[#5b4a68] leading-snug mb-4">{question.question}</h3>
        <div className="grid grid-cols-1 gap-2.5">
          {question.options.map((option, idx) => {
            let cls = 'answer-idle'
            if (selectedAnswer !== null) {
              if (idx === question.answerIndex) cls = 'answer-right'
              else if (idx === selectedAnswer && !isCorrect) cls = 'answer-wrong'
              else cls = 'answer-dim'
            }
            const letters = ['A', 'B', 'C', 'D']
            const dots = ['#ffd1e0', '#e3d4ff', '#b8f0d4', '#ffe9bf']
            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={selectedAnswer !== null}
                className={`rounded-2xl px-4 py-3.5 text-left font-semibold text-[15px] sm:text-base transition-all min-h-[56px] flex items-center gap-3 ${cls}`}
              >
                <span className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center font-cute font-extrabold text-sm" style={{ background: dots[idx % 4], color: '#5b4a68' }}>
                  {letters[idx] || idx + 1}
                </span>
                <span>{option}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className={`rounded-3xl p-5 mb-3 pop-in ${isCorrect ? 'cute-card-mint' : 'cute-card'}`}>
          <div className="flex items-center gap-2 mb-2">
            {isCorrect
              ? <><CheckCircle size={24} className="text-[#1d9e6b]" /><span className="font-cute text-xl font-extrabold text-[#0d4a3a]">Betul! Yay! 🎉</span></>
              : <><X size={24} className="text-[#ff7eb3]" /><span className="font-cute text-xl font-extrabold text-[#e85d9e]">Belum tepat 💕</span></>}
            {isCorrect && streak >= 2 && <span className="chip bg-[#fff8ec] text-[#d99a2b] text-xs px-3 py-1 ml-auto">+{100 * multiplier} poin</span>}
            {!isCorrect && <span className="chip bg-[#fff3f8] text-[#e85d9e] text-xs px-3 py-1 ml-auto">−20 hati</span>}
          </div>
          <p className="text-[15px] text-[#5b4a68] leading-relaxed bg-white/70 rounded-2xl p-3.5">{question.explanation}</p>
          <button onClick={nextQuestion} className={`cute-btn w-full mt-3 py-4 text-base ${isCorrect ? 'cute-btn-mint' : 'cute-btn-pink'}`}>
            {currentQuestion < questions.length - 1 ? 'Lanjut ➜' : 'Lihat Hasil 💖'}
          </button>
        </div>
      )}
    </div>
  )
}
