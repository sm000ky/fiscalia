# TaxQuest: Tax & Accounting RPG Dashboard 🎮💼

Web Application interaktif dengan UI retro pixel/8-bit untuk mahasiswa Akuntansi Perpajakan.

## 🎨 Features

### 1. **HERO BASE** - Dashboard Stats
- Character profile card (Level, Class, Mana, Ngantuk Meter)
- Daily random quotes humor akuntansi perpajakan
- Quick access widgets: Kurs Pajak, Schedule, Quick Calculator
- Achievement badges earned

### 2. **PPH 21 TER CALCULATOR** - Interactive Tools
- Slider input untuk Gaji & Tunjangan
- Selector status PTKP (TK/0, K/1, K/2, dst)
- Real-time calculation dengan kategori TER (A/B/C)
- Visual breakdown grafik potongan Jan-Nov vs Desember
- Take home pay calculation

### 3. **QUIZ ARENA** - Mini Game
- 5 pertanyaan pilihan ganda seputar PPh 21, PPN, Rekonsiliasi Fiskal
- Score system dengan combo multiplier
- Visual feedback (green/red) untuk jawaban benar/salah
- Badge reward & replay option

### 4. **FISCAL RECON MATRIX** - Interactive Cheatsheet
- Matrix koreksi positif vs negatif
- Clickable items dengan detail:
  - Dasar hukum (Pasal UU)
  - Alasan koreksi
- Formula rekonsiliasi fiskal
- Color-coded (red=positif, green=negatif)

## 🎯 Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Fonts:** Press Start 2P (pixel), VT323 (retro)
- **Theme:** Dark mode dengan neon colors (purple, cyan, yellow, pink)

## 🚀 Local Development

### Install Dependencies
```bash
cd taxquest-app
npm install
```

### Run Development Server
```bash
npm run dev
```

App akan berjalan di `http://localhost:3000`

### Build for Production
```bash
npm run build
```

Output ada di folder `dist/`

## 📦 Deploy ke Vercel

### Method 1: Vercel CLI (Recommended)

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Login ke Vercel:
```bash
vercel login
```

3. Deploy dari folder project:
```bash
cd taxquest-app
vercel
```

4. Ikuti prompt:
   - Set up and deploy? **Y**
   - Which scope? Pilih account kamu
   - Link to existing project? **N** (kalau pertama kali)
   - What's your project's name? **taxquest-app** (atau custom)
   - In which directory is your code located? **./
   - Want to override the settings? **N**

5. Deploy production:
```bash
vercel --prod
```

### Method 2: Vercel Web Dashboard

1. Build project dulu:
```bash
npm run build
```

2. Buka https://vercel.com/new

3. Pilih **Add GitHub/GitLab** atau **Import Third-Party Git Repository**

   **Atau upload manual:**
   - Drag & drop folder `taxquest-app` ke Vercel dashboard
   - Vercel auto-detect Vite config

4. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** ./
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

5. Klik **Deploy**

6. Tunggu ~1-2 menit, app live di URL: `https://taxquest-app-xxx.vercel.app`

### Method 3: GitHub + Vercel Auto Deploy

1. Push project ke GitHub:
```bash
git init
git add .
git commit -m "Initial commit TaxQuest RPG"
git remote add origin https://github.com/username/taxquest-app.git
git push -u origin main
```

2. Buka Vercel Dashboard → **Add New Project**

3. Import repository `taxquest-app`

4. Vercel auto-detect settings, klik **Deploy**

5. Setiap push ke GitHub, Vercel auto-deploy!

## 📁 Project Structure

```
taxquest-app/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   └── components/
│       ├── HeroDashboard.jsx
│       ├── PphCalculator.jsx
│       ├── QuizArena.jsx
│       └── FiscalRecon.jsx
└── README.md
```

## 🎮 Design Features

- **Pixel Border:** 4px solid border dengan shadow bertumpuk
- **Retro Button:** Hover effect dengan transform translate
- **Neon Text:** Pulse animation dengan text-shadow glow
- **Health/Mana Bars:** Animated progress bars
- **Combo System:** Visual multiplier di quiz
- **Responsive:** Mobile-friendly dengan Tailwind breakpoints

## 🧪 Testing Locally

Buka browser dan test fitur:
1. ✅ Hero Dashboard → Check widgets, quotes random
2. ✅ PPh Calculator → Geser slider, cek perhitungan real-time
3. ✅ Quiz Arena → Jawab quiz, cek score & combo
4. ✅ Fiscal Recon → Klik item, lihat detail popup

## 📝 Notes

- Font "Press Start 2P" loaded dari Google Fonts
- All calculations based on PMK 168/2023 (TER)
- Quiz questions bisa diexpand di `QuizArena.jsx`
- Fiscal recon items bisa ditambah di `FiscalRecon.jsx`

## 🎯 Future Enhancements

- [ ] Local storage untuk save progress
- [ ] More quiz questions & categories
- [ ] PPh Pasal 23/26 calculator
- [ ] Animated character sprites
- [ ] Sound effects (8-bit style)
- [ ] Leaderboard system

## 📄 License

MIT License - Build with ❤️ for Tax Warriors

---

Made with React + Vite • Deployed on Vercel
