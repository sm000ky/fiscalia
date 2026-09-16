/**
 * Quiz Generator Utility
 * Fetch auto-generated quiz questions from backend
 */

const API_ENDPOINT = 'https://sakithati.bond/v1/chat/completions';
const API_KEY = 'elf-live-0f00da3f6da781df2a3887ca935d8407';
const MODEL = 'elf/qwen3.8-flash';

/**
 * Fetch auto-generated quiz questions
 * @returns {Promise<Array>} Array of quiz questions
 */
export async function fetchAutoQuiz() {
  const timestamp = Date.now()
  const randomSeed = Math.floor(Math.random() * 100000)
  const sessionId = `${timestamp}_${randomSeed}`
  
  // Topic pool untuk variasi
  const topics = [
    'PPh 21 TER dan perhitungan gaji',
    'PTKP dan status perkawinan',
    'PPN dan PKP',
    'Rekonsiliasi Fiskal (Beda Tetap & Waktu)',
    'PPh Final UMKM PP 55/2022',
    'Jurnal Akuntansi dasar',
    'Laporan Keuangan',
    'PPh Pasal 22, 23, 24, 25, 26',
    'Metode penyusutan aktiva tetap',
    'Kredit Pajak dan SPT Tahunan'
  ]
  
  // Shuffle topics
  const shuffledTopics = topics.sort(() => Math.random() - 0.5)
  const selectedTopics = shuffledTopics.slice(0, 5).join(', ')
  
  const systemPrompt = `Kamu adalah expert pembuat soal akuntansi & perpajakan Indonesia untuk game edukasi TaxQuest RPG.

ATURAN KETAT:
1. Setiap request WAJIB generate soal BERBEDA dari sebelumnya
2. Variasikan topik, angka, kasus, dan konteks
3. Fokus pada topik: ${selectedTopics}
4. Soal harus praktis, real-world scenario, bukan teori kering
5. Hindari soal dengan pola berulang

FORMAT OUTPUT:
WAJIB return HANYA JSON array valid tanpa markdown/code block:
[{"question":"...","options":["A","B","C","D"],"answerIndex":0,"explanation":"..."}]

CONTOH VARIASI:
- PPh 21: hitung gaji berbeda, status PTKP berbeda, bulan berbeda
- PPN: kasus PKP, ekspor, impor, faktur pajak
- Rekonsiliasi: kasus entertainment, natura, sumbangan, penyusutan
- Real scenario: "PT ABC bayar gaji Rp X ke karyawan status K/2, hitunglah..."
`

  const userPrompt = `Generate 10 soal pilihan ganda UNIK dengan kriteria:
- Session ID: ${sessionId}
- Random seed: ${randomSeed}
- Timestamp: ${new Date().toISOString()}
- Topik fokus: ${selectedTopics}
- Variasi WAJIB: angka berbeda, kasus berbeda, konteks berbeda
- Tidak boleh soal template atau duplikat
- Minimal 3 soal berupa real-world calculation scenario
- PENTING: Jangan pernah generate soal yang sama dengan request sebelumnya

MULAI GENERATE SEKARANG (JSON array only):`

  console.log(`🎲 Quiz Request - SessionID: ${sessionId}, Topics: ${selectedTopics}`)

  // Retry wrapper: endpoint can be flaky (524 timeouts), so we retry before falling back
  const callAPI = async () => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 60000);
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: userPrompt
            }
          ],
          temperature: 1.0, // Max creativity
          max_tokens: 2500,
          top_p: 0.95
        }),
        cache: 'no-store',
        signal: controller.signal
      });
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } finally {
      clearTimeout(timer);
    }
  };

  const extractQuestions = (raw) => {
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
  };

  try {
    let questions;
    let lastErr;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const data = await callAPI();
        questions = extractQuestions(data);
        break;
      } catch (err) {
        lastErr = err;
        console.warn(`⚠ Quiz API attempt ${attempt} failed: ${err.message}`);
      }
    }
    if (!questions) {
      throw lastErr || new Error('All API attempts failed');
    }

    const content = questions; // already parsed array
    
    // Validate structure
    if (!Array.isArray(questions) || questions.length < 10) {
      throw new Error('Invalid quiz format or not enough questions');
    }
    
    // Validate each question
    questions.forEach((q, idx) => {
      if (!q.question || !Array.isArray(q.options) || q.options.length !== 4 || 
          typeof q.answerIndex !== 'number' || !q.explanation) {
        throw new Error(`Invalid question format at index ${idx}`);
      }
    });
    
    // Log first 2 questions for debugging randomness
    console.log('✓ Fetched 10 fresh questions from API')
    console.log('📋 Sample Q1:', questions[0].question.substring(0, 60) + '...')
    console.log('📋 Sample Q2:', questions[1].question.substring(0, 60) + '...')
    
    return questions.slice(0, 10);
    
  } catch (error) {
    console.error('Quiz Generator Error:', error);
    // Only use fallback as last resort with warning
    console.warn('⚠ API unavailable, using emergency fallback')
    return getFallbackQuestions();
  }
}

