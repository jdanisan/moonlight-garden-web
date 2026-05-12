import React from "react";
import { db } from "../../services/firebase";
import { ref, remove } from "firebase/database";
import { useAuth } from "../hook/useAuth";

const ReminderItem = ({ reminder }) => {
  const { user } = useAuth();

  const handleComplete = async () => {
    if (!user?.uid || !reminder.id) return;
    const itemRef = ref(db, `users/${user.uid}/remmindersItem/${reminder.id}`);
    
    try {
      await remove(itemRef);
      console.log("Tarea completada y eliminada");
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className="bg-green-100 p-2 rounded-xl text-lg">
          🌿
        </div>
        <div>
          <h4 className="text-sm font-bold text-gray-800">{reminder.title}</h4>
          <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider">
            {formatDate(reminder.date)}
          </p>
        </div>
      </div>
      
      <button 
        onClick={handleComplete}
        className="bg-gray-50 h-8 w-8 rounded-full flex items-center justify-center border border-gray-100 hover:bg-green-100 hover:border-green-200 transition-all group"
        title="Marcar como completado"
      >
        <div className="w-2 h-2 bg-gray-300 rounded-full group-hover:bg-green-500 transition-colors" />
      </button>
    </div>
  );
};

export default ReminderItem;