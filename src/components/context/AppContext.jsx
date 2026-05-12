import { createContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "../hook/useAuth";
import { ref, set, onValue } from "firebase/database";
import { db } from "../../services/firebase";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  const { isLogged, user } = useAuth();
  const [plannedPlants, setPlannedPlants] = useState([]);
  const [reminders, setReminders] = useState([]); // Estado para recordatorios
  const [pendingAction, setPendingAction] = useState(null);
  const [modalStack, setModalStack] = useState([]);
  const currentModal = modalStack[modalStack.length - 1];

  // --- SINCRONIZACIÓN CON FIREBASE ---
  // Cuando el usuario cambia (login/logout), traemos sus datos de Firebase
  useEffect(() => {
    if (!user?.uid) {
      setPlannedPlants([]);
      setReminders([]);
      return;
    }

    const userRef = ref(db, `users/${user.uid}`);
    // onValue mantiene el estado de React sincronizado con Firebase en tiempo real
    const unsubscribe = onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPlannedPlants(data.plannedPlants || []);
        setReminders(data.reminders || []);
      }
    });

    return () => unsubscribe();
  }, [user?.uid]);

  // --- ACCIÓN: AÑADIR PLANTA ---
  const onAddToPlanning = useCallback((plantId) => {
    if (!user?.uid) return;

    // Calculamos el nuevo array
    const updatedPlants = plannedPlants.includes(plantId)
      ? plannedPlants
      : [...plannedPlants, plantId];

    // Escribimos en Firebase (el useEffect de arriba actualizará el estado local)
    set(ref(db, `users/${user.uid}/plannedPlants`), updatedPlants)
      .then(() => toast.success("Planta añadida a tu huerto"))
      .catch(() => toast.error("Error al guardar"));
  }, [user?.uid, plannedPlants]);

  // --- ACCIÓN: ELIMINAR PLANTA ---
  const onRemoveFromPlanning = useCallback((plantId) => {
    if (!user?.uid) return;
    const updatedPlants = plannedPlants.filter(id => id !== plantId);
    set(ref(db, `users/${user.uid}/plannedPlants`), updatedPlants)
      .then(() => toast.success("Planta eliminada de tu huerto"))
      .catch(() => toast.error("Error al eliminar"));
  }, [user?.uid, plannedPlants]);

  // --- ACCIÓN: AÑADIR RECORDATORIO ---
  const addReminder = useCallback((reminder) => {
    if (!user?.uid) return;

    const updatedReminders = [...reminders, reminder];

    set(ref(db, `users/${user.uid}/reminders`), updatedReminders)
      .then(() => toast.success("Recordatorio creado"))
      .catch(() => toast.error("Error al guardar recordatorio"));
  }, [user?.uid, reminders]);

  // --- LÓGICA DE MODALES Y AUTH ---
  const openModal = (type, data) => {
    const scrollY = window.scrollY;
    setModalStack(prev => [...prev, { type, data, scrollY }]);
    // Bloqueo de scroll
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalStack(prev => {
      const newStack = prev.slice(0, -1);
      if (newStack.length === 0) document.body.style.overflow = "";
      return newStack;
    });
  };

  const requireAuth = (callback) => {
    if (isLogged) {
      callback();
    } else {
      setPendingAction(() => callback);
      openModal("new-user");
    }
  };

  const executePendingAction = () => {
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  return (
    <AppContext.Provider value={{
      plannedPlants,
      reminders,
      onAddToPlanning,
      onRemoveFromPlanning,
      addReminder,
      openModal,
      closeModal,
      currentModal,
      requireAuth,
      executePendingAction,
      isLogged
    }}>
      {children}
    </AppContext.Provider>
  );
};