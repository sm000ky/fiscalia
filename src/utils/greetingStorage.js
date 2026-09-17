/**
 * greetingStorage.js — Nickname, Gacha Greeting 100+ & Quiz History
 * Safe localStorage wrapper (fallback memori jika browser blokir).
 */

export const DEFAULT_NICKNAME = 'WajibPajak#69'

const PROFILE_KEY = 'taxquest_user_profile'
const HISTORY_KEY = 'taxquest_quiz_history'
const DECK_PREFIX = 'taxquest_greet_deck_'

// ---------- safe storage ----------
const memFallback = {}
function safeGet(key) {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return memFallback[key] ?? null
  }
}
function safeSet(key, val) {
  try {
    window.localStorage.setItem(key, val)
  } catch {
    memFallback[key] = val
  }
}

// ---------- 100+ greeting pool (35+ per kategori) ----------
// Token {name} diganti nama user saat render.
export const GREETINGS = {
  roasting: [
    'Halo {name}, SPT belum lapor kok tenang-tenang aja?',
    'Eh {name}, NPWP ada, lapor SPT kapan?',
    '{name}, ngaku pejuang pajak tapi TER masih tanya Google?',
    'Selamat datang {name}, denda 2% per bulan menantimu dengan manis.',
    '{name}, faktur pajak numpuk tapi niat lapor tipis-tipis ya?',
    'Hai {name}, PPN 11% aja hafal, gebetan kapan dihafal?',
    '{name}, koreksi fiskal aja bisa, koreksi gaya hidup kapan?',
    'Wih {name}, rajin nongkrong tapi e-Filing setahun sekali pun telat?',
    '{name}, beda tetap beda waktu paham, bedain sayang sama mantan belum?',
    'Halo {name}, PPh 21 bisa dihitung, tapi hitung mundur deadline kok gagal?',
    '{name}, katanya Wajib Pajak taat, kok bukti potong masih difoto doang?',
    'Eh {name}, PTKP hafal di luar kepala, status hubungan masih TK/0?',
    'Selamat pagi {name}, DJP online sudah buka, alasanmu apa lagi?',
    '{name}, jurnal umum rapi, kamar sendiri kapan dirapikan?',
    'Hai {name}, omzet naik terus, lapor SPT kok turun terus?',
    '{name}, pinter rekonsiliasi fiskal tapi nggak bisa rekonsiliasi sama doi?',
    'Halo {name}, tarif TER 0,5% aja panik, gimana tarif hidup di Jakarta?',
    '{name}, PPh Final 0,5% ringan, yang berat itu move on ya?',
    'Eh {name}, SPT Masa tiap bulan, janji manis tiap hari, realisasi nol?',
    '{name}, audit takut, ditanya dosen keringetan, ngaku ksatria pajak?',
    'Hai {name}, e-Bupot sudah digital, alasan masih zaman batu?',
    'Halo {name}, denda telat lapor Rp100 ribu, gengsimu lebih mahal kan?',
    'Woy {name}, PPN masukan-keluaran selisih terus, dompet juga bocor terus?',
    '{name}, hafal Pasal 21, pasal hati kok nggak pernah menang?',
    'Selamat datang {name}, di sini soal pajaknya nyata, alasanmu fiksi.',
    '{name}, katanya hemat pajak, kok jajan kopi Rp50 ribu sehari?',
    'Hai {name}, laporan keuangan audited, laporan pertanggungjawaban ke ortu kapan?',
    '{name}, kredit pajak bisa dikompensasi, rasa bersalah telat lapor gimana?',
    'Halo {name}, PKP dikukuhkan, komitmen kapan dikukuhkan?',
    'Eh {name}, SPT Tahunan deadline 31 Maret, kamu deadline tugas aja molor?',
    '{name}, pinter hitung DPP, tapi hitung umur makin tua kok lupa?',
    'Hai {name}, tarif progresif paham, progres hidup kok stagnan?',
    '{name}, PPh 23 dipotong 2%, ekspektasimu dipotong realita 100%?',
    'Halo {name}, buku besar rapi, history chat masih berantakan?',
    'Wih {name}, datang ke TaxQuest bawa semangat, pulang bawa PR pajak ya?',
    '{name}, sanksi bunga 2% per bulan itu pasti, janji dietmu belum tentu.',
  ],
  motivasi: [
    'Semangat {name}, kerja keraslah sampai Ditjen Pajak heran!',
    'Gas {name}, hari ini hitung PPh, besok hitung cuan!',
    'Ayo {name}, satu soal pajak sehari bikin dompet berseri!',
    'Jangan menyerah {name}, SPT aja bisa dikejar, apalagi mimpi!',
    'Hebat {name}, kamu sudah buka TaxQuest, 90% Wajib Pajak cuma wacana!',
    'Terus maju {name}, fiskus aja move on ke e-Filing, masa kamu enggak?',
    'Percaya diri {name}, tarif 5% aja kecil, mimpimu harus besar!',
    'Bangkit {name}, gagal satu kuis bukan berarti gagal jadi akuntan!',
    'Fokus {name}, beda waktu pasti terkoreksi, nasib juga bisa!',
    'Sikat {name}, PPh 21 hari ini, jadi CFO besok pagi!',
    'Jalan terus {name}, PKP butuh omzet 4,8M, kamu butuh konsistensi!',
    'Mantap {name}, tiap jurnal yang balance bikin hidup ikut balance!',
    'Ayo {name}, koreksi fiskal itu bukti kamu bisa memperbaiki diri!',
    'Semangat {name}, denda bisa dihindari, sukses bisa dijemput!',
    'Gas pol {name}, belajar pajak = investasi anti boncos!',
    'Kamu keren {name}, melek pajak di umur segini itu langka!',
    'Lanjut {name}, 10 soal hari ini, 10 juta insight esok hari!',
    'Jangan kendor {name}, TER boleh bertingkat, semangat jangan!',
    'Buktikan {name}, anak akuntansi bukan cuma tukang debit-kredit!',
    'Terbang {name}, dari kuis TaxQuest menuju kantor pajak impian!',
    'Sabar {name}, rekonsiliasi butuh proses, sukses juga!',
    'Nyalakan {name}, mode ksatria pajak aktif, mode rebahan nonaktif!',
    'Gaskeun {name}, hari ini belajar, tahun depan lapor SPT dengan bangga!',
    'Kuat {name}, badai audit pasti berlalu bagi yang siap!',
    'Ingat {name}, pejuang pajak sejati lahir dari kuis receh!',
    'Maju {name}, satu bab PPN hari ini, satu langkah ke wisuda!',
    'Kamu bisa {name}, bahkan PPh 26 20% aja bisa ditaklukkan!',
    'Tetap happy {name}, pajak itu pasti, stres itu pilihan!',
    'Berani {name}, tanya dosen itu gratis, denda pajak tidak!',
    'Kejar {name}, IPK boleh 3,5, pemahaman pajak harus 4,0!',
    'Hidup {name}, selagi masih bisa buka e-Filing, harapan masih ada!',
    'Juara {name}, podium wisuda menunggumu di garis finish!',
    'Optimis {name}, saldo laba boleh ditahan, semangat jangan!',
    'Tancap {name}, dari Wajib Pajak jadi Konsultan Pajak!',
    'Legenda {name}, ceritamu dimulai dari satu klik START QUEST!',
    'All-out {name}, belajar pajak hari ini, bebas denda selamanya!',
  ],
  fakta: [
    'Ingat {name}, 2 hal pasti: kematian & tagihan pajak.',
    'Tahukah {name}, PPN Indonesia 11%, tertinggi se-Asia Tenggara bareng Filipina?',
    'Fakta {name}: PTKP jomblo TK/0 itu Rp54 juta setahun. Jomblo ada tunjangannya!',
    'Quote {name}: "Jangan menunda SPT, seperti jangan menunda sayang."',
    'Info {name}: denda telat lapor SPT orang pribadi cuma Rp100 ribu, murah tapi malu!',
    'Fakta {name}: PPh Final UMKM 0,5% itu tarif termanis sedunia akhirat.',
    'Pesan {name}: jurnal tidak balance = hidup tidak tenang.',
    'Tahukah {name}, Nomor NPWP 16 digit sekarang sama dengan NIK?',
    'Fakta {name}: bunga keterlambatan pajak 2% per bulan, lebih galak dari pinjol?',
    'Quote {name}: "Debit boleh bertambah, semangat jangan berkurang."',
    'Info {name}: PKP wajib dikukuhkan kalau omzet lewat Rp4,8 miliar setahun.',
    'Fakta {name}: PPh 23 jasa 2%, tapi tanpa NPWP jadi 4%. NPWP itu diskon!',
    'Pesan {name}: beda tetap tidak akan pernah jadi beda waktu. Relakan.',
    'Tahukah {name}, e-Filing lahir 2005, lebih tua dari hubunganmu?',
    'Fakta {name}: dividen kena PPh 15%, tapi senyum ke fiskus gratis.',
    'Quote {name}: "Kredit pajak hari ini, restitusi bahagia esok hari."',
    'Info {name}: SPT Tahunan orang pribadi deadline 31 Maret tiap tahun.',
    'Fakta {name}: TER kategori A, B, C — kayak grup K-pop, tapi bikin pusing.',
    'Pesan {name}: aset boleh disusutkan, mental jangan.',
    'Tahukah {name}, materai Rp10 ribu itu juga pajak atas dokumen?',
    'Fakta {name}: PPh 22 impor 2,5% dengan API, 7,5% tanpa API. Punya API itu penting!',
    'Quote {name}: "Laba ditahan boleh, belajar jangan ditahan."',
    'Info {name}: NIK jadi NPWP sejak 2022, KTP-mu sekarang sakti.',
    'Fakta {name}: restitusi PPN bisa 12 bulan? Sabar ya {name}.',
    'Pesan {name}: kas kecil jangan dianggap kecil, selisih Rp500 bikin nangis.',
    'Tahukah {name}, Ditjen Pajak punya akun Twitter yang rajin balas mention?',
    'Fakta {name}: PPh 26 untuk WNA 20%, cinta beda negara juga kena potongan?',
    'Quote {name}: "Auditor datang membawa kabar, persiapan membawa tenang."',
    'Info {name}: pembukuan wajib disimpan 10 tahun. Kenangan mantan tidak wajib.',
    'Fakta {name}: sanksi administrasi bisa dihapus lewat pengampunan? Cek UU HPP!',
    'Pesan {name}: neraca harus seimbang, hidup juga. Jangan lembur terus {name}.',
    'Tahukah {name}, tax ratio Indonesia masih ~10%, PR besar menantimu {name}!',
    'Fakta {name}: faktur pajak batal masih bisa dibetulkan, hati yang batal belum tentu.',
    'Quote {name}: "Belajar pajak itu maraton, bukan sprint 100 meter."',
    'Info {name}: TaxQuest ini 100% gratis, denda pajak tidak. Belajarlah {name}!',
    'Bonus {name}: kamu baca sampai sini = calon konsultan pajak masa depan!',
  ],
}

