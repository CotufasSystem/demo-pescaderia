import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBXjCVwbkE-rKRinqUPAW375RLAZkyrYqQ",
  authDomain: "mi-pescaderia.firebaseapp.com",
  projectId: "mi-pescaderia",
  storageBucket: "mi-pescaderia.firebasestorage.app",
  messagingSenderId: "752843610377",
  appId: "1:752843610377:web:a0dce6a3afc4ca6f4e1bd8",
  measurementId: "G-J63PRW9VC3"
};

export const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
