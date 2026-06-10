// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAetZ1IF4VIQFpi7_KRi_6cJcdLdKntiCc",
  authDomain: "crackers-website-f743f.firebaseapp.com",
  projectId: "crackers-website-f743f",
  storageBucket: "crackers-website-f743f.firebasestorage.app",
  messagingSenderId: "411762629457",
  appId: "1:411762629457:web:f1ffe955637aed1b211170"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);
export default app;