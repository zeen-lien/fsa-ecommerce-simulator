# LAPORAN TUGAS UAS
# TEORI BAHASA DAN AUTOMATA

---

## HALAMAN JUDUL

**SISTEM PEMODELAN WORKFLOW PESANAN E-COMMERCE**
**MENGGUNAKAN FINITE STATE AUTOMATA (FSA)**

Tugas Akhir Semester
Mata Kuliah: Teori Bahasa dan Automata

Disusun Oleh:
[Nama Mahasiswa]
[NIM]
[Kelas]

Program Studi: [Program Studi]
Fakultas: [Fakultas]
Universitas: [Nama Universitas]

Tahun Akademik: 2024/2025

---

## DAFTAR ISI

1. BAB I - PENDAHULUAN
   1.1 Latar Belakang
   1.2 Rumusan Masalah
   1.3 Tujuan
   1.4 Manfaat

2. BAB II - LANDASAN TEORI
   2.1 Finite State Automata (FSA)
   2.2 Komponen FSA
   2.3 Jenis-Jenis FSA

3. BAB III - ANALISIS DAN PERANCANGAN
   3.1 Analisis Sistem
   3.2 Perancangan FSA
   3.3 Diagram State
   3.4 Tabel Transisi

4. BAB IV - IMPLEMENTASI
   4.1 Teknologi yang Digunakan
   4.2 Struktur Aplikasi
   4.3 Fitur-Fitur Aplikasi

5. BAB V - PENGUJIAN DAN HASIL
   5.1 Skenario Pengujian
   5.2 Hasil Pengujian
   5.3 Analisis Hasil

6. BAB VI - PENUTUP
   6.1 Kesimpulan
   6.2 Saran

DAFTAR PUSTAKA
LAMPIRAN

---

## BAB I - PENDAHULUAN

### 1.1 Latar Belakang

Dalam era digital saat ini, sistem e-commerce telah menjadi bagian integral dari kehidupan sehari-hari. Setiap transaksi e-commerce melibatkan serangkaian proses yang kompleks, mulai dari pembuatan pesanan hingga pengiriman barang ke pelanggan. Untuk mengelola alur kerja (workflow) yang kompleks ini, diperlukan suatu model yang dapat merepresentasikan setiap tahapan proses dengan jelas dan terstruktur.

Finite State Automata (FSA) merupakan model komputasi yang sangat cocok untuk merepresentasikan sistem dengan state (keadaan) yang terbatas dan transisi yang terdefinisi dengan jelas. FSA telah banyak digunakan dalam berbagai aplikasi, termasuk compiler design, protocol analysis, dan workflow management.

Dalam konteks e-commerce, FSA dapat digunakan untuk memodelkan lifecycle pesanan, dimana setiap pesanan memiliki status tertentu (state) dan dapat berpindah ke status lain melalui aksi tertentu (transition). Penggunaan FSA memberikan beberapa keuntungan:

1. **Deterministic**: Setiap state dan input menghasilkan next state yang pasti
2. **Validasi Otomatis**: Sistem dapat menolak transisi yang tidak valid
3. **Traceable**: Mudah melacak history perubahan status
4. **Maintainable**: Mudah menambah atau memodifikasi state dan transisi

Oleh karena itu, dalam tugas akhir ini akan dikembangkan sebuah aplikasi web interaktif yang mengimplementasikan FSA untuk sistem pelacakan pesanan e-commerce, lengkap dengan visualisasi diagram state dan simulasi otomatis.

### 1.2 Rumusan Masalah

Berdasarkan latar belakang di atas, rumusan masalah dalam tugas ini adalah:

1. Bagaimana merancang FSA yang tepat untuk merepresentasikan workflow pesanan e-commerce?
2. Bagaimana mengimplementasikan FSA dalam aplikasi web yang interaktif?
3. Bagaimana memvisualisasikan state diagram FSA secara real-time?
4. Bagaimana memvalidasi sequence aksi untuk memastikan integritas workflow?

