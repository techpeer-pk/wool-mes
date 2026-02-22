import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// Replace these placeholders with your actual Firebase project settings
// You can find these in the Firebase Console: Project Settings > General > Your apps
const firebaseConfig = {
    apiKey: "AIzaSyDT7ItLpN1iS0IjU9EZWRhmBDzqqG9voDs",
    authDomain: "mesreact.firebaseapp.com",
    projectId: "mesreact",
    storageBucket: "mesreact.firebasestorage.app",
    messagingSenderId: "136632329085",
    appId: "1:136632329085:web:ac902706c65ba10b56e214"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
