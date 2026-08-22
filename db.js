// ============================================================
// DATABASE
// ============================================================
const DB = {
    adminWhatsApp: '6283185468716',
    coinToRupiah: 1000 / 150,
    
    // EMAIL ADMIN
    adminEmail: 'admin@mikocuan.com',
    
    appLogos: [
        { name: 'YouTube' },
        { name: 'Canva' },
        { name: 'Spotify' },
        { name: 'Netflix' },
        { name: 'Creative Cloud' },
        { name: 'Amazon' },
        { name: 'CapCut' },
        { name: 'Alight Motion' },
    ],
    
    products: [],
    
    user: {
        name: '',
        email: '',
        coinBalance: 0,
        streak: 0,
        lastDailyClaim: Date.now() - 86400000,
        history: [],
        bankName: '',
        bankAccount: '',
        bankOwner: '',
        purchaseHistory: [],
    },
    
    settings: {
        minWd: 500,
        wdFee: 0.10,
        wdQuota: 5,
        wdQuotaUsed: 0,
        rateCoin: 150,
        rateRupiah: 1000,
        maxDailyBonus: 20,
    }
};
