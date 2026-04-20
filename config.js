// config.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACaJSLguwiMKUlTROo3MA-uL5ORu6RZ5Y",
  authDomain: "login-d684e.firebaseapp.com",
  projectId: "login-d684e",
  storageBucket: "login-d684e.firebasestorage.app",
  messagingSenderId: "607768048141",
  appId: "1:607768048141:web:4116e767a3fe9093c5db44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Gemini API Configuration
const GEMINI_API_KEY = "AIzaSyACuks9sEURx6kAOawb-fJpjDhmqi-8xNY"; // Replace with your actual key
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=$";

// Add these lines below
const GEMINI_MODEL = "gemini-2.5-flash";

// Optional: Rate limit awareness (free tier)
const GEMINI_RATE_LIMITS = {
  rpm: 5,      // Requests per minute
  rpd: 20      // Requests per day
};

// Export if using modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    firebaseConfig,
    GEMINI_API_KEY,
    GEMINI_API_URL,
    GEMINI_MODEL,
    GEMINI_RATE_LIMITS
  };
} else {
  // We cannot use export keyword inside an if-statement or an ES block
}
// This needs to be outside conditional blocks to be valid ES module syntax
export { firebaseConfig, GEMINI_API_KEY, GEMINI_API_URL, GEMINI_MODEL, GEMINI_RATE_LIMITS };