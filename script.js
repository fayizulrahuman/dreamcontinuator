import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { firebaseConfig, GEMINI_API_KEY, GEMINI_API_URL, GEMINI_MODEL } from './config.js?v=8';

// --- Initialization ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- Languages Array ---
const languages = [
  { name: "Afrikaans", script: "Afrikaans", flag: "🇿🇦" }, { name: "Albanian", script: "Shqip", flag: "🇦🇱" }, { name: "Amharic", script: "አማርኛ", flag: "🇪🇹" }, { name: "Arabic", script: "العربية", flag: "🇸🇦" }, { name: "Armenian", script: "Հայերեն", flag: "🇦🇲" }, { name: "Azerbaijani", script: "Azərbaycan dili", flag: "🇦🇿" }, { name: "Basque", script: "Euskara", flag: "🇪🇸" }, { name: "Belarusian", script: "Беларуская", flag: "🇧🇾" }, { name: "Bengali", script: "বাংলা", flag: "🇧🇩" }, { name: "Bosnian", script: "Bosanski", flag: "🇧🇦" }, { name: "Bulgarian", script: "Български", flag: "🇧🇬" }, { name: "Catalan", script: "Català", flag: "🇪🇸" }, { name: "Cebuano", script: "Cebuano", flag: "🇵🇭" }, { name: "Chichewa", script: "Chichewa", flag: "🇲🇼" }, { name: "Chinese (Simplified)", script: "简体中文", flag: "🇨🇳" }, { name: "Chinese (Traditional)", script: "繁體中文", flag: "🇹🇼" }, { name: "Corsican", script: "Corsu", flag: "🇫🇷" }, { name: "Croatian", script: "Hrvatski", flag: "🇭🇷" }, { name: "Czech", script: "Čeština", flag: "🇨🇿" }, { name: "Danish", script: "Dansk", flag: "🇩🇰" }, { name: "Dutch", script: "Nederlands", flag: "🇳🇱" }, { name: "Esperanto", script: "Esperanto", flag: "🏳️" }, { name: "Estonian", script: "Eesti", flag: "🇪🇪" }, { name: "Filipino", script: "Filipino", flag: "🇵🇭" }, { name: "Finnish", script: "Suomi", flag: "🇫🇮" }, { name: "French", script: "Français", flag: "🇫🇷" }, { name: "Frisian", script: "Frysk", flag: "🇳🇱" }, { name: "Galician", script: "Galego", flag: "🇪🇸" }, { name: "Georgian", script: "ქართული", flag: "🇬🇪" }, { name: "German", script: "Deutsch", flag: "🇩🇪" }, { name: "Greek", script: "Ελληνικά", flag: "🇬🇷" }, { name: "Gujarati", script: "ગુજરાતી", flag: "🇮🇳" }, { name: "Haitian Creole", script: "Kreyòl ayisyen", flag: "🇭🇹" }, { name: "Hausa", script: "Hausa", flag: "🇳🇬" }, { name: "Hawaiian", script: "ʻŌlelo Hawaiʻi", flag: "🇺🇸" }, { name: "Hebrew", script: "עברית", flag: "🇮🇱" }, { name: "Hindi", script: "हिन्दी", flag: "🇮🇳" }, { name: "Hmong", script: "Hmoob", flag: "🇨🇳" }, { name: "Hungarian", script: "Magyar", flag: "🇭🇺" }, { name: "Icelandic", script: "Íslenska", flag: "🇮🇸" }, { name: "Igbo", script: "Igbo", flag: "🇳🇬" }, { name: "Indonesian", script: "Indonesia", flag: "🇮🇩" }, { name: "Irish", script: "Gaeilge", flag: "🇮🇪" }, { name: "Italian", script: "Italiano", flag: "🇮🇹" }, { name: "Japanese", script: "日本語", flag: "🇯🇵" }, { name: "Javanese", script: "Basa Jawa", flag: "🇮🇩" }, { name: "Kannada", script: "ಕನ್ನಡ", flag: "🇮🇳" }, { name: "Kazakh", script: "Қазақ тілі", flag: "🇰🇿" }, { name: "Khmer", script: "ខ្មែរ", flag: "🇰🇭" }, { name: "Kinyarwanda", script: "Ikinyarwanda", flag: "🇷🇼" }, { name: "Korean", script: "한국어", flag: "🇰🇷" }, { name: "Kurdish", script: "Kurdî", flag: "🇮🇶" }, { name: "Kyrgyz", script: "Кыргызча", flag: "🇰🇬" }, { name: "Lao", script: "ລາວ", flag: "🇱🇦" }, { name: "Latin", script: "Latina", flag: "🇻🇦" }, { name: "Latvian", script: "Latviešu", flag: "🇱🇻" }, { name: "Lithuanian", script: "Lietuvių", flag: "🇱🇹" }, { name: "Luxembourgish", script: "Lëtzebuergesch", flag: "🇱🇺" }, { name: "Macedonian", script: "Македонски", flag: "🇲🇰" }, { name: "Malagasy", script: "Malagasy", flag: "🇲🇬" }, { name: "Malay", script: "Bahasa Melayu", flag: "🇲🇾" }, { name: "Malayalam", script: "മലയാളം", flag: "🇮🇳" }, { name: "Maltese", script: "Malti", flag: "🇲🇹" }, { name: "Maori", script: "Māori", flag: "🇳🇿" }, { name: "Marathi", script: "मराठी", flag: "🇮🇳" }, { name: "Mongolian", script: "Монгол", flag: "🇲🇳" }, { name: "Myanmar", script: "မြန်မာ", flag: "🇲🇲" }, { name: "Nepali", script: "नेपाली", flag: "🇳🇵" }, { name: "Norwegian", script: "Norsk", flag: "🇳🇴" }, { name: "Odia", script: "ଓଡ଼ିଆ", flag: "🇮🇳" }, { name: "Pashto", script: "پښتو", flag: "🇦🇫" }, { name: "Persian", script: "فارسی", flag: "🇮🇷" }, { name: "Polish", script: "Polski", flag: "🇵🇱" }, { name: "Portuguese", script: "Português", flag: "🇵🇹" }, { name: "Punjabi", script: "ਪੰਜਾਬੀ", flag: "🇮🇳" }, { name: "Romanian", script: "Română", flag: "🇷🇴" }, { name: "Russian", script: "Русский", flag: "🇷🇺" }, { name: "Samoan", script: "Gagana fa'a Sāmoa", flag: "🇼🇸" }, { name: "Scots Gaelic", script: "Gàidhlig", flag: "🇬🇧" }, { name: "Serbian", script: "Српски", flag: "🇷🇸" }, { name: "Sesotho", script: "Sesotho", flag: "🇱🇸" }, { name: "Shona", script: "chiShona", flag: "🇿🇼" }, { name: "Sindhi", script: "سنڌي", flag: "🇵🇰" }, { name: "Sinhala", script: "සිංහල", flag: "🇱🇰" }, { name: "Slovak", script: "Slovenčina", flag: "🇸🇰" }, { name: "Slovenian", script: "Slovenščina", flag: "🇸🇮" }, { name: "Somali", script: "Soomaaliga", flag: "🇸🇴" }, { name: "Spanish", script: "Español", flag: "🇪🇸" }, { name: "Sundanese", script: "Basa Sunda", flag: "🇮🇩" }, { name: "Swahili", script: "Kiswahili", flag: "🇰🇪" }, { name: "Swedish", script: "Svenska", flag: "🇸🇪" }, { name: "Tajik", script: "Тоҷикӣ", flag: "🇹🇯" }, { name: "Tamil", script: "தமிழ்", flag: "🇮🇳" }, { name: "Tatar", script: "Татарча", flag: "🇷🇺" }, { name: "Telugu", script: "తెలుగు", flag: "🇮🇳" }, { name: "Thai", script: "ไทย", flag: "🇹🇭" }, { name: "Turkish", script: "Türkçe", flag: "🇹🇷" }, { name: "Turkmen", script: "Türkmençe", flag: "🇹🇲" }, { name: "Ukrainian", script: "Українська", flag: "🇺🇦" }, { name: "Urdu", script: "اردو", flag: "🇵🇰" }, { name: "Uyghur", script: "ئۇيغۇرچە", flag: "🇨🇳" }, { name: "Uzbek", script: "O'zbek", flag: "🇺🇿" }, { name: "Vietnamese", script: "Tiếng Việt", flag: "🇻🇳" }, { name: "Welsh", script: "Cymraeg", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿" }, { name: "Xhosa", script: "isiXhosa", flag: "🇿🇦" }, { name: "Yiddish", script: "ייִדיש", flag: "🇮🇱" }, { name: "Yoruba", script: "Yorùbá", flag: "🇳🇬" }, { name: "Zulu", script: "isiZulu", flag: "🇿🇦" }
];

// --- Utilities ---
const page = document.body.dataset.page;
const spinner = document.getElementById('loading-spinner');

function getApiKey() {
  let key = localStorage.getItem('gemini_api_key');
  if (!key) {
    key = window.prompt("To generate and translate dreams, please enter your Gemini API Key.\n\n(It will be saved locally in your browser.)");
    if (key) {
      localStorage.setItem('gemini_api_key', key.trim());
    }
  }
  return key ? key.trim() : "";
}

function showSpinner() {
  if(spinner) spinner.classList.remove('hidden');
}
function hideSpinner() {
  if(spinner) spinner.classList.add('hidden');
}
function showError(elementId, msg) {
  const el = document.getElementById(elementId);
  if(el) {
    el.innerText = msg;
    el.classList.add('visible');
  }
}
function hideError(elementId) {
  const el = document.getElementById(elementId);
  if(el) {
    el.innerText = '';
    el.classList.remove('visible');
  }
}

// Generate Starfield
function generateStars() {
  const starsContainer = document.getElementById('stars');
  if(!starsContainer) return;
  for(let i=0; i<150; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.width = Math.random() * 3 + 'px';
    star.style.height = star.style.width;
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.animationDuration = (Math.random() * 3 + 2) + 's';
    star.style.animationDelay = (Math.random() * 2) + 's';
    starsContainer.appendChild(star);
  }
}
generateStars();

// --- Auth State Management ---
let currentUser = null;
onAuthStateChanged(auth, (user) => {
  currentUser = user;
  if(user) {
    if(page === 'login') {
      window.location.href = 'index.html';
    } else {
      updateNav(user);
      if(page === 'home') loadRecentDreams();
      if(page === 'archive') loadArchiveDreams();
      hideSpinner();
    }
  } else {
    if(page !== 'login') {
      window.location.href = 'login.html';
    } else {
      hideSpinner();
    }
  }
});

function updateNav(user) {
  const nameEl = document.getElementById('user-name');
  const avatarEl = document.getElementById('user-avatar');
  if(nameEl) nameEl.innerText = user.displayName || user.email.split('@')[0];
  if(avatarEl) {
    if(user.photoURL) {
      avatarEl.innerHTML = `<img src="${user.photoURL}" alt="User">`;
    } else {
      avatarEl.innerText = (user.displayName || user.email).charAt(0).toUpperCase();
    }
  }
  const signOutBtn = document.getElementById('sign-out-btn');
  if(signOutBtn) {
    signOutBtn.addEventListener('click', () => {
      signOut(auth).then(() => window.location.href = 'login.html');
    });
  }
}

// --- Login Page Logic ---
if(page === 'login') {
  let isSignUp = false;
  const authForm = document.getElementById('auth-form');
  const googleBtn = document.getElementById('google-login-btn');
  const toggleLink = document.getElementById('toggle-mode-link');
  const toggleText = document.getElementById('toggle-mode-text');
  const submitBtn = document.getElementById('submit-btn');
  const confirmGrp = document.getElementById('confirm-password-group');
  const forgotLink = document.getElementById('forgot-password-link');

  function handleToggle(e) {
    e.preventDefault();
    isSignUp = !isSignUp;
    hideError('error-message');
    if(isSignUp) {
      confirmGrp.classList.remove('hidden');
      submitBtn.innerText = 'Sign Up';
      toggleText.innerHTML = `Already have an account? <a href="#" id="toggle-mode-link">Sign In</a>`;
      document.getElementById('confirm-password').setAttribute('required', 'true');
    } else {
      confirmGrp.classList.add('hidden');
      submitBtn.innerText = 'Sign In';
      toggleText.innerHTML = `Don't have an account? <a href="#" id="toggle-mode-link">Sign Up</a>`;
      document.getElementById('confirm-password').removeAttribute('required');
    }
    document.getElementById('toggle-mode-link').addEventListener('click', handleToggle);
  }

  toggleLink.addEventListener('click', handleToggle);

  googleBtn.addEventListener('click', () => {
    showSpinner();
    hideError('error-message');
    signInWithPopup(auth, new GoogleAuthProvider()).catch(err => {
      hideSpinner();
      showError('error-message', err.message);
    });
  });

  authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    hideError('error-message');
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if(isSignUp) {
      const confirm = document.getElementById('confirm-password').value;
      if(password !== confirm) {
        return showError('error-message', 'Passwords do not match.');
      }
      if(password.length < 6) {
        return showError('error-message', 'Password should be at least 6 characters.');
      }
      showSpinner();
      createUserWithEmailAndPassword(auth, email, password).catch(err => {
        hideSpinner();
        showError('error-message', err.message);
      });
    } else {
      showSpinner();
      signInWithEmailAndPassword(auth, email, password).catch(err => {
        hideSpinner();
        showError('error-message', 'Invalid credentials or user not found.');
      });
    }
  });

  forgotLink.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    if(!email) {
      return showError('error-message', 'Please enter your email to reset password.');
    }
    sendPasswordResetEmail(auth, email).then(() => {
      showError('error-message', 'Password reset email sent!');
      document.getElementById('error-message').style.color = '#a8ffb2';
    }).catch(err => {
      showError('error-message', err.message);
    });
  });
}

