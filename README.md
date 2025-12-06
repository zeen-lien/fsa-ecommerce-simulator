# 🛒 Sistem E-commerce dengan Validasi FSA

Implementasi Finite State Automata (FSA) untuk validasi format ID pesanan pada sistem e-commerce.

---

## 📋 Deskripsi

Sistem e-commerce lengkap yang menggunakan **Finite State Automata (FSA)** di background untuk memvalidasi format ID pesanan secara otomatis. FSA bekerja sebagai komponen validasi yang memastikan setiap ID pesanan mengikuti format standar: `ORD-XXXX-YYYY`

### 🎯 Fokus Utama: FSA di Background

**User tidak perlu tahu ada FSA**, tapi setiap kali ada proses yang melibatkan ID pesanan (generate atau input), FSA akan bekerja untuk memvalidasi format.

---

## ✨ Fitur Sistem

### 1. Dashboard
- Overview statistik pesanan dengan animasi
- Informasi tentang sistem FSA
- Format ID yang valid
- **Desain:** Dark cyberpunk theme dengan neon effects

### 2. Buat Pesanan
- Form input data pesanan dengan validasi real-time
- Generate ID otomatis (divalidasi FSA)
- Simpan ke database lokal
- **SweetAlert2** notification yang keren

### 3. Daftar Pesanan
- List semua pesanan dengan hover effects
- Informasi lengkap setiap pesanan
- Status pesanan dengan color coding
- **Animasi:** Smooth slide-in animations

### 4. Cek Pesanan
- Input ID pesanan dengan glow effects
- **FSA validasi format** (FOKUS!)
- Tampilkan detail jika valid
- Error message jika invalid dengan SweetAlert2
- **Visual feedback** untuk setiap validasi

---

## 🔬 FSA Implementation

### Definisi Formal

```
M = (Q, Σ, δ, q₀, F)

Q  = {q0, q1, q2, ..., q13, qreject}  (15 states)
Σ  = {O, R, D, -, 0-9}                (alfabet input)
q₀ = q0                                (state awal)
F  = {q13}                             (state accept)
δ  = fungsi transisi (lihat folio)
```

### Format ID Valid

```
ORD-XXXX-YYYY

Keterangan:
- ORD  = Prefix wajib (3 huruf kapital)
- -    = Separator
- XXXX = 4 digit tahun (0-9)
- -    = Separator
- YYYY = 4 digit nomor urut (0-9)
```

### Contoh

✅ **Valid:**
- `ORD-2024-0001`
- `ORD-2025-9999`
- `ORD-1999-0123`

❌ **Invalid:**
- `ORDER-2024-0001` (prefix salah)
- `ORD-24-0001` (tahun kurang digit)
- `ORD-2024-01` (nomor urut kurang digit)

---

## 🚀 Cara Menggunakan

### Method 1: Buka Langsung di Browser

1. **Download/Clone repository**
2. **Buka file `index.html`** di browser
3. **Mulai gunakan sistem!**

### Method 2: Upload ke GitHub Pages

1. **Buat repository di GitHub**
2. **Upload file `index.html`**
3. **Aktifkan GitHub Pages:**
   - Settings → Pages
   - Source: main branch, / (root)
   - Save
4. **Akses via link:** `https://[username].github.io/[repo-name]`

---

## 📖 Cara Pakai Sistem

### 1. Dashboard
- Lihat statistik pesanan
- Baca informasi tentang FSA
- Pahami format ID yang valid

### 2. Buat Pesanan
- Isi form: Nama pelanggan, produk, jumlah, harga
- Klik "Buat Pesanan"
- Sistem generate ID otomatis (FSA validasi di background)
- ID disimpan ke database

### 3. Daftar Pesanan
- Lihat semua pesanan yang sudah dibuat
- Setiap pesanan punya ID yang sudah tervalidasi FSA

### 4. Cek Pesanan
- Input ID pesanan
- Klik "Cek"
- **FSA validasi format** (INTI!)
  - Jika format valid → cari di database → tampilkan detail
  - Jika format invalid → tampilkan error + penjelasan
- Lihat detail pesanan

