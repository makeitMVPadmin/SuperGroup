// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjCnfBaIPzegtAHjF3rNNM3Lys9f6a62c",
  authDomain: "supergroup-2cd54.firebaseapp.com",
  projectId: "supergroup-2cd54",
  storageBucket: "supergroup-2cd54.appspot.com",
  messagingSenderId: "36763913545",
  appId: "1:36763913545:web:35caeb92bcae9a4de39e98",
  measurementId: "G-B4PPD5C65S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);