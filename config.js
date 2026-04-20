// config.js
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxjiSJgrHyYvd8iw5d7B3bnrLDHF307mg",
  authDomain: "dreamcontinuator.firebaseapp.com",
  projectId: "dreamcontinuator",
  storageBucket: "dreamcontinuator.firebasestorage.app",
  messagingSenderId: "82712667754",
  appId: "1:82712667754:web:8f3b4b5b5cbf9531638c13"
};

// Gemini API Configuration
const GEMINI_API_KEY = "AIzaSyBZEGRT95m1YPdoO8f4gzJke2vxro8-dis"; // Replace with your actual key
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta";

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