### 1.3 Tujuan

Tujuan dari pembuatan aplikasi ini adalah:

1. Menerapkan konsep Finite State Automata dalam kasus nyata sistem e-commerce
2. Mengimplementasikan FSA Engine yang dapat mengelola state dan transisi
3. Membuat visualisasi interaktif dari state diagram FSA
4. Menyediakan fitur simulasi otomatis untuk berbagai skenario workflow
5. Memvalidasi sequence aksi untuk mencegah transisi yang tidak valid

### 1.4 Manfaat

Manfaat yang dapat diperoleh dari aplikasi ini:

**Manfaat Akademis:**
- Pemahaman mendalam tentang konsep FSA dan penerapannya
- Pengalaman implementasi teori automata dalam aplikasi nyata
- Pembelajaran tentang state management dan workflow modeling

**Manfaat Praktis:**
- Dapat digunakan sebagai prototype sistem order tracking
- Membantu visualisasi dan pemahaman workflow e-commerce
- Menyediakan tool untuk testing dan validasi business logic

---

## BAB II - LANDASAN TEORI

### 2.1 Finite State Automata (FSA)

Finite State Automata (FSA) adalah model matematika dari komputasi yang terdiri dari:
- Himpunan state (keadaan) yang terbatas
- Aturan transisi antar state
- State awal (initial state)
- Himpunan state akhir (final states)

FSA dapat digunakan untuk mengenali bahasa formal dan memodelkan sistem dengan state yang terbatas.

### 2.2 Komponen FSA

FSA didefinisikan sebagai 5-tuple: **M = (Q, Σ, δ, q, F)**

Dimana:

**Q (States)** - Himpunan state yang terbatas
Dalam aplikasi ini:
- q0: PESANAN_DIBUAT (initial state)
- q1: MENUNGGU_PEMBAYARAN
- q2: PEMBAYARAN_DIKONFIRMASI
- q3: DIPROSES
- q4: DIKIRIM
- q5: DALAM_PENGIRIMAN
- q6: SELESAI (final state)
- q7: DIBATALKAN (final state)
- q8: PERMINTAAN_REFUND
- q9: REFUND_SELESAI (final state)

**Σ (Alphabet)** - Himpunan input symbols
- buat_pesanan
- konfirmasi_pembayaran
- batalkan_pembayaran
- proses_pesanan
- kirim_pesanan
- update_pengiriman
- pesanan_sampai
- batalkan_pesanan
- minta_refund
- setujui_refund

**δ (Transition Function)** - Fungsi transisi: Q  Σ  Q
Mendefinisikan perpindahan dari satu state ke state lain berdasarkan input.

**q (Initial State)** - State awal: PESANAN_DIBUAT

**F (Final States)** - Himpunan state akhir:
- SELESAI (pesanan berhasil)
- DIBATALKAN (pesanan dibatalkan)
- REFUND_SELESAI (refund selesai)

### 2.3 Jenis-Jenis FSA

**Deterministic Finite Automata (DFA)**
- Setiap (state, input) pair memiliki tepat satu next state
- Tidak ada epsilon transitions
- Aplikasi ini menggunakan DFA

**Non-deterministic Finite Automata (NFA)**
- Dapat memiliki multiple next states untuk satu input
- Dapat memiliki epsilon transitions
- Tidak digunakan dalam aplikasi ini

---

## BAB III - ANALISIS DAN PERANCANGAN

### 3.1 Analisis Sistem

**Analisis Kebutuhan:**

Sistem order tracking e-commerce memerlukan:
1. Pelacakan status pesanan secara real-time
2. Validasi setiap perubahan status
3. History tracking untuk audit trail
4. Visualisasi workflow yang jelas
5. Simulasi untuk testing business logic

**Analisis FSA:**

FSA cocok untuk sistem ini karena:
- Pesanan memiliki status yang terbatas dan jelas
- Perpindahan status mengikuti aturan bisnis yang ketat
- Setiap transisi dapat divalidasi
- Mudah divisualisasikan dalam diagram

