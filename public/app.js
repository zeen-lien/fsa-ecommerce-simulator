// Main Application - FSA E-commerce Simulator
import { FSAEngine, OrderManager } from './core/fsa.js';
import { STATES, ACTIONS, STATE_METADATA, ACTION_METADATA } from './core/orderStates.js';

class AplikasiSimulatorFSA {
    constructor() {
        this.managerPesanan = new OrderManager();
        this.pesananAktifId = null;
        this.viz = null;
        this.modeAktif = 'manual';
        this.simulasiInterval = null;
        this.simulasiBerjalan = false;
        this.skenarioAktif = null;
        this.pathHistory = [];
        this.currentTransition = null;
        this.init();
    }

    async init() {
        this.viz = new Viz();
        this.setupEventListeners();
        await this.renderDiagram();
        this.updateStatistik();
        setTimeout(() => this.tampilkanPesanSelamatDatang(), 500);
    }

    tampilkanPesanSelamatDatang() {
        Swal.fire({
            title: 'Selamat Datang!',
            html: '<p>Simulasi FSA E-commerce</p><p style="font-size: 0.9rem; color: #94a3b8; margin-top: 1rem;">Pilih mode untuk memulai</p>',
            icon: 'info',
            confirmButtonText: 'Mulai',
            background: '#1e293b',
            color: '#f1f5f9'
        });
    }

