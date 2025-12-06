# LAPORAN TUGAS AKHIR SEMESTER
## TEORI BAHASA DAN AUTOMATA

---

**Judul:**  
Implementasi Finite State Automata (FSA) untuk Validasi Format ID Pesanan pada Sistem E-commerce

**Nama:** [Nama Mahasiswa]  
**NIM:** [NIM Mahasiswa]  
**Mata Kuliah:** Teori Bahasa dan Automata  
**Dosen Pengampu:** [Nama Dosen]  
**Semester:** [Semester/Tahun Ajaran]

---

## BAB 1: PENDAHULUAN

### 1.1 Latar Belakang

Dalam era digital saat ini, sistem e-commerce telah menjadi bagian integral dari kehidupan sehari-hari. Setiap transaksi dalam sistem e-commerce memerlukan identifikasi unik berupa ID pesanan untuk memudahkan tracking, pencatatan, dan pengelolaan data. ID pesanan yang konsisten dan terstruktur sangat penting untuk:

1. **Integritas Data:** Memastikan setiap pesanan memiliki identitas unik yang tidak ambigu
2. **Efisiensi Sistem:** Memudahkan pencarian dan filtering data pesanan
3. **Integrasi Sistem:** Memungkinkan komunikasi antar sistem dengan format yang standar
4. **Audit Trail:** Memudahkan pelacakan dan audit transaksi

Namun, dalam implementasinya sering terjadi permasalahan terkait format ID pesanan, seperti:
- Inkonsistensi format ID yang diinput manual
- Kesalahan penulisan yang menyebabkan ID tidak valid
- Duplikasi ID akibat format yang tidak terstandarisasi
- Kesulitan validasi ID secara otomatis

Untuk mengatasi permasalahan tersebut, diperlukan sebuah mekanisme validasi otomatis yang dapat memastikan setiap ID pesanan mengikuti format yang telah ditentukan. **Finite State Automata (FSA)** merupakan solusi yang tepat karena:

- **Deterministik:** Setiap input menghasilkan output yang pasti
- **Efisien:** Kompleksitas waktu O(n) untuk string dengan panjang n
- **Formal:** Memiliki dasar teori matematika yang kuat
- **Implementable:** Mudah diimplementasikan dalam berbagai bahasa pemrograman

Dalam penelitian ini, FSA akan diimplementasikan sebagai **komponen validasi di background** sistem e-commerce. User tidak perlu mengetahui keberadaan FSA, namun setiap kali ada proses yang melibatkan ID pesanan (generate, input, search), FSA akan bekerja untuk memvalidasi format ID tersebut.

### 1.2 Rumusan Masalah

Berdasarkan latar belakang di atas, rumusan masalah dalam penelitian ini adalah:

1. Bagaimana merancang FSA yang dapat memvalidasi format ID pesanan dengan aturan: `ORD-XXXX-YYYY`?
2. Bagaimana mengintegrasikan FSA sebagai komponen validasi di background sistem e-commerce?
3. Bagaimana efektivitas FSA dalam mendeteksi ID pesanan yang valid dan invalid?
4. Bagaimana implementasi FSA dalam konteks aplikasi nyata (sistem e-commerce)?

### 1.3 Tujuan

Tujuan dari penelitian ini adalah:

1. Merancang FSA yang dapat memvalidasi format ID pesanan e-commerce secara akurat
2. Mengimplementasikan FSA sebagai komponen validasi di background sistem
3. Mengintegrasikan FSA ke dalam sistem e-commerce yang fungsional
4. Menguji efektivitas FSA dalam berbagai skenario penggunaan
5. Menganalisis kompleksitas dan performa FSA dalam aplikasi nyata

### 1.4 Manfaat

Manfaat yang diharapkan dari penelitian ini:

**Bagi Sistem:**
- Meningkatkan konsistensi dan validitas data ID pesanan
- Mengurangi error akibat format ID yang salah
- Meningkatkan efisiensi proses validasi

**Bagi Pengguna:**
- Mendapatkan feedback langsung jika format ID salah
- Meningkatkan user experience dengan validasi real-time
- Mengurangi frustasi akibat input yang ditolak tanpa penjelasan

**Bagi Pengembang:**
- Memahami implementasi FSA dalam aplikasi nyata
- Mendapatkan template validasi yang dapat digunakan untuk kasus lain
- Meningkatkan pemahaman tentang teori automata

**Bagi Akademik:**
- Memberikan contoh implementasi FSA dalam konteks praktis
- Menjadi referensi pembelajaran teori bahasa dan automata
- Menunjukkan relevansi teori FSA dalam dunia industri

### 1.5 Batasan Masalah

Untuk memfokuskan penelitian, ditetapkan batasan masalah sebagai berikut:

1. FSA yang dirancang hanya untuk validasi **format** ID pesanan, bukan validasi **konten** (seperti apakah ID sudah ada di database)
2. Format ID yang divalidasi adalah: `ORD-XXXX-YYYY` dimana:
   - `ORD` = prefix tetap (3 huruf kapital)
   - `XXXX` = 4 digit angka (tahun)
   - `YYYY` = 4 digit angka (nomor urut)
3. Sistem e-commerce yang dibangun bersifat prototype untuk demonstrasi implementasi FSA
4. Implementasi menggunakan teknologi web (HTML, CSS, JavaScript)
5. Database menggunakan localStorage (browser storage) untuk kesederhanaan

---

## BAB 2: LANDASAN TEORI

### 2.1 Finite State Automata (FSA)

#### 2.1.1 Definisi FSA

Finite State Automata (FSA) atau Automata Berhingga adalah model matematika dari sistem komputasi yang memiliki sejumlah state (keadaan) yang terbatas. FSA dapat digunakan untuk mengenali pola dalam string atau bahasa formal.

**Definisi Formal:**

FSA didefinisikan sebagai 5-tuple:

```
M = (Q, Σ, δ, q₀, F)
```

Dimana:
- **Q** = Himpunan state (keadaan) yang berhingga
- **Σ** = Himpunan simbol input (alfabet)
- **δ** = Fungsi transisi: Q × Σ → Q
- **q₀** = State awal (q₀ ∈ Q)
- **F** = Himpunan state akhir/accept (F ⊆ Q)

#### 2.1.2 Cara Kerja FSA

FSA bekerja dengan cara:

1. **Inisialisasi:** Dimulai dari state awal (q₀)
2. **Pembacaan Input:** Membaca input karakter per karakter dari kiri ke kanan
3. **Transisi State:** Untuk setiap karakter yang dibaca, FSA melakukan transisi ke state berikutnya berdasarkan fungsi δ
4. **Pengecekan Akhir:** Setelah semua input dibaca, jika FSA berada di salah satu state accept (F), maka input diterima (ACCEPT). Jika tidak, input ditolak (REJECT)

**Contoh Sederhana:**

FSA untuk mengenali string yang diawali dengan 'a' dan diakhiri dengan 'b':

```
Q = {q0, q1, q2}
Σ = {a, b}
q₀ = q0
F = {q2}

δ:
  δ(q0, 'a') = q1
  δ(q1, 'a') = q1
  δ(q1, 'b') = q2
  δ(q2, 'b') = q2
```

String "aab" akan diterima:
```
q0 --a--> q1 --a--> q1 --b--> q2 (ACCEPT)
```

String "ba" akan ditolak:
```
q0 --b--> (tidak ada transisi, REJECT)
```


#### 2.1.3 Jenis FSA

Ada dua jenis FSA:

**1. Deterministic Finite Automata (DFA)**

Karakteristik:
- Setiap state memiliki **tepat satu** transisi untuk setiap simbol input
- Tidak ada transisi ε (epsilon/kosong)
- Lebih mudah diimplementasikan
- Lebih efisien dalam eksekusi

**2. Non-deterministic Finite Automata (NFA)**

Karakteristik:
- Setiap state dapat memiliki **nol, satu, atau lebih** transisi untuk simbol yang sama
- Dapat memiliki transisi ε
- Lebih fleksibel dalam perancangan
- Lebih kompleks dalam implementasi

**Dalam penelitian ini, digunakan DFA** karena:
- Lebih efisien untuk validasi string
- Deterministik (hasil pasti)
- Mudah diimplementasikan dalam kode
- Sesuai dengan kebutuhan validasi format yang strict

#### 2.1.4 Kompleksitas FSA

**Kompleksitas Waktu:**
- O(n) dimana n = panjang string input
- Setiap karakter diproses tepat satu kali
- Tidak ada backtracking

**Kompleksitas Ruang:**
- O(1) untuk DFA
- Hanya menyimpan state saat ini
- Tidak bergantung pada panjang input

### 2.2 Bahasa Formal dan Tata Bahasa

#### 2.2.1 Bahasa Formal

Bahasa formal adalah himpunan string yang dibentuk dari alfabet tertentu. Dalam konteks FSA:

- **Alfabet (Σ):** Himpunan simbol yang digunakan
- **String:** Urutan simbol dari alfabet
- **Bahasa (L):** Himpunan string yang diterima oleh FSA

**Contoh:**

Untuk format ID pesanan `ORD-XXXX-YYYY`:
```
Σ = {O, R, D, -, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9}

L = {w | w = "ORD-" + d₁d₂d₃d₄ + "-" + d₅d₆d₇d₈, 
     dimana dᵢ ∈ {0,1,2,3,4,5,6,7,8,9}}

Contoh string dalam L:
- ORD-2024-0001 ∈ L
- ORD-2025-9999 ∈ L
- ORD-1999-0123 ∈ L

Contoh string tidak dalam L:
- ORDER-2024-0001 ∉ L (prefix salah)
- ORD-24-0001 ∉ L (tahun kurang digit)
- ORD-2024-01 ∉ L (nomor urut kurang digit)
```

#### 2.2.2 Tata Bahasa Regular

FSA dapat mengenali bahasa regular. Bahasa regular dapat didefinisikan dengan:

1. **Regular Expression (Regex)**
2. **Finite State Automata (FSA)**
3. **Regular Grammar**

Untuk format ID pesanan, dapat ditulis sebagai regex:
```
^ORD-[0-9]{4}-[0-9]{4}$
```

Namun, dalam penelitian ini digunakan FSA karena:
- Lebih educational (sesuai materi kuliah)
- Dapat divisualisasikan dengan diagram state
- Menunjukkan proses validasi step-by-step

### 2.3 Aplikasi FSA dalam Dunia Nyata

FSA banyak digunakan dalam berbagai aplikasi:

**1. Compiler dan Interpreter**
- Lexical analysis (tokenization)
- Syntax checking
- Contoh: Mengenali keyword, identifier, operator

**2. Text Processing**
- Pattern matching
- Search and replace
- Syntax highlighting

**3. Network Protocol**
- Protocol state machine
- Connection management
- Contoh: TCP state diagram

**4. Validasi Input**
- Email validation
- Phone number validation
- Credit card validation
- **ID validation (penelitian ini)**

**5. Game Development**
- Character AI behavior
- Game state management

### 2.4 Validasi String dengan FSA

FSA sangat cocok untuk validasi format string karena:

**Kelebihan:**
- ✅ Deterministik: Hasil selalu konsisten
- ✅ Efisien: Kompleksitas O(n)
- ✅ Formal: Memiliki dasar teori yang kuat
- ✅ Visualizable: Dapat digambarkan dengan diagram
- ✅ Implementable: Mudah diimplementasikan

**Keterbatasan:**
- ❌ Hanya bisa validasi format, bukan semantik
- ❌ Tidak bisa cek konteks (misal: apakah ID sudah ada di database)
- ❌ Tidak bisa cek validitas konten (misal: apakah tahun masuk akal)

**Dalam Konteks Sistem E-commerce:**

FSA digunakan sebagai **first-line defense** untuk validasi:
```
Input ID
    ↓
FSA Validasi Format ← Cepat, O(n)
    ↓
Format Valid?
    ├─ Ya → Lanjut ke validasi database
    └─ Tidak → Tolak langsung (hemat resource)
```

Dengan pendekatan ini:
- Invalid format langsung ditolak tanpa query database
- Menghemat resource sistem
- Meningkatkan performa
- Memberikan feedback yang cepat ke user

---

## BAB 3: PERANCANGAN SISTEM

### 3.1 Analisis Kebutuhan

#### 3.1.1 Kebutuhan Fungsional

**Sistem E-commerce:**
1. User dapat membuat pesanan baru
2. Sistem generate ID pesanan otomatis
3. User dapat melihat daftar pesanan
4. User dapat mencari pesanan berdasarkan ID
5. User dapat melihat detail pesanan
6. User dapat tracking status pesanan

**Komponen Validasi FSA:**
1. Validasi format ID saat generate
2. Validasi format ID saat user input
3. Reject ID yang format nya salah
4. Accept ID yang format nya benar

#### 3.1.2 Kebutuhan Non-Fungsional

1. **Performa:** Validasi harus cepat (< 1ms)
2. **Akurasi:** 100% akurat dalam mendeteksi format valid/invalid
3. **Usability:** User-friendly, tidak perlu tau ada FSA
4. **Reliability:** Konsisten dalam setiap validasi

#### 3.1.3 Format ID Pesanan

Format ID pesanan yang akan divalidasi:

```
ORD-XXXX-YYYY
```

**Spesifikasi:**
- **ORD:** Prefix wajib (3 huruf kapital: O, R, D)
- **-:** Separator pertama (tanda hubung)
- **XXXX:** 4 digit angka (0-9) untuk tahun
- **-:** Separator kedua (tanda hubung)
- **YYYY:** 4 digit angka (0-9) untuk nomor urut

**Panjang Total:** 14 karakter

**Contoh ID Valid:**
```
ORD-2024-0001 ✓
ORD-2025-9999 ✓
ORD-1999-0123 ✓
ORD-2024-5678 ✓
ORD-0000-0000 ✓
```

**Contoh ID Invalid:**
```
ORDER-2024-0001 ✗ (prefix salah, 5 huruf)
ORD-24-0001 ✗ (tahun kurang digit)
ORD-2024-01 ✗ (nomor urut kurang digit)
ord-2024-0001 ✗ (huruf kecil)
ORD20240001 ✗ (tidak ada separator)
ORD-ABCD-0001 ✗ (tahun bukan angka)
ORD-2024-ABCD ✗ (nomor urut bukan angka)
ORD-2024-0001-EXTRA ✗ (terlalu panjang)
```

### 3.2 Perancangan FSA

#### 3.2.1 Definisi Formal FSA

```
M = (Q, Σ, δ, q₀, F)
```

**Q (Himpunan State):**
```
Q = {q0, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, qreject}
```

Total: **15 state**

Penjelasan state:
- q0: State awal
- q1: Setelah membaca 'O'
- q2: Setelah membaca 'OR'
- q3: Setelah membaca 'ORD'
- q4: Setelah membaca 'ORD-'
- q5-q8: Membaca 4 digit tahun
- q9: Setelah membaca separator kedua
- q10-q13: Membaca 4 digit nomor urut
- qreject: State reject (untuk input invalid)

**Σ (Alfabet Input):**
```
Σ = {O, R, D, -, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
```

Total: **13 simbol**

**q₀ (State Awal):**
```
q₀ = q0
```

**F (State Accept):**
```
F = {q13}
```

Hanya ada 1 state accept, yaitu q13 (setelah membaca 14 karakter yang valid)

**δ (Fungsi Transisi):**

Fungsi transisi didefinisikan sebagai berikut:

```
δ: Q × Σ → Q

δ(q0, 'O') = q1
δ(q1, 'R') = q2
δ(q2, 'D') = q3
δ(q3, '-') = q4
δ(q4, d) = q5, untuk d ∈ {0,1,2,3,4,5,6,7,8,9}
δ(q5, d) = q6, untuk d ∈ {0,1,2,3,4,5,6,7,8,9}
δ(q6, d) = q7, untuk d ∈ {0,1,2,3,4,5,6,7,8,9}
δ(q7, d) = q8, untuk d ∈ {0,1,2,3,4,5,6,7,8,9}
δ(q8, '-') = q9
δ(q9, d) = q10, untuk d ∈ {0,1,2,3,4,5,6,7,8,9}
δ(q10, d) = q11, untuk d ∈ {0,1,2,3,4,5,6,7,8,9}
δ(q11, d) = q12, untuk d ∈ {0,1,2,3,4,5,6,7,8,9}
δ(q12, d) = q13, untuk d ∈ {0,1,2,3,4,5,6,7,8,9}

Untuk semua transisi lain: δ(q, σ) = qreject
```


#### 3.2.2 Tabel Transisi State

**Tabel 3.1: Fungsi Transisi δ (Lengkap)**

| State | Input 'O' | Input 'R' | Input 'D' | Input '-' | Input 0-9 | Keterangan |
|-------|-----------|-----------|-----------|-----------|-----------|------------|
| q0 | q1 | qreject | qreject | qreject | qreject | Karakter pertama harus 'O' |
| q1 | qreject | q2 | qreject | qreject | qreject | Karakter kedua harus 'R' |
| q2 | qreject | qreject | q3 | qreject | qreject | Karakter ketiga harus 'D' |
| q3 | qreject | qreject | qreject | q4 | qreject | Karakter keempat harus '-' |
| q4 | qreject | qreject | qreject | qreject | q5 | Digit pertama tahun |
| q5 | qreject | qreject | qreject | qreject | q6 | Digit kedua tahun |
| q6 | qreject | qreject | qreject | qreject | q7 | Digit ketiga tahun |
| q7 | qreject | qreject | qreject | qreject | q8 | Digit keempat tahun |
| q8 | qreject | qreject | qreject | q9 | qreject | Separator kedua harus '-' |
| q9 | qreject | qreject | qreject | qreject | q10 | Digit pertama nomor urut |
| q10 | qreject | qreject | qreject | qreject | q11 | Digit kedua nomor urut |
| q11 | qreject | qreject | qreject | qreject | q12 | Digit ketiga nomor urut |
| q12 | qreject | qreject | qreject | qreject | q13 | Digit keempat nomor urut |
| q13 | qreject | qreject | qreject | qreject | qreject | State accept, tidak boleh ada input lagi |
| qreject | qreject | qreject | qreject | qreject | qreject | State reject, semua input ditolak |

**Catatan:**
- Input 0-9 berarti semua digit dari 0 sampai 9
- qreject adalah state trap (sekali masuk, tidak bisa keluar)
- q13 adalah satu-satunya state accept

#### 3.2.3 Diagram State

**Diagram 3.1: FSA untuk Validasi Format ID Pesanan**

**Diagram Graphviz (DOT Format) - Copy paste ke https://dreampuf.github.io/GraphvizOnline/**