### 3.2 Perancangan FSA

**State Design:**

Total 10 states dibagi menjadi:
- 1 Initial State (PESANAN_DIBUAT)
- 6 Intermediate States
- 3 Final States

**Transition Design:**

Total 12 transisi valid yang mencakup:
- Happy path (order sukses)
- Cancel flow (pembatalan)
- Refund flow (pengembalian dana)

**Business Rules:**

1. Pesanan hanya bisa dibatalkan sebelum dikirim
2. Refund hanya bisa diminta setelah pesanan sampai atau dalam pengiriman
3. Tidak ada transisi keluar dari final states
4. Setiap transisi harus melalui validasi

### 3.3 Diagram State

**[GAMBAR 1: State Diagram FSA]**

Diagram state menunjukkan:
- Node lingkaran: Intermediate states
- Node lingkaran dengan border putih tebal: Final states
- Panah: Transisi dengan label aksi
- Warna hijau: Path yang sudah dilalui
- Warna orange: Transisi terakhir
- Warna merah: Cancel flow
- Warna orange tua: Refund flow

Keterangan Warna State:
- Hijau: PESANAN_DIBUAT, SELESAI
- Orange: MENUNGGU_PEMBAYARAN
- Biru: PEMBAYARAN_DIKONFIRMASI
- Ungu: DIPROSES
- Cyan: DIKIRIM, DALAM_PENGIRIMAN
- Merah: DIBATALKAN
- Orange tua: PERMINTAAN_REFUND, REFUND_SELESAI

### 3.4 Tabel Transisi

**Tabel Transisi Lengkap:**

| Current State | Input Action | Next State | Keterangan |
|--------------|--------------|------------|------------|
| PESANAN_DIBUAT | buat_pesanan | MENUNGGU_PEMBAYARAN | Pesanan dibuat |
| MENUNGGU_PEMBAYARAN | konfirmasi_pembayaran | PEMBAYARAN_DIKONFIRMASI | Pembayaran sukses |
| MENUNGGU_PEMBAYARAN | batalkan_pembayaran | DIBATALKAN | Pembayaran gagal |
| PEMBAYARAN_DIKONFIRMASI | proses_pesanan | DIPROSES | Mulai proses |
| PEMBAYARAN_DIKONFIRMASI | batalkan_pesanan | DIBATALKAN | Cancel sebelum proses |
| DIPROSES | kirim_pesanan | DIKIRIM | Diserahkan ke kurir |
| DIPROSES | batalkan_pesanan | DIBATALKAN | Cancel saat proses |
| DIKIRIM | update_pengiriman | DALAM_PENGIRIMAN | Update lokasi |
| DALAM_PENGIRIMAN | pesanan_sampai | SELESAI | Pesanan sampai |
| DALAM_PENGIRIMAN | minta_refund | PERMINTAAN_REFUND | Refund saat transit |
| SELESAI | minta_refund | PERMINTAAN_REFUND | Refund setelah terima |
| PERMINTAAN_REFUND | setujui_refund | REFUND_SELESAI | Refund disetujui |

**Contoh Sequence Valid:**

1. **Happy Path:**
   ```
   buat_pesanan  konfirmasi_pembayaran  proses_pesanan  
   kirim_pesanan  update_pengiriman  pesanan_sampai
   Result: SELESAI 
   ```

2. **Cancel Path:**
   ```
   buat_pesanan  konfirmasi_pembayaran  batalkan_pesanan
   Result: DIBATALKAN 
   ```

3. **Refund Path:**
   ```
   buat_pesanan  konfirmasi_pembayaran  proses_pesanan  
   kirim_pesanan  update_pengiriman  pesanan_sampai  
   minta_refund  setujui_refund
   Result: REFUND_SELESAI 
   ```

**Contoh Sequence Invalid:**

1. **Skip Payment:**
   ```
   buat_pesanan  proses_pesanan
   Result: ERROR - Transisi tidak valid 
   ```

