import React, { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import ReminderItem from "../molecules/ReminderItem";
import {Cards} from "../molecules/Cards";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#e9e6d8] p-6 flex flex-col">
      <h2 className="font-bold text-lg mb-6">Verdant</h2>

      <nav className="space-y-4 text-sm">
        <p className="font-semibold">My Jungle</p>
        <p>Reminders</p>
        <p>Collections</p>
        <p>Settings</p>
      </nav>

      <button className="mt-auto bg-green-600 text-white py-2 rounded-lg">
        Add New Plant
      </button>
    </aside>
  );
};

const WelcomeCard = () => {
  return (
    <div className="bg-green-700 text-white p-8 rounded-2xl mb-6">
      <h1 className="text-3xl font-bold mb-2">
        Welcome back, Alex.
      </h1>

      <p className="opacity-90 text-sm">
        Your indoor jungle is thriving. You have 3 plants that need attention today and 2 new species added this week.
      </p>

      <div className="flex gap-4 mt-4">
        <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
          3 pending tasks
        </span>
        <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
          perfect conditions
        </span>
      </div>
    </div>
  );
};

const UserPage = () => {
  const { plannedPlants = [] } = useContext(AppContext);

  const collections = [
    {
      id: 1,
      name: "Swiss Cheese Plant",
      species: "Monstera deliciosa",
      location: "Living Room",
      image: "https://images.unsplash.com/photo-1600411833111-d8f2c6b5b9c4"
    },
    {
      id: 2,
      name: "Snake Plant",
      species: "Sansevieria trifasciata",
      location: "Bedroom",
      image: "https://images.unsplash.com/photo-1593482892290-f54927ae6c8f"
    }
  ];

  const reminders = useMemo(() => {
    if (!plannedPlants.length) return [];

    return plannedPlants.map((plantId) => {
      const plant = collections.find((p) => p.id === plantId);

      return {
        id: plantId,
        task: plant ? `Cuidar ${plant.name}` : "Cuidado de planta",
        time: "Sin fecha asignada"
      };
    });
  }, [plannedPlants]);

  return (
    <div className="flex min-h-screen bg-[#f0eee0]">

      <Sidebar />

      <main className="flex-1 p-8">

        <WelcomeCard />

        <div className="grid grid-cols-12 gap-8">

          <section className="col-span-8 grid grid-cols-2 gap-6">
            {collections.map((plant) => (
              <Cards key={plant.id} plant={plant} />
            ))}
          </section>

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

        </div>

      </main>
    </div>
  );
};

export default UserPage;