// Import the functions you need from the SDKs you need
import { initializeApp, firebase } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyCjCnfBaIPzegtAHjF3rNNM3Lys9f6a62c",
//   authDomain: "supergroup-2cd54.firebaseapp.com",
//   projectId: "supergroup-2cd54",
//   storageBucket: "supergroup-2cd54.appspot.com",
//   messagingSenderId: "36763913545",
//   appId: "1:36763913545:web:35caeb92bcae9a4de39e98",
//   measurementId: "G-B4PPD5C65S",
// };
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// } else {
//   firebase.app();
// }

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
