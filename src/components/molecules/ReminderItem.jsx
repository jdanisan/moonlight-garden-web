import React from "react";
import ReminderItem from "../molecules/ReminderItem";

const ReminderList = ({ reminders, plannedIds }) => {
  if (plannedIds.length === 0) {
    return (
      <div className="bg-white/50 p-6 rounded-xl text-center">
        <p className="text-xs text-gray-400">Sin plantas no hay tareas.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {reminders.length > 0 ? (
        reminders.map((r, index) => (
          <ReminderItem key={index} reminder={r} />
        ))
      ) : (
        <div className="p-4 bg-green-100 rounded-lg">
          <p className="text-xs text-green-800">Todo está al día por ahora.</p>
        </div>
      )}
    </div>
  );
};

export default ReminderList;