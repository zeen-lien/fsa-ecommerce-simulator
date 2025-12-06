# ✅ CHECKLIST TUGAS FSA

## 📋 File yang Sudah Dibuat

- [x] `LAPORAN-FINAL-FSA.md` - Folio lengkap 6 BAB
- [x] `index.html` - GUI Sistem E-commerce dengan FSA
- [x] `README.md` - Dokumentasi project
- [x] `CHECKLIST.md` - File ini

---

## 🎯 Yang Perlu Lo Lakuin

### Step 1: Test GUI ✅

- [ ] Buka file `index.html` di browser
- [ ] Lihat **Welcome Message** (SweetAlert2)
- [ ] Test Dashboard:
  - [ ] Lihat statistik dengan animasi neon
  - [ ] Baca informasi FSA
  - [ ] Perhatikan dark cyberpunk theme
- [ ] Test Buat Pesanan:
  - [ ] Isi form pesanan
  - [ ] Klik "Buat Pesanan"
  - [ ] Lihat **SweetAlert2 notification** yang keren
  - [ ] Lihat ID yang di-generate
  - [ ] Pastikan format: ORD-XXXX-YYYY
- [ ] Test Daftar Pesanan:
  - [ ] Lihat list pesanan dengan hover effects
  - [ ] Perhatikan animasi slide-in
  - [ ] Pastikan semua ID valid
- [ ] Test Cek Pesanan:
  - [ ] Input ID valid (contoh: ORD-2024-0001)
  - [ ] Lihat detail pesanan dengan glow effects
  - [ ] Input ID invalid (contoh: ORDER-2024-0001)
  - [ ] Lihat **SweetAlert2 error message** FSA

### Step 2: Review Folio ✅

- [ ] Buka `LAPORAN-FINAL-FSA.md`
- [ ] Isi data pribadi:
  - [ ] Nama mahasiswa
  - [ ] NIM
  - [ ] Nama dosen
  - [ ] Semester/tahun ajaran
  - [ ] Program studi
  - [ ] Fakultas
  - [ ] Universitas
- [ ] Baca BAB 1: Pendahuluan
- [ ] Baca BAB 2: Landasan Teori
- [ ] Baca BAB 3: Perancangan (paling penting!)
  - [ ] Pahami definisi formal FSA
  - [ ] Pahami tabel transisi
  - [ ] Pahami diagram state
  - [ ] Pahami trace eksekusi
- [ ] Baca BAB 4: Implementasi
- [ ] Baca BAB 5: Pengujian
- [ ] Baca BAB 6: Penutup

### Step 3: Persiapan Presentasi ✅

- [ ] Pahami konsep FSA di background
- [ ] Hafalkan definisi formal: M = (Q, Σ, δ, q₀, F)
- [ ] Bisa jelasin tabel transisi
- [ ] Bisa jelasin diagram state
- [ ] Bisa jelasin trace eksekusi
- [ ] Bisa demo GUI
- [ ] Siap jawab pertanyaan:
  - [ ] Kenapa pakai FSA?
  - [ ] Gimana cara kerja FSA?
  - [ ] Berapa kompleksitas?
  - [ ] Apa kelebihan & kekurangan?

### Step 4: Upload (Opsional) ✅

- [ ] Buat repository GitHub
- [ ] Upload file `index.html`
- [ ] Upload file `LAPORAN-FINAL-FSA.md`
- [ ] Upload file `README.md`
- [ ] Aktifkan GitHub Pages
- [ ] Test link online
- [ ] Tambahkan link di laporan

---

## 🎓 Checklist Sebelum Dikumpulkan

### File yang Harus Dikumpulkan:

- [ ] `index.html` - GUI Sistem E-commerce
- [ ] `LAPORAN-FINAL-FSA.md` (atau PDF) - Folio lengkap
- [ ] `README.md` (opsional) - Dokumentasi
- [ ] Screenshot GUI (opsional)
- [ ] Link GitHub Pages (opsional)

### Pastikan:

- [ ] GUI bisa jalan dengan baik
- [ ] Semua fitur berfungsi
- [ ] FSA validasi bekerja
- [ ] Folio lengkap 6 BAB
- [ ] Data pribadi sudah diisi
- [ ] Tidak ada typo
- [ ] Format rapi