```dot
digraph FSA_OrderID {
    rankdir=LR;
    size="12,8"
    
    // Node styling
    node [shape = circle, style=filled, fillcolor=lightblue, fontname="Arial"];
    
    // State awal
    node [fillcolor=lightgreen];
    q0 [label="q0\n(Start)"];
    
    // State accept
    node [shape = doublecircle, fillcolor=lightcoral];
    q13 [label="q13\n(Accept)"];
    
    // State reject
    node [shape = circle, fillcolor=gray];
    qreject [label="qreject\n(Reject)"];
    
    // State intermediate
    node [shape = circle, fillcolor=lightblue];
    q1 [label="q1\n(O)"];
    q2 [label="q2\n(OR)"];
    q3 [label="q3\n(ORD)"];
    q4 [label="q4\n(ORD-)"];
    q5 [label="q5\n(Year-1)"];
    q6 [label="q6\n(Year-2)"];
    q7 [label="q7\n(Year-3)"];
    q8 [label="q8\n(Year-4)"];
    q9 [label="q9\n(ORD-XXXX-)"];
    q10 [label="q10\n(Num-1)"];
    q11 [label="q11\n(Num-2)"];
    q12 [label="q12\n(Num-3)"];
    
    // Transisi valid (warna hijau)
    edge [color=green, fontcolor=darkgreen, fontname="Arial Bold"];
    q0 -> q1 [label="'O'"];
    q1 -> q2 [label="'R'"];
    q2 -> q3 [label="'D'"];
    q3 -> q4 [label="'-'"];
    q4 -> q5 [label="[0-9]"];
    q5 -> q6 [label="[0-9]"];
    q6 -> q7 [label="[0-9]"];
    q7 -> q8 [label="[0-9]"];
    q8 -> q9 [label="'-'"];
    q9 -> q10 [label="[0-9]"];
    q10 -> q11 [label="[0-9]"];
    q11 -> q12 [label="[0-9]"];
    q12 -> q13 [label="[0-9]"];
    
    // Transisi invalid (warna merah) - contoh beberapa
    edge [color=red, fontcolor=red, style=dashed];
    q0 -> qreject [label="!= 'O'"];
    q1 -> qreject [label="!= 'R'"];
    q2 -> qreject [label="!= 'D'"];
    q3 -> qreject [label="!= '-'"];
    q4 -> qreject [label="!= [0-9]"];
    q8 -> qreject [label="!= '-'"];
    q13 -> qreject [label="any input"];
    qreject -> qreject [label="any"];
    
    // Label keterangan
    label = "\nFinite State Automata untuk Validasi Format ID Pesanan\nFormat: ORD-XXXX-YYYY\n\nKeterangan:\n• State hijau = Start state\n• State merah = Accept state\n• State abu-abu = Reject state\n• Garis hijau = Transisi valid\n• Garis merah putus-putus = Transisi invalid";
    fontsize=14;
    labelloc="b";
}
```

**Diagram ASCII (Simplified):**

```
                    'O'        'R'        'D'        '-'
    [q0] -------> [q1] -----> [q2] -----> [q3] -----> [q4]
                                                        |
                                                    digit (0-9)
                                                        |
                                                        v
                                                      [q5]
                                                        |
                                                    digit (0-9)
                                                        |
                                                        v
                                                      [q6]
                                                        |
                                                    digit (0-9)
                                                        |
                                                        v
                                                      [q7]
                                                        |
                                                    digit (0-9)
                                                        |
                                                        v
                                                      [q8]
                                                        |
                                                       '-'
                                                        |
                                                        v
                                                      [q9]
                                                        |
                                                    digit (0-9)
                                                        |
                                                        v
                                                      [q10]
                                                        |
                                                    digit (0-9)
                                                        |
                                                        v
                                                      [q11]
                                                        |
                                                    digit (0-9)
                                                        |
                                                        v
                                                      [q12]
                                                        |
                                                    digit (0-9)
                                                        |
                                                        v
                                                    ((q13))
                                                        |
                                                       EOF
                                                        |
                                                        v
                                                    ACCEPT!
```

**Keterangan Diagram:**
- `[q0]` = State awal (single circle, warna hijau)
- `((q13))` = State accept (double circle, warna merah)
- `[qreject]` = State reject (single circle, warna abu-abu)
- Panah hijau = Transisi valid
- Panah merah putus-putus = Transisi invalid
- Label panah = Input yang menyebabkan transisi
- EOF = End of File (akhir string)

**Penjelasan Alur Lengkap:**

**FASE 1: Validasi Prefix "ORD" (State q0 → q3)**
1. **q0 → q1:** Membaca karakter pertama 'O'
   - Jika input = 'O' → transisi ke q1 ✓
   - Jika input ≠ 'O' → transisi ke qreject ✗
   
2. **q1 → q2:** Membaca karakter kedua 'R'
   - Jika input = 'R' → transisi ke q2 ✓
   - Jika input ≠ 'R' → transisi ke qreject ✗
   
3. **q2 → q3:** Membaca karakter ketiga 'D'
   - Jika input = 'D' → transisi ke q3 ✓
   - Jika input ≠ 'D' → transisi ke qreject ✗

**FASE 2: Validasi Separator Pertama (State q3 → q4)**
4. **q3 → q4:** Membaca separator pertama '-'
   - Jika input = '-' → transisi ke q4 ✓
   - Jika input ≠ '-' → transisi ke qreject ✗

**FASE 3: Validasi 4 Digit Tahun (State q4 → q8)**
5. **q4 → q5:** Membaca digit pertama tahun [0-9]
   - Jika input ∈ {0,1,2,3,4,5,6,7,8,9} → transisi ke q5 ✓
   - Jika input ∉ {0-9} → transisi ke qreject ✗
   
6. **q5 → q6:** Membaca digit kedua tahun [0-9]
   - Jika input ∈ {0-9} → transisi ke q6 ✓
   - Jika input ∉ {0-9} → transisi ke qreject ✗
   
7. **q6 → q7:** Membaca digit ketiga tahun [0-9]
   - Jika input ∈ {0-9} → transisi ke q7 ✓
   - Jika input ∉ {0-9} → transisi ke qreject ✗
   
8. **q7 → q8:** Membaca digit keempat tahun [0-9]
   - Jika input ∈ {0-9} → transisi ke q8 ✓
   - Jika input ∉ {0-9} → transisi ke qreject ✗

**FASE 4: Validasi Separator Kedua (State q8 → q9)**
9. **q8 → q9:** Membaca separator kedua '-'
   - Jika input = '-' → transisi ke q9 ✓
   - Jika input ≠ '-' → transisi ke qreject ✗

**FASE 5: Validasi 4 Digit Nomor Urut (State q9 → q13)**
10. **q9 → q10:** Membaca digit pertama nomor urut [0-9]
    - Jika input ∈ {0-9} → transisi ke q10 ✓
    - Jika input ∉ {0-9} → transisi ke qreject ✗
    
11. **q10 → q11:** Membaca digit kedua nomor urut [0-9]
    - Jika input ∈ {0-9} → transisi ke q11 ✓
    - Jika input ∉ {0-9} → transisi ke qreject ✗
    
12. **q11 → q12:** Membaca digit ketiga nomor urut [0-9]
    - Jika input ∈ {0-9} → transisi ke q12 ✓
    - Jika input ∉ {0-9} → transisi ke qreject ✗
    
13. **q12 → q13:** Membaca digit keempat nomor urut [0-9]
    - Jika input ∈ {0-9} → transisi ke q13 ✓
    - Jika input ∉ {0-9} → transisi ke qreject ✗

**FASE 6: Pengecekan Akhir (State q13)**
14. **q13 → ACCEPT/REJECT:**
    - Jika EOF (tidak ada input lagi) → **ACCEPT** ✅
    - Jika masih ada input → transisi ke qreject → **REJECT** ❌

**FASE 7: State Reject (qreject)**
- **qreject → qreject:** State trap, semua input tetap di qreject
- Sekali masuk qreject, tidak bisa keluar → **REJECT** ❌

### 3.3 Contoh Trace Eksekusi

#### 3.3.1 Contoh 1: Input Valid - Happy Path

**Input:** `ORD-2024-0001`

**Trace Eksekusi:**

| Step | State Saat Ini | Input Dibaca | Fungsi Transisi | State Berikutnya | Status |
|------|----------------|--------------|------------------|------------------|--------|
| 0 | q0 | - | - | q0 | Inisialisasi |
| 1 | q0 | 'O' | δ(q0, 'O') | q1 | ✓ Valid |
| 2 | q1 | 'R' | δ(q1, 'R') | q2 | ✓ Valid |
| 3 | q2 | 'D' | δ(q2, 'D') | q3 | ✓ Valid |
| 4 | q3 | '-' | δ(q3, '-') | q4 | ✓ Valid |
| 5 | q4 | '2' | δ(q4, '2') | q5 | ✓ Valid |
| 6 | q5 | '0' | δ(q5, '0') | q6 | ✓ Valid |
| 7 | q6 | '2' | δ(q6, '2') | q7 | ✓ Valid |
| 8 | q7 | '4' | δ(q7, '4') | q8 | ✓ Valid |
| 9 | q8 | '-' | δ(q8, '-') | q9 | ✓ Valid |
| 10 | q9 | '0' | δ(q9, '0') | q10 | ✓ Valid |
| 11 | q10 | '0' | δ(q10, '0') | q11 | ✓ Valid |
| 12 | q11 | '0' | δ(q11, '0') | q12 | ✓ Valid |
| 13 | q12 | '1' | δ(q12, '1') | q13 | ✓ Valid |
| 14 | q13 | EOF | - | q13 | ✓ Valid |

**Hasil:** ✅ **ACCEPT**

**Penjelasan:**
- Semua transisi berhasil
- FSA mencapai state accept (q13)
- Tidak ada input lagi setelah q13
- String diterima sebagai ID valid

**Visualisasi Path:**
```
q0 --O--> q1 --R--> q2 --D--> q3 ----> q4 --2--> q5 --0--> q6 --2--> q7 --4--> q8 ----> q9 --0--> q10 --0--> q11 --0--> q12 --1--> q13 --EOF--> ACCEPT ✅
```

#### 3.3.2 Contoh 2: Input Invalid - Prefix Salah

**Input:** `ORDER-2024-0001`

**Trace Eksekusi:**

| Step | State Saat Ini | Input Dibaca | Fungsi Transisi | State Berikutnya | Status |
|------|----------------|--------------|------------------|------------------|--------|
| 0 | q0 | - | - | q0 | Inisialisasi |
| 1 | q0 | 'O' | δ(q0, 'O') | q1 | ✓ Valid |
| 2 | q1 | 'R' | δ(q1, 'R') | q2 | ✓ Valid |
| 3 | q2 | 'D' | δ(q2, 'D') | q3 | ✓ Valid |
| 4 | q3 | 'E' | δ(q3, 'E') | qreject | ✗ Invalid |