2. **Direct Delivery:**
   ```
   buat_pesanan  pesanan_sampai
   Result: ERROR - Transisi tidak valid 
   ```

---

## BAB IV - IMPLEMENTASI

### 4.1 Teknologi yang Digunakan

**Frontend:**
- HTML5: Struktur aplikasi
- CSS3: Styling dengan Cyberpunk Dark Theme
- JavaScript (ES6+): Logic aplikasi dan FSA Engine
- Font Awesome: Icon library
- SweetAlert2: Notifikasi interaktif
- Viz.js: Rendering diagram FSA (Graphviz)

**Arsitektur:**
- Modular JavaScript (ES6 Modules)
- Object-Oriented Programming
- State Pattern untuk FSA
- Event-Driven Architecture

**Design Pattern:**
- State Pattern: Untuk FSA implementation
- Manager Pattern: OrderManager untuk multiple instances
- Observer Pattern: Event listeners untuk UI updates

### 4.2 Struktur Aplikasi

**Struktur Folder:**
```
tba/
 public/
    index.html          # Main application
    styles.css          # Cyberpunk theme styling
 src/
    core/
       fsa.js         # FSA Engine & OrderManager
       orderStates.js # State & transition definitions
    utils/
       validator.js   # Validation utilities
    app.js             # Main application logic
 LAPORAN-TUGAS-UAS.md   # Laporan ini
```

**Komponen Utama:**

1. **FSAEngine Class**
   - Mengelola current state
   - Melakukan transisi
   - Validasi aksi
   - Menyimpan history

2. **OrderManager Class**
   - Mengelola multiple orders
   - Execute action pada order tertentu
   - Statistik dan reporting

3. **AplikasiSimulatorFSA Class**
   - UI management
   - Event handling
   - Diagram rendering
   - Simulasi otomatis

### 4.3 Fitur-Fitur Aplikasi

**1. Mode Manual**
- Buat pesanan baru dengan nama pelanggan
- Pilih pesanan dari daftar
- Lihat detail pesanan (ID, state, deskripsi, progress)
- Execute aksi yang tersedia
- Lihat riwayat transisi lengkap
- Hapus pesanan

**2. Mode Simulasi**
- Pilih skenario (Sukses, Batal, Refund, Gagal Bayar)
- Atur kecepatan animasi (0.5s - 3s)
- Jalankan simulasi otomatis
- Lihat overlay info transisi real-time
- Stop simulasi kapan saja

**3. Mode Pengujian**
- Input sequence aksi manual
- Validasi sequence (valid/invalid)
- Lihat step-by-step hasil validasi
- Contoh sequence untuk testing

**4. Visualisasi Diagram**
- Diagram FSA real-time dengan Graphviz
- Highlight state aktif (orange)
- Highlight path yang dilalui (hijau)
- Highlight transisi terakhir (orange tebal)
- Border putih tebal untuk final states
- Fullscreen mode untuk presentasi

**5. Panel Informasi State (Draggable)**
- Informasi state saat ini
- Deskripsi lengkap state
- Status (final/dapat dilanjutkan)
- Progress (jumlah transisi)
- Aksi tersedia
- Dapat di-drag ke posisi manapun
- Minimize/maximize
- Close/show dengan floating button

**6. Tombol Aksi di Diagram**
- Tombol aksi muncul di bawah diagram
- Klik langsung sambil lihat diagram
- Design neon dengan glow effect

**7. Statistik Real-time**
- Total pesanan
- Distribusi per state
- Update otomatis
- Visual cards dengan neon theme

**8. Riwayat Transisi**
- Log semua transisi
- Timestamp setiap transisi
- Visual representation
- Clear history option

**9. Cyberpunk Dark Theme**
- Neon colors (cyan, magenta, purple)
- Glow effects dan shadows
- Transparent backgrounds
- Animated icons
- Smooth transitions

---

## BAB V - PENGUJIAN DAN HASIL

### 5.1 Skenario Pengujian

