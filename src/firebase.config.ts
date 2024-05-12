// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZpsJYT4YRQvR0IIzGK-xHOmE3E1uihdg",
  authDomain: "inventory-4c31d.firebaseapp.com",
  projectId: "inventory-4c31d",
  storageBucket: "inventory-4c31d.appspot.com",
  messagingSenderId: "227023268856",
  appId: "1:227023268856:web:6af2fa389f4ab91b42c40d",
  measurementId: "G-1ZVFFGVGZQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);