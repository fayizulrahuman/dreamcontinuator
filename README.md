# DreamContinuator

A mystical dream journaling web app with authentication.

## Firebase Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Enable **Authentication** and set up the following providers:
   - Google Sign-In
   - Email/Password
3. Create a **Firestore Database** in test mode, then update the Security Rules to only allow users to read/write their own dreams:

```rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/dreams/{dreamId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

4. Go to Project Settings > General, scroll to "Your apps", and register a Web App.
5. Copy the `firebaseConfig` object provided by Firebase and replace the placeholder in `config.js`.
6. Get a Claude API key from [Anthropic Console](https://console.anthropic.com/) and place it in `config.js`.

## Running the App

You can deploy this as static files to Firebase Hosting or run it locally using any static server. For example:
```bash
npx serve .
```