const CATS = Object.keys(GREETINGS)

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function deckKey(cat) {
  return DECK_PREFIX + cat
}

function loadDeck(cat) {
  try {
    const raw = safeGet(deckKey(cat))
    if (!raw) return []
    const d = JSON.parse(raw)
    const n = GREETINGS[cat]?.length || 0
    if (!Array.isArray(d)) return []
    return d.filter((i) => Number.isInteger(i) && i >= 0 && i < n)
  } catch {
    return []
  }
}

function saveDeck(cat, deck) {
  try {
    safeSet(deckKey(cat), JSON.stringify(deck))
  } catch { /* abaikan */ }
}

function fill(name) {
  return String(name || DEFAULT_NICKNAME)
}

export function drawGreeting(cat, name) {
  const pool = GREETINGS[cat] || GREETINGS.roasting
  const key = CATS.includes(cat) ? cat : 'roasting'
  let deck = loadDeck(key)
  if (deck.length === 0) {
    deck = shuffle(pool.map((_, i) => i))
  }
  const idx = deck.pop()
  saveDeck(key, deck)
  const template = pool[idx ?? 0] || pool[0]
  return template.replaceAll('{name}', fill(name))
}

/** Ambil 1 sapaan acak lintas kategori (anti-repeat per kategori). */
export function getGachaGreeting(name) {
  const cat = CATS[Math.floor(Math.random() * CATS.length)]
  return { text: drawGreeting(cat, name), category: cat }
}

