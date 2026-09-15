# 🚀 QUICK START GUIDE - TaxQuest RPG

## ⚡ Deploy dalam 3 Langkah

### Opsi A: Deploy Otomatis (Termux/Linux)
```bash
cd taxquest-app
chmod +x deploy.sh
./deploy.sh
```

Script akan:
1. Install dependencies
2. Build project
3. Deploy ke Vercel (jika pilih "y")

---

### Opsi B: Manual Step-by-Step

#### 1️⃣ Install Dependencies
```bash
cd taxquest-app
npm install
```

#### 2️⃣ Test Locally
```bash
npm run dev
```
Buka browser: `http://localhost:3000`

#### 3️⃣ Build Production
```bash
npm run build
```
Output folder: `dist/`

#### 4️⃣ Deploy ke Vercel

**Via CLI:**
```bash
npm install -g vercel
vercel login
vercel --prod
```

**Via Web:**
1. Buka https://vercel.com/new
2. Upload folder `taxquest-app`
3. Vercel auto-detect Vite
4. Klik **Deploy**
5. Done! 🎉

---

## 📱 Test Checklist

Setelah deploy, test fitur:

- [ ] **Hero Base Tab**
  - [ ] Character card tampil
  - [ ] Daily quote random
  - [ ] Kurs pajak widget
  - [ ] Schedule widget
  - [ ] Quick calculator

- [ ] **PPh 21 Calculator Tab**
  - [ ] Slider gaji & tunjangan berfungsi
  - [ ] Dropdown status PTKP
  - [ ] Kategori TER otomatis
  - [ ] Tarif TER real-time
  - [ ] Take home pay calculation
  - [ ] Grafik bar tampil

- [ ] **Quiz Arena Tab**
  - [ ] Question tampil
  - [ ] Button jawaban clickable
  - [ ] Score bertambah saat benar
  - [ ] Combo multiplier muncul
  - [ ] Visual feedback (green/red)
  - [ ] Final score & restart

- [ ] **Fiscal Recon Tab**
  - [ ] Matrix koreksi positif/negatif
  - [ ] Item clickable
  - [ ] Detail popup muncul (pasal + alasan)
  - [ ] Formula rekonsiliasi tampil

---

## 🎨 Retro Design Features

✅ Font pixel: Press Start 2P
✅ Font retro: VT323
✅ Neon colors: purple, cyan, yellow, pink
✅ Pixel border dengan shadow
✅ Retro button hover effect
✅ Health/Energy bars animated
✅ Blink animation
✅ Neon glow effect

---

## 🐛 Troubleshooting

### Build Error: Module not found
```bash
rm -rf node_modules package-lock.json
npm install
```

### Vercel CLI not found
```bash
npm install -g vercel
```

### Port 3000 already in use
Edit `vite.config.js`, ganti port:
```js
server: {
  port: 3001  // atau port lain
}
```

### Font tidak load
Check internet connection (Google Fonts CDN di `index.html`)

---

## 📊 File Size

- Total source code: ~50 KB
- After build (dist): ~200 KB
- Dependencies: ~15 MB (node_modules, tidak di-deploy)

---

## 🔗 Links

- Live Demo: `https://taxquest-app.vercel.app` (setelah deploy)
- Vercel Dashboard: https://vercel.com/dashboard
- GitHub (optional): Upload untuk auto-deploy

---

## 💡 Tips

1. **Custom Domain:** Di Vercel dashboard → Settings → Domains
2. **Analytics:** Aktifkan Vercel Analytics gratis
3. **Environment Variables:** Vercel dashboard → Settings → Environment Variables
4. **Auto Deploy:** Connect GitHub untuk auto-deploy setiap push

---

## 🎮 Enjoy Playing TaxQuest!

Made with ❤️ for Tax Warriors 🦸‍♂️