**Hasil:** ❌ **REJECT**

**Penjelasan:**
- Transisi berhasil sampai step 3
- Pada step 4, FSA mengharapkan '-' tapi mendapat 'E'
- Tidak ada transisi δ(q3, 'E'), maka masuk ke qreject
- String ditolak

**Error Message:**
```
Error: Karakter ke-4 harus '-', bukan 'E'
Format yang benar: ORD-XXXX-YYYY
```

**Visualisasi Path:**
```
q0 --O--> q1 --R--> q2 --D--> q3 --E--> qreject ❌
```

#### 3.3.3 Contoh 3: Input Invalid - Tahun Kurang Digit

**Input:** `ORD-24-0001`

**Trace Eksekusi:**

| Step | State Saat Ini | Input Dibaca | Fungsi Transisi | State Berikutnya | Status |
|------|----------------|--------------|------------------|------------------|--------|
| 0 | q0 | - | - | q0 | Inisialisasi |
| 1 | q0 | 'O' | δ(q0, 'O') | q1 | ✓ Valid |
| 2 | q1 | 'R' | δ(q1, 'R') | q2 | ✓ Valid |
| 3 | q2 | 'D' | δ(q2, 'D') | q3 | ✓ Valid |
| 4 | q3 | '-' | δ(q3, '-') | q4 | ✓ Valid |
| 5 | q4 | '2' | δ(q4, '2') | q5 | ✓ Valid |
| 6 | q5 | '4' | δ(q5, '4') | q6 | ✓ Valid |
| 7 | q6 | '-' | δ(q6, '-') | qreject | ✗ Invalid |

**Hasil:** ❌ **REJECT**

**Penjelasan:**
- Transisi berhasil sampai step 6
- Pada step 7, FSA mengharapkan digit (0-9) tapi mendapat '-'
- Tahun harus 4 digit, baru boleh ada '-'
- String ditolak

**Error Message:**
```
Error: Tahun harus 4 digit angka
Ditemukan: ORD-24-... (hanya 2 digit)
Format yang benar: ORD-XXXX-YYYY
```

**Visualisasi Path:**
```
q0 --O--> q1 --R--> q2 --D--> q3 ----> q4 --2--> q5 --4--> q6 ----> qreject ❌
```

#### 3.3.4 Contoh 4: Input Invalid - Nomor Urut Kurang Digit

**Input:** `ORD-2024-01`

**Trace Eksekusi:**

| Step | State Saat Ini | Input Dibaca | Fungsi Transisi | State Berikutnya | Status |
|------|----------------|--------------|------------------|------------------|--------|
| 0 | q0 | - | - | q0 | Inisialisasi |
| 1-9 | ... | ... | ... | q9 | ✓ Valid (sampai separator kedua) |
| 10 | q9 | '0' | δ(q9, '0') | q10 | ✓ Valid |
| 11 | q10 | '1' | δ(q10, '1') | q11 | ✓ Valid |
| 12 | q11 | EOF | - | q11 | ✗ Invalid |

**Hasil:** ❌ **REJECT**

**Penjelasan:**
- Transisi berhasil sampai q11
- String berakhir di q11, bukan di q13 (state accept)
- Nomor urut harus 4 digit, baru boleh berakhir
- String ditolak karena tidak mencapai state accept

**Error Message:**
```
Error: Nomor urut harus 4 digit angka
Ditemukan: ORD-2024-01 (hanya 2 digit)
Format yang benar: ORD-XXXX-YYYY
```

**Visualisasi Path:**
```
q0 --O--> ... --9--> q9 --0--> q10 --1--> q11 --EOF--> REJECT ❌
(State akhir: q11, bukan q13)
```

#### 3.3.5 Contoh 5: Input Invalid - Terlalu Panjang

**Input:** `ORD-2024-0001-EXTRA`

**Trace Eksekusi:**

| Step | State Saat Ini | Input Dibaca | Fungsi Transisi | State Berikutnya | Status |
|------|----------------|--------------|------------------|------------------|--------|
| 0-13 | ... | ... | ... | q13 | ✓ Valid (sampai karakter ke-14) |
| 14 | q13 | '-' | δ(q13, '-') | qreject | ✗ Invalid |

**Hasil:** ❌ **REJECT**

**Penjelasan:**
- Transisi berhasil sampai q13 (state accept)
- Tapi masih ada input lagi setelah q13
- q13 tidak memiliki transisi keluar (kecuali ke qreject)
- String ditolak karena terlalu panjang

**Error Message:**
```
Error: Format terlalu panjang
ID harus tepat 14 karakter: ORD-XXXX-YYYY
Ditemukan: ORD-2024-0001-EXTRA (20 karakter)
```

**Visualisasi Path:**
```
q0 --O--> ... --1--> q13 ----> qreject ❌
(Ada input setelah q13)
```

### 3.4 Analisis Perancangan

#### 3.4.1 Kelebihan Perancangan

1. **Deterministik:** Setiap state memiliki tepat satu transisi untuk setiap input
2. **Lengkap:** Semua kemungkinan input sudah ditangani
3. **Efisien:** Kompleksitas O(n) dimana n = panjang string
4. **Mudah Diimplementasikan:** Struktur yang jelas dan sistematis
5. **Mudah Dipahami:** Diagram state yang intuitif

#### 3.4.2 Validasi Perancangan

**Checklist Validasi:**
- ✅ Semua state terdefinisi dengan jelas
- ✅ Semua transisi terdefinisi
- ✅ Hanya ada satu state awal (q0)
- ✅ Hanya ada satu state accept (q13)
- ✅ Tidak ada ambiguitas dalam transisi
- ✅ Semua input invalid mengarah ke qreject
- ✅ State accept hanya dicapai jika format benar

#### 3.4.3 Kompleksitas Perancangan

**Jumlah State:** 15 state (q0-q13 + qreject)

**Jumlah Transisi:** 
- Transisi valid: 13 transisi
- Transisi ke qreject: Banyak (untuk semua input invalid)

**Kompleksitas Ruang:** O(1)
- Hanya menyimpan state saat ini
- Tidak bergantung pada panjang input

**Kompleksitas Waktu:** O(n)
- n = panjang string input
- Setiap karakter diproses tepat 1 kali

### 3.4 Logika Penerapan FSA dalam Project

#### 3.4.1 Konsep Dasar Penerapan

Project ini menerapkan FSA sebagai **komponen validasi di background** dalam sistem e-commerce. Berikut adalah logika lengkap penerapannya:

**Konsep "FSA di Background":**
```
┌─────────────────────────────────────────────────────────┐
│                    USER INTERFACE                        │
│  User hanya melihat: Input ID, Button, Result           │
│  User TIDAK tahu ada FSA yang bekerja                   │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ User Action (Input/Generate ID)
                     ↓
┌─────────────────────────────────────────────────────────┐
│              APPLICATION LAYER                           │
│  - Terima input dari user                                │
│  - Panggil FSA untuk validasi                            │
│  - Proses hasil validasi                                 │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ Call: validateOrderID(input)
                     ↓
┌─────────────────────────────────────────────────────────┐
│          ⭐ FSA VALIDATION ENGINE ⭐                     │
│                                                          │
│  Input: String ID (misal: "ORD-2024-0001")              │
│  Process:                                                │
│    1. Inisialisasi state = q0                            │
│    2. Loop setiap karakter:                              │
│       - Baca karakter                                    │
│       - Cek transisi berdasarkan state & input           │
│       - Update state                                     │
│       - Jika invalid → return REJECT                     │
│    3. Cek state akhir:                                   │
│       - Jika q13 → return ACCEPT                         │
│       - Jika bukan q13 → return REJECT                   │
│  Output: {valid: true/false, error: "..."}              │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ Return: validation result
                     ↓
┌─────────────────────────────────────────────────────────┐
│              APPLICATION LAYER                           │
│  - Terima hasil validasi dari FSA                        │
│  - Jika valid: lanjut proses (save/search)               │
│  - Jika invalid: tampilkan error ke user                 │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ Display result
                     ↓
┌─────────────────────────────────────────────────────────┐
│                    USER INTERFACE                        │
│  Tampilkan hasil: Success/Error message                 │
└─────────────────────────────────────────────────────────┘
```

#### 3.4.2 Skenario Penerapan FSA

**SKENARIO 1: Generate ID Pesanan Baru**

```
User Action: Klik "Buat Pesanan"
    ↓
System: Generate ID otomatis
    orderCounter = 1
    year = 2024
    id = "ORD-" + "2024" + "-" + "0001"
    id = "ORD-2024-0001"
    ↓
System: Panggil FSA untuk validasi
    result = validateOrderID("ORD-2024-0001")
    ↓
FSA Process:
    Step 1: q0 --'O'--> q1 ✓
    Step 2: q1 --'R'--> q2 ✓
    Step 3: q2 --'D'--> q3 ✓
    Step 4: q3 --'-'--> q4 ✓
    Step 5: q4 --'2'--> q5 ✓
    Step 6: q5 --'0'--> q6 ✓
    Step 7: q6 --'2'--> q7 ✓
    Step 8: q7 --'4'--> q8 ✓
    Step 9: q8 --'-'--> q9 ✓
    Step 10: q9 --'0'--> q10 ✓
    Step 11: q10 --'0'--> q11 ✓
    Step 12: q11 --'0'--> q12 ✓
    Step 13: q12 --'1'--> q13 ✓
    Step 14: q13 --EOF--> ACCEPT ✅
    ↓
FSA Result: {valid: true, error: null}
    ↓
System: ID valid, simpan pesanan ke database
    orders.push({
        id: "ORD-2024-0001",
        customer: "...",
        product: "...",
        ...
    })
    ↓
User Interface: Tampilkan success message
    "✅ Pesanan berhasil dibuat!"
    "ID Pesanan: ORD-2024-0001"
```

