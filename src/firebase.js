import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1KCXuuM-ODcwVaX3whSI9sHrMwC-1W7A",
  authDomain: "gamics-rankeds.firebaseapp.com",
  projectId: "gamics-rankeds",
  storageBucket: "gamics-rankeds.appspot.com",
  messagingSenderId: "851319215071",
  appId: "1:851319215071:web:5bfda9569669bc5ca2aa6a",
  measurementId: "G-CBKVVK52G2"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);