import React from "react";
import ReminderItem from "../molecules/ReminderItem";

const RemindersPanel = ({ reminders = [] }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-green-900 mb-2 uppercase tracking-widest text-xs">
        Próximas Tareas
      </h3>
      
      {reminders.length === 0 ? (
        <div className="bg-white/50 border border-dashed border-gray-300 rounded-2xl p-6 text-center">
          <p className="text-sm text-gray-500 italic">
            No tienes tareas pendientes. ¡Tu jardín está al día!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 transition-all duration-300 ease-in-out">
          {reminders.map((r) => (
            <ReminderItem key={r.id} reminder={r} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RemindersPanel;