import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4IbJpQbsG6ZzqXi5X04GKEcmyrTM40P4",
  authDomain: "moonlightgarden-e5cb4.firebaseapp.com",
  databaseURL:
    "https://moonlightgarden-e5cb4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "moonlightgarden-e5cb4",
  storageBucket: "moonlightgarden-e5cb4.firebasestorage.app",
  messagingSenderId: "59099098731",
  appId: "1:59099098731:web:24be748ae8dc59330d8b2e",
  measurementId: "G-V0VTHK1YJ6",
};

// Init app
const app = initializeApp(firebaseConfig);

// Services
export const db = getDatabase(app);
export const auth = getAuth(app);