---

## 💬 Saat Presentasi

### Demo GUI (5-10 menit):

1. **Buka Dashboard**
   - "Ini sistem e-commerce yang saya buat"
   - "Menggunakan FSA untuk validasi ID pesanan"

2. **Buka Buat Pesanan**
   - "Saya buat pesanan baru"
   - "Sistem generate ID otomatis: ORD-2024-0001"
   - "ID ini sudah divalidasi FSA di background"

3. **Buka Cek Pesanan**
   - "Sekarang saya cek pesanan pakai ID tadi"
   - "Perhatikan, sistem validasi format pakai FSA dulu"
   - "Kalau format valid, baru cari di database"

4. **Test ID Invalid**
   - "Sekarang saya coba ID yang formatnya salah"
   - "Lihat, FSA langsung detect error"
   - "Sistem kasih tau error di mana"

### Jelasin Teori (10-15 menit):

1. **Definisi FSA**
   ```
   M = (Q, Σ, δ, q₀, F)
   
   Q  = {q0, q1, ..., q13, qreject}
   Σ  = {O, R, D, -, 0-9}
   q₀ = q0
   F  = {q13}
   ```

2. **Tabel Transisi**
   - Tunjukkan tabel di folio
   - Jelasin beberapa transisi

3. **Diagram State**
   - Tunjukkan diagram di folio
   - Jelasin alur dari q0 ke q13

4. **Trace Eksekusi**
   - Tunjukkan contoh trace
   - Jelasin step-by-step

5. **Implementasi**
   - "FSA ini jalan di background"
   - "User ga perlu tau ada FSA"
   - "Tapi setiap ID pasti divalidasi"

### Jawab Pertanyaan:

**Q: "Kenapa pakai FSA?"**
A: "FSA efisien (O(n)), deterministik, dan sesuai dengan materi kuliah TBA. Cocok untuk validasi format string."

**Q: "Gimana cara kerja FSA?"**
A: "FSA baca input karakter per karakter, mulai dari q0, transisi sesuai fungsi δ. Kalau sampai q13, format valid."

**Q: "Berapa kompleksitas?"**
A: "O(n) untuk waktu, O(1) untuk ruang. Sangat efisien."

**Q: "Apa kelebihan?"**
A: "Akurasi 100%, cepat, deterministik, hemat resource karena invalid format langsung ditolak tanpa query database."

**Q: "Apa kekurangan?"**
A: "Hanya bisa validasi format, tidak bisa cek semantik atau duplikasi di database."

---

## 🎯 Tips Sukses

### DO ✅

- ✅ Pahami konsep FSA di background
- ✅ Bisa jelasin dengan bahasa sendiri
- ✅ Demo GUI dengan lancar
- ✅ Tunjukkan folio yang rapi
- ✅ Jawab pertanyaan dengan percaya diri

### DON'T ❌

- ❌ Baca folio word by word
- ❌ Ga bisa demo GUI
- ❌ Ga paham konsep FSA
- ❌ Ga bisa jawab pertanyaan
- ❌ Folio berantakan

---

## 🔥 Quick Reference

### Definisi FSA:
```
M = (Q, Σ, δ, q₀, F)
```

### Format ID:
```
ORD-XXXX-YYYY
```

### Kompleksitas:
```
Waktu: O(n)
Ruang: O(1)
```

### Akurasi:
```
100% (25/25 test case PASS)
```

### Fokus Utama:
```
FSA untuk validasi format ID pesanan
(FSA bekerja di background sistem e-commerce)
```

---

## 🎉 Final Checklist

Sebelum presentasi, pastikan:

- [x] Folio lengkap ✅
- [x] GUI jalan ✅
- [x] Dokumentasi lengkap ✅
- [ ] Data pribadi diisi
- [ ] Sudah test semua fitur
- [ ] Sudah baca folio
- [ ] Sudah pahami konsep
- [ ] Siap demo
- [ ] Siap presentasi
- [ ] Siap jawab pertanyaan

---

**Good luck bro! Lo pasti bisa! 💪🔥**

---

**Catatan:** Kalau ada yang kurang jelas, baca lagi folio atau README. Semua udah dijelasin lengkap!
