import { useEffect, useCallback, useRef } from "react";
import { useAuth } from "./useAuth";
import toast from "react-hot-toast";

export const useSessionTimer = (timeoutMinutes = 10) => {
  const { logout, isLogged } = useAuth();
  const timerRef = useRef(null);

  // Función que ejecuta el cierre de sesión
  const handleAutoLogout = useCallback(() => {
    if (isLogged) {
      // console.log("⏰ Tiempo de inactividad alcanzado. Cerrando sesión...");
      logout(); // Asegúrate de que useAuth exporte esta función ahora
      toast("Sesión cerrada por inactividad", { 
        icon: "⏳",
        style: { borderRadius: '10px', background: '#333', color: '#fff' }
      });
      sessionStorage.clear();
    }
  }, [logout, isLogged]);

  // Función para reiniciar el contador
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    
    if (isLogged) {
      const ms = timeoutMinutes * 60 * 1000;
      timerRef.current = setTimeout(handleAutoLogout, ms);
      // console.log(`⏱️ Timer reiniciado: ${timeoutMinutes} minutos`);
    }
  }, [handleAutoLogout, isLogged, timeoutMinutes]);

  useEffect(() => {
    // Eventos que consideraremos como "Actividad"
    const activityEvents = [
      "mousedown",
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
      "click"
    ];

    if (isLogged) {
      // Escuchar eventos en la ventana
      activityEvents.forEach((event) =>
        window.addEventListener(event, resetTimer)
      );
      
      // Iniciar el contador apenas el usuario entra
      resetTimer();
    }

    // Limpieza: muy importante para evitar fugas de memoria
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      activityEvents.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, [isLogged, resetTimer]);

  return null; 
};