**Test Case 1: Happy Path (Order Sukses)**

Input Sequence:
```
buat_pesanan  konfirmasi_pembayaran  proses_pesanan  
kirim_pesanan  update_pengiriman  pesanan_sampai
```

Expected Result:
- Semua transisi berhasil
- Final state: SELESAI
- Total transisi: 6
- Status: ACCEPTED 

Actual Result:  PASSED

**Test Case 2: Cancel After Payment**

Input Sequence:
```
buat_pesanan  konfirmasi_pembayaran  batalkan_pesanan
```

Expected Result:
- Semua transisi berhasil
- Final state: DIBATALKAN
- Total transisi: 3
- Status: ACCEPTED 

Actual Result:  PASSED

**Test Case 3: Refund Flow**

Input Sequence:
```
buat_pesanan  konfirmasi_pembayaran  proses_pesanan  
kirim_pesanan  update_pengiriman  pesanan_sampai  
minta_refund  setujui_refund
```

Expected Result:
- Semua transisi berhasil
- Final state: REFUND_SELESAI
- Total transisi: 8
- Status: ACCEPTED 

Actual Result:  PASSED

**Test Case 4: Invalid Transition (Skip Payment)**

Input Sequence:
```
buat_pesanan  proses_pesanan
```

Expected Result:
- Transisi ditolak
- Error message muncul
- State tetap di MENUNGGU_PEMBAYARAN
- Status: REJECTED 

Actual Result:  PASSED

**Test Case 5: Invalid Transition (Direct Delivery)**

Input Sequence:
```
buat_pesanan  pesanan_sampai
```

Expected Result:
- Transisi ditolak
- Error message muncul
- State tetap di MENUNGGU_PEMBAYARAN
- Status: REJECTED 

Actual Result:  PASSED

**Test Case 6: Multiple Orders**

Scenario:
- Buat 3 pesanan berbeda
- Execute different paths untuk masing-masing
- Check statistik

Expected Result:
- Semua pesanan independent
- Statistik akurat
- No interference antar orders

Actual Result:  PASSED

**Test Case 7: Simulasi Otomatis**

Scenario:
- Pilih skenario "Sukses"
- Set kecepatan 1s
- Jalankan simulasi

Expected Result:
- Transisi otomatis setiap 1s
- Overlay info muncul
- Diagram update real-time
- Selesai di state SELESAI

Actual Result:  PASSED

### 5.2 Hasil Pengujian

**Summary:**
- Total Test Cases: 7
- Passed: 7
- Failed: 0
- Success Rate: 100%

**Fitur yang Diuji:**
 FSA Engine (state management)
 Transition validation
 History tracking
 Multiple order management
 Sequence validation
 Simulasi otomatis
 Diagram visualization
 UI interactions

### 5.3 Analisis Hasil

**Kelebihan Sistem:**

1. **Validasi Otomatis**
   - Sistem berhasil menolak semua transisi invalid
   - Error handling yang baik
   - User-friendly error messages

2. **Visualisasi Interaktif**
   - Diagram update real-time
   - Path tracking yang jelas
   - Animasi smooth dan informatif

3. **Multiple Order Support**
   - Setiap order independent
   - No state interference
   - Scalable architecture

4. **User Experience**
   - Interface intuitif
   - Cyberpunk theme menarik
   - Responsive dan smooth

5. **Educational Value**
   - Mudah dipahami
   - Visual yang jelas
   - Simulasi membantu pembelajaran

**Keterbatasan:**

1. **Data Persistence**
   - Data hanya di memory (tidak persistent)
   - Hilang saat refresh browser
   - Solusi: Bisa ditambahkan localStorage/database

2. **Scalability**
   - Belum ditest dengan ribuan orders
   - Performa diagram dengan banyak state
   - Solusi: Optimization dan pagination

3. **Network Integration**
   - Belum terintegrasi dengan backend
   - No real payment gateway
   - Solusi: REST API integration

---

## BAB VI - PENUTUP