    setupEventListeners() {
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', () => this.switchMode(btn.dataset.mode));
        });
        document.getElementById('buatPesanan').addEventListener('click', () => this.buatPesanan());
        document.getElementById('namaPelanggan').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.buatPesanan();
        });
        document.querySelectorAll('.scenario-btn').forEach(btn => {
            btn.addEventListener('click', () => this.pilihSkenario(btn.dataset.scenario));
        });
        document.getElementById('kecepatanSimulasi').addEventListener('input', (e) => {
            document.getElementById('kecepatanLabel').textContent = (e.target.value / 1000).toFixed(1) + 's';
        });
        document.getElementById('mulaiSimulasi').addEventListener('click', () => this.mulaiSimulasi());
        document.getElementById('stopSimulasi').addEventListener('click', () => this.stopSimulasi());
        document.getElementById('validasiSequence').addEventListener('click', () => this.validasiSequence());
        document.querySelectorAll('.example-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.getElementById('sequenceInput').value = btn.dataset.sequence;
                this.validasiSequence();
            });
        });
        document.getElementById('refreshDiagram').addEventListener('click', () => {
            this.renderDiagram();
            Swal.fire({
                title: 'Diagram Diperbarui!',
                text: 'Diagram berhasil di-refresh',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
                background: '#1e293b',
                color: '#f1f5f9'
            });
        });
        document.getElementById('fullscreenDiagram').addEventListener('click', () => this.toggleFullscreen());
        
        // ESC key to exit fullscreen
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const diagramSection = document.querySelector('.diagram-section');
                if (diagramSection.classList.contains('fullscreen')) {
                    this.toggleFullscreen();
                }
            }
        });
        document.getElementById('closePanel').addEventListener('click', () => this.closeInfoPanel());
        document.getElementById('minimizePanel').addEventListener('click', () => this.minimizeInfoPanel());
        document.getElementById('infoPanelToggleBtn').addEventListener('click', () => this.showInfoPanel());
        const clearBtn = document.getElementById('clearHistory');
        if (clearBtn) clearBtn.addEventListener('click', () => this.clearHistory());
        
        // Setup draggable panel
        this.setupDraggablePanel();
    }
    
    toggleFullscreen() {
        const diagramSection = document.querySelector('.diagram-section');
        const body = document.body;
        const icon = document.querySelector('#fullscreenDiagram i');
        
        diagramSection.classList.toggle('fullscreen');
        body.classList.toggle('fullscreen-active');
        
        if (diagramSection.classList.contains('fullscreen')) {
            icon.className = 'fas fa-compress';
            // Show notification
            const toast = document.createElement('div');
            toast.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0, 240, 255, 0.95);
                color: #0a0e27;
                padding: 1rem 2rem;
                border-radius: 0.5rem;
                font-weight: 600;
                z-index: 999999;
                box-shadow: 0 0 30px rgba(0, 240, 255, 0.8);
                animation: slideIn 0.3s ease;
            `;
            toast.textContent = '🖥️ Mode Fullscreen - Tekan ESC atau klik compress untuk keluar';
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        } else {
            icon.className = 'fas fa-expand';
        }
        
        // Re-render diagram with delay for smooth transition
        setTimeout(() => this.renderDiagram(), 200);
    }
    
    closeInfoPanel() {
        document.getElementById('stateInfoPanel').style.display = 'none';
        document.getElementById('infoPanelToggleBtn').style.display = 'flex';
    }
    
    showInfoPanel() {
        document.getElementById('stateInfoPanel').style.display = 'block';
        document.getElementById('infoPanelToggleBtn').style.display = 'none';
        document.getElementById('stateInfoPanel').classList.remove('minimized');
    }
    
    minimizeInfoPanel() {
        const panel = document.getElementById('stateInfoPanel');
        const icon = document.querySelector('#minimizePanel i');
        panel.classList.toggle('minimized');
        if (panel.classList.contains('minimized')) {
            icon.className = 'fas fa-plus';
        } else {
            icon.className = 'fas fa-minus';
        }
    }
    
    setupDraggablePanel() {
        const panel = document.getElementById('stateInfoPanel');
        const handle = panel.querySelector('.draggable-handle');
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;

        handle.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);

        // Touch events for mobile
        handle.addEventListener('touchstart', dragStart);
        document.addEventListener('touchmove', drag);
        document.addEventListener('touchend', dragEnd);

        function dragStart(e) {
            if (e.type === 'touchstart') {
                initialX = e.touches[0].clientX - xOffset;
                initialY = e.touches[0].clientY - yOffset;
            } else {
                initialX = e.clientX - xOffset;
                initialY = e.clientY - yOffset;
            }

            if (e.target === handle || handle.contains(e.target)) {
                isDragging = true;
                panel.classList.add('dragging');
            }
        }

        function drag(e) {
            if (isDragging) {
                e.preventDefault();
                
                if (e.type === 'touchmove') {
                    currentX = e.touches[0].clientX - initialX;
                    currentY = e.touches[0].clientY - initialY;
                } else {
                    currentX = e.clientX - initialX;
                    currentY = e.clientY - initialY;
                }

                xOffset = currentX;
                yOffset = currentY;

                setTranslate(currentX, currentY, panel);
            }
        }

        function dragEnd(e) {
            initialX = currentX;
            initialY = currentY;
            isDragging = false;
            panel.classList.remove('dragging');
        }

        function setTranslate(xPos, yPos, el) {
            el.style.transform = `translate(${xPos}px, ${yPos}px)`;
        }
    }

    switchMode(mode) {
        this.modeAktif = mode;
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });
        document.querySelectorAll('.mode-content').forEach(content => {
            content.style.display = 'none';
        });
        document.getElementById(mode + 'Mode').style.display = 'block';
    }

    buatPesanan() {
        const nama = document.getElementById('namaPelanggan').value.trim() || 'Pelanggan';
        const pesanan = this.managerPesanan.createOrder(nama);
        Swal.fire({
            title: 'Pesanan Dibuat!',
            text: `Pesanan ${pesanan.id} berhasil dibuat`,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
            background: '#1e293b',
            color: '#f1f5f9'
        });
        this.renderDaftarPesanan();
        this.pilihPesanan(pesanan.id);
        this.updateStatistik();
        document.getElementById('namaPelanggan').value = '';
    }

    pilihPesanan(pesananId) {
        this.pesananAktifId = pesananId;
        this.renderDaftarPesanan();
        this.renderDetailPesanan();
        this.renderAksiTersedia();
        this.renderRiwayat();
        this.renderDiagram();
    }
    renderDaftarPesanan() {
        const container = document.getElementById('daftarPesanan');
        const pesananList = this.managerPesanan.getAllOrders();
        if (pesananList.length === 0) {
            container.innerHTML = '<div class="empty-state"><i class="fas fa-inbox"></i><p>Belum ada pesanan</p></div>';
            return;
        }
        container.innerHTML = pesananList.map(pesanan => {
            const state = pesanan.fsa.getCurrentState();
            const metadata = STATE_METADATA[state];
            const isActive = pesanan.id === this.pesananAktifId;
            return `<div class="pesanan-item ${isActive ? 'active' : ''}" onclick="app.pilihPesanan('${pesanan.id}')">
                <div class="pesanan-item-header">
                    <span class="pesanan-id">${pesanan.id}</span>
                    <button class="delete-pesanan" onclick="event.stopPropagation(); app.hapusPesanan('${pesanan.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="pesanan-customer"><i class="fas fa-user"></i> ${pesanan.customerName}</div>
                <div class="pesanan-state" style="background: ${metadata.darkColor}">
                    <i class="fas ${metadata.icon}"></i> ${metadata.label}
                </div>
            </div>`;
        }).join('');
    }

    renderDetailPesanan() {
        const pesanan = this.managerPesanan.getOrder(this.pesananAktifId);
        if (!pesanan) {
            document.getElementById('detailPesananSection').style.display = 'none';
            return;
        }
        document.getElementById('detailPesananSection').style.display = 'block';
        const state = pesanan.fsa.getCurrentState();
        const metadata = STATE_METADATA[state];
        const stats = pesanan.fsa.getStatistics();
        document.getElementById('detailPesanan').innerHTML = `
            <div class="detail-row">
                <span class="detail-label">ID Pesanan:</span>
                <span class="detail-value">${pesanan.id}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Pelanggan:</span>
                <span class="detail-value">${pesanan.customerName}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">State Saat Ini:</span>
                <span class="detail-value"><i class="fas ${metadata.icon}"></i> ${metadata.label}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Deskripsi:</span>
                <span class="detail-value">${metadata.deskripsi}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Total Transisi:</span>
                <span class="detail-value">${stats.totalTransitions}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">State Akhir:</span>
                <span class="detail-value">${stats.isFinalState ? '<i class="fas fa-check-circle" style="color: #10b981"></i> Ya' : '<i class="fas fa-times-circle" style="color: #ef4444"></i> Tidak'}</span>
            </div>
        `;
    }

    renderAksiTersedia() {
        const pesanan = this.managerPesanan.getOrder(this.pesananAktifId);
        if (!pesanan) {
            document.getElementById('aksiSection').style.display = 'none';
            document.getElementById('diagramActionButtons').style.display = 'none';
            return;
        }
        const aksiTersedia = pesanan.fsa.getAvailableActions();
        
        // Render in sidebar
        if (aksiTersedia.length === 0) {
            document.getElementById('aksiSection').style.display = 'block';
            document.getElementById('tombolAksi').innerHTML = '<div class="empty-state" style="grid-column: 1 / -1"><i class="fas fa-flag-checkered"></i><p>Tidak ada aksi tersedia</p></div>';
            document.getElementById('diagramActionButtons').style.display = 'none';
        } else {
            document.getElementById('aksiSection').style.display = 'block';
            document.getElementById('tombolAksi').innerHTML = aksiTersedia.map(aksi => {
                const metadata = ACTION_METADATA[aksi];
                return `<button class="action-btn" style="background: ${metadata.darkColor}" onclick="app.eksekusiAksi('${aksi}')">
                    <i class="fas ${metadata.icon}"></i>
                    <span>${metadata.label}</span>
                </button>`;
            }).join('');
            
            // Also render in diagram overlay
            document.getElementById('diagramActionButtons').style.display = 'flex';
            document.getElementById('diagramActionButtons').innerHTML = aksiTersedia.map(aksi => {
                const metadata = ACTION_METADATA[aksi];
                return `<button class="diagram-action-btn" style="background: ${metadata.darkColor}" onclick="app.eksekusiAksi('${aksi}')">
                    <i class="fas ${metadata.icon}"></i>
                    <span>${metadata.label}</span>
                </button>`;
            }).join('');
        }
        
        // Update state info panel
        this.updateStateInfoPanel();
    }
    
    updateStateInfoPanel() {
        const pesanan = this.managerPesanan.getOrder(this.pesananAktifId);
        if (!pesanan) {
            document.getElementById('stateInfoPanel').style.display = 'none';
            document.getElementById('infoPanelToggleBtn').style.display = 'none';
            return;
        }
        
        const currentState = pesanan.fsa.getCurrentState();
        const metadata = STATE_METADATA[currentState];
        const stats = pesanan.fsa.getStatistics();
        const history = pesanan.fsa.getHistory();
        
        // Show panel if not already visible
        if (document.getElementById('stateInfoPanel').style.display === 'none') {
            document.getElementById('stateInfoPanel').style.display = 'block';
            document.getElementById('infoPanelToggleBtn').style.display = 'none';
        }
        
        document.getElementById('stateInfoContent').innerHTML = `
            <div class="state-info-item">
                <div class="state-info-label">State Saat Ini</div>
                <div class="state-info-value" style="color: ${metadata.color}">
                    <i class="fas ${metadata.icon}"></i>
                    ${metadata.label} (${metadata.labelId})
                </div>
                <div class="state-info-desc">${metadata.deskripsi}</div>
            </div>
            
            <div class="state-info-item">
                <div class="state-info-label">Status</div>
                <div class="state-info-value">
                    ${stats.isFinalState ? '<i class="fas fa-check-circle" style="color: #10b981"></i> State Akhir' : '<i class="fas fa-arrow-right" style="color: #3b82f6"></i> Dapat Dilanjutkan'}
                </div>
            </div>
            
            <div class="state-info-item">
                <div class="state-info-label">Progress</div>
                <div class="state-info-value">
                    <i class="fas fa-list-ol"></i>
                    ${stats.totalTransitions} Transisi
                </div>
                ${history.length > 0 ? `<div class="state-info-desc">Transisi terakhir: ${ACTION_METADATA[history[history.length - 1].action].label}</div>` : ''}
            </div>
            
            ${!stats.isFinalState ? `
            <div class="state-info-item" style="border-left-color: #f59e0b">
                <div class="state-info-label">Aksi Tersedia</div>
                <div class="state-info-value" style="color: #f59e0b">
                    <i class="fas fa-bolt"></i>
                    ${pesanan.fsa.getAvailableActions().length} Aksi
                </div>
                <div class="state-info-desc">Pilih aksi di bawah untuk melanjutkan</div>
            </div>
            ` : ''}
        `;
    }

    eksekusiAksi(aksi, showNotification = true) {
        try {
            const result = this.managerPesanan.executeAction(this.pesananAktifId, aksi);
            const aksiMeta = ACTION_METADATA[aksi];
            const stateMeta = STATE_METADATA[result.nextState];
            
            // Store transition for animation
            this.lastTransition = {
                from: result.previousState,
                action: aksi,
                to: result.nextState
            };
            
            // Highlight transition with animation
            this.highlightTransition(result.previousState, result.nextState);
            
            if (showNotification && !this.simulasiBerjalan) {
                Swal.fire({
                    title: 'Transisi Berhasil!',
                    html: `<i class="fas ${aksiMeta.icon}"></i> ${aksiMeta.label} <i class="fas fa-arrow-right"></i> <i class="fas ${stateMeta.icon}"></i> ${stateMeta.label}`,
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                    background: '#1e293b',
                    color: '#f1f5f9'
                });
            }
            
            if (this.simulasiBerjalan) {
                this.tampilkanInfoTransisi(result.previousState, aksi, result.nextState);
            }
            
            this.renderDetailPesanan();
            this.renderAksiTersedia();
            this.renderRiwayat();
            this.renderDaftarPesanan();
            this.updateStatistik();
            
            // Delay diagram render for smooth animation
            setTimeout(() => this.renderDiagram(), 100);
        } catch (error) {
            Swal.fire({
                title: 'Transisi Gagal!',
                text: error.message,
                icon: 'error',
                background: '#1e293b',
                color: '#f1f5f9'
            });
        }
    }
    
    highlightTransition(fromState, toState) {
        // Add visual feedback for transition
        const container = document.getElementById('diagramContainer');
        const svg = container.querySelector('svg');
        if (!svg) return;
        
        // Find and highlight the edge
        const edges = svg.querySelectorAll('g.edge');
        edges.forEach(edge => {
            const title = edge.querySelector('title');
            if (title && title.textContent.includes(`${fromState}->${toState}`)) {
                const path = edge.querySelector('path');
                const polygon = edge.querySelector('polygon');
                if (path) {
                    path.style.stroke = '#10b981';
                    path.style.strokeWidth = '4';
                    path.style.animation = 'edgePulse 0.6s ease-in-out';
                }
                if (polygon) {
                    polygon.style.fill = '#10b981';
                    polygon.style.stroke = '#10b981';
                }
                
                // Reset after animation
                setTimeout(() => {
                    if (path) {
                        path.style.animation = '';
                    }
                }, 600);
            }
        });
    }
    
    tampilkanInfoTransisi(fromState, action, toState) {
        const fromMeta = STATE_METADATA[fromState];
        const toMeta = STATE_METADATA[toState];
        const actionMeta = ACTION_METADATA[action];
        
        // Create or update transition info overlay
        let overlay = document.getElementById('transitionOverlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'transitionOverlay';
            overlay.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(30, 41, 59, 0.98);
                border: 2px solid #3b82f6;
                border-radius: 1rem;
                padding: 2rem;
                z-index: 1000;
                min-width: 400px;
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.6);
                animation: slideIn 0.3s ease;
            `;
            document.body.appendChild(overlay);
        }
        
        overlay.innerHTML = `
            <div style="text-align: center; color: #f1f5f9;">
                <h3 style="margin-bottom: 1.5rem; color: #3b82f6; font-size: 1.5rem;">
                    <i class="fas fa-route"></i> Transisi Sedang Berjalan
                </h3>
                <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; font-size: 1.1rem;">
                    <div style="text-align: center;">
                        <i class="fas ${fromMeta.icon}" style="font-size: 2rem; color: ${fromMeta.color}; margin-bottom: 0.5rem;"></i>
                        <div style="font-weight: 600;">${fromMeta.label}</div>
                        <div style="font-size: 0.85rem; color: #94a3b8;">${fromMeta.labelId}</div>
                    </div>
                    <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
                        <i class="fas fa-arrow-right" style="font-size: 1.5rem; color: #3b82f6;"></i>
                        <div style="background: ${actionMeta.darkColor}; padding: 0.5rem 1rem; border-radius: 0.5rem; font-size: 0.9rem;">
                            <i class="fas ${actionMeta.icon}"></i> ${actionMeta.label}
                        </div>
                        <i class="fas fa-arrow-right" style="font-size: 1.5rem; color: #3b82f6;"></i>
                    </div>
                    <div style="text-align: center;">
                        <i class="fas ${toMeta.icon}" style="font-size: 2rem; color: ${toMeta.color}; margin-bottom: 0.5rem;"></i>
                        <div style="font-weight: 600;">${toMeta.label}</div>
                        <div style="font-size: 0.85rem; color: #94a3b8;">${toMeta.labelId}</div>
                    </div>
                </div>
                <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(59, 130, 246, 0.1); border-radius: 0.5rem; border-left: 3px solid #3b82f6;">
                    <div style="font-size: 0.9rem; color: #cbd5e1;">${actionMeta.deskripsi}</div>
                </div>
            </div>
        `;
        
        overlay.style.display = 'block';
    }
    
    sembunyikanInfoTransisi() {
        const overlay = document.getElementById('transitionOverlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    }

    renderRiwayat() {
        const pesanan = this.managerPesanan.getOrder(this.pesananAktifId);
        if (!pesanan) {
            document.getElementById('riwayatSection').style.display = 'none';
            return;
        }
        const riwayat = pesanan.fsa.getHistory();
        if (riwayat.length === 0) {
            document.getElementById('riwayatSection').style.display = 'block';
            document.getElementById('riwayatLog').innerHTML = '<div class="empty-state"><i class="fas fa-history"></i><p>Belum ada transisi</p></div>';
            return;
        }
        document.getElementById('riwayatSection').style.display = 'block';
        document.getElementById('riwayatLog').innerHTML = riwayat.map(entry => {
            const aksiMeta = ACTION_METADATA[entry.action];
            const fromMeta = STATE_METADATA[entry.from];
            const toMeta = STATE_METADATA[entry.to];
            const time = new Date(entry.timestamp).toLocaleTimeString('id-ID');
            return `<div class="history-item">
                <div class="history-item-header">
                    <span class="history-step">Langkah ${entry.id}</span>
                    <span class="history-timestamp">${time}</span>
                </div>
                <div class="history-transition">
                    <i class="fas ${fromMeta.icon}"></i> ${fromMeta.label} 
                    <i class="fas fa-arrow-right"></i> 
                    <i class="fas ${aksiMeta.icon}"></i> ${aksiMeta.label} 
                    <i class="fas fa-arrow-right"></i> 
                    <i class="fas ${toMeta.icon}"></i> ${toMeta.label}
                </div>
            </div>`;
        }).reverse().join('');
    }
    async renderDiagram() {
        const container = document.getElementById('diagramContainer');
        container.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i><p>Memuat diagram...</p></div>';
        try {
            const dotContent = this.generateDOT();
            const element = await this.viz.renderSVGElement(dotContent);
            container.innerHTML = '';
            container.appendChild(element);
        } catch (error) {
            container.innerHTML = `<div class="loading" style="color: #ef4444"><i class="fas fa-exclamation-triangle"></i><p>Error: ${error.message}</p></div>`;
        }
    }

    generateDOT() {
        let dot = 'digraph FSA {\n';
        dot += '  rankdir=LR;\n';
        dot += '  bgcolor="transparent";\n';
        dot += '  node [shape=circle, style=filled, fontname="Arial", fontcolor="white", fontsize=11];\n';
        dot += '  edge [fontname="Arial", fontsize=9, fontcolor="#cbd5e1", color="#475569"];\n';
        dot += '  start [shape=point, width=0.3, color="#10b981"];\n\n';
        
        const currentState = this.pesananAktifId ? this.managerPesanan.getOrder(this.pesananAktifId)?.fsa.getCurrentState() : null;
        const history = this.pesananAktifId ? this.managerPesanan.getOrder(this.pesananAktifId)?.fsa.getHistory() : [];
        
        // Track visited states for path highlighting
        const visitedStates = new Set();
        const visitedEdges = new Set();
        
        if (history.length > 0) {
            history.forEach(entry => {
                visitedStates.add(entry.from);
                visitedStates.add(entry.to);
                visitedEdges.add(`${entry.from}->${entry.to}`);
            });
        }
        
        // Render states with highlighting
        Object.entries(STATE_METADATA).forEach(([state, meta]) => {
            const isFinal = meta.labelId === 'q6' || meta.labelId === 'q7' || meta.labelId === 'q9';
            const isActive = state === currentState;
            const isVisited = visitedStates.has(state);
            
            let fillColor = meta.darkColor;
            let penwidth = '1';
            let pencolor = meta.darkColor;
            
            if (isActive) {
                fillColor = '#f59e0b';
                penwidth = '3';
                pencolor = '#f59e0b';
            } else if (isVisited && this.simulasiBerjalan) {
                fillColor = meta.color;
                penwidth = '2';
                pencolor = meta.color;
            }
            
            // Final states get white border
            if (isFinal) {
                penwidth = isActive ? '4' : '3';
                pencolor = '#f1f5f9';
            }
            
            const label = `${meta.labelId}\\n${meta.label.replace(/ /g, '\\n')}`;
            dot += `  ${state} [label="${label}", fillcolor="${fillColor}", shape=circle, penwidth=${penwidth}, color="${pencolor}"];\n`;
        });
        
        // Render edges with path highlighting
        dot += '\n  start -> PESANAN_DIBUAT;\n';
        
        const transitions = [
            ['PESANAN_DIBUAT', 'MENUNGGU_PEMBAYARAN', 'buat_pesanan', '#475569'],
            ['MENUNGGU_PEMBAYARAN', 'PEMBAYARAN_DIKONFIRMASI', 'konfirmasi\\npembayaran', '#475569'],
            ['MENUNGGU_PEMBAYARAN', 'DIBATALKAN', 'batalkan\\npembayaran', '#ef4444'],
            ['PEMBAYARAN_DIKONFIRMASI', 'DIPROSES', 'proses\\npesanan', '#475569'],
            ['PEMBAYARAN_DIKONFIRMASI', 'DIBATALKAN', 'batalkan\\npesanan', '#ef4444'],
            ['DIPROSES', 'DIKIRIM', 'kirim\\npesanan', '#475569'],
            ['DIPROSES', 'DIBATALKAN', 'batalkan\\npesanan', '#ef4444'],
            ['DIKIRIM', 'DALAM_PENGIRIMAN', 'update\\npengiriman', '#475569'],
            ['DALAM_PENGIRIMAN', 'SELESAI', 'pesanan\\nsampai', '#475569'],
            ['DALAM_PENGIRIMAN', 'PERMINTAAN_REFUND', 'minta\\nrefund', '#f97316'],
            ['SELESAI', 'PERMINTAAN_REFUND', 'minta\\nrefund', '#f97316'],
            ['PERMINTAAN_REFUND', 'REFUND_SELESAI', 'setujui\\nrefund', '#475569']
        ];
        
        transitions.forEach(([from, to, label, defaultColor]) => {
            const edgeKey = `${from}->${to}`;
            const isActiveEdge = visitedEdges.has(edgeKey);
            const isLastTransition = this.lastTransition && this.lastTransition.from === from && this.lastTransition.to === to;
            
            let color = defaultColor;
            let penwidth = '1';
            let fontcolor = defaultColor === '#ef4444' ? '#ef4444' : (defaultColor === '#f97316' ? '#f97316' : '#cbd5e1');
            
            if (isActiveEdge) {
                color = '#10b981';
                penwidth = '2.5';
                fontcolor = '#10b981';
            }
            
            if (isLastTransition && !this.simulasiBerjalan) {
                color = '#f59e0b';
                penwidth = '4';
                fontcolor = '#f59e0b';
            }
            
            dot += `  ${from} -> ${to} [label="${label}", color="${color}", fontcolor="${fontcolor}", penwidth=${penwidth}];\n`;
        });
        
        dot += '}';
        return dot;
    }

    pilihSkenario(skenario) {
        this.skenarioAktif = skenario;
        document.querySelectorAll('.scenario-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.scenario === skenario);
        });
    }

    mulaiSimulasi() {
        if (!this.skenarioAktif) {
            Swal.fire({
                title: 'Pilih Skenario!',
                text: 'Silakan pilih skenario simulasi terlebih dahulu',
                icon: 'warning',
                background: '#1e293b',
                color: '#f1f5f9'
            });
            return;
        }
        
        Swal.fire({
            title: 'Memulai Simulasi',
            html: `<p>Skenario: <strong>${this.skenarioAktif.toUpperCase()}</strong></p><p style="font-size: 0.9rem; color: #94a3b8; margin-top: 0.5rem;">Perhatikan diagram untuk melihat alur transisi</p>`,
            icon: 'info',
            timer: 2000,
            showConfirmButton: false,
            background: '#1e293b',
            color: '#f1f5f9'
        });
        
        const pesanan = this.managerPesanan.createOrder('Simulasi ' + this.skenarioAktif);
        this.pesananAktifId = pesanan.id;
        this.pathHistory = [];
        this.renderDaftarPesanan();
        this.pilihPesanan(pesanan.id);
        
        const sequences = {
            'sukses': [ACTIONS.BUAT_PESANAN, ACTIONS.KONFIRMASI_PEMBAYARAN, ACTIONS.PROSES_PESANAN, ACTIONS.KIRIM_PESANAN, ACTIONS.UPDATE_PENGIRIMAN, ACTIONS.PESANAN_SAMPAI],
            'batal': [ACTIONS.BUAT_PESANAN, ACTIONS.KONFIRMASI_PEMBAYARAN, ACTIONS.BATALKAN_PESANAN],
            'refund': [ACTIONS.BUAT_PESANAN, ACTIONS.KONFIRMASI_PEMBAYARAN, ACTIONS.PROSES_PESANAN, ACTIONS.KIRIM_PESANAN, ACTIONS.UPDATE_PENGIRIMAN, ACTIONS.PESANAN_SAMPAI, ACTIONS.MINTA_REFUND, ACTIONS.SETUJUI_REFUND],
            'gagal-bayar': [ACTIONS.BUAT_PESANAN, ACTIONS.BATALKAN_PEMBAYARAN]
        };
        
        const sequence = sequences[this.skenarioAktif];
        const kecepatan = parseInt(document.getElementById('kecepatanSimulasi').value);
        
        this.simulasiBerjalan = true;
        document.getElementById('mulaiSimulasi').style.display = 'none';
        document.getElementById('stopSimulasi').style.display = 'inline-flex';
        
        let index = 0;
        this.simulasiInterval = setInterval(() => {
            if (index >= sequence.length || !this.simulasiBerjalan) {
                this.stopSimulasi();
                return;
            }
            this.eksekusiAksi(sequence[index], false);
            index++;
        }, kecepatan);
    }

    stopSimulasi() {
        this.simulasiBerjalan = false;
        if (this.simulasiInterval) {
            clearInterval(this.simulasiInterval);
            this.simulasiInterval = null;
        }
        this.sembunyikanInfoTransisi();
        document.getElementById('mulaiSimulasi').style.display = 'inline-flex';
        document.getElementById('stopSimulasi').style.display = 'none';
        
        // Show completion message
        if (this.pesananAktifId) {
            const pesanan = this.managerPesanan.getOrder(this.pesananAktifId);
            if (pesanan) {
                const finalState = pesanan.fsa.getCurrentState();
                const finalMeta = STATE_METADATA[finalState];
                Swal.fire({
                    title: 'Simulasi Selesai!',
                    html: `<p>State Akhir: <strong><i class="fas ${finalMeta.icon}"></i> ${finalMeta.label}</strong></p><p style="font-size: 0.9rem; color: #94a3b8; margin-top: 0.5rem;">Total ${pesanan.fsa.getHistory().length} transisi berhasil</p>`,
                    icon: 'success',
                    confirmButtonText: 'OK',
                    background: '#1e293b',
                    color: '#f1f5f9'
                });
            }
        }
    }

    validasiSequence() {
        const input = document.getElementById('sequenceInput').value.trim();
        if (!input) {
            Swal.fire({
                title: 'Input Kosong!',
                text: 'Silakan masukkan sequence aksi',
                icon: 'warning',
                background: '#1e293b',
                color: '#f1f5f9'
            });
            return;
        }
        const actions = input.split(',').map(a => a.trim());
        const fsa = new FSAEngine();
        const result = fsa.validateSequence(actions);
        
        const resultContainer = document.getElementById('hasilValidasi');
        resultContainer.className = `validation-result show ${result.valid ? 'valid' : 'invalid'}`;
        
        let html = `<h4>${result.valid ? '<i class="fas fa-check-circle"></i> Sequence Valid' : '<i class="fas fa-times-circle"></i> Sequence Invalid'}</h4>`;
        html += `<p><strong>State Akhir:</strong> ${result.finalState}</p>`;
        html += `<p><strong>Adalah State Akhir:</strong> ${result.isFinal ? 'Ya' : 'Tidak'}</p>`;
        html += '<div class="validation-steps">';
        
        result.results.forEach(step => {
            const className = step.success ? 'success' : 'error';
            const icon = step.success ? 'fa-check-circle' : 'fa-times-circle';
            html += `<div class="validation-step ${className}"><i class="fas ${icon}"></i> Langkah ${step.step}: ${step.action}  ${step.state}`;
            if (step.error) html += `<br><small>${step.error}</small>`;
            html += '</div>';
        });
        
        html += '</div>';
        resultContainer.innerHTML = html;
    }

    updateStatistik() {
        const stats = this.managerPesanan.getStatistics();
        const container = document.getElementById('statistik');
        let html = `<div class="stat-card"><div class="stat-value">${stats.totalOrders}</div><div class="stat-label">Total Pesanan</div></div>`;
        
        Object.entries(stats.byState).forEach(([state, count]) => {
            const metadata = STATE_METADATA[state];
            html += `<div class="stat-card" style="background: ${metadata.darkColor}"><div class="stat-value">${count}</div><div class="stat-label"><i class="fas ${metadata.icon}"></i> ${metadata.label}</div></div>`;
        });
        
        container.innerHTML = html;
    }

    hapusPesanan(pesananId) {
        Swal.fire({
            title: 'Hapus Pesanan?',
            text: `Pesanan ${pesananId} akan dihapus`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            background: '#1e293b',
            color: '#f1f5f9'
        }).then((result) => {
            if (result.isConfirmed) {
                this.managerPesanan.deleteOrder(pesananId);
                if (this.pesananAktifId === pesananId) {
                    this.pesananAktifId = null;
                    document.getElementById('detailPesananSection').style.display = 'none';
                    document.getElementById('aksiSection').style.display = 'none';
                    document.getElementById('riwayatSection').style.display = 'none';
                }
                this.renderDaftarPesanan();
                this.updateStatistik();
                this.renderDiagram();
            }
        });
    }

    clearHistory() {
        const pesanan = this.managerPesanan.getOrder(this.pesananAktifId);
        if (pesanan) {
            pesanan.fsa.reset();
            this.renderRiwayat();
            this.renderDetailPesanan();
            this.renderAksiTersedia();
            this.renderDiagram();
        }
    }
}

window.app = new AplikasiSimulatorFSA();
