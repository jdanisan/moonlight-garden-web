import React, { useState } from "react"; // Añadimos useState para el feedback
import { useAuth } from "../hook/useAuth";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../services/firebase";
import toast from "react-hot-toast";

const WelcomeCard = () => {
  const { user, isLogged } = useAuth();
  const { requireAuth } = useContext(AppContext);
  const [isSending, setIsSending] = useState(false); 

  const name = isLogged ? user.email.split('@')[0] : "visitante";

  const handleResetPassword = async () => {
    if (!isLogged || !user?.email) return;
    
    setIsSending(true); 
    try {
      await sendPasswordResetEmail(auth, user.email);
      toast.success("Te hemos enviado un email para cambiar tu contraseña");
    } catch (err) {
      toast.error("Error al intentar resetear la contraseña");
    } finally {
      setIsSending(false); 
    }
  };

  return (
    <div className="bg-green-700 text-white p-8 rounded-2xl mb-6 shadow-lg relative overflow-hidden">
      
      {isLogged && (
        <button
          onClick={handleResetPassword}
          disabled={isSending}
          className={`
            absolute top-4 right-6 text-[10px] uppercase tracking-widest font-bold
            transition-all hover:text-green-200 border-b border-transparent hover:border-green-200
            ${isSending ? "opacity-50 cursor-wait" : "opacity-70"}
          `}
        >
          {isSending ? "Enviando..." : "Restablecer contraseña"}
        </button>
      )}

      <h1 className="text-3xl font-bold mb-2 capitalize pr-20">
        Bienvenido, {name}.
      </h1>
      
      <p className="opacity-90 text-sm max-w-md">
        {isLogged 
          ? "Tu jungla interior está creciendo con éxito." 
          : "Inicia sesión para empezar a cuidar tus plantas hoy mismo."
        }
      </p>

      {!isLogged && (
        <button 
          className="mt-4 bg-white text-green-700 px-4 py-2 rounded-lg font-bold text-xs hover:bg-green-50 transition-all shadow-md active:scale-95"
          onClick={() => requireAuth()} 
        >
          Iniciar sesión
        </button>
      )}
      <div className="absolute -bottom-4 -right-4 text-white/10">
        <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
        </svg>
      </div>
    </div>
  );
};

export default WelcomeCard;