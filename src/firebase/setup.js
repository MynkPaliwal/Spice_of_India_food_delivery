// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAt5XFhHAtW7owAph5HMfha6MPbLPqg70c",
  authDomain: "pizza-app-1-17105.firebaseapp.com",
  projectId: "pizza-app-1-17105",
  storageBucket: "pizza-app-1-17105.firebasestorage.app",
  messagingSenderId: "45956201493",
  appId: "1:45956201493:web:e90b555ffba8d6761ca21c",
  measurementId: "G-5MDCSPQX5B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);