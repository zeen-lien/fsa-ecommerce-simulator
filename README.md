# 🛒 FSA E-commerce Simulator

Simulasi sistem pemesanan e-commerce menggunakan **Finite State Automata (FSA)** - Tugas UAS Teori Bahasa dan Automata.

## 🎯 Deskripsi

Aplikasi web interaktif yang mensimulasikan alur pemesanan e-commerce dari awal hingga selesai menggunakan konsep FSA. Setiap state dalam proses pemesanan dimodelkan sebagai state dalam automata, dengan transisi yang jelas antar state.

## ✨ Fitur

- ✅ **Simulasi FSA Real-time** - Visualisasi state dan transisi
- 🎨 **UI Modern & Responsif** - Desain clean dengan animasi smooth
- 📊 **State Diagram Interaktif** - Lihat posisi state saat ini
- 🔄 **Validasi Transisi** - Hanya transisi valid yang bisa dijalankan
- 📝 **History Log** - Tracking semua perubahan state
- 🛡️ **Error Handling** - Validasi input dan state

## 🏗️ Struktur FSA

### States (Q)
- `IDLE` - State awal
- `BROWSING` - Melihat produk
- `CART` - Keranjang belanja
- `CHECKOUT` - Proses checkout
- `PAYMENT` - Pembayaran
- `PROCESSING` - Pemrosesan pesanan
- `SHIPPED` - Pengiriman
- `DELIVERED` - Terkirim (state akhir)
- `CANCELLED` - Dibatalkan (state akhir)

### Transisi (δ)
```
IDLE → BROWSING (start_browsing)
BROWSING → CART (add_to_cart)
CART → CHECKOUT (proceed_checkout)
CHECKOUT → PAYMENT (confirm_order)
PAYMENT → PROCESSING (payment_success)
PROCESSING → SHIPPED (ship_order)
SHIPPED → DELIVERED (confirm_delivery)
CART → BROWSING (continue_shopping)
CHECKOUT → CART (back_to_cart)
PAYMENT → CANCELLED (payment_failed)
```

## 🚀 Cara Menjalankan

### Online (Live Demo)
Akses langsung di: **https://[username].github.io/fsa-ecommerce-simulator**

### Lokal

1. **Clone repository**
   ```bash
   git clone https://github.com/[username]/fsa-ecommerce-simulator.git
   cd fsa-ecommerce-simulator
   ```

2. **Buka dengan browser**
   - Double click file `index.html` di root folder
   - Atau klik kanan → Open with → Browser pilihan lo

3. **Atau gunakan Live Server (VS Code)**
   - Install extension "Live Server"
   - Klik kanan `index.html` → Open with Live Server

## 📁 Struktur Project

```
fsa-ecommerce-simulator/
├── index.html              # UI utama (root untuk GitHub Pages)
├── styles.css              # Styling (root untuk GitHub Pages)
├── src/
│   ├── core/
│   │   ├── fsa.js          # Implementasi FSA
│   │   └── orderStates.js  # Definisi states & transisi
│   ├── utils/
│   │   └── validator.js    # Validasi input
│   └── app.js              # Main application logic
├── public/                 # Backup original files
│   ├── index.html
│   └── styles.css
├── LAPORAN-TUGAS-UAS.md    # Laporan lengkap
└── README.md
```

## 🎮 Cara Menggunakan

1. **Start Browsing** - Mulai melihat produk
2. **Add to Cart** - Tambahkan produk ke keranjang
3. **Proceed to Checkout** - Lanjut ke checkout
4. **Confirm Order** - Konfirmasi pesanan
5. **Complete Payment** - Bayar pesanan
6. **Track Shipping** - Lacak pengiriman
7. **Confirm Delivery** - Konfirmasi penerimaan

## 🧪 Testing

Aplikasi sudah ditest dengan berbagai skenario:
- ✅ Happy path (IDLE → DELIVERED)
- ✅ Cancellation path (PAYMENT → CANCELLED)
- ✅ Back navigation (CHECKOUT → CART → BROWSING)
- ✅ Invalid transitions
- ✅ Edge cases

## 📚 Teknologi

- **Vanilla JavaScript** (ES6+)
- **HTML5**
- **CSS3** (Flexbox, Grid, Animations)
- **FSA Theory** (Teori Bahasa dan Automata)

## 👨‍💻 Author

**[Nama Kamu]**
- NIM: [NIM Kamu]
- Mata Kuliah: Teori Bahasa dan Automata
- Dosen: [Nama Dosen]

## 📄 Lisensi

Project ini dibuat untuk keperluan akademik - Tugas UAS TBA

## 🙏 Acknowledgments

- Terima kasih kepada Bapak/Ibu [Nama Dosen] atas bimbingannya
- Referensi: Teori Bahasa dan Automata

---

⭐ **Star repo ini jika bermanfaat!**
