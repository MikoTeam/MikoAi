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

// ============================================================
// INISIALISASI FIREBASE
// ============================================================
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Set Firestore settings
db.settings({ merge: true });

console.log('🔥 Firebase Connected!');