export function getGreetingByCategory(cat, name) {
  return drawGreeting(cat, name)
}

// ---------- profile ----------
export function getUserProfile() {
  try {
    const raw = safeGet(PROFILE_KEY)
    if (!raw) return { name: DEFAULT_NICKNAME, isDefault: true }
    const p = JSON.parse(raw)
    if (!p || typeof p.name !== 'string' || !p.name.trim()) {
      return { name: DEFAULT_NICKNAME, isDefault: true }
    }
    return { name: p.name.trim().slice(0, 24), isDefault: false, updatedAt: p.updatedAt || null }
  } catch {
    return { name: DEFAULT_NICKNAME, isDefault: true }
  }
}

/** True jika user sudah pernah menyimpan nickname sendiri. */
export function hasCustomProfile() {
  try {
    const raw = safeGet(PROFILE_KEY)
    if (!raw) return false
    const p = JSON.parse(raw)
    return !!(p && typeof p.name === 'string' && p.name.trim())
  } catch {
    return false
  }
}

export function isFirstTimeUser() {
  return !hasCustomProfile()
}

export function saveUserProfile(name) {
  const clean = String(name || '').trim().slice(0, 24) || DEFAULT_NICKNAME
  const payload = { name: clean, updatedAt: new Date().toISOString() }
  safeSet(PROFILE_KEY, JSON.stringify(payload))
  return payload
}

// ---------- quiz history ----------
export function getQuizHistory() {
  try {
    const raw = safeGet(HISTORY_KEY)
    if (!raw) return []
    const h = JSON.parse(raw)
    return Array.isArray(h) ? h : []
  } catch {
    return []
  }
}

export function saveQuizHistory(score, combo, date) {
  const entry = {
    score: Number(score) || 0,
    combo: Number(combo) || 0,
    date: date || new Date().toISOString(),
  }
  try {
    const h = getQuizHistory()
    h.push(entry)
    safeSet(HISTORY_KEY, JSON.stringify(h.slice(-50)))
  } catch { /* abaikan */ }
  return entry
}
