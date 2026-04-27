import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// (Opcional pero recomendado a futuro)
import { getFunctions } from "firebase/functions";

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

// 🚀 Init Firebase App
const app = initializeApp(firebaseConfig);

// 🔐 Auth (usuarios + roles)
export const auth = getAuth(app);

// 🗄️ Realtime Database (foro, listas, tareas, chat)
export const db = getDatabase(app);

// ⚙️ Cloud Functions (emails, automatizaciones, recordatorios)
export const functions = getFunctions(app);

export default app;