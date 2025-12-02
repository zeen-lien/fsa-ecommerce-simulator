// Definisi States untuk FSA E-commerce Order Tracking (Bahasa Indonesia)

export const STATES = {
    PESANAN_DIBUAT: 'PESANAN_DIBUAT',
    MENUNGGU_PEMBAYARAN: 'MENUNGGU_PEMBAYARAN',
    PEMBAYARAN_DIKONFIRMASI: 'PEMBAYARAN_DIKONFIRMASI',
    DIPROSES: 'DIPROSES',
    DIKIRIM: 'DIKIRIM',
    DALAM_PENGIRIMAN: 'DALAM_PENGIRIMAN',
    SELESAI: 'SELESAI',
    DIBATALKAN: 'DIBATALKAN',
    PERMINTAAN_REFUND: 'PERMINTAAN_REFUND',
    REFUND_SELESAI: 'REFUND_SELESAI'
};

export const ACTIONS = {
    BUAT_PESANAN: 'buat_pesanan',
    KONFIRMASI_PEMBAYARAN: 'konfirmasi_pembayaran',
    BATALKAN_PEMBAYARAN: 'batalkan_pembayaran',
    PROSES_PESANAN: 'proses_pesanan',
    KIRIM_PESANAN: 'kirim_pesanan',
    UPDATE_PENGIRIMAN: 'update_pengiriman',
    PESANAN_SAMPAI: 'pesanan_sampai',
    BATALKAN_PESANAN: 'batalkan_pesanan',
    MINTA_REFUND: 'minta_refund',
    SETUJUI_REFUND: 'setujui_refund'
};

// Transition Function δ(state, action) -> nextState
export const TRANSITIONS = {
    [STATES.PESANAN_DIBUAT]: {
        [ACTIONS.BUAT_PESANAN]: STATES.MENUNGGU_PEMBAYARAN
    },
    [STATES.MENUNGGU_PEMBAYARAN]: {
        [ACTIONS.KONFIRMASI_PEMBAYARAN]: STATES.PEMBAYARAN_DIKONFIRMASI,
        [ACTIONS.BATALKAN_PEMBAYARAN]: STATES.DIBATALKAN
    },
    [STATES.PEMBAYARAN_DIKONFIRMASI]: {
        [ACTIONS.PROSES_PESANAN]: STATES.DIPROSES,
        [ACTIONS.BATALKAN_PESANAN]: STATES.DIBATALKAN
    },
    [STATES.DIPROSES]: {
        [ACTIONS.KIRIM_PESANAN]: STATES.DIKIRIM,
        [ACTIONS.BATALKAN_PESANAN]: STATES.DIBATALKAN
    },
    [STATES.DIKIRIM]: {
        [ACTIONS.UPDATE_PENGIRIMAN]: STATES.DALAM_PENGIRIMAN
    },
    [STATES.DALAM_PENGIRIMAN]: {
        [ACTIONS.PESANAN_SAMPAI]: STATES.SELESAI,
        [ACTIONS.MINTA_REFUND]: STATES.PERMINTAAN_REFUND
    },
    [STATES.SELESAI]: {
        [ACTIONS.MINTA_REFUND]: STATES.PERMINTAAN_REFUND
    },
    [STATES.PERMINTAAN_REFUND]: {
        [ACTIONS.SETUJUI_REFUND]: STATES.REFUND_SELESAI
    },
    [STATES.DIBATALKAN]: {},
    [STATES.REFUND_SELESAI]: {}
};

// Initial State
export const INITIAL_STATE = STATES.PESANAN_DIBUAT;

// Final States
export const FINAL_STATES = [
    STATES.SELESAI,
    STATES.DIBATALKAN,
    STATES.REFUND_SELESAI
];

