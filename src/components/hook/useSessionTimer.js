import { useEffect, useCallback, useRef } from "react";
import { useAuth } from "./useAuth";
import toast from "react-hot-toast";

export const useSessionTimer = (timeoutMinutes = 10) => {
  const { logout, isLogged } = useAuth();
  const timerRef = useRef(null);

  const handleAutoLogout = useCallback(() => {
    if (isLogged) {
      logout();
      toast("Sesión cerrada por inactividad", { icon: "⏳" });
      // Limpiar rastro de sesión
      sessionStorage.clear();
    }
  }, [logout, isLogged]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    
    // Solo activamos el timer si el usuario está logueado
    if (isLogged) {
      timerRef.current = setTimeout(handleAutoLogout, timeoutMinutes * 60 * 1000);
    }
  }, [handleAutoLogout, isLogged, timeoutMinutes]);

  useEffect(() => {
    // Eventos que reinician el contador de actividad
    const activityEvents = [
      "mousedown",
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
      "click"
    ];

    if (isLogged) {
      // Registrar eventos
      activityEvents.forEach((event) =>
        window.addEventListener(event, resetTimer)
      );
      
      // Iniciar el primer timer
      resetTimer();
    }

    // Limpieza al desmontar o desloguear
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      activityEvents.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, [isLogged, resetTimer]);

  return null; // Este hook no necesita devolver datos, solo ejecutar la lógica
};