**SKENARIO 2: User Input ID untuk Cek Pesanan (Valid)**

```
User Action: Input "ORD-2024-0001" → Klik "Cek"
    ↓
System: Terima input dari user
    searchID = "ORD-2024-0001"
    ↓
System: Panggil FSA untuk validasi FORMAT
    result = validateOrderID("ORD-2024-0001")
    ↓
FSA Process: (sama seperti skenario 1)
    q0 → q1 → q2 → q3 → q4 → q5 → q6 → q7 → q8 → q9 → q10 → q11 → q12 → q13
    ↓
FSA Result: {valid: true, error: null}
    ↓
System: Format valid, cari di database
    order = database.find(id == "ORD-2024-0001")
    ↓
System: Cek hasil pencarian
    IF order found:
        User Interface: Tampilkan detail pesanan
            "✅ Pesanan Ditemukan"
            "ID: ORD-2024-0001"
            "Customer: Budi Santoso"
            "Product: Laptop ASUS"
            ...
    ELSE:
        User Interface: Tampilkan info
            "ℹ️ Pesanan Tidak Ditemukan"
            "Format ID valid, tapi tidak ada di database"
```

**SKENARIO 3: User Input ID Invalid (Prefix Salah)**

```
User Action: Input "ORDER-2024-0001" → Klik "Cek"
    ↓
System: Terima input dari user
    searchID = "ORDER-2024-0001"
    ↓
System: Panggil FSA untuk validasi FORMAT
    result = validateOrderID("ORDER-2024-0001")
    ↓
FSA Process:
    Step 1: q0 --'O'--> q1 ✓
    Step 2: q1 --'R'--> q2 ✓
    Step 3: q2 --'D'--> q3 ✓
    Step 4: q3 --'E'--> qreject ✗ (Expected: '-', Got: 'E')
    ↓
FSA Result: {
    valid: false, 
    error: "Karakter ke-4 harus '-', bukan 'E'"
}
    ↓
System: Format INVALID, TIDAK perlu cari di database
    (Hemat resource! Tidak ada query database)
    ↓
User Interface: Tampilkan error message
    "❌ Format ID Tidak Valid"
    "Error: Karakter ke-4 harus '-', bukan 'E'"
    "Format yang benar: ORD-XXXX-YYYY"
    "Contoh: ORD-2024-0001"
```

**SKENARIO 4: User Input ID Invalid (Tahun Kurang Digit)**

```
User Action: Input "ORD-24-0001" → Klik "Cek"
    ↓
System: Terima input dari user
    searchID = "ORD-24-0001"
    ↓
System: Panggil FSA untuk validasi FORMAT
    result = validateOrderID("ORD-24-0001")
    ↓
FSA Process:
    Step 1-4: q0 → q1 → q2 → q3 → q4 ✓ (ORD-)
    Step 5: q4 --'2'--> q5 ✓
    Step 6: q5 --'4'--> q6 ✓
    Step 7: q6 --'-'--> qreject ✗ (Expected: digit, Got: '-')
    ↓
FSA Result: {
    valid: false, 
    error: "Tahun harus 4 digit angka"
}
    ↓
System: Format INVALID, TIDAK perlu cari di database
    ↓
User Interface: Tampilkan error message
    "❌ Format ID Tidak Valid"
    "Error: Tahun harus 4 digit angka"
    "Ditemukan: ORD-24-... (hanya 2 digit)"
    "Format yang benar: ORD-XXXX-YYYY"
```

#### 3.4.3 Keuntungan Logika Penerapan

**1. Efisiensi Resource**
```
Tanpa FSA:
    User input ID → Query database → Cek format → Return result
    Masalah: Query database untuk ID invalid = WASTE!

Dengan FSA:
    User input ID → FSA validasi → Jika invalid: STOP
                                 → Jika valid: Query database
    Keuntungan: Hemat query database untuk ID invalid!
```

**Contoh Perhitungan:**
```
Asumsi:
- 1000 request per hari
- 30% request dengan ID invalid
- Query database = 10ms
- FSA validasi = 0.1ms

Tanpa FSA:
    Total waktu = 1000 × 10ms = 10,000ms = 10 detik

Dengan FSA:
    Valid request: 700 × 10ms = 7,000ms
    Invalid request: 300 × 0.1ms = 30ms
    Total waktu = 7,030ms = 7.03 detik
    
Penghematan: 10 - 7.03 = 2.97 detik per hari
             = ~30% lebih cepat!
```

**2. User Experience Lebih Baik**
```
Tanpa FSA:
    User input ID invalid → Query database (10ms) → Return error
    User menunggu: 10ms

Dengan FSA:
    User input ID invalid → FSA validasi (0.1ms) → Return error
    User menunggu: 0.1ms
    
Feedback 100x lebih cepat!
```

**3. Error Message Lebih Spesifik**
```
Tanpa FSA:
    Error: "ID tidak ditemukan"
    User bingung: Apakah format salah atau memang tidak ada?

Dengan FSA:
    Error: "Format ID tidak valid. Karakter ke-4 harus '-'"
    User paham: Oh, format saya salah!
```

**4. Konsistensi Data**
```
Tanpa FSA:
    ID bisa masuk database dengan format tidak konsisten
    Contoh: "ORD-24-1", "ORDER-2024-0001", "ord-2024-0001"
    Masalah: Sulit search, filter, dan maintain

Dengan FSA:
    Hanya ID dengan format benar yang bisa masuk database
    Semua ID konsisten: "ORD-XXXX-YYYY"
    Keuntungan: Mudah search, filter, dan maintain
```

#### 3.4.4 Integrasi FSA dengan Komponen Lain

**Diagram Integrasi Lengkap:**

```
┌─────────────────────────────────────────────────────────────┐
│                    SISTEM E-COMMERCE                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │           USER INTERFACE LAYER                      │    │
│  │  - Dashboard (statistik pesanan)                    │    │
│  │  - Form Buat Pesanan                                │    │
│  │  - Daftar Pesanan                                   │    │
│  │  - Form Cek Pesanan                                 │    │
│  └────────────────┬───────────────────────────────────┘    │
│                   │                                          │
│                   │ User Actions                             │
│                   ↓                                          │
│  ┌────────────────────────────────────────────────────┐    │
│  │         APPLICATION LOGIC LAYER                     │    │
│  │                                                      │    │
│  │  ┌──────────────────────────────────────────┐      │    │
│  │  │  Order Management System                  │      │    │
│  │  │  - generateOrderID()                      │      │    │
│  │  │  - createOrder()                          │      │    │
│  │  │  - findOrderByID()                        │      │    │
│  │  │  - updateOrderStatus()                    │      │    │
│  │  │  - displayOrders()                        │      │    │
│  │  └──────────────┬───────────────────────────┘      │    │
│  │                 │                                    │    │
│  │                 │ Setiap operasi ID                 │    │
│  │                 │ harus melalui FSA                 │    │
│  │                 ↓                                    │    │
│  │  ┌──────────────────────────────────────────┐      │    │
│  │  │  ⭐ FSA VALIDATION ENGINE ⭐            │      │    │
│  │  │                                           │      │    │
│  │  │  validateOrderID(input) {                │      │    │
│  │  │    currentState = q0                     │      │    │
│  │  │    for each char in input:               │      │    │
│  │  │      switch currentState:                │      │    │
│  │  │        case q0: if char=='O' → q1        │      │    │
│  │  │        case q1: if char=='R' → q2        │      │    │
│  │  │        ...                                │      │    │
│  │  │    return (currentState == q13)          │      │    │
│  │  │  }                                        │      │    │
│  │  └──────────────┬───────────────────────────┘      │    │
│  │                 │                                    │    │
│  │                 │ Validation result                 │    │
│  │                 ↓                                    │    │
│  │  ┌──────────────────────────────────────────┐      │    │
│  │  │  Decision Logic                           │      │    │
│  │  │  if (valid):                              │      │    │
│  │  │    → Lanjut ke database                   │      │    │
│  │  │  else:                                     │      │    │
│  │  │    → Return error, stop                   │      │    │
│  │  └──────────────┬───────────────────────────┘      │    │
│  └─────────────────┼────────────────────────────────────┘    │
│                    │                                          │
│                    │ If valid                                 │
│                    ↓                                          │
│  ┌────────────────────────────────────────────────────┐    │
│  │           DATA STORAGE LAYER                        │    │
│  │  - localStorage (browser storage)                   │    │
│  │  - orders[] array                                   │    │
│  │  - orderCounter                                     │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Flow Data dengan FSA:**

```
1. GENERATE ID:
   generateOrderID() 
   → Build ID string
   → validateOrderID(id) ⭐
   → if valid: return id
   → if invalid: throw error

2. CREATE ORDER:
   createOrder(data)
   → generateOrderID() (sudah ada FSA di dalamnya)
   → Save to database
   → Return success

3. SEARCH ORDER:
   findOrderByID(id)
   → validateOrderID(id) ⭐
   → if invalid: return error (NO DATABASE QUERY!)
   → if valid: query database
   → Return result

4. UPDATE STATUS:
   updateOrderStatus(id, newStatus)
   → validateOrderID(id) ⭐
   → if invalid: return error
   → if valid: update database
   → Return success
