// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA4IbJpQbsG6ZzqXi5X04GKEcmyrTM40P4",
    authDomain: "moonlightgarden-e5cb4.firebaseapp.com",
    databaseURL: "https://moonlightgarden-e5cb4-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "moonlightgarden-e5cb4",
    storageBucket: "moonlightgarden-e5cb4.firebasestorage.app",
    messagingSenderId: "59099098731",
    appId: "1:59099098731:web:24be748ae8dc59330d8b2e",
    measurementId: "G-V0VTHK1YJ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
export const db = getDatabase(app);  