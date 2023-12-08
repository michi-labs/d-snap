// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmRuqvjwiCPqoQSR9Rb4UTWYNEuOD_tgA",
  authDomain: "dsnap-1464b.firebaseapp.com",
  projectId: "dsnap-1464b",
  storageBucket: "dsnap-1464b.appspot.com",
  messagingSenderId: "322585508017",
  appId: "1:322585508017:web:461d9c9ce364a065c8ca90",
  measurementId: "G-DPYL50VC8H",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