### 6.1 Kesimpulan

Berdasarkan hasil implementasi dan pengujian, dapat disimpulkan bahwa:

1. **FSA Cocok untuk Order Tracking**
   - FSA berhasil memodelkan workflow e-commerce dengan baik
   - State dan transisi terdefinisi dengan jelas
   - Validasi otomatis mencegah state invalid

2. **Implementasi Berhasil**
   - FSA Engine berfungsi sesuai spesifikasi
   - Semua fitur terimplementasi dengan baik
   - Testing menunjukkan success rate 100%

3. **Visualisasi Efektif**
   - Diagram FSA membantu pemahaman
   - Animasi membuat learning lebih engaging
   - Cyberpunk theme modern dan menarik

4. **Aplikasi Praktis**
   - Dapat digunakan untuk prototype
   - Membantu visualisasi business logic
   - Tool yang baik untuk testing workflow

5. **Nilai Edukatif Tinggi**
   - Demonstrasi konsep FSA yang jelas
   - Interactive learning experience
   - Mudah dipahami dan digunakan

### 6.2 Saran

**Untuk Pengembangan Lebih Lanjut:**

1. **Backend Integration**
   - Implementasi REST API
   - Database untuk persistence
   - Real-time sync dengan WebSocket

2. **Advanced Features**
   - User authentication
   - Role-based access control
   - Email notifications
   - Payment gateway integration

3. **Performance Optimization**
   - Lazy loading untuk banyak orders
   - Virtual scrolling
   - Diagram caching

4. **Testing Enhancement**
   - Unit testing dengan Jest
   - Integration testing
   - E2E testing dengan Cypress

5. **Documentation**
   - API documentation
   - User manual lengkap
   - Developer guide

6. **Deployment**
   - Deploy ke cloud (Vercel/Netlify)
   - CI/CD pipeline
   - Monitoring dan logging

---

## DAFTAR PUSTAKA

1. Hopcroft, J. E., & Ullman, J. D. (1979). *Introduction to Automata Theory, Languages, and Computation*. Addison-Wesley.

2. Sipser, M. (2012). *Introduction to the Theory of Computation* (3rd ed.). Cengage Learning.

3. Martin, J. C. (2010). *Introduction to Languages and the Theory of Computation* (4th ed.). McGraw-Hill.

4. Linz, P. (2011). *An Introduction to Formal Languages and Automata* (5th ed.). Jones & Bartlett Learning.

5. Mozilla Developer Network. (2024). *JavaScript Guide*. Retrieved from https://developer.mozilla.org/

6. Graphviz Documentation. (2024). *DOT Language*. Retrieved from https://graphviz.org/

---

## LAMPIRAN

### Lampiran A: Screenshot Aplikasi

**[GAMBAR 2: Tampilan Utama Aplikasi]**
- Header dengan logo dan judul
- Panel kontrol di kiri
- Diagram FSA di kanan
- Theme cyberpunk dark

**[GAMBAR 3: Mode Manual]**
- Form buat pesanan
- Daftar pesanan aktif
- Detail pesanan
- Tombol aksi tersedia

**[GAMBAR 4: Diagram FSA dengan Path Tracking]**
- State diagram lengkap
- Path hijau (sudah dilalui)
- State orange (aktif)
- Final states dengan border putih

**[GAMBAR 5: Panel Informasi State]**
- Info state aktif
- Deskripsi lengkap
- Progress transisi
- Aksi tersedia

**[GAMBAR 6: Mode Simulasi]**
- Pilihan skenario
- Slider kecepatan
- Tombol kontrol
- Overlay info transisi

**[GAMBAR 7: Mode Pengujian]**
- Input sequence
- Hasil validasi
- Step-by-step detail
- Contoh sequence

**[GAMBAR 8: Statistik Dashboard]**
- Total pesanan
- Distribusi per state
- Visual cards neon
- Real-time update

**[GAMBAR 9: Fullscreen Mode]**
- Diagram fullscreen
- Panel info draggable
- Tombol aksi di diagram
- Optimal untuk presentasi