/**
 * Validate quiz question structure
 * @param {Object} question
 * @returns {boolean}
 */
export function validateQuizQuestion(question) {
  return (
    question &&
    typeof question.question === 'string' &&
    Array.isArray(question.options) &&
    question.options.length === 4 &&
    typeof question.answerIndex === 'number' &&
    question.answerIndex >= 0 &&
    question.answerIndex < 4 &&
    typeof question.explanation === 'string'
  );
}

/**
 * Get fallback questions when API fails
 * @returns {Array} 20+ bank soal default
 */
function getFallbackQuestions() {
  const allQuestions = [
    // PPh 21 TER
    {
      question: 'Tarif PPh 21 untuk penghasilan Rp 0 - 60 juta per tahun adalah?',
      options: ['5%', '15%', '25%', '30%'],
      answerIndex: 0,
      explanation: 'Berdasarkan UU HPP, tarif PPh 21 lapisan pertama (Rp 0-60 juta) adalah 5%'
    },
    {
      question: 'Kategori TER A berlaku untuk penghasilan bruto tahunan maksimal?',
      options: ['Rp 60 juta', 'Rp 250 juta', 'Rp 500 juta', 'Tidak terbatas'],
      answerIndex: 0,
      explanation: 'TER Kategori A untuk penghasilan bruto tahunan sampai dengan Rp 60 juta'
    },
    {
      question: 'Perhitungan PPh 21 bulan Desember menggunakan metode?',
      options: ['TER bulanan', 'Gross-up', 'Tahunan dikurangi TER Jan-Nov', 'Nett method'],
      answerIndex: 2,
      explanation: 'Desember = PPh 21 tahunan dikurangi total TER Januari-November'
    },
    
    // PTKP
    {
      question: 'PTKP untuk Wajib Pajak tidak kawin tanpa tanggungan (TK/0) adalah?',
      options: ['Rp 54 juta', 'Rp 58,5 juta', 'Rp 63 juta', 'Rp 67,5 juta'],
      answerIndex: 0,
      explanation: 'PTKP TK/0 adalah Rp 54.000.000 per tahun'
    },
    {
      question: 'Tambahan PTKP untuk status kawin (K/0) dibanding TK/0 adalah?',
      options: ['Rp 4,5 juta', 'Rp 5 juta', 'Rp 5,5 juta', 'Rp 6 juta'],
      answerIndex: 0,
      explanation: 'Tambahan PTKP kawin Rp 4.500.000 (K/0 = Rp 58,5 juta - TK/0 Rp 54 juta)'
    },
    {
      question: 'Tambahan PTKP per tanggungan adalah?',
      options: ['Rp 3 juta', 'Rp 4,5 juta', 'Rp 5,4 juta', 'Rp 6 juta'],
      answerIndex: 1,
      explanation: 'Tambahan PTKP per tanggungan adalah Rp 4.500.000 (maksimal 3 tanggungan)'
    },
    
    // PPN
    {
      question: 'PPN standar di Indonesia saat ini adalah?',
      options: ['10%', '11%', '12%', '15%'],
      answerIndex: 1,
      explanation: 'Per 1 April 2022, tarif PPN standar Indonesia adalah 11%'
    },
    {
      question: 'Pengusaha wajib PKP jika omzet per tahun melebihi?',
      options: ['Rp 1 miliar', 'Rp 2,4 miliar', 'Rp 4,8 miliar', 'Rp 10 miliar'],
      answerIndex: 2,
      explanation: 'Batas omzet wajib PKP adalah Rp 4,8 miliar per tahun'
    },
    {
      question: 'PPN Masukan dapat dikreditkan jika?',
      options: ['Untuk kegiatan usaha', 'Ada faktur pajak', 'Keduanya benar', 'Tidak bisa dikreditkan'],
      answerIndex: 2,
      explanation: 'PPN Masukan dapat dikreditkan jika untuk kegiatan usaha DAN ada faktur pajak'
    },
    
    // Rekonsiliasi Fiskal
    {
      question: 'Koreksi fiskal positif adalah?',
      options: [
        'Biaya yang tidak boleh dikurangkan dari penghasilan bruto',
        'Penghasilan yang tidak termasuk objek pajak',
        'Penyusutan aktiva tetap',
        'Kredit pajak'
      ],
      answerIndex: 0,
      explanation: 'Koreksi fiskal positif menambah laba fiskal karena biaya tidak diakui pajak'
    },
    {
      question: 'Contoh Beda Tetap adalah?',
      options: ['Penyusutan komersial vs fiskal', 'Entertainment 50%', 'Piutang tak tertagih', 'Semua salah'],
      answerIndex: 1,
      explanation: 'Beda Tetap: biaya entertainment 50% tidak dapat dikurangkan selamanya'
    },
    {
      question: 'Contoh Beda Waktu adalah?',
      options: ['Sanksi pajak', 'Natura karyawan', 'Penyusutan', 'Sumbangan'],
      answerIndex: 2,
      explanation: 'Beda Waktu: perbedaan penyusutan komersial vs fiskal yang akan terpulihkan'
    },
    
    // PPh Final UMKM
    {
      question: 'Tarif PPh Final UMKM dengan omzet ≤ Rp 4,8 miliar adalah?',
      options: ['0.5%', '1%', '2%', '5%'],
      answerIndex: 0,
      explanation: 'PPh Final UMKM PP 55/2022 adalah 0.5% dari omzet bruto'
    },
    {
      question: 'PPh Final UMKM 0.5% dapat dimanfaatkan selama maksimal?',
      options: ['3 tahun', '5 tahun', '7 tahun', 'Selamanya'],
      answerIndex: 2,
      explanation: 'PPh Final UMKM dapat dimanfaatkan maksimal 7 tahun pajak'
    },
    
    // Jurnal Akuntansi
    {
      question: 'Saldo normal akun Kas adalah?',
      options: ['Debit', 'Kredit', 'Nol', 'Tergantung'],
      answerIndex: 0,
      explanation: 'Kas adalah akun Aset dengan saldo normal Debit'
    },
    {
      question: 'Saldo normal akun Utang Usaha adalah?',
      options: ['Debit', 'Kredit', 'Nol', 'Tergantung'],
      answerIndex: 1,
      explanation: 'Utang Usaha adalah akun Kewajiban dengan saldo normal Kredit'
    },
    {
      question: 'Saldo normal akun Pendapatan adalah?',
      options: ['Debit', 'Kredit', 'Nol', 'Tergantung'],
      answerIndex: 1,
      explanation: 'Pendapatan memiliki saldo normal Kredit'
    },
    {
      question: 'Jurnal untuk mencatat penjualan tunai: Kas (D) dan?',
      options: ['Piutang (K)', 'Pendapatan (K)', 'Modal (K)', 'Beban (D)'],
      answerIndex: 1,
      explanation: 'Penjualan tunai: Kas (D) dan Pendapatan (K)'
    },
    
    // Laporan Keuangan
    {
      question: 'Laporan yang menunjukkan posisi keuangan pada tanggal tertentu adalah?',
      options: ['Laba Rugi', 'Neraca', 'Arus Kas', 'Perubahan Modal'],
      answerIndex: 1,
      explanation: 'Neraca menunjukkan posisi keuangan (Aset = Kewajiban + Ekuitas) pada tanggal tertentu'
    },
    {
      question: 'Rumus Laporan Laba Rugi adalah?',
      options: ['Aset - Kewajiban', 'Pendapatan - Beban', 'Kas Masuk - Kas Keluar', 'Modal Awal + Laba'],
      answerIndex: 1,
      explanation: 'Laba Rugi = Pendapatan - Beban selama periode tertentu'
    },
    {
      question: 'Laporan Arus Kas terdiri dari aktivitas?',
      options: ['Operasi saja', 'Operasi & Investasi', 'Operasi, Investasi, Pendanaan', 'Semua transaksi'],
      answerIndex: 2,
      explanation: 'Laporan Arus Kas: Aktivitas Operasi, Investasi, dan Pendanaan'
    },
    
    // PPh 21 Lanjutan
    {
      question: 'Metode perhitungan PPh 21 yang menanggung pajak karyawan adalah?',
      options: ['Gross', 'Nett', 'Gross-up', 'TER'],
      answerIndex: 2,
      explanation: 'Gross-up: perusahaan menanggung PPh 21 karyawan dan di-gross up ke penghasilan'
    },
    {
      question: 'Bonus karyawan yang dibayar terpisah dikenakan PPh 21 dengan tarif?',
      options: ['Digabung gaji', 'Tarif rata-rata', 'Tarif tertinggi', 'TER'],
      answerIndex: 1,
      explanation: 'Bonus terpisah dikenakan tarif rata-rata PPh 21 setahun'
    }
  ]
  
  // Shuffle and return 10 random questions
  return allQuestions.sort(() => Math.random() - 0.5).slice(0, 10)
}