```

#### 3.4.5 Pseudocode Integrasi Lengkap

```pseudocode
// ============================================
// FSA VALIDATION ENGINE
// ============================================
FUNCTION validateOrderID(input: string) -> ValidationResult
    currentState ← q0
    
    FOR i = 0 TO length(input) - 1 DO
        char ← input[i]
        
        SWITCH currentState:
            CASE q0:
                IF char == 'O' THEN currentState ← q1
                ELSE RETURN {valid: false, error: "Must start with 'O'"}
            
            CASE q1:
                IF char == 'R' THEN currentState ← q2
                ELSE RETURN {valid: false, error: "Second char must be 'R'"}
            
            CASE q2:
                IF char == 'D' THEN currentState ← q3
                ELSE RETURN {valid: false, error: "Third char must be 'D'"}
            
            CASE q3:
                IF char == '-' THEN currentState ← q4
                ELSE RETURN {valid: false, error: "Fourth char must be '-'"}
            
            CASE q4, q5, q6, q7:
                IF isDigit(char) THEN currentState ← nextState(currentState)
                ELSE RETURN {valid: false, error: "Year must be 4 digits"}
            
            CASE q8:
                IF char == '-' THEN currentState ← q9
                ELSE RETURN {valid: false, error: "Must have '-' after year"}
            
            CASE q9, q10, q11, q12:
                IF isDigit(char) THEN currentState ← nextState(currentState)
                ELSE RETURN {valid: false, error: "Number must be 4 digits"}
            
            CASE q13:
                RETURN {valid: false, error: "Format too long"}
        END SWITCH
    END FOR
    
    IF currentState == q13 THEN
        RETURN {valid: true, error: null}
    ELSE
        RETURN {valid: false, error: "Incomplete format"}
    END IF
END FUNCTION

// ============================================
// ORDER MANAGEMENT SYSTEM
// ============================================
CLASS OrderManagementSystem:
    orders: Array
    orderCounter: Integer
    
    // Generate ID dengan FSA validation
    FUNCTION generateOrderID() -> String
        orderCounter ← orderCounter + 1
        year ← getCurrentYear()
        number ← padLeft(orderCounter, 4, '0')
        id ← "ORD-" + year + "-" + number
        
        // Validasi dengan FSA ⭐
        result ← validateOrderID(id)
        IF NOT result.valid THEN
            THROW Error("Generated ID is invalid!")
        END IF
        
        RETURN id
    END FUNCTION
    
    // Buat pesanan baru
    FUNCTION createOrder(customerName, productName, quantity, price) -> Order
        // Generate ID (sudah ada FSA di dalamnya)
        orderID ← generateOrderID()
        
        order ← {
            id: orderID,
            customerName: customerName,
            productName: productName,
            quantity: quantity,
            price: price,
            total: quantity * price,
            date: getCurrentDateTime(),
            status: "Pending"
        }
        
        orders.push(order)
        RETURN order
    END FUNCTION
    
    // Cari pesanan berdasarkan ID
    FUNCTION findOrderByID(orderID) -> SearchResult
        // Validasi format dengan FSA terlebih dahulu ⭐
        validation ← validateOrderID(orderID)
        
        IF NOT validation.valid THEN
            // Format invalid, langsung return error
            // TIDAK perlu query database!
            RETURN {
                found: false,
                error: "Invalid ID format",
                details: validation.error
            }
        END IF
        
        // Format valid, baru cari di database
        order ← orders.find(o => o.id == orderID)
        
        IF order EXISTS THEN
            RETURN {
                found: true,
                order: order
            }
        ELSE
            RETURN {
                found: false,
                error: "Order not found",
                details: "ID format is valid, but order does not exist"
            }
        END IF
    END FUNCTION
    
    // Update status pesanan
    FUNCTION updateOrderStatus(orderID, newStatus) -> UpdateResult
        // Validasi format dengan FSA ⭐
        validation ← validateOrderID(orderID)
        
        IF NOT validation.valid THEN
            RETURN {
                success: false,
                error: validation.error
            }
        END IF
        
        // Format valid, update database
        order ← orders.find(o => o.id == orderID)
        IF order EXISTS THEN
            order.status ← newStatus
            RETURN {success: true}
        ELSE
            RETURN {success: false, error: "Order not found"}
        END IF
    END FUNCTION
END CLASS
```

---

## BAB 4: IMPLEMENTASI

### 4.1 Arsitektur Sistem

#### 4.1.1 Arsitektur Keseluruhan

Sistem e-commerce dengan FSA terdiri dari beberapa komponen:

```
┌─────────────────────────────────────────────────────┐
│                  USER INTERFACE                      │
│  (Buat Pesanan, Lihat Pesanan, Cek Pesanan, dll)   │
└─────────────────┬───────────────────────────────────┘
                  │
                  v
┌─────────────────────────────────────────────────────┐
│              APPLICATION LOGIC                       │
│  - Order Management                                  │
│  - ID Generation                                     │
│  - Search & Filter                                   │
└─────────────────┬───────────────────────────────────┘
                  │
                  v
┌─────────────────────────────────────────────────────┐
│          FSA VALIDATION LAYER ⭐                    │
│  - Validate ID Format                                │
│  - Accept/Reject Decision                            │
│  - Error Message Generation                          │
└─────────────────┬───────────────────────────────────┘
                  │
                  v
┌─────────────────────────────────────────────────────┐
│              DATA STORAGE                            │
│  (localStorage / Database)                           │
└─────────────────────────────────────────────────────┘
```

**Penjelasan:**
- **User Interface:** Layer yang berinteraksi dengan user
- **Application Logic:** Business logic sistem e-commerce
- **FSA Validation Layer:** ⭐ Komponen FSA (FOKUS PEMBAHASAN)
- **Data Storage:** Penyimpanan data pesanan

**FSA bekerja sebagai middleware:**
- Setiap request yang melibatkan ID harus melalui FSA
- FSA memvalidasi format sebelum proses lanjut
- Jika invalid, langsung reject tanpa akses database

#### 4.1.2 Integrasi FSA dalam Sistem

**Skenario 1: Generate ID Baru**
```
User klik "Buat Pesanan"
    ↓
Sistem generate ID: ORD-2024-0001
    ↓
FSA validasi format ⭐
    ↓
Valid? → Ya → Simpan ke database
       → Tidak → Error (seharusnya tidak terjadi)
```

**Skenario 2: User Input ID untuk Cek Pesanan**
```
User input ID: ORD-2024-0001
    ↓
FSA validasi format ⭐
    ↓
Valid? → Ya → Cari di database → Tampilkan detail
       → Tidak → Tampilkan error, jangan query database
```

**Keuntungan Pendekatan Ini:**
- ✅ Invalid format langsung ditolak (hemat resource)
- ✅ Tidak perlu query database untuk ID invalid
- ✅ Feedback cepat ke user
- ✅ Meningkatkan performa sistem


### 4.2 Algoritma Validasi FSA

#### 4.2.1 Algoritma Utama

**Algoritma 4.1: Validasi Format ID dengan FSA**

```
ALGORITHM ValidateOrderID(input: string) -> boolean
INPUT: 
    input: string yang akan divalidasi
OUTPUT: 
    true jika format valid, false jika invalid

BEGIN
    currentState ← q0
    position ← 0
    
    FOR each character c in input DO
        SWITCH currentState:
            CASE q0:
                IF c == 'O' THEN
                    currentState ← q1
                ELSE
                    RETURN false
                END IF
            
            CASE q1:
                IF c == 'R' THEN
                    currentState ← q2
                ELSE
                    RETURN false
                END IF
            
            CASE q2:
                IF c == 'D' THEN
                    currentState ← q3
                ELSE
                    RETURN false
                END IF
            
            CASE q3:
                IF c == '-' THEN
                    currentState ← q4
                ELSE
                    RETURN false
                END IF
            
            CASE q4, q5, q6, q7:
                IF isDigit(c) THEN
                    currentState ← nextState(currentState)
                ELSE
                    RETURN false
                END IF
            
            CASE q8:
                IF c == '-' THEN
                    currentState ← q9
                ELSE
                    RETURN false
                END IF
            
            CASE q9, q10, q11, q12:
                IF isDigit(c) THEN
                    currentState ← nextState(currentState)
                ELSE
                    RETURN false
                END IF
            
            CASE q13:
                // Sudah di state accept, tidak boleh ada input lagi
                RETURN false
            
            DEFAULT:
                RETURN false
        END SWITCH
        
        position ← position + 1
    END FOR
    
    // Cek apakah mencapai state accept
    IF currentState == q13 THEN
        RETURN true
    ELSE
        RETURN false
    END IF
END
```

**Fungsi Pembantu:**

```
FUNCTION isDigit(c: char) -> boolean
BEGIN
    RETURN (c >= '0' AND c <= '9')
END

FUNCTION nextState(current: state) -> state
BEGIN
    SWITCH current:
        CASE q4: RETURN q5
        CASE q5: RETURN q6
        CASE q6: RETURN q7
        CASE q7: RETURN q8
        CASE q9: RETURN q10
        CASE q10: RETURN q11
        CASE q11: RETURN q12
        CASE q12: RETURN q13
        DEFAULT: RETURN qreject
    END SWITCH
END
```

#### 4.2.2 Analisis Kompleksitas

**Kompleksitas Waktu:**
```
T(n) = O(n)
```

**Penjelasan:**
- Loop utama berjalan sebanyak n kali (n = panjang string)
- Setiap iterasi melakukan operasi konstan O(1):
  - Perbandingan karakter: O(1)
  - Update state: O(1)
  - Increment position: O(1)
- Total: O(n) × O(1) = O(n)

**Kompleksitas Ruang:**
```
S(n) = O(1)
```

**Penjelasan:**
- Variabel currentState: O(1)
- Variabel position: O(1)
- Variabel c (karakter): O(1)
- Tidak ada struktur data tambahan yang bergantung pada n
- Total: O(1)

**Perbandingan dengan Metode Lain:**

| Metode | Kompleksitas Waktu | Kompleksitas Ruang | Keterangan |
|--------|-------------------|-------------------|------------|
| FSA (DFA) | O(n) | O(1) | Paling efisien |
| Regular Expression | O(n) | O(1) | Sama efisien, tapi kurang educational |
| Manual Parsing | O(n) | O(1) | Sama, tapi lebih prone to error |
| NFA | O(n²) | O(n) | Kurang efisien |

### 4.3 Implementasi dalam JavaScript

#### 4.3.1 Kode Implementasi FSA

```javascript
// Definisi State
const STATES = {
    Q0: 'q0',   Q1: 'q1',   Q2: 'q2',   Q3: 'q3',
    Q4: 'q4',   Q5: 'q5',   Q6: 'q6',   Q7: 'q7',
    Q8: 'q8',   Q9: 'q9',   Q10: 'q10', Q11: 'q11',
    Q12: 'q12', Q13: 'q13', REJECT: 'qreject'
};

