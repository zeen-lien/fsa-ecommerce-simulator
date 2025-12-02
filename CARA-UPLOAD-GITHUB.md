# 📤 Panduan Upload ke GitHub Pages (100% GRATIS!)

## 🎯 Langkah-Langkah Upload

### **Step 1: Buat Repository di GitHub**

1. Buka browser, pergi ke: **https://github.com**
2. Login dengan akun GitHub lo (kalau belum punya, daftar dulu - GRATIS!)
3. Klik tombol **"+"** di pojok kanan atas
4. Pilih **"New repository"**
5. Isi form:
   - **Repository name**: `fsa-ecommerce-simulator`
   - **Description**: `Simulasi FSA E-commerce - Tugas UAS TBA`
   - **Public** (centang ini biar bisa pakai GitHub Pages gratis)
   - **JANGAN** centang "Add a README file" (kita udah punya)
6. Klik **"Create repository"**

### **Step 2: Upload Files ke GitHub**

Ada 2 cara: **Manual (Mudah)** atau **Git Command (Pro)**

---

#### **Cara A: Manual Upload (PALING GAMPANG!)** ⭐

1. Di halaman repository yang baru dibuat, klik **"uploading an existing file"**
2. Drag & drop SEMUA file & folder project lo:
   ```
   ✅ index.html
   ✅ styles.css
   ✅ src/ (folder lengkap)
   ✅ public/ (folder lengkap)
   ✅ LAPORAN-TUGAS-UAS.md
   ✅ README.md
   ✅ .gitignore
   ```
3. Tunggu sampai semua file ke-upload (ada progress bar)
4. Di bagian bawah, tulis commit message:
   ```
   Initial commit - FSA E-commerce Simulator
   ```
5. Klik **"Commit changes"**
6. DONE! ✅

---

#### **Cara B: Pakai Git Command (Kalau Lo Udah Install Git)**

1. Buka **Command Prompt** atau **Terminal** di folder project lo
2. Jalankan command ini satu per satu:

```bash
# Initialize git
git init

# Add semua file
git add .

# Commit
git commit -m "Initial commit - FSA E-commerce Simulator"

# Tambah remote (ganti [username] dengan username GitHub lo)
git remote add origin https://github.com/[username]/fsa-ecommerce-simulator.git

# Push ke GitHub
git branch -M main
git push -u origin main
```

3. Kalau diminta login, masukkan username & password GitHub lo
4. DONE! ✅

---

### **Step 3: Aktifkan GitHub Pages**

1. Di repository GitHub lo, klik tab **"Settings"** (pojok kanan atas)
2. Scroll ke bawah, cari menu **"Pages"** di sidebar kiri
3. Di bagian **"Source"**:
   - Branch: pilih **"main"**
   - Folder: pilih **"/ (root)"**
4. Klik **"Save"**
5. Tunggu 1-2 menit
6. Refresh halaman
7. Lo akan lihat kotak hijau dengan link:
   ```
   Your site is published at https://[username].github.io/fsa-ecommerce-simulator
   ```
8. Klik link itu buat buka website lo! 🎉

---

## 🔗 Link yang Lo Dapet:

- **GitHub Repo**: `https://github.com/[username]/fsa-ecommerce-simulator`
- **Live Website**: `https://[username].github.io/fsa-ecommerce-simulator`
- **Laporan**: `https://github.com/[username]/fsa-ecommerce-simulator/blob/main/LAPORAN-TUGAS-UAS.md`

---

## 📝 Update README dengan Link Live Demo

Setelah deploy, jangan lupa update file `README.md`:

1. Buka file `README.md` di GitHub
2. Klik icon **pensil** (Edit)
3. Cari baris:
   ```markdown
   Akses langsung di: **https://[username].github.io/fsa-ecommerce-simulator**
   ```
4. Ganti `[username]` dengan username GitHub lo
5. Scroll ke bawah, klik **"Commit changes"**

---

## ❓ Troubleshooting

### **Website ga muncul / Error 404?**
- Tunggu 5-10 menit (GitHub Pages butuh waktu build)
- Pastikan file `index.html` ada di **root folder** (bukan di dalam folder `public`)
- Cek Settings → Pages, pastikan Source udah di-set ke `main` branch

### **CSS ga load / tampilan berantakan?**
- Pastikan file `styles.css` ada di **root folder**
- Cek di `index.html`, pastikan link CSS nya:
  ```html
  <link rel="stylesheet" href="styles.css">
  ```

### **JavaScript error?**
- Cek di `index.html`, pastikan script tag nya:
  ```html
  <script type="module" src="src/app.js"></script>
  ```

---

## 🎉 Selesai!

Sekarang lo punya:
- ✅ Repository GitHub yang rapi
- ✅ Website live yang bisa diakses siapa aja
- ✅ Link buat dikasih ke dosen
- ✅ Portfolio project yang keren!

**Kirim link ini ke dosen:**
```
GitHub: https://github.com/[username]/fsa-ecommerce-simulator
Live Demo: https://[username].github.io/fsa-ecommerce-simulator
```

---

## 💡 Tips Tambahan

1. **Custom Domain** (Optional):
   - Kalau lo punya domain sendiri, bisa di-connect ke GitHub Pages
   - Gratis & gampang!

2. **Update Project**:
   - Kalau mau update code, tinggal edit file di GitHub
   - Atau push lagi dari local pakai git
   - GitHub Pages auto-update dalam 1-2 menit

3. **Analytics** (Optional):
   - Bisa tambahin Google Analytics buat track visitor
   - Tinggal tambahin script di `index.html`

---

**Good luck bro! 🚀**
