# TaxQuest — Architecture & Status

Generated: 2026-09-17 WITA (UTC+08:00)
Lokasi lokal: /root/taxquest-app
Production: https://taxquest-app.vercel.app

## 1. Status Proyek: Phase 2 Completed ✅
- Build verified: 1385 modules transformed, sukses ~35.30s (vite build).
- Stack: React + Vite, pastel/neon cute theme, localStorage-first persistence.
- Deploy target: Vercel (production URL di atas).

## 2. Modul Aktif

### Task 1 — Pph23Calculator.jsx (Kalkulator PPh 23/26)
- Path: src/components/Pph23Calculator.jsx, terdaftar di ToolsHub.jsx tab PPh 23/26.
- Tarif: Jasa/Sewa Harta 2% (tanpa NPWP 4%), Hadiah/Bunga/Dividen 15% (tanpa NPWP 30%).
- Fitur: input bruto, toggle NPWP (×2 penalty), breakdown DPP / tarif efektif / potongan / netto, badge Pasal 23 UU PPh, copy result.

### Task 2A — greetingStorage.js (Onboarding + Gacha Greeting)
- Path: src/utils/greetingStorage.js + HeroDashboard.jsx (modal onboarding + hero).
- 108 sapaan: 36 Roasting Tipis + 36 Motivasi Ngawur + 36 Fakta & Quote Absurd.
- Anti-repeat Deck Shuffle tersimpan di localStorage.
- Default nickname: 'WajibPajak#69'; API: saveUserProfile, getUserProfile, saveQuizHistory, getQuizHistory.
- HeroDashboard: modal "Welcome Ksatria Pajak!" untuk user baru, nickname + tombol edit, gacha greeting + shuffle, XP/level & history persist aman saat refresh.

### Task 2B — Game Modes, RPG Titles, Leaderboard, Player Card
- src/data/gameModes.js: registry modular (Quiz Arena + Boss Battle aktif; Fiscal Race & Audit Sprint coming soon, extensible).
- src/utils/leaderboardApi.js: gelar RPG per rank (Top 1 "👑 Dirjen Pajak Bayangan", 2–5 "⚔️ Auditor Senior Berbahaya", 6–10 "📜 Ksatria Tax Planning", rest "🛡️ Wajib Pajak Taat"); postGlobalScore() + fetchGlobalLeaderboard() dengan fallback localStorage.
- src/components/PlayerCardModal.jsx: RPG trading card pastel, emoji avatar picker (🧙‍♂️ 🦁 🐱 🦊 🕵️), glowing frame per level, nickname + gelar + level + XP + badges + quote, tombol 📸 Download/Share via html2canvas → PNG.
- src/components/LeaderboardModal.jsx: hybrid leaderboard glassmorphism pastel, tab Quiz vs Boss Battle, klik nama = inspect PlayerCardModal.
- Integrasi: tombol Trophy/Leaderboard + Kartu Profil di HeroDashboard.jsx & FloatingControls.jsx; QuizArena auto-post skor quiz & boss XP.

## 3. Next Plan — Task 3
- Vercel Production Deployment: push main, verifikasi build + env, smoke test production.
- Future Game Modes: aktifkan Fiscal Race & Audit Sprint dari registry gameModes.js.