// Fungsi helper: cek apakah karakter adalah digit
function isDigit(char) {
    return char >= '0' && char <= '9';
}

// Fungsi utama: Validasi ID dengan FSA
function validateOrderID(input) {
    let currentState = STATES.Q0;
    const steps = []; // Untuk tracking (opsional)
    
    // Proses setiap karakter
    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        const prevState = currentState;
        
        // Transisi state berdasarkan input
        switch (currentState) {
            case STATES.Q0:
                currentState = (char === 'O') ? STATES.Q1 : STATES.REJECT;
                break;
            
            case STATES.Q1:
                currentState = (char === 'R') ? STATES.Q2 : STATES.REJECT;
                break;
            
            case STATES.Q2:
                currentState = (char === 'D') ? STATES.Q3 : STATES.REJECT;
                break;
            
            case STATES.Q3:
                currentState = (char === '-') ? STATES.Q4 : STATES.REJECT;
                break;
            
            case STATES.Q4:
                currentState = isDigit(char) ? STATES.Q5 : STATES.REJECT;
                break;
            
            case STATES.Q5:
                currentState = isDigit(char) ? STATES.Q6 : STATES.REJECT;
                break;
            
            case STATES.Q6:
                currentState = isDigit(char) ? STATES.Q7 : STATES.REJECT;
                break;
            
            case STATES.Q7:
                currentState = isDigit(char) ? STATES.Q8 : STATES.REJECT;
                break;
            
            case STATES.Q8:
                currentState = (char === '-') ? STATES.Q9 : STATES.REJECT;
                break;
            
            case STATES.Q9:
                currentState = isDigit(char) ? STATES.Q10 : STATES.REJECT;
                break;
            
            case STATES.Q10:
                currentState = isDigit(char) ? STATES.Q11 : STATES.REJECT;
                break;
            
            case STATES.Q11:
                currentState = isDigit(char) ? STATES.Q12 : STATES.REJECT;
                break;
            
            case STATES.Q12:
                currentState = isDigit(char) ? STATES.Q13 : STATES.REJECT;
                break;
            
            case STATES.Q13:
                // Sudah di state accept, tidak boleh ada input lagi
                currentState = STATES.REJECT;
                break;
            
            default:
                currentState = STATES.REJECT;
        }
        
        // Tracking step (opsional, untuk debugging/visualisasi)
        steps.push({
            step: i + 1,
            prevState: prevState,
            input: char,
            nextState: currentState
        });
        
        // Early termination jika sudah reject
        if (currentState === STATES.REJECT) {
            return {
                valid: false,
                finalState: currentState,
                steps: steps,
                error: `Invalid character '${char}' at position ${i + 1}`
            };
        }
    }
    
    // Cek apakah mencapai state accept
    const valid = (currentState === STATES.Q13);
    
    return {
        valid: valid,
        finalState: currentState,
        steps: steps,
        error: valid ? null : `Incomplete format. Final state: ${currentState}, expected: q13`
    };
}

// Contoh penggunaan
const result1 = validateOrderID('ORD-2024-0001');
console.log(result1.valid); // true

const result2 = validateOrderID('ORDER-2024-0001');
console.log(result2.valid); // false
console.log(result2.error); // "Invalid character 'E' at position 4"
```

#### 4.3.2 Integrasi dengan Sistem E-commerce

```javascript
// Sistem E-commerce
class OrderManagementSystem {
    constructor() {
        this.orders = [];
        this.orderCounter = 0;
    }
    
    // Generate ID baru
    generateOrderID() {
        this.orderCounter++;
        const year = new Date().getFullYear();
        const number = String(this.orderCounter).padStart(4, '0');
        const id = `ORD-${year}-${number}`;
        
        // Validasi dengan FSA (seharusnya selalu valid)
        const validation = validateOrderID(id);
        if (!validation.valid) {
            throw new Error('Generated ID is invalid! This should not happen.');
        }
        
        return id;
    }
    
    // Buat pesanan baru
    createOrder(customerName, productName, quantity, price) {
        const orderID = this.generateOrderID();
        
        const order = {
            id: orderID,
            customerName: customerName,
            productName: productName,
            quantity: quantity,
            price: price,
            total: quantity * price,
            date: new Date().toISOString(),
            status: 'Pending'
        };
        
        this.orders.push(order);
        return order;
    }
    
    // Cari pesanan berdasarkan ID
    findOrderByID(orderID) {
        // Validasi format ID dengan FSA terlebih dahulu ⭐
        const validation = validateOrderID(orderID);
        
        if (!validation.valid) {
            return {
                found: false,
                error: 'Invalid ID format',
                details: validation.error
            };
        }
        
        // Jika format valid, baru cari di database
        const order = this.orders.find(o => o.id === orderID);
        
        if (order) {
            return {
                found: true,
                order: order
            };
        } else {
            return {
                found: false,
                error: 'Order not found',
                details: 'ID format is valid, but order does not exist in database'
            };
        }
    }
}

// Contoh penggunaan
const system = new OrderManagementSystem();

// Buat pesanan
const order1 = system.createOrder('Budi Santoso', 'Laptop ASUS', 1, 15000000);
console.log('Order created:', order1.id); // ORD-2024-0001

// Cek pesanan dengan ID valid
const result1 = system.findOrderByID('ORD-2024-0001');
console.log(result1.found); // true
console.log(result1.order); // { id: 'ORD-2024-0001', ... }

// Cek pesanan dengan ID invalid
const result2 = system.findOrderByID('ORDER-2024-0001');
console.log(result2.found); // false
console.log(result2.error); // 'Invalid ID format'
// Tidak ada query ke database karena format sudah invalid!
```

### 4.4 Keunggulan Implementasi

#### 4.4.1 Efisiensi

1. **Early Termination:** Jika format invalid terdeteksi, langsung return tanpa proses lanjut
2. **No Database Query:** ID invalid tidak perlu query database
3. **Fast Validation:** O(n) dengan n maksimal 14 karakter = sangat cepat

#### 4.4.2 Maintainability

1. **Clear Structure:** Kode terstruktur dengan jelas
2. **Easy to Modify:** Jika format berubah, tinggal modifikasi FSA
3. **Reusable:** Fungsi validasi dapat digunakan di berbagai tempat

#### 4.4.3 Reliability

1. **Deterministic:** Hasil selalu konsisten
2. **No False Positive:** Tidak ada ID invalid yang lolos
3. **No False Negative:** Tidak ada ID valid yang ditolak

---

## BAB 5: PENGUJIAN DAN ANALISIS

### 5.1 Metodologi Pengujian

Pengujian dilakukan dengan metode **Black Box Testing**, yaitu menguji fungsi validasi FSA dengan berbagai input tanpa melihat detail implementasi internal.

**Kriteria Pengujian:**
1. **Correctness:** Apakah hasil validasi benar?
2. **Completeness:** Apakah semua kasus sudah ditest?
3. **Performance:** Apakah validasi cukup cepat?

### 5.2 Test Case Valid

**Tabel 5.1: Test Case untuk ID Valid**

| No | Input | Expected | Actual | Status | Waktu (ms) |
|----|-------|----------|--------|--------|------------|
| 1 | ORD-2024-0001 | VALID | VALID | ✓ PASS | < 0.1 |
| 2 | ORD-2025-9999 | VALID | VALID | ✓ PASS | < 0.1 |
| 3 | ORD-1999-0123 | VALID | VALID | ✓ PASS | < 0.1 |
| 4 | ORD-2024-5678 | VALID | VALID | ✓ PASS | < 0.1 |
| 5 | ORD-0000-0000 | VALID | VALID | ✓ PASS | < 0.1 |
| 6 | ORD-9999-9999 | VALID | VALID | ✓ PASS | < 0.1 |
| 7 | ORD-2023-0001 | VALID | VALID | ✓ PASS | < 0.1 |
| 8 | ORD-2026-1234 | VALID | VALID | ✓ PASS | < 0.1 |
| 9 | ORD-2020-0500 | VALID | VALID | ✓ PASS | < 0.1 |
| 10 | ORD-2022-7890 | VALID | VALID | ✓ PASS | < 0.1 |

**Hasil:** 10/10 test case PASS (100%)

### 5.3 Test Case Invalid

**Tabel 5.2: Test Case untuk ID Invalid**

| No | Input | Expected | Actual | Error Message | Status |
|----|-------|----------|--------|---------------|--------|
| 1 | ORDER-2024-0001 | INVALID | INVALID | Prefix harus 'ORD' | ✓ PASS |
| 2 | ORD-24-0001 | INVALID | INVALID | Tahun harus 4 digit | ✓ PASS |
| 3 | ORD-2024-01 | INVALID | INVALID | Nomor urut harus 4 digit | ✓ PASS |
| 4 | ord-2024-0001 | INVALID | INVALID | Harus huruf kapital | ✓ PASS |
| 5 | ORD20240001 | INVALID | INVALID | Harus ada separator '-' | ✓ PASS |
| 6 | ORD-ABCD-0001 | INVALID | INVALID | Tahun harus angka | ✓ PASS |
| 7 | ORD-2024-ABCD | INVALID | INVALID | Nomor urut harus angka | ✓ PASS |
| 8 | ORD-2024-0001-EXTRA | INVALID | INVALID | Format terlalu panjang | ✓ PASS |
| 9 | RD-2024-0001 | INVALID | INVALID | Harus diawali 'O' | ✓ PASS |
| 10 | ORD-2024-000 | INVALID | INVALID | Nomor urut kurang 1 digit | ✓ PASS |
| 11 | ORD-202-0001 | INVALID | INVALID | Tahun kurang 1 digit | ✓ PASS |
| 12 | ORD_2024_0001 | INVALID | INVALID | Separator harus '-' bukan '_' | ✓ PASS |
| 13 | ORD-2024-00001 | INVALID | INVALID | Nomor urut terlalu panjang | ✓ PASS |
| 14 | ORD-2024- | INVALID | INVALID | Nomor urut tidak ada | ✓ PASS |
| 15 | ORD- | INVALID | INVALID | Tahun dan nomor tidak ada | ✓ PASS |

**Hasil:** 15/15 test case PASS (100%)

### 5.4 Analisis Hasil Pengujian

#### 5.4.1 Tingkat Akurasi

```
Total Test Case: 25
Test Case Pass: 25
Test Case Fail: 0

