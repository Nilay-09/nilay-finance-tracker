// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCq9vNFwsz1u0nKH6vLrB_uyje4_RHdNdU",
    authDomain: "your-munimji.firebaseapp.com",
    projectId: "your-munimji",
    storageBucket: "your-munimji.appspot.com",
    messagingSenderId: "548752404014",
    appId: "1:548752404014:web:7dc2699ec15de1057b39bf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);