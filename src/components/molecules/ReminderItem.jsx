import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function ReminderItem({ reminder }) {
  const { onRemoveFromPlanning, requireAuth } = useContext(AppContext);

  const handleRemove = () => {
    requireAuth(() => {
      onRemoveFromPlanning(reminder.id);
    });
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow flex items-start justify-between gap-3">
      {/* INFO */}
      <div className="flex flex-col">
        <h3 className="font-semibold text-green-800">
          {reminder.task}
        </h3>

        <p className="text-xs text-gray-500">
          {reminder.time}
        </p>
      </div>

      {/* ACTIONS */}
      <button
        onClick={handleRemove}
        className="text-sm text-red-500 hover:text-red-700 transition"
        title="Eliminar recordatorio"
      >
        ✕
      </button>
    </div>
  );
}