// --- Mood Colors & Selection ---
const moodColors = {
  "Surreal": "rgba(200, 150, 255, 0.4)",
  "Nightmarish": "rgba(255, 100, 100, 0.4)",
  "Melancholy": "rgba(100, 150, 255, 0.4)",
  "Euphoric": "rgba(255, 220, 100, 0.4)",
  "Liminal": "rgba(150, 255, 200, 0.4)",
  "Nostalgic": "rgba(255, 180, 130, 0.4)"
};

function updateMoodGlow(mood) {
  const glow = document.getElementById('mood-glow');
  if(glow && moodColors[mood]) {
    glow.style.background = `radial-gradient(circle, ${moodColors[mood]} 0%, transparent 60%)`;
    document.documentElement.style.setProperty('--accent', moodColors[mood]);
  }
}

if(page === 'log-dream') {
  let selectedMood = "Surreal";
  updateMoodGlow(selectedMood);

  const pills = document.querySelectorAll('.mood-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedMood = pill.dataset.mood;
      updateMoodGlow(selectedMood);
    });
  });

  document.getElementById('continue-dream-btn').addEventListener('click', async () => {
    const fragment = document.getElementById('dream-fragment').value.trim();
    if(!fragment) {
      return showError('error-message', 'Please enter a dream fragment to continue.');
    }
    hideError('error-message');
    showSpinner();

    try {
      const apiKey = getApiKey();
      if (!apiKey) throw new Error("API Key is required. Please reload and provide a valid key.");

      const response = await fetch(`${GEMINI_API_URL}/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `System: You are a dream weaver. Continue the user's dream fragment in second person, present tense. Use simple language for easy understanding. Keep it to exactly 2 to 3 paragraphs. Match the mood: ${selectedMood}. Do not explain — just inhabit the dream. Begin immediately.\n\nDream fragment: ${fragment}` }]
          }],
          generationConfig: {
            maxOutputTokens: 1000
          }
        })
      });

      if(!response.ok) {
        const errData = await response.json();
        if (response.status === 400 || (errData.error && errData.error.message && errData.error.message.toLowerCase().includes("api key"))) {
          localStorage.removeItem('gemini_api_key');
        }
        console.error("API Error Response:", errData);
        throw new Error(`API Error: ${errData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      const continuation = data.candidates[0].content.parts[0].text;

      // Save to Firestore
      const docRef = await addDoc(collection(db, "users", currentUser.uid, "dreams"), {
        fragment,
        continuation,
        mood: selectedMood,
        date: new Date().toISOString(),
        uid: currentUser.uid
      });

      // Pass data via sessionStorage to Result page
      sessionStorage.setItem('currentDream', JSON.stringify({ fragment, continuation, mood: selectedMood }));
      window.location.href = 'result.html';
      
    } catch(err) {
      hideSpinner();
      showError('error-message', err.message);
    }
  });
}

// --- Result Page ---
if(page === 'result') {
  const dreamData = JSON.parse(sessionStorage.getItem('currentDream'));
  if(!dreamData) window.location.href = 'index.html';

  updateMoodGlow(dreamData.mood);
  document.getElementById('result-mood').innerText = dreamData.mood;
  document.getElementById('result-fragment').innerText = dreamData.fragment;
  document.getElementById('result-continuation').innerText = dreamData.continuation;
  setupTranslator(dreamData.fragment + "\n\n" + dreamData.continuation);
}

// --- Translator Logic ---
function setupTranslator(textToTranslate) {
  const select = document.getElementById('language-select') || document.getElementById('modal-language-select');
  const search = document.getElementById('language-search') || document.getElementById('modal-language-search');
  const btn = document.getElementById('translate-btn') || document.getElementById('modal-translate-btn');
  const errorEl = document.getElementById('translation-error') || document.getElementById('modal-translation-error');
  const resContainer = document.getElementById('translation-result') || document.getElementById('modal-translation-result');
  const resText = document.getElementById('translation-text') || document.getElementById('modal-translation-text');
  const resBadge = document.getElementById('translation-badge') || document.getElementById('modal-translation-badge');

  function renderOptions(filter = "") {
    select.innerHTML = '';
    languages.forEach(lang => {
      if(lang.name.toLowerCase().includes(filter.toLowerCase()) || lang.script.toLowerCase().includes(filter.toLowerCase())) {
        const opt = document.createElement('option');
        opt.value = JSON.stringify(lang);
        opt.text = `${lang.flag} ${lang.name} (${lang.script})`;
        select.appendChild(opt);
      }
    });
  }
  renderOptions();

  search.addEventListener('input', (e) => renderOptions(e.target.value));

  btn.addEventListener('click', async () => {
    if(!select.value) return;
    const lang = JSON.parse(select.value);
    
    errorEl.classList.remove('visible');
    resContainer.classList.remove('active');
    btn.disabled = true;
    btn.innerText = 'Translating...';

    try {
      const apiKey = getApiKey();
      if (!apiKey) throw new Error("API Key is required. Please reload and provide a valid key.");

      const response = await fetch(`${GEMINI_API_URL}/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `System: You are a poetic literary translator. Translate the following dream story into ${lang.name}. Preserve the lyrical, dreamlike tone. Return only the translated text.\n\nStory: ${textToTranslate}` }]
          }],
          generationConfig: {
            maxOutputTokens: 1000
          }
        })
      });

      if(!response.ok) {
        const errData = await response.json();
        if (response.status === 400 || (errData.error && errData.error.message && errData.error.message.toLowerCase().includes("api key"))) {
          localStorage.removeItem('gemini_api_key');
        }
        console.error("API Error Response:", errData);
        throw new Error(`API Error: ${errData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      resText.innerText = data.candidates[0].content.parts[0].text;
      resBadge.innerText = `${lang.flag} ${lang.name} (${lang.script})`;
      resContainer.classList.add('active');
    } catch(err) {
      errorEl.innerText = err.message;
      errorEl.classList.add('visible');
    } finally {
      btn.disabled = false;
      btn.innerHTML = 'Translate &rarr;';
    }
  });
}

// --- Home / Archive Fetching ---
async function fetchDreams(limitNum = null) {
  const q = query(collection(db, "users", currentUser.uid, "dreams"), orderBy("date", "desc"));
  const snapshot = await getDocs(q);
  let dreams = [];
  snapshot.forEach(doc => {
    dreams.push({ id: doc.id, ...doc.data() });
  });
  if(limitNum) dreams = dreams.slice(0, limitNum);
  return dreams;
}

function createDreamCard(dream) {
  const d = new Date(dream.date);
  const dateStr = d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  
  const card = document.createElement('div');
  card.className = 'card dream-card hoverable';
  card.innerHTML = `
    <div class="dream-header">
      <span class="mood-tag" style="background: ${moodColors[dream.mood] || 'rgba(255,255,255,0.1)'}">${dream.mood}</span>
      <span>${dateStr}</span>
    </div>
    <div class="dream-fragment">${dream.fragment}</div>
  `;
  card.addEventListener('click', () => openModal(dream));
  return card;
}

async function loadRecentDreams() {
  const container = document.getElementById('recent-dreams-container');
  if(!container) return;
  const dreams = await fetchDreams(3);
  if(dreams.length === 0) {
    container.innerHTML = '<p style="color: var(--text-muted)">You haven\'t logged any dreams yet.</p>';
    return;
  }
  container.innerHTML = '';
  dreams.forEach(d => container.appendChild(createDreamCard(d)));
}

async function loadArchiveDreams() {
  const container = document.getElementById('archive-dreams-container');
  const empty = document.getElementById('archive-empty');
  if(!container) return;
  const dreams = await fetchDreams();
  if(dreams.length === 0) {
    empty.classList.remove('hidden');
    return;
  }
  container.innerHTML = '';
  dreams.forEach(d => container.appendChild(createDreamCard(d)));
}

// --- Modal Logic ---
const modal = document.getElementById('dream-modal');
const modalClose = document.getElementById('modal-close');

if(modalClose) {
  modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    const res = document.getElementById('modal-translation-result');
    if(res) res.classList.remove('active');
  });
}

function openModal(dream) {
  if(!modal) return;
  document.getElementById('modal-mood').innerText = dream.mood;
  document.getElementById('modal-mood').style.background = moodColors[dream.mood] || 'rgba(255,255,255,0.1)';
  document.getElementById('modal-date').innerText = new Date(dream.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  document.getElementById('modal-fragment').innerText = dream.fragment;
  document.getElementById('modal-continuation').innerText = dream.continuation;
  
  updateMoodGlow(dream.mood);
  setupTranslator(dream.fragment + "\n\n" + dream.continuation);
  
  modal.classList.add('active');
}
