/**
 * Vercel Serverless Function — TaxQuest Quiz Proxy
 * POST /api/quiz  (no body needed)
 *
 * Keeps ELF_API_KEY server-side so it never ships in the browser bundle.
 * Retries flaky upstream 3x, extracts JSON, validates, falls back to local bank.
 */

const UPSTREAM = 'https://sakithati.bond/v1/chat/completions';
const MODEL = 'elf/solar-pro4';

const TOPICS = [
  'PPh 21 TER dan perhitungan gaji',
  'PTKP dan status perkawinan',
  'PPN dan PKP',
  'Rekonsiliasi Fiskal (Beda Tetap & Waktu)',
  'PPh Final UMKM PP 55/2022',
  'Jurnal Akuntansi dasar',
  'Laporan Keuangan',
  'PPh Pasal 22, 23, 24, 25, 26',
  'Metode penyusutan aktiva tetap',
  'Kredit Pajak dan SPT Tahunan',
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function callUpstream(apiKey, systemPrompt, userPrompt) {
  const controller = new AbortController();
  // maxDuration=45s in vercel.json: upstream needs ~17-21s per batch
  const timer = setTimeout(() => controller.abort(), 40000);
  try {
    const res = await fetch(UPSTREAM, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 1.0,
        max_tokens: 2500,
        top_p: 0.95,
      }),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Upstream ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

function extractQuestions(raw) {
  let text = (raw.choices?.[0]?.message?.content || '').trim();
  if (!text && raw.choices?.[0]?.message?.reasoning_content) {
    text = raw.choices[0].message.reasoning_content;
  }
  if (text.startsWith('```')) {
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  }
  const s = text.indexOf('[');
  const e = text.lastIndexOf(']');
  if (s === -1 || e === -1) throw new Error('No JSON array in response');
  return JSON.parse(text.slice(s, e + 1));
}

function valid(q) {
  return (
    q &&
    typeof q.question === 'string' &&
    Array.isArray(q.options) &&
    q.options.length === 4 &&
    typeof q.answerIndex === 'number' &&
    q.answerIndex >= 0 &&
    q.answerIndex < 4 &&
    typeof q.explanation === 'string'
  );
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST only' });
  }

  const apiKey = process.env.ELF_API_KEY;
  const sessionId = `${Date.now()}_${Math.floor(Math.random() * 100000)}`;
  const selectedTopics = shuffle(TOPICS).slice(0, 5).join(', ');

  const systemPrompt = `Kamu adalah expert pembuat soal akuntansi & perpajakan Indonesia untuk game edukasi TaxQuest RPG.

ATURAN KETAT:
1. Setiap request WAJIB generate soal BERBEDA dari sebelumnya
2. Variasikan topik, angka, kasus, dan konteks
3. Fokus pada topik: ${selectedTopics}
4. Soal harus praktis, real-world scenario, bukan teori kering
5. Hindari soal dengan pola berulang

FORMAT OUTPUT:
WAJIB return HANYA JSON array valid tanpa markdown/code block:
[{"question":"...","options":["A","B","C","D"],"answerIndex":0,"explanation":"..."}]`;

  const userPrompt = `Generate 5 soal pilihan ganda UNIK dengan kriteria:
- Session ID: ${sessionId}
- Timestamp: ${new Date().toISOString()}
- Topik fokus: ${selectedTopics}
- Variasi WAJIB: angka berbeda, kasus berbeda, konteks berbeda
- Minimal 2 soal berupa real-world calculation scenario

MULAI GENERATE SEKARANG (JSON array only):`;

  // Try upstream: batch A + batch B parallel (5+5 soal), toleransi 1 gagal.
  if (apiKey) {
    try {
      const settled = await Promise.allSettled([
        callUpstream(apiKey, systemPrompt, userPrompt),
        callUpstream(apiKey, systemPrompt, userPrompt),
      ]);
      const questions = settled.flatMap((s) => {
        if (s.status !== 'fulfilled') return [];
        try { return extractQuestions(s.value); } catch { return []; }
      }).filter(valid);
      if (questions.length < 5) {
        throw new Error('Not enough questions');
      }
      // Top-up dari bank lokal agar client selalu terima 10 soal
      const need = 10 - questions.length;
      const topUp = need > 0 ? shuffle(FALLBACK).slice(0, need) : [];
      return res.status(200).json({
        source: topUp.length ? 'api+fallback' : 'api',
        questions: [...questions.slice(0, 10), ...topUp],
      });
    } catch (err) {
      console.warn('Upstream failed, using fallback:', err?.message);
    }
  }

  // Emergency fallback bank
  return res.status(200).json({ source: 'fallback', questions: shuffle(FALLBACK).slice(0, 10) });
}

const FALLBACK = [
  { question: 'Tarif PPh 21 untuk penghasilan Rp 0 - 60 juta per tahun adalah?', options: ['5%', '15%', '25%', '30%'], answerIndex: 0, explanation: 'Berdasarkan UU HPP, tarif PPh 21 lapisan pertama (Rp 0-60 juta) adalah 5%' },
  { question: 'Kategori TER A berlaku untuk penghasilan bruto tahunan maksimal?', options: ['Rp 60 juta', 'Rp 250 juta', 'Rp 500 juta', 'Tidak terbatas'], answerIndex: 0, explanation: 'TER Kategori A untuk penghasilan bruto tahunan sampai dengan Rp 60 juta' },
  { question: 'Perhitungan PPh 21 bulan Desember menggunakan metode?', options: ['TER bulanan', 'Gross-up', 'Tahunan dikurangi TER Jan-Nov', 'Nett method'], answerIndex: 2, explanation: 'Desember = PPh 21 tahunan dikurangi total TER Januari-November' },
  { question: 'PTKP untuk Wajib Pajak tidak kawin tanpa tanggungan (TK/0) adalah?', options: ['Rp 54 juta', 'Rp 58,5 juta', 'Rp 63 juta', 'Rp 67,5 juta'], answerIndex: 0, explanation: 'PTKP TK/0 adalah Rp 54.000.000 per tahun' },
  { question: 'Tambahan PTKP untuk status kawin (K/0) dibanding TK/0 adalah?', options: ['Rp 4,5 juta', 'Rp 5 juta', 'Rp 5,5 juta', 'Rp 6 juta'], answerIndex: 0, explanation: 'Tambahan PTKP kawin Rp 4.500.000 (K/0 = Rp 58,5 juta)' },
  { question: 'Tambahan PTKP per tanggungan adalah?', options: ['Rp 3 juta', 'Rp 4,5 juta', 'Rp 5,4 juta', 'Rp 6 juta'], answerIndex: 1, explanation: 'Tambahan PTKP per tanggungan adalah Rp 4.500.000 (maksimal 3 tanggungan)' },
  { question: 'PPN standar di Indonesia saat ini adalah?', options: ['10%', '11%', '12%', '15%'], answerIndex: 1, explanation: 'Per 1 April 2022, tarif PPN standar Indonesia adalah 11%' },
  { question: 'Pengusaha wajib PKP jika omzet per tahun melebihi?', options: ['Rp 1 miliar', 'Rp 2,4 miliar', 'Rp 4,8 miliar', 'Rp 10 miliar'], answerIndex: 2, explanation: 'Batas omzet wajib PKP adalah Rp 4,8 miliar per tahun' },
  { question: 'PPN Masukan dapat dikreditkan jika?', options: ['Untuk kegiatan usaha', 'Ada faktur pajak', 'Keduanya benar', 'Tidak bisa dikreditkan'], answerIndex: 2, explanation: 'PPN Masukan dapat dikreditkan jika untuk kegiatan usaha DAN ada faktur pajak' },
  { question: 'Koreksi fiskal positif adalah?', options: ['Biaya yang tidak boleh dikurangkan dari penghasilan bruto', 'Penghasilan yang tidak termasuk objek pajak', 'Penyusutan aktiva tetap', 'Kredit pajak'], answerIndex: 0, explanation: 'Koreksi fiskal positif menambah laba fiskal karena biaya tidak diakui pajak' },
  { question: 'Contoh Beda Tetap adalah?', options: ['Penyusutan komersial vs fiskal', 'Entertainment 50%', 'Piutang tak tertagih', 'Semua salah'], answerIndex: 1, explanation: 'Beda Tetap: biaya entertainment 50% tidak dapat dikurangkan selamanya' },
  { question: 'Contoh Beda Waktu adalah?', options: ['Sanksi pajak', 'Natura karyawan', 'Penyusutan', 'Sumbangan'], answerIndex: 2, explanation: 'Beda Waktu: perbedaan penyusutan komersial vs fiskal yang akan terpulihkan' },
  { question: 'Tarif PPh Final UMKM dengan omzet ≤ Rp 4,8 miliar adalah?', options: ['0.5%', '1%', '2%', '5%'], answerIndex: 0, explanation: 'PPh Final UMKM PP 55/2022 adalah 0.5% dari omzet bruto' },
  { question: 'PPh Final UMKM 0.5% dapat dimanfaatkan selama maksimal?', options: ['3 tahun', '5 tahun', '7 tahun', 'Selamanya'], answerIndex: 2, explanation: 'PPh Final UMKM dapat dimanfaatkan maksimal 7 tahun pajak' },
  { question: 'Saldo normal akun Kas adalah?', options: ['Debit', 'Kredit', 'Nol', 'Tergantung'], answerIndex: 0, explanation: 'Kas adalah akun Aset dengan saldo normal Debit' },
  { question: 'Saldo normal akun Utang Usaha adalah?', options: ['Debit', 'Kredit', 'Nol', 'Tergantung'], answerIndex: 1, explanation: 'Utang Usaha adalah akun Kewajiban dengan saldo normal Kredit' },
  { question: 'Saldo normal akun Pendapatan adalah?', options: ['Debit', 'Kredit', 'Nol', 'Tergantung'], answerIndex: 1, explanation: 'Pendapatan memiliki saldo normal Kredit' },
  { question: 'Jurnal untuk mencatat penjualan tunai: Kas (D) dan?', options: ['Piutang (K)', 'Pendapatan (K)', 'Modal (K)', 'Beban (D)'], answerIndex: 1, explanation: 'Penjualan tunai: Kas (D) dan Pendapatan (K)' },
  { question: 'Laporan yang menunjukkan posisi keuangan pada tanggal tertentu adalah?', options: ['Laba Rugi', 'Neraca', 'Arus Kas', 'Perubahan Modal'], answerIndex: 1, explanation: 'Neraca menunjukkan posisi keuangan pada tanggal tertentu' },
  { question: 'Rumus Laporan Laba Rugi adalah?', options: ['Aset - Kewajiban', 'Pendapatan - Beban', 'Kas Masuk - Kas Keluar', 'Modal Awal + Laba'], answerIndex: 1, explanation: 'Laba Rugi = Pendapatan - Beban selama periode tertentu' },
  { question: 'Laporan Arus Kas terdiri dari aktivitas?', options: ['Operasi saja', 'Operasi & Investasi', 'Operasi, Investasi, Pendanaan', 'Semua transaksi'], answerIndex: 2, explanation: 'Laporan Arus Kas: Operasi, Investasi, dan Pendanaan' },
  { question: 'Metode perhitungan PPh 21 yang menanggung pajak karyawan adalah?', options: ['Gross', 'Nett', 'Gross-up', 'TER'], answerIndex: 2, explanation: 'Gross-up: perusahaan menanggung PPh 21 karyawan dan di-gross up' },
  { question: 'Bonus karyawan yang dibayar terpisah dikenakan PPh 21 dengan tarif?', options: ['Digabung gaji', 'Tarif rata-rata', 'Tarif tertinggi', 'TER'], answerIndex: 1, explanation: 'Bonus terpisah dikenakan tarif rata-rata PPh 21 setahun' },
];
