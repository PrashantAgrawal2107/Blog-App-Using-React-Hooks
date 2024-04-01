// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMHwJRimXZMCWDrEAfgBAZIcQuMWZo6l0",
  authDomain: "blogging-app-bcd12.firebaseapp.com",
  projectId: "blogging-app-bcd12",
  storageBucket: "blogging-app-bcd12.appspot.com",
  messagingSenderId: "69087950488",
  appId: "1:69087950488:web:1e3e4cab6866b95a1f02ed"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