---

## 🎓 Pembahasan (Folio)

Lihat file `LAPORAN-FINAL-FSA.md` untuk pembahasan lengkap:

### BAB 1: Pendahuluan
- Latar belakang
- Rumusan masalah
- Tujuan & manfaat

### BAB 2: Landasan Teori
- Definisi FSA
- Cara kerja FSA
- Kompleksitas
- Aplikasi FSA

### BAB 3: Perancangan
- Definisi formal FSA
- Tabel transisi lengkap
- Diagram state
- Contoh trace eksekusi

### BAB 4: Implementasi
- Arsitektur sistem
- Algoritma validasi
- Kode implementasi
- Integrasi FSA

### BAB 5: Pengujian
- Test case valid (10 contoh)
- Test case invalid (15 contoh)
- Analisis hasil (akurasi 100%)

### BAB 6: Penutup
- Kesimpulan
- Saran

---

## 💡 Konsep: FSA di Background

### Flow Sistem

```
User Action
    ↓
Application Logic
    ↓
⭐ FSA Validation (Background) ⭐
    ↓
Valid? 
    ├─ Ya → Database → Response
    └─ Tidak → Error Message
```

### Keuntungan

- ✅ Invalid format langsung ditolak (hemat resource)
- ✅ Tidak perlu query database untuk ID invalid
- ✅ Feedback cepat ke user
- ✅ Meningkatkan performa sistem
- ✅ User tidak perlu tahu ada FSA

---

## 🔧 Teknologi

- **HTML5** - Struktur
- **CSS3** - Styling dengan animasi & transitions
- **JavaScript (Vanilla)** - Logic & FSA
- **localStorage** - Database lokal
- **Font Awesome** - Icons
- **SweetAlert2** - Beautiful notifications
- **Dark Cyberpunk Theme** - Modern UI/UX
- **Neon Effects** - Glow & pulse animations

---

## 📊 Kompleksitas

### Waktu
```
O(n) dimana n = panjang string (maksimal 14 karakter)
```

### Ruang
```
O(1) - hanya menyimpan state saat ini
```

---

## ✅ Kelebihan

1. **Akurasi Tinggi:** 100% akurat dalam validasi format
2. **Efisien:** Kompleksitas O(n), sangat cepat
3. **Deterministik:** Hasil selalu konsisten
4. **User-Friendly:** Error message yang jelas
5. **Maintainable:** Kode terstruktur
6. **Educational:** Menunjukkan aplikasi FSA nyata

---

## ⚠️ Keterbatasan

1. **Format Terbatas:** Hanya 1 format (ORD-XXXX-YYYY)
2. **Tidak Cek Semantik:** Tidak validasi tahun (misal: 9999)
3. **Tidak Cek Database:** Tidak cek duplikasi ID
4. **Case Sensitive:** Huruf kecil tidak diterima

---

## 🎯 Saran Pengembangan

1. **Multi-Format:** Tambah format ID lain (CUST-XXXXX, PROD-XXX)
2. **Semantic Validation:** Validasi tahun (1900-2100)
3. **Case Insensitive:** Terima huruf kecil & auto-convert
4. **Database Integration:** Cek duplikasi ID
5. **Batch Validation:** Validasi banyak ID sekaligus

---

## 📚 Referensi

Lihat `LAPORAN-FINAL-FSA.md` untuk daftar pustaka lengkap.

---

## 👨‍💻 Author

**Nama:** [Nama Mahasiswa]  
**NIM:** [NIM]  
**Mata Kuliah:** Teori Bahasa dan Automata  
**Dosen:** [Nama Dosen]

---

## 📄 Lisensi

Project ini dibuat untuk keperluan akademik - Tugas UAS Teori Bahasa dan Automata.

---

## 🙏 Acknowledgments

- Terima kasih kepada Bapak/Ibu [Nama Dosen] atas bimbingannya
- Referensi: Buku-buku Automata Theory (lihat folio)

---

**⭐ Fokus Utama:** Implementasi FSA untuk validasi format ID pesanan, dimana FSA bekerja di background sebagai komponen validasi dalam sistem e-commerce.
