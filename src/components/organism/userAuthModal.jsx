import { useState, useContext } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "../../services/firebase";
import { Button } from "../atoms/Button";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";

export function UserAuthModal({ variant = "form-user", onClose, onSwitch }) {
  const isRegister = variant === "new-user";
  const { executePendingAction } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) return setEmailError("Introduce tu email primero");
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Email de recuperación enviado");
    } catch (err) {
      setEmailError("Error al enviar el email");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setLoading(true);

    try {
      if (isRegister) {
        // --- REGISTRO ---
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        
        // Escribir información inicial en Firebase
        await set(ref(db, `users/${userCred.user.uid}`), {
          email: email,
          role: "user",
          createdAt: Date.now(),
          plannedPlants: [], // User[plannedPlants{}]
          reminders: []      // User[reminders{}]
        });

        toast.success("Cuenta creada correctamente");
      } else {
        // --- LOGIN ---
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Sesión iniciada");
      }

      onClose();
      // Pequeño delay para asegurar que el estado de auth de Firebase se propague
      setTimeout(() => {
        executePendingAction();
      }, 500);

    } catch (err) {
      const msg = err.code === "auth/wrong-password" ? "Contraseña incorrecta" : "Error de credenciales";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[320px] bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-xl font-bold mb-4 text-green-900">
        {isRegister ? "Crear cuenta" : "Iniciar sesión"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          className={`border p-2 rounded w-full outline-none focus:border-green-500 ${emailError ? "border-red-500" : "border-gray-200"}`}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {emailError && <p className="text-red-500 text-xs">{emailError}</p>}

        <input
          className={`border p-2 rounded w-full outline-none focus:border-green-500 ${passwordError ? "border-red-500" : "border-gray-200"}`}
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {!isRegister && (
          <p className="text-xs text-right cursor-pointer text-green-700 hover:underline" onClick={handleResetPassword}>
            ¿Has olvidado la contraseña?
          </p>
        )}

        <Button
          type="submit"
          label={loading ? "Cargando..." : isRegister ? "Registrarse" : "Entrar"}
          variant="goBuy"
          className="w-full"
          disabled={loading}
        />
      </form>

      <p className="text-sm mt-4 text-center text-gray-600">
        {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
        <button className="text-green-700 font-bold hover:underline" onClick={onSwitch}>
          {isRegister ? "Inicia sesión" : "Regístrate"}
        </button>
      </p>
    </div>
  );
}