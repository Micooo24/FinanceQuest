import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD_qyijMhlekHamWFF2cf0TJP72StLOUOc",
    authDomain: "sia-gamedev.firebaseapp.com",
    projectId: "sia-gamedev",
    storageBucket: "sia-gamedev.firebasestorage.app",
    messagingSenderId: "815732635382",
    appId: "1:815732635382:web:d721c77060284955279ed7",
    measurementId: "G-MZD1EHTW1N",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();