// State metadata untuk UI (Dark Theme Colors with Font Awesome Icons)
export const STATE_METADATA = {
    [STATES.PESANAN_DIBUAT]: {
        label: 'Pesanan Dibuat',
        labelId: 'q0',
        color: '#10b981',
        darkColor: '#059669',
        icon: 'fa-file-alt',
        deskripsi: 'Pesanan baru berhasil dibuat'
    },
    [STATES.MENUNGGU_PEMBAYARAN]: {
        label: 'Menunggu Pembayaran',
        labelId: 'q1',
        color: '#f59e0b',
        darkColor: '#d97706',
        icon: 'fa-clock',
        deskripsi: 'Menunggu konfirmasi pembayaran dari pelanggan'
    },
    [STATES.PEMBAYARAN_DIKONFIRMASI]: {
        label: 'Pembayaran Dikonfirmasi',
        labelId: 'q2',
        color: '#3b82f6',
        darkColor: '#2563eb',
        icon: 'fa-check-circle',
        deskripsi: 'Pembayaran berhasil dikonfirmasi'
    },
    [STATES.DIPROSES]: {
        label: 'Sedang Diproses',
        labelId: 'q3',
        color: '#8b5cf6',
        darkColor: '#7c3aed',
        icon: 'fa-cog',
        deskripsi: 'Pesanan sedang diproses dan dikemas'
    },
    [STATES.DIKIRIM]: {
        label: 'Dikirim',
        labelId: 'q4',
        color: '#06b6d4',
        darkColor: '#0891b2',
        icon: 'fa-box',
        deskripsi: 'Pesanan sudah diserahkan ke kurir'
    },
    [STATES.DALAM_PENGIRIMAN]: {
        label: 'Dalam Pengiriman',
        labelId: 'q5',
        color: '#6366f1',
        darkColor: '#4f46e5',
        icon: 'fa-shipping-fast',
        deskripsi: 'Pesanan sedang dalam perjalanan'
    },
    [STATES.SELESAI]: {
        label: 'Selesai',
        labelId: 'q6',
        color: '#10b981',
        darkColor: '#059669',
        icon: 'fa-check-double',
        deskripsi: 'Pesanan berhasil sampai ke tujuan'
    },
    [STATES.DIBATALKAN]: {
        label: 'Dibatalkan',
        labelId: 'q7',
        color: '#ef4444',
        darkColor: '#dc2626',
        icon: 'fa-times-circle',
        deskripsi: 'Pesanan dibatalkan'
    },
    [STATES.PERMINTAAN_REFUND]: {
        label: 'Permintaan Refund',
        labelId: 'q8',
        color: '#f97316',
        darkColor: '#ea580c',
        icon: 'fa-money-bill-wave',
        deskripsi: 'Permintaan pengembalian dana diajukan'
    },
    [STATES.REFUND_SELESAI]: {
        label: 'Refund Selesai',
        labelId: 'q9',
        color: '#64748b',
        darkColor: '#475569',
        icon: 'fa-hand-holding-usd',
        deskripsi: 'Pengembalian dana selesai diproses'
    }
};

// Action metadata untuk UI (Dark Theme with Font Awesome Icons)
export const ACTION_METADATA = {
    [ACTIONS.BUAT_PESANAN]: {
        label: 'Buat Pesanan',
        color: '#10b981',
        darkColor: '#059669',
        icon: 'fa-plus-circle',
        deskripsi: 'Membuat pesanan baru'
    },
    [ACTIONS.KONFIRMASI_PEMBAYARAN]: {
        label: 'Konfirmasi Pembayaran',
        color: '#3b82f6',
        darkColor: '#2563eb',
        icon: 'fa-credit-card',
        deskripsi: 'Konfirmasi pembayaran berhasil'
    },
    [ACTIONS.BATALKAN_PEMBAYARAN]: {
        label: 'Batalkan Pembayaran',
        color: '#ef4444',
        darkColor: '#dc2626',
        icon: 'fa-ban',
        deskripsi: 'Pembayaran gagal atau dibatalkan'
    },
    [ACTIONS.PROSES_PESANAN]: {
        label: 'Proses Pesanan',
        color: '#8b5cf6',
        darkColor: '#7c3aed',
        icon: 'fa-tasks',
        deskripsi: 'Mulai memproses pesanan'
    },
    [ACTIONS.KIRIM_PESANAN]: {
        label: 'Kirim Pesanan',
        color: '#06b6d4',
        darkColor: '#0891b2',
        icon: 'fa-truck',
        deskripsi: 'Mengirim pesanan ke kurir'
    },
    [ACTIONS.UPDATE_PENGIRIMAN]: {
        label: 'Update Pengiriman',
        color: '#6366f1',
        darkColor: '#4f46e5',
        icon: 'fa-map-marker-alt',
        deskripsi: 'Update status pengiriman'
    },
    [ACTIONS.PESANAN_SAMPAI]: {
        label: 'Pesanan Sampai',
        color: '#10b981',
        darkColor: '#059669',
        icon: 'fa-home',
        deskripsi: 'Pesanan telah sampai'
    },
    [ACTIONS.BATALKAN_PESANAN]: {
        label: 'Batalkan Pesanan',
        color: '#ef4444',
        darkColor: '#dc2626',
        icon: 'fa-times',
        deskripsi: 'Batalkan pesanan'
    },
    [ACTIONS.MINTA_REFUND]: {
        label: 'Minta Refund',
        color: '#f97316',
        darkColor: '#ea580c',
        icon: 'fa-undo-alt',
        deskripsi: 'Ajukan permintaan refund'
    },
    [ACTIONS.SETUJUI_REFUND]: {
        label: 'Setujui Refund',
        color: '#64748b',
        darkColor: '#475569',
        icon: 'fa-check',
        deskripsi: 'Setujui dan proses refund'
    }
};
