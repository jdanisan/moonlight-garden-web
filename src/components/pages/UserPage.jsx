import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Sidebar from "../organism/Sidebar";
import WelcomeCard from "../molecules/WelcomeCard";
import MyJungle from "../organism/MyJungle";
import ReminderList from "../molecules/ReminderItem";

const UserPage = () => {
  const { plannedPlants, reminders } = useContext(AppContext);

  return (
    <div className="flex min-h-screen bg-[#f0eee0]">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <WelcomeCard />

        <div className="grid grid-cols-12 gap-8">
          {/* Columna Izquierda: Tus Plantas */}
          <section className="col-span-8">
            <h3 className="font-bold text-green-900 mb-4">Mi Jungla Personal</h3>
            <MyJungle plannedIds={plannedPlants} />
          </section>

          {/* Columna Derecha: Recordatorios */}
          <section className="col-span-4 space-y-4">
            <h3 className="font-bold text-green-900 mb-4">Tareas Pendientes</h3>
            <ReminderList reminders={reminders} plannedIds={plannedPlants} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default UserPage;