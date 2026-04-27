import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "../../firebase";

export function UserAuthModal({ variant = "form-user", onClose }) {
  const isRegister = variant === "new-user";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegister) {
        //REGISTER
        const userCred = await createUserWithEmailAndPassword(auth, email, password);

        await set(ref(db, `users/${userCred.user.uid}`), {
          email,
          role: "user",
          createdAt: Date.now(),
        });
      } else {
        //LOGIN
        await signInWithEmailAndPassword(auth, email, password);
      }

      onClose();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="w-[320px]">
      <h2 className="text-xl font-bold mb-4">
        {isRegister ? "Crear cuenta" : "Iniciar sesión"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          className="border p-2 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 rounded"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-green-600 text-white p-2 rounded"
          type="submit"
        >
          {isRegister ? "Registrarse" : "Entrar"}
        </button>
      </form>
    </div>
  );
}