/**
 * leaderboardApi.js — Hybrid leaderboard (remote-first, localStorage fallback).
 * Aman offline: semua fungsi sync-local + upaya remote best-effort.
 */
import { getRpgTitle } from '../data/gameModes'
import { getUserProfile } from './greetingStorage'

const boardKey = (mode) => `taxquest_leaderboard_${mode || 'quiz'}`
const AVATAR_KEY = 'taxquest_avatar'
const MAX_ENTRIES = 50

const SEEDS = {
  quiz: [
    { name: 'BuSriMulyani', score: 980, avatar: '🦊' },
    { name: 'FiskusChan', score: 920, avatar: '🧙‍♂️' },
    { name: 'AuditKun', score: 870, avatar: '🕵️' },
    { name: 'SPTMan', score: 800, avatar: '🦁' },
    { name: 'NinjaFiskal', score: 720, avatar: '🐱' },
    { name: 'KohPajak', score: 640, avatar: '🧙‍♂️' },
    { name: 'PPhChan', score: 550, avatar: '🦊' },
    { name: 'MochiTax', score: 430, avatar: '🐱' },
  ],
  boss: [
    { name: 'DragonSlayer', score: 450, avatar: '🦁' },
    { name: 'FiskusChan', score: 380, avatar: '🧙‍♂️' },
    { name: 'AuditKun', score: 320, avatar: '🕵️' },
    { name: 'SPTMan', score: 260, avatar: '🐱' },
    { name: 'NinjaFiskal', score: 200, avatar: '🦊' },
    { name: 'MochiTax', score: 150, avatar: '🦁' },
  ],
}

function safeGet(k) {
  try {
    return window.localStorage.getItem(k)
  } catch {
    return null
  }
}
function safeSet(k, v) {
  try {
    window.localStorage.setItem(k, v)
  } catch { /* abaikan */ }
}

function withRanks(board) {
  return board.map((e, i) => ({ ...e, rank: i + 1, title: getRpgTitle(i + 1) }))
}

export function getLocalBoard(mode = 'quiz') {
  try {
    const raw = safeGet(boardKey(mode))
    if (raw) {
      const arr = JSON.parse(raw)
      if (Array.isArray(arr) && arr.length) {
        const sorted = [...arr].sort((a, b) => (Number(b.score) || 0) - (Number(a.score) || 0))
        return withRanks(sorted.slice(0, MAX_ENTRIES))
      }
    }
  } catch { /* jatuh ke seed */ }
  // Seed awal supaya papan tidak kosong
  const now = new Date().toISOString()
  const seeds = (SEEDS[mode] || SEEDS.quiz).map((s) => ({ ...s, mode, date: now, seed: true }))
  safeSet(boardKey(mode), JSON.stringify(seeds))
  return withRanks(seeds)
}

/** Ambil papan global; coba /api/leaderboard dulu, gagal -> lokal. */
export async function fetchGlobalLeaderboard(mode = 'quiz') {
  try {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 3500)
    try {
      const res = await fetch(`/api/leaderboard?mode=${encodeURIComponent(mode)}`, { signal: ctrl.signal })
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data.board) && data.board.length) {
          const sorted = [...data.board].sort((a, b) => (Number(b.score) || 0) - (Number(a.score) || 0))
          return withRanks(sorted.slice(0, MAX_ENTRIES))
        }
      }
    } finally {
      clearTimeout(t)
    }
  } catch { /* abaikan, pakai lokal */ }
  return getLocalBoard(mode)
}

/**
 * Simpan skor global (lokal dulu, lalu best-effort POST remote).
 * @returns {{entry, rank, board}}
 */
export function postGlobalScore({ name, score, mode = 'quiz', avatar, meta } = {}) {
  const prof = (() => {
    try {
      return getUserProfile()
    } catch {
      return { name: 'WajibPajak#69' }
    }
  })()
  const entry = {
    name: String(name || prof.name || 'WajibPajak#69').slice(0, 24),
    score: Number(score) || 0,
    mode,
    avatar: avatar || getPlayerAvatar(),
    date: new Date().toISOString(),
    ...(meta || {}),
  }
  const board = getLocalBoard(mode).filter((e) => !e.seed || true)
  board.push(entry)
  board.sort((a, b) => (Number(b.score) || 0) - (Number(a.score) || 0))
  const trimmed = board.slice(0, MAX_ENTRIES)
  safeSet(boardKey(mode), JSON.stringify(trimmed.map(({ rank, title, ...r }) => r)))
  const ranked = withRanks(trimmed)
  const rank = ranked.findIndex(
    (e) => e.name === entry.name && e.score === entry.score && e.date === entry.date
  ) + 1

  // Best-effort remote (abaikan gagal — endpoint opsional)
  try {
    fetch('/api/leaderboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    }).catch(() => {})
  } catch { /* abaikan */ }

  return { entry: { ...entry, rank, title: getRpgTitle(rank) }, rank, board: ranked }
}

export function getPlayerRank(name, mode = 'quiz') {
  const board = getLocalBoard(mode)
  const i = board.findIndex((e) => e.name === name)
  return i === -1 ? null : { rank: i + 1, title: getRpgTitle(i + 1), entry: board[i] }
}

export function getPlayerAvatar() {
  try {
    return safeGet(AVATAR_KEY) || '🧙‍♂️'
  } catch {
    return '🧙‍♂️'
  }
}

export function savePlayerAvatar(emoji) {
  safeSet(AVATAR_KEY, String(emoji || '🧙‍♂️'))
  return String(emoji || '🧙‍♂️')
}