### Lampiran B: Struktur Code

**FSA Engine Core:**
```javascript
class FSAEngine {
    constructor() {
        this.currentState = INITIAL_STATE;
        this.history = [];
        this.transitionCount = 0;
    }
    
    transition(action) {
        // Validate and execute transition
        // Update state and history
        // Return result
    }
    
    getAvailableActions() {
        // Return valid actions for current state
    }
    
    validateSequence(actions) {
        // Test sequence validity
    }
}
```

**State Definitions:**
```javascript
const STATES = {
    PESANAN_DIBUAT: 'PESANAN_DIBUAT',
    MENUNGGU_PEMBAYARAN: 'MENUNGGU_PEMBAYARAN',
    // ... 8 states lainnya
};

const TRANSITIONS = {
    [STATES.PESANAN_DIBUAT]: {
        [ACTIONS.BUAT_PESANAN]: STATES.MENUNGGU_PEMBAYARAN
    },
    // ... 11 transitions lainnya
};
```

### Lampiran C: Cara Menjalankan Aplikasi

**Metode 1: Langsung Buka File**
1. Buka folder project
2. Double-click `public/index.html`
3. Aplikasi terbuka di browser

**Metode 2: Live Server (Recommended)**
1. Install Live Server di VS Code
2. Right-click `public/index.html`
3. Pilih "Open with Live Server"
4. Akses di `http://localhost:5500`

**Metode 3: Python HTTP Server**
```bash
cd public
python -m http.server 8000
# Buka browser: http://localhost:8000
```

### Lampiran D: Fitur-Fitur Lengkap

1.  FSA Engine dengan validasi otomatis
2.  Multiple order management
3.  Real-time diagram visualization
4.  Path tracking dengan animasi
5.  Draggable info panel
6.  Fullscreen mode
7.  Mode manual interaktif
8.  Mode simulasi otomatis
9.  Mode pengujian sequence
10.  Statistik real-time
11.  History tracking
12.  Cyberpunk dark theme
13.  Neon glow effects
14.  Smooth animations
15.  Responsive design

---

## PENUTUP

Demikian laporan tugas akhir semester ini disusun. Semoga aplikasi Simulasi FSA E-commerce ini dapat memberikan kontribusi dalam pemahaman konsep Finite State Automata dan penerapannya dalam sistem nyata.

Terima kasih kepada:
- Dosen Mata Kuliah Teori Bahasa dan Automata
- Teman-teman yang telah memberikan masukan
- Semua pihak yang telah membantu

---

**Catatan untuk Penulisan di Kertas Folio:**

1. **Halaman Judul**: Tulis dengan rapi, gunakan huruf kapital untuk judul
2. **Daftar Isi**: Buat dengan nomor halaman yang sesuai
3. **Setiap BAB**: Mulai di halaman baru
4. **Gambar**: Sisakan space untuk tempel screenshot, beri nomor dan caption
5. **Tabel**: Buat dengan garis yang rapi
6. **Code**: Tulis dengan font monospace atau tulis tangan rapi
7. **Margin**: Kiri 4cm, Kanan 3cm, Atas 3cm, Bawah 3cm
8. **Font**: Arial atau Times New Roman, size 12
9. **Spasi**: 1.5 atau 2
10. **Nomor Halaman**: Tengah bawah, mulai dari BAB I

**Screenshot yang Harus Disiapkan:**
1. Tampilan utama aplikasi
2. Mode manual dengan pesanan aktif
3. Diagram FSA dengan path tracking
4. Panel informasi state (draggable)
5. Mode simulasi dengan overlay
6. Mode pengujian dengan hasil validasi
7. Statistik dashboard
8. Fullscreen mode
9. State diagram lengkap (untuk teori)

---

**SELESAI**

Laporan ini disusun sebagai dokumentasi lengkap untuk Tugas UAS Teori Bahasa dan Automata.
Semoga bermanfaat! 
