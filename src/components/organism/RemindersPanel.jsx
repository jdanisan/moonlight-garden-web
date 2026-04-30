import React from "react";
import ReminderItem from "../molecules/ReminderItem";

const RemindersPanel = ({ reminders }) => {
  return (
    <section className="col-span-4 space-y-4">
      {reminders.length === 0 ? (
        <p className="text-sm text-gray-500">
          No hay plantas planificadas
        </p>
      ) : (
        reminders.map((r) => (
          <ReminderItem key={r.id} reminder={r} />
        ))
      )}
    </section>
  );
};