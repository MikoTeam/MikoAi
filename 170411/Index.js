<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <title>MikoCuan — Panel Admin</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', system-ui, sans-serif;
        }
        html, body {
            height: 100%;
            background: #0b0e14;
            color: #e0e6f0;
            overflow: hidden;
        }
        body {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .app-wrapper {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .app-container {
            width: 100%;
            max-width: 420px;
            height: 100vh;
            max-height: 780px;
            aspect-ratio: 9 / 16;
            background: #111820;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            position: relative;
        }
        .header {
            padding: 14px 18px 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #ef4444;
            flex-shrink: 0;
            background: #0f172a;
        }
        .logo {
            font-weight: 700;
            font-size: 18px;
            background: linear-gradient(135deg, #a855f7, #6366f1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .badge-group {
            display: flex;
            gap: 8px;
            align-items: center;
        }
        .badge-group span {
            font-size: 11px;
            color: #8896b0;
        }
        .page {
            display: block;
            padding: 16px 16px 70px;
            flex: 1;
            overflow-y: auto;
        }
        .page::-webkit-scrollbar {
            width: 3px;
        }
        .page::-webkit-scrollbar-track {
            background: #0f172a;
        }
        .page::-webkit-scrollbar-thumb {
            background: #4b5a77;
            border-radius: 10px;
        }
        .admin-card {
            background: #141d2b;
            border-radius: 12px;
            padding: 14px;
            text-align: center;
            border: 1px solid #2a3a50;
        }
        .admin-card .value {
            font-size: 22px;
            font-weight: 700;
        }
        .admin-card .label {
            font-size: 11px;
            color: #8896b0;
            margin-top: 2px;
        }
        .admin-card .value.purple { color: #6366f1; }
        .admin-card .value.gold { color: #fbbf24; }
        .admin-card .value.green { color: #34d399; }
        .admin-tabs {
            display: flex;
            gap: 8px;
            margin-bottom: 14px;
            flex-wrap: wrap;
        }
        .admin-tab {
            background: #1f2a3a;
            border: 1px solid #4b5a77;
            color: #e0e6f0;
            padding: 8px 18px;
            border-radius: 40px;
            font-size: 12px;
            cursor: pointer;
            transition: 0.2s;
        }
        .admin-tab.active {
            background: #6366f1;
            border-color: #6366f1;
            color: white;
        }
        .admin-tab:hover:not(.active) {
            border-color: #6366f1;
        }
        .admin-item {
            background: #141d2b;
            border-radius: 12px;
            padding: 12px 14px;
            margin-bottom: 8px;
            border: 1px solid #2a3a50;
        }
        .admin-item .row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 4px;
        }
        .admin-item .name {
            font-weight: 600;
            font-size: 14px;
        }
        .admin-item .email {
            font-size: 11px;
            color: #8896b0;
        }
        .admin-item .coin {
            font-size: 14px;
            color: #fbbf24;
            font-weight: 700;
        }
        .admin-item .actions {
            display: flex;
            gap: 6px;
            margin-top: 6px;
            flex-wrap: wrap;
        }
        .admin-item .actions button {
            padding: 4px 12px;
            border-radius: 40px;
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
            border: none;
            transition: 0.2s;
        }
        .admin-item .actions .btn-edit { background: #6366f1; color: white; }
        .admin-item .actions .btn-edit:hover { background: #4f46e5; }
        .admin-item .actions .btn-delete { background: #ef4444; color: white; }
        .admin-item .actions .btn-delete:hover { background: #dc2626; }
        .admin-item .actions .btn-confirm { background: #34d399; color: #0b0e14; }
        .admin-item .actions .btn-confirm:hover { background: #059669; }
        .admin-item .actions .btn-reject { background: #f59e0b; color: #0b0e14; }
        .admin-item .actions .btn-reject:hover { background: #d97706; }
        .status-pending { color: #f59e0b; font-weight: 600; font-size: 10px; }
        .status-confirmed { color: #34d399; font-weight: 600; font-size: 10px; }
        .status-rejected { color: #ef4444; font-weight: 600; font-size: 10px; }
        .admin-product-item {
            background: #141d2b;
            border-radius: 12px;
            padding: 12px 14px;
            margin-bottom: 8px;
            border: 1px solid #2a3a50;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 8px;
        }
        .admin-product-item .product-info {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .admin-product-item .product-icon {
            width: 32px;
            height: 32px;
            object-fit: contain;
            border-radius: 6px;
        }
        .admin-product-item .product-name { font-weight: 600; font-size: 14px; }
        .admin-product-item .product-detail { font-size: 11px; color: #8896b0; }
        .admin-product-item .product-actions { display: flex; gap: 6px; }
        .admin-product-item .product-actions button {
            padding: 4px 12px;
            border-radius: 40px;
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
            border: none;
            transition: 0.2s;
        }
        .admin-product-item .product-actions .btn-edit { background: #6366f1; color: white; }
        .admin-product-item .product-actions .btn-edit:hover { background: #4f46e5; }
        .admin-product-item .product-actions .btn-delete { background: #ef4444; color: white; }
        .admin-product-item .product-actions .btn-delete:hover { background: #dc2626; }
        .btn-add {
            background: #34d399;
            border: none;
            color: #0b0e14;
            padding: 8px 16px;
            border-radius: 40px;
            font-weight: 600;
            cursor: pointer;
            font-size: 12px;
            margin-bottom: 12px;
        }
        .btn-add:hover { background: #059669; }
        .bottom-nav {
            position: sticky;
            bottom: 0;
            background: #0f172a;
            border-top: 1px solid #1f2a3a;
            display: flex;
            justify-content: center;
            padding: 10px 0 14px;
            flex-shrink: 0;
            gap: 20px;
        }
        .bottom-nav a {
            color: #5a6a84;
            text-decoration: none;
            font-size: 12px;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: 0.2s;
        }
        .bottom-nav a:hover { color: #e0e6f0; }
        .toast {
            position: fixed;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%) translateY(20px);
            background: #1f2a3a;
            color: #e0e6f0;
            padding: 10px 20px;
            border-radius: 40px;
            font-size: 13px;
            font-weight: 500;
            border: 1px solid #4b5a77;
            box-shadow: 0 8px 24px #00000060;
            opacity: 0;
            transition: all 0.3s ease;
            pointer-events: none;
            white-space: nowrap;
            z-index: 999;
        }
        .toast.show {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        @media (max-width: 480px) {
            .toast {
                white-space: normal;
                max-width: 90%;
                text-align: center;
                font-size: 12px;
                padding: 8px 16px;
            }
        }
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            backdrop-filter: blur(6px);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 9998;
            padding: 16px;
        }
        .modal-overlay.show { display: flex; }
        .modal-box {
            background: #141d2b;
            border-radius: 20px;
            padding: 24px 20px;
            max-width: 360px;
            width: 100%;
            border: 1px solid #2a3a50;
            text-align: center;
            animation: modalPop 0.3s ease;
            max-height: 90vh;
            overflow-y: auto;
        }
        @keyframes modalPop {
            0% { transform: scale(0.8); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
        .modal-box .form-group {
            margin-bottom: 12px;
            text-align: left;
        }
        .modal-box .form-group label {
            display: block;
            font-size: 12px;
            color: #8896b0;
            margin-bottom: 4px;
        }
        .modal-box .form-group input,
        .modal-box .form-group select {
            width: 100%;
            padding: 10px 14px;
            border-radius: 12px;
            border: 1px solid #2a3a50;
            background: #0f172a;
            color: #e0e6f0;
            font-size: 14px;
            outline: none;
        }
        .modal-box .form-group input:focus,
        .modal-box .form-group select:focus {
            border-color: #6366f1;
            box-shadow: 0 0 0 3px #6366f130;
        }
        .modal-box .btn-save {
            background: #34d399;
            border: none;
            color: #0b0e14;
            padding: 10px;
            border-radius: 40px;
            width: 100%;
            font-weight: 600;
            cursor: pointer;
            font-size: 14px;
        }
        .modal-box .btn-save:hover { background: #059669; }
        .modal-box .btn-cancel {
            background: transparent;
            border: none;
            color: #8896b0;
            margin-top: 8px;
            cursor: pointer;
            font-size: 13px;
            width: 100%;
        }
        .modal-box .btn-cancel:hover { color: #e0e6f0; }
        @media (max-width: 480px) {
            .app-container {
                border-radius: 0;
                max-width: 100%;
                max-height: 100vh;
                aspect-ratio: auto;
            }
        }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #4b5a77; border-radius: 10px; }
        .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 16px; }
        .text-muted { color: #8896b0; }
        .text-green { color: #34d399; }
        .flex-between { display: flex; justify-content: space-between; align-items: center; }
        .role-badge {
            background: #6366f1;
            color: white;
            padding: 2px 10px;
            border-radius: 40px;
            font-size: 10px;
            font-weight: 600;
        }
        .loading-text {
            color: #8896b0;
            text-align: center;
            padding: 20px;
            font-size: 13px;
        }
        .error-text {
            color: #ef4444;
            text-align: center;
            padding: 20px;
            font-size: 13px;
        }
        .debug-info {
            background: #0f172a;
            border-radius: 8px;
            padding: 10px;
            margin-top: 10px;
            font-size: 11px;
            color: #5a6a84;
            word-break: break-all;
            display: none;
        }
        .debug-info.show {
            display: block;
        }
    </style>
</head>
<body>
<div class="app-wrapper">
    <div class="app-container">
        <header class="header">
            <div class="logo"><i class="fas fa-bolt" style="color:#a855f7;"></i> MikoCuan</div>
            <div class="badge-group">
                <span>🛡️ Super Admin</span>
                <span id="firebaseStatus" style="font-size:10px; color:#f59e0b;">⏳ Connecting...</span>
            </div>
        </header>

        <section class="page" id="page-admin">
            <div class="grid-3">
                <div class="admin-card">
                    <div class="value purple" id="adminTotalUsers">0</div>
                    <div class="label">Total User</div>
                </div>
                <div class="admin-card">
                    <div class="value gold" id="adminTotalCoin">0</div>
                    <div class="label">Total Coin (Semua User)</div>
                </div>
                <div class="admin-card">
                    <div class="value green" id="adminTotalWd">0</div>
                    <div class="label">WD Menunggu</div>
                </div>
            </div>

            <div class="admin-tabs">
                <button class="admin-tab active" data-tab="users">Users</button>
                <button class="admin-tab" data-tab="wd">WD</button>
                <button class="admin-tab" data-tab="products">Produk</button>
                <button class="admin-tab" data-tab="admin-profile">Admin</button>
            </div>

            <div id="adminTabUsers"><div id="adminUserList"><div class="loading-text">⏳ Memuat data user...</div></div></div>
            <div id="adminTabWd" style="display:none;"><div id="adminWdList"><div class="loading-text">⏳ Memuat data WD...</div></div></div>
            <div id="adminTabProducts" style="display:none;">
                <button class="btn-add" id="addProductBtn"><i class="fas fa-plus"></i> Tambah Produk</button>
                <div id="adminProductList"><div class="loading-text">⏳ Memuat data produk...</div></div>
            </div>
            <div id="adminTabProfile" style="display:none;">
                <div style="background:#141d2b; border-radius:16px; padding:24px; border:1px solid #2a3a50; text-align:center;">
                    <div style="font-size:56px; margin-bottom:8px;">👤</div>
                    <div style="font-size:20px; font-weight:700;">Super Admin</div>
                    <div style="font-size:14px; color:#8896b0;">Ariya_admin@gmail.com</div>
                    <div style="margin-top:12px; padding-top:12px; border-top:1px solid #1f2a3a; text-align:left;">
                        <div class="flex-between" style="padding:6px 0; font-size:14px;">
                            <span class="text-muted">Role</span>
                            <span class="text-green">🛡️ Super Admin</span>
                        </div>
                        <div class="flex-between" style="padding:6px 0; font-size:14px;">
                            <span class="text-muted">Status</span>
                            <span class="text-green">✅ Active</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="debug-info" id="debugInfo"></div>
        </section>

        <nav class="bottom-nav">
            <a href="index.html"><i class="fas fa-arrow-left"></i> Kembali ke Beranda</a>
        </nav>
    </div>
</div>

<div class="toast" id="toast"></div>

<div class="modal-overlay" id="productModal">
    <div class="modal-box">
        <h3 style="margin-bottom:12px;" id="productModalTitle"><i class="fas fa-plus"></i> Tambah Produk</h3>
        <div class="form-group">
            <label>Nama Produk</label>
            <input type="text" id="prodName" placeholder="YouTube Premium">
        </div>
        <div class="form-group">
            <label>Icon (URL gambar atau emoji)</label>
            <input type="text" id="prodIcon" placeholder="https://...png atau ▶️">
        </div>
        <div class="form-group">
            <label>Harga (Coin)</label>
            <input type="number" id="prodPrice" placeholder="80">
        </div>
        <div class="form-group">
            <label>Stok</label>
            <input type="number" id="prodStock" placeholder="5">
        </div>
        <div class="form-group">
            <label>Popular</label>
            <select id="prodPopular">
                <option value="false">Tidak</option>
                <option value="true">Ya</option>
            </select>
        </div>
        <button class="btn-save" id="saveProductBtn">Simpan Produk</button>
        <button class="btn-cancel" onclick="closeProductModal()">Batal</button>
    </div>
</div>

<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>

<script>
    // ============================================================
    // FIREBASE CONFIG
    // ============================================================
    const firebaseConfig = {
        apiKey: "AIzaSyA58O3HFRNoDPs6NzWX12aaG-31_BXrXDw",
        authDomain: "miko-ai-46e21.firebaseapp.com",
        projectId: "miko-ai-46e21",
        storageBucket: "miko-ai-46e21.firebasestorage.app",
        messagingSenderId: "473131247861",
        appId: "1:473131247861:web:3c93533ca13b50d94abdbc",
        measurementId: "G-0NP44KS630"
    };

    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    db.settings({ merge: true });

    const firebaseStatus = document.getElementById('firebaseStatus');
    const debugInfo = document.getElementById('debugInfo');

    // Test koneksi
    async function testFirebaseConnection() {
        try {
            await db.collection('users').limit(1).get();
            firebaseStatus.textContent = '✅ Connected';
            firebaseStatus.style.color = '#34d399';
            console.log('🔥 Firebase Connected!');
        } catch (error) {
            firebaseStatus.textContent = '❌ Error';
            firebaseStatus.style.color = '#ef4444';
            console.error('Firebase connection error:', error);
            debugInfo.textContent = 'Error: ' + error.message;
            debugInfo.classList.add('show');
        }
    }

    testFirebaseConnection();

    // ============================================================
    // DOM REFS
    // ============================================================
    const adminTotalUsers = document.getElementById('adminTotalUsers');
    const adminTotalCoin = document.getElementById('adminTotalCoin');
    const adminTotalWd = document.getElementById('adminTotalWd');
    const adminUserList = document.getElementById('adminUserList');
    const adminWdList = document.getElementById('adminWdList');
    const adminProductList = document.getElementById('adminProductList');
    const adminTabs = document.querySelectorAll('.admin-tab');
    const adminTabUsers = document.getElementById('adminTabUsers');
    const adminTabWd = document.getElementById('adminTabWd');
    const adminTabProducts = document.getElementById('adminTabProducts');
    const adminTabProfile = document.getElementById('adminTabProfile');
    const addProductBtn = document.getElementById('addProductBtn');
    const toast = document.getElementById('toast');
    const productModal = document.getElementById('productModal');
    const productModalTitle = document.getElementById('productModalTitle');
    const prodName = document.getElementById('prodName');
    const prodIcon = document.getElementById('prodIcon');
    const prodPrice = document.getElementById('prodPrice');
    const prodStock = document.getElementById('prodStock');
    const prodPopular = document.getElementById('prodPopular');
    const saveProductBtn = document.getElementById('saveProductBtn');

    let editingProductId = null;

    // ============================================================
    // TOAST
    // ============================================================
    function showToast(msg, duration = 2000) {
        toast.textContent = msg;
        toast.classList.add('show');
        clearTimeout(toast._hide);
        toast._hide = setTimeout(() => toast.classList.remove('show'), duration);
    }

    // ============================================================
    // LOAD ADMIN USERS
    // ============================================================
    async function loadAdminUsers() {
        try {
            adminUserList.innerHTML = '<div class="loading-text">⏳ Memuat data user...</div>';
            
            const snapshot = await db.collection('users').get();
            let totalCoin = 0;
            let html = '';

            if (snapshot.empty) {
                adminUserList.innerHTML = '<div style="color:#5a6a84; text-align:center; padding:20px;">Belum ada user terdaftar</div>';
                adminTotalUsers.textContent = '0';
                adminTotalCoin.textContent = '0';
                return;
            }

            snapshot.forEach(doc => {
                const data = doc.data();
                totalCoin += data.coinBalance || 0;
                html += `
                    <div class="admin-item" data-uid="${doc.id}">
                        <div class="row">
                            <div>
                                <div class="name">${data.name || 'No Name'}</div>
                                <div class="email">${data.email || '—'}</div>
                            </div>
                            <div>
                                <div class="coin">${(data.coinBalance || 0).toLocaleString()} Coin</div>
                                <div style="font-size:10px; color:#5a6a84;">Streak: ${data.streak || 0}d</div>
                            </div>
                        </div>
                        <div class="actions">
                            <button class="btn-edit" onclick="editUserCoin('${doc.id}')"><i class="fas fa-edit"></i> Edit Coin</button>
                            <button class="btn-delete" onclick="deleteUser('${doc.id}')"><i class="fas fa-trash"></i> Hapus</button>
                        </div>
                    </div>
                `;
            });

            adminUserList.innerHTML = html;
            adminTotalUsers.textContent = snapshot.size;
            adminTotalCoin.textContent = totalCoin.toLocaleString();

        } catch (error) {
            console.error('Error loading users:', error);
            adminUserList.innerHTML = `<div class="error-text">❌ Gagal memuat data user: ${error.message}</div>`;
        }
    }

    // ============================================================
    // LOAD ADMIN WD REQUESTS
    // ============================================================
    async function loadAdminWdRequests() {
        try {
            adminWdList.innerHTML = '<div class="loading-text">⏳ Memuat data WD...</div>';
            
            const snapshot = await db.collection('wd_requests')
                .orderBy('createdAt', 'desc')
                .get();

            let pendingCount = 0;
            let html = '';

            if (snapshot.empty) {
                adminWdList.innerHTML = '<div style="color:#5a6a84; text-align:center; padding:20px;">Belum ada permintaan WD</div>';
                adminTotalWd.textContent = '0';
                return;
            }

            snapshot.forEach(doc => {
                const data = doc.data();
                const status = data.status || 'pending';
                if (status === 'pending') pendingCount++;

                const statusClass = status === 'pending' ? 'status-pending' : status === 'confirmed' ? 'status-confirmed' : 'status-rejected';
                const statusText = status === 'pending' ? '⏳ Menunggu' : status === 'confirmed' ? '✅ Dikonfirmasi' : '❌ Ditolak';

                html += `
                    <div class="admin-item" style="border-left: 3px solid ${status === 'pending' ? '#f59e0b' : status === 'confirmed' ? '#34d399' : '#ef4444'};">
                        <div class="row">
                            <div>
                                <div class="name">${data.userName || '—'}</div>
                                <div class="email">${data.userEmail || '—'}</div>
                                <div style="font-size:11px; color:#5a6a84;">${data.method || '—'} | ${data.accountName || '—'}</div>
                                <div style="font-size:11px; color:#5a6a84;">${data.accountNumber || '—'}</div>
                            </div>
                            <div style="text-align:right;">
                                <div style="font-weight:700; color:#fbbf24;">${data.amount || 0} Coin</div>
                                <div style="font-size:11px; color:#34d399;">Rp ${(data.rupiah || 0).toLocaleString('id-ID')}</div>
                                <div class="${statusClass}">${statusText}</div>
                                <div style="font-size:9px; color:#5a6a84;">${data.tanggal || '—'}</div>
                            </div>
                        </div>
                        ${status === 'pending' ? `
                            <div class="actions">
                                <button class="btn-confirm" onclick="confirmWd('${doc.id}')"><i class="fas fa-check"></i> Konfirmasi</button>
                                <button class="btn-reject" onclick="rejectWd('${doc.id}')"><i class="fas fa-times"></i> Tolak</button>
                            </div>
                        ` : ''}
                    </div>
                `;
            });

            adminWdList.innerHTML = html;
            adminTotalWd.textContent = pendingCount;

        } catch (error) {
            console.error('Error loading WD requests:', error);
            adminWdList.innerHTML = `<div class="error-text">❌ Gagal memuat data WD: ${error.message}</div>`;
        }
    }

    // ============================================================
    // LOAD ADMIN PRODUCTS
    // ============================================================
    async function loadAdminProducts() {
        try {
            adminProductList.innerHTML = '<div class="loading-text">⏳ Memuat data produk...</div>';
            
            const snapshot = await db.collection('products').get();
            let html = '';

            if (snapshot.empty) {
                adminProductList.innerHTML = '<div style="color:#5a6a84; text-align:center; padding:20px;">Belum ada produk</div>';
                return;
            }

            snapshot.forEach(doc => {
                const data = doc.data();
                const isImageUrl = data.icon && (data.icon.startsWith('http') || data.icon.startsWith('data:'));
                const iconHtml = isImageUrl
                    ? `<img src="${data.icon}" class="product-icon" onerror="this.style.display='none';" style="width:32px; height:32px; object-fit:contain; border-radius:6px;">`
                    : `<span style="font-size:24px;">${data.icon || '📦'}</span>`;

                html += `
                    <div class="admin-product-item">
                        <div class="product-info">
                            ${iconHtml}
                            <div>
                                <div class="product-name">${data.name || '—'}</div>
                                <div class="product-detail">${data.price || 0} Coin | Stok: ${data.stock || 0}</div>
                            </div>
                        </div>
                        <div class="product-actions">
                            <button class="btn-edit" onclick="editProduct('${doc.id}')"><i class="fas fa-edit"></i></button>
                            <button class="btn-delete" onclick="deleteProduct('${doc.id}')"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                `;
            });

            adminProductList.innerHTML = html;

        } catch (error) {
            console.error('Error loading products:', error);
            adminProductList.innerHTML = `<div class="error-text">❌ Gagal memuat data produk: ${error.message}</div>`;
        }
    }

    // ============================================================
    // EDIT USER COIN
    // ============================================================
    window.editUserCoin = async function(uid) {
        const newCoin = prompt('Masukkan jumlah coin baru:');
        if (newCoin === null) return;
        const coinAmount = parseInt(newCoin);
        if (isNaN(coinAmount) || coinAmount < 0) {
            showToast('❌ Jumlah coin tidak valid!', 2000);
            return;
        }
        
        try {
            await db.collection('users').doc(uid).update({
                coinBalance: coinAmount,
                lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
            });
            showToast('✅ Coin user berhasil diupdate!', 2000);
            loadAdminUsers();
        } catch (error) {
            console.error('Error updating user coin:', error);
            showToast('❌ Gagal mengupdate coin!', 2000);
        }
    };

    // ============================================================
    // DELETE USER
    // ============================================================
    window.deleteUser = async function(uid) {
        if (!confirm('Yakin ingin menghapus akun user ini? Tindakan ini tidak dapat dibatalkan!')) return;
        
        try {
            await db.collection('users').doc(uid).delete();
            const wdSnapshot = await db.collection('wd_requests').where('userId', '==', uid).get();
            const batch = db.batch();
            wdSnapshot.forEach(doc => {
                batch.delete(doc.ref);
            });
            await batch.commit();
            
            showToast('✅ User berhasil dihapus!', 2000);
            loadAdminUsers();
            loadAdminWdRequests();
        } catch (error) {
            console.error('Error deleting user:', error);
            showToast('❌ Gagal menghapus user!', 2000);
        }
    };

    // ============================================================
    // CONFIRM WD - KURANGI COIN USER
    // ============================================================
    window.confirmWd = async function(wdId) {
        if (!confirm('Konfirmasi WD ini? Coin akan dikurangi dari saldo user.')) return;
        
        try {
            const wdDoc = await db.collection('wd_requests').doc(wdId).get();
            const wdData = wdDoc.data();
            
            if (!wdData) {
                showToast('❌ Data WD tidak ditemukan!', 2000);
                return;
            }
            
            const userId = wdData.userId;
            const amount = wdData.amount || 0;
            
            // Kurangi coin user
            if (userId) {
                const userRef = db.collection('users').doc(userId);
                const userDoc = await userRef.get();
                if (userDoc.exists) {
                    const userData = userDoc.data();
                    const currentCoin = userData.coinBalance || 0;
                    if (currentCoin < amount) {
                        showToast(`❌ Coin user tidak cukup! (${currentCoin} Coin tersisa)`, 3000);
                        return;
                    }
                    await userRef.update({
                        coinBalance: currentCoin - amount,
                        lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
                    });
                }
            }
            
            await db.collection('wd_requests').doc(wdId).update({
                status: 'confirmed',
                confirmedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            showToast(`✅ WD ${amount} Coin berhasil dikonfirmasi!`, 2000);
            loadAdminWdRequests();
            loadAdminUsers();
            
        } catch (error) {
            console.error('Error confirming WD:', error);
            showToast('❌ Gagal mengkonfirmasi WD!', 2000);
        }
    };

    // ============================================================
    // REJECT WD - REFUND COIN USER
    // ============================================================
    window.rejectWd = async function(wdId) {
        if (!confirm('Tolak WD ini? Coin akan dikembalikan ke user.')) return;
        
        try {
            const wdDoc = await db.collection('wd_requests').doc(wdId).get();
            const wdData = wdDoc.data();
            
            if (!wdData) {
                showToast('❌ Data WD tidak ditemukan!', 2000);
                return;
            }
            
            const userId = wdData.userId;
            const amount = wdData.amount || 0;
            
            // Kembalikan coin ke user
            if (userId) {
                const userRef = db.collection('users').doc(userId);
                const userDoc = await userRef.get();
                if (userDoc.exists) {
                    const userData = userDoc.data();
                    const currentCoin = userData.coinBalance || 0;
                    await userRef.update({
                        coinBalance: currentCoin + amount,
                        lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
                    });
                }
            }
            
            await db.collection('wd_requests').doc(wdId).update({
                status: 'rejected',
                rejectedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            showToast(`❌ WD ${amount} Coin ditolak, coin dikembalikan ke user.`, 2000);
            loadAdminWdRequests();
            loadAdminUsers();
            
        } catch (error) {
            console.error('Error rejecting WD:', error);
            showToast('❌ Gagal menolak WD!', 2000);
        }
    };

    // ============================================================
    // ADD PRODUCT
    // ============================================================
    addProductBtn.addEventListener('click', function() {
        editingProductId = null;
        productModalTitle.innerHTML = '<i class="fas fa-plus"></i> Tambah Produk';
        prodName.value = '';
        prodIcon.value = '';
        prodPrice.value = '';
        prodStock.value = '';
        prodPopular.value = 'false';
        productModal.classList.add('show');
    });

    // ============================================================
    // EDIT PRODUCT
    // ============================================================
    window.editProduct = async function(productId) {
        try {
            const doc = await db.collection('products').doc(productId).get();
            const data = doc.data();
            if (!data) {
                showToast('❌ Produk tidak ditemukan!', 2000);
                return;
            }
            
            editingProductId = productId;
            productModalTitle.innerHTML = '<i class="fas fa-edit"></i> Edit Produk';
            prodName.value = data.name || '';
            prodIcon.value = data.icon || '';
            prodPrice.value = data.price || '';
            prodStock.value = data.stock || '';
            prodPopular.value = data.popular ? 'true' : 'false';
            productModal.classList.add('show');
        } catch (error) {
            console.error('Error loading product:', error);
            showToast('❌ Gagal memuat data produk!', 2000);
        }
    };

    // ============================================================
    // SAVE PRODUCT
    // ============================================================
    saveProductBtn.addEventListener('click', async function() {
        const name = prodName.value.trim();
        const icon = prodIcon.value.trim();
        const price = parseInt(prodPrice.value);
        const stock = parseInt(prodStock.value);
        const popular = prodPopular.value === 'true';
        
        if (!name || !icon || isNaN(price) || isNaN(stock)) {
            showToast('❌ Semua field harus diisi!', 2000);
            return;
        }
        
        try {
            if (editingProductId) {
                await db.collection('products').doc(editingProductId).update({
                    name: name,
                    icon: icon,
                    price: price,
                    stock: stock,
                    popular: popular,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                showToast('✅ Produk berhasil diupdate!', 2000);
            } else {
                const id = name.toLowerCase().replace(/\s/g, '_') + '_' + Date.now().toString().slice(-6);
                await db.collection('products').doc(id).set({
                    id: id,
                    name: name,
                    icon: icon,
                    price: price,
                    stock: stock,
                    popular: popular,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                showToast('✅ Produk berhasil ditambahkan!', 2000);
            }
            
            productModal.classList.remove('show');
            loadAdminProducts();
        } catch (error) {
            console.error('Error saving product:', error);
            showToast('❌ Gagal menyimpan produk!', 2000);
        }
    });

    // ============================================================
    // DELETE PRODUCT
    // ============================================================
    window.deleteProduct = async function(productId) {
        if (!confirm('Yakin ingin menghapus produk ini?')) return;
        
        try {
            await db.collection('products').doc(productId).delete();
            showToast('✅ Produk berhasil dihapus!', 2000);
            loadAdminProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            showToast('❌ Gagal menghapus produk!', 2000);
        }
    };

    // ============================================================
    // CLOSE PRODUCT MODAL
    // ============================================================
    function closeProductModal() {
        productModal.classList.remove('show');
    }

    // ============================================================
    // ADMIN TABS
    // ============================================================
    adminTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            adminTabs.forEach(t => {
                t.classList.remove('active');
                t.style.background = '#1f2a3a';
                t.style.border = '1px solid #4b5a77';
                t.style.color = '#e0e6f0';
            });
            this.classList.add('active');
            this.style.background = '#6366f1';
            this.style.border = 'none';
            this.style.color = 'white';
            
            const tabName = this.dataset.tab;
            adminTabUsers.style.display = tabName === 'users' ? 'block' : 'none';
            adminTabWd.style.display = tabName === 'wd' ? 'block' : 'none';
            adminTabProducts.style.display = tabName === 'products' ? 'block' : 'none';
            adminTabProfile.style.display = tabName === 'admin-profile' ? 'block' : 'none';
            
            if (tabName === 'users') loadAdminUsers();
            if (tabName === 'wd') loadAdminWdRequests();
            if (tabName === 'products') loadAdminProducts();
        });
    });

    // ============================================================
    // INIT - LOAD ALL DATA
    // ============================================================
    console.log('🚀 Loading admin data...');
    loadAdminUsers();
    loadAdminWdRequests();
    loadAdminProducts();
</script>
</body>
</html>