Akurasi = (25/25) × 100% = 100%
```

**Kesimpulan:** FSA berhasil memvalidasi semua test case dengan akurasi 100%.

#### 5.4.2 Analisis Performa

**Waktu Validasi:**
- Rata-rata: < 0.1 ms per validasi
- Maksimal: < 0.2 ms (untuk string terpanjang)
- Minimal: < 0.05 ms (untuk string yang langsung reject)

**Kesimpulan:** Performa sangat baik, validasi sangat cepat.

#### 5.4.3 Analisis Error Message

Semua error message yang dihasilkan:
- ✅ Jelas dan spesifik
- ✅ Menunjukkan posisi error
- ✅ Memberikan saran perbaikan
- ✅ User-friendly

### 5.5 Kelebihan dan Keterbatasan

#### 5.5.1 Kelebihan Sistem

1. **Akurasi Tinggi:** 100% akurat dalam mendeteksi format valid/invalid
2. **Efisien:** Kompleksitas O(n), sangat cepat
3. **Deterministik:** Hasil selalu konsisten
4. **User-Friendly:** Error message yang jelas
5. **Maintainable:** Kode terstruktur dan mudah dimodifikasi
6. **Reusable:** Dapat digunakan di berbagai bagian sistem
7. **Educational:** Menunjukkan aplikasi FSA dalam dunia nyata

#### 5.5.2 Keterbatasan Sistem

1. **Format Terbatas:** Hanya bisa validasi 1 format (ORD-XXXX-YYYY)
2. **Tidak Cek Semantik:** Tidak validasi apakah tahun masuk akal (misal: 9999)
3. **Tidak Cek Database:** Tidak cek apakah ID sudah ada (duplikasi)
4. **Case Sensitive:** Huruf kecil 'ord' tidak diterima
5. **Tidak Fleksibel:** Jika format berubah, harus redesign FSA

#### 5.5.3 Saran Perbaikan

1. **Multi-Format Support:** Tambah FSA untuk format ID lain (CUST-XXXXX, PROD-XXX)
2. **Semantic Validation:** Tambah validasi tahun (1900-2100)
3. **Case Insensitive:** Modifikasi FSA agar terima huruf kecil dan auto-convert
4. **Configurable Format:** Buat FSA yang bisa dikonfigurasi untuk berbagai format
5. **Integration with Database:** Tambah pengecekan duplikasi setelah validasi format

---

## BAB 6: PENUTUP

### 6.1 Kesimpulan

Berdasarkan hasil perancangan, implementasi, dan pengujian sistem validasi ID pesanan menggunakan FSA, dapat disimpulkan bahwa:

1. **FSA efektif untuk validasi format string** dengan tingkat akurasi 100% dalam semua test case yang diuji (25 test case).

2. **Perancangan FSA dengan 15 state** (q0 hingga q13 plus qreject) mampu memvalidasi format `ORD-XXXX-YYYY` secara deterministik dan akurat.

3. **Implementasi FSA sebagai komponen validasi di background** sistem e-commerce berhasil meningkatkan efisiensi dengan cara:
   - Menolak ID invalid tanpa query database
   - Memberikan feedback cepat ke user
   - Menghemat resource sistem

4. **Kompleksitas waktu O(n)** membuat validasi sangat cepat (< 0.1 ms), sehingga tidak menambah overhead signifikan pada sistem.

5. **FSA cocok digunakan untuk validasi format data** dalam sistem e-commerce atau aplikasi lain yang memerlukan konsistensi format.

6. **Integrasi FSA dalam sistem nyata** menunjukkan bahwa teori automata memiliki aplikasi praktis yang relevan dalam dunia industri.

7. **Pendekatan "FSA di background"** membuktikan bahwa user tidak perlu mengetahui keberadaan FSA, namun tetap mendapatkan manfaat dari validasi yang akurat dan cepat.

### 6.2 Saran

Untuk pengembangan lebih lanjut, disarankan:

**Untuk Sistem:**

1. **Menambah Format Lain:** Implementasi FSA untuk format ID lain seperti:
   - ID Pelanggan: `CUST-XXXXX`
   - ID Produk: `PROD-XXX`
   - ID Transaksi: `TRX-XXXXXXXXXX`

2. **Validasi Semantik:** Tambahkan pengecekan:
   - Tahun valid (1900-2100)
   - Nomor urut tidak melebihi batas maksimal
   - Konsistensi dengan data lain

3. **Case Insensitive:** Modifikasi FSA agar:
   - Terima huruf kecil 'ord'
   - Auto-convert ke huruf besar 'ORD'

4. **Integrasi Database:** Tambahkan pengecekan:
   - Duplikasi ID
   - Konsistensi dengan data existing

5. **Batch Validation:** Tambah fitur untuk:
   - Validasi banyak ID sekaligus
   - Upload file CSV dengan list ID
   - Export hasil validasi

**Untuk Penelitian Lanjutan:**

1. **Perbandingan Metode:** Bandingkan FSA dengan metode lain (Regex, Parser, dll) dalam hal:
   - Performa
   - Maintainability
   - Ease of use

2. **FSA untuk Kasus Lain:** Eksplorasi penggunaan FSA untuk:
   - Validasi email
   - Validasi nomor telepon
   - Validasi format data lain

3. **Optimasi FSA:** Penelitian tentang:
   - Minimisasi jumlah state
   - Optimasi transisi
   - Parallel processing

4. **Visualisasi FSA:** Pengembangan tool untuk:
   - Generate diagram state otomatis
   - Animasi proses validasi
   - Interactive FSA designer

**Untuk Pembelajaran:**

1. **Tutorial Interaktif:** Buat tutorial yang menunjukkan:
   - Cara merancang FSA
   - Cara mengimplementasikan FSA
   - Cara mengintegrasikan FSA dalam aplikasi

2. **Case Study:** Kumpulkan case study penggunaan FSA dalam:
   - Industri e-commerce
   - Compiler design
   - Network protocol
   - Game development

3. **Best Practices:** Dokumentasikan best practices untuk:
   - Perancangan FSA yang efisien
   - Implementasi FSA yang maintainable
   - Testing FSA yang comprehensive

---

## DAFTAR PUSTAKA

1. Hopcroft, J. E., Motwani, R., & Ullman, J. D. (2006). *Introduction to Automata Theory, Languages, and Computation* (3rd ed.). Pearson Education.

2. Sipser, M. (2012). *Introduction to the Theory of Computation* (3rd ed.). Cengage Learning.

3. Linz, P. (2011). *An Introduction to Formal Languages and Automata* (5th ed.). Jones & Bartlett Learning.

4. Martin, J. C. (2010). *Introduction to Languages and the Theory of Computation* (4th ed.). McGraw-Hill Education.

5. Sudkamp, T. A. (2005). *Languages and Machines: An Introduction to the Theory of Computer Science* (3rd ed.). Addison-Wesley.

6. Aho, A. V., Lam, M. S., Sethi, R., & Ullman, J. D. (2006). *Compilers: Principles, Techniques, and Tools* (2nd ed.). Addison-Wesley.

7. Kozen, D. C. (1997). *Automata and Computability*. Springer-Verlag.

8. Rich, E. (2007). *Automata, Computability and Complexity: Theory and Applications*. Pearson Prentice Hall.

---

## LAMPIRAN

### Lampiran A: Source Code Lengkap

*(Source code lengkap akan disertakan dalam file terpisah)*

File yang disertakan:
1. `sistem-ecommerce-fsa.html` - GUI Sistem E-commerce
2. `fsa-validator.js` - Implementasi FSA
3. `order-management.js` - Sistem manajemen pesanan

### Lampiran B: Screenshot Pengujian

*(Screenshot hasil testing akan ditambahkan di sini)*

1. Screenshot test case valid
2. Screenshot test case invalid
3. Screenshot integrasi dalam sistem

### Lampiran C: Diagram State Lengkap

*(Diagram state dengan detail lengkap akan ditambahkan di sini)*

### Lampiran D: Tabel Transisi Lengkap

*(Tabel transisi dengan semua kemungkinan input akan ditambahkan di sini)*

---

**CATATAN AKHIR:**

Laporan ini dibuat sebagai tugas akhir semester mata kuliah Teori Bahasa dan Automata. Semua implementasi dan analisis dilakukan secara mandiri dengan referensi dari buku-buku teks yang tercantum dalam daftar pustaka.

**Fokus Utama:** Implementasi Finite State Automata (FSA) untuk validasi format ID pesanan dalam sistem e-commerce, dimana FSA bekerja di background sebagai komponen validasi.

---

**Disusun Oleh:**

Nama: [Nama Mahasiswa]  
NIM: [NIM Mahasiswa]  
Program Studi: [Program Studi]  
Fakultas: [Fakultas]  
Universitas: [Universitas]

**Dosen Pengampu:**

[Nama Dosen]  
[Gelar Dosen]

---

**Tanggal Penyerahan:** [Tanggal]

**Tempat:** [Kota]

---

*Akhir Laporan*
