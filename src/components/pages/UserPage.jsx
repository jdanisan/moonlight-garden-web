import React, { useContext, useState, useEffect, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import Sidebar from "../organism/Sidebar";
import MyJungle from "../organism/MyJungle";
import RemindersPanel from "../organism/RemindersPanel";
import WelcomeCard from "../molecules/WelcomeCard";
import { useAuth } from "../hook/useAuth";
import { db } from "../../services/firebase";
import { ref, onValue } from "firebase/database";

const UserPage = () => {
  const { plannedPlants = [], plants = [] } = useContext(AppContext);
  const { user } = useAuth();
  
  const [activeSection, setActiveSection] = useState("Mi Jungla");
  const [fbReminders, setFbReminders] = useState([]);

  const plannedPlantsWithSeason = useMemo(() => {
    if (!plants.length) return [];
    const currentMonth = new Date().getMonth();
    
    return plants
      .filter(p => plannedPlants.includes(p.id))
      .map(p => ({
        ...p,
        isAtSeason: p.plantingSeason?.includes(currentMonth) || false
      }));
  }, [plannedPlants, plants]);

  useEffect(() => {
    if (!user?.uid) return;

    const remindersRef = ref(db, `users/${user.uid}/remmindersItem`);
    const unsubscribe = onValue(remindersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).sort((a, b) => new Date(a.date) - new Date(b.date));
        setFbReminders(list);
      } else {
        setFbReminders([]);
      }
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="flex min-h-screen bg-[#f0eee0]">
      <div className="hidden lg:flex">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      </div>

      <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto overflow-x-hidden">
        <WelcomeCard />

        <header className="mb-8 mt-6">
          <h1 className={`
            text-3xl md:text-4xl font-black text-green-950 transition-all duration-500
            ${activeSection !== "Configuración" ? "lg:drop-shadow-lg lg:scale-[1.02] lg:origin-left" : "lg:opacity-40"}
          `}>
            {activeSection === "Recordatorios" ? "Tareas de cultivo" : "Mi jungla personal"}
          </h1>
          <div className="h-1.5 w-20 lg:w-24 bg-green-600 rounded-full mt-2" />
        </header>

        <div className="grid grid-cols-12 gap-6 lg:gap-10">
          
          <section className={`
            col-span-12 md:col-span-6 lg:col-span-8 transition-all duration-500
            ${activeSection === "Mi Jungla" 
              ? "opacity-100 scale-100" 
              : "lg:opacity-20 lg:grayscale-[50%] lg:scale-[0.95] lg:pointer-events-none"}
          `}>
            <MyJungle plannedIds={plannedPlants} />
          </section>

          <section className={`
            col-span-12 md:col-span-6 lg:col-span-4 transition-all duration-500
            ${activeSection === "Recordatorios" 
              ? "opacity-100 lg:scale-105" 
              : "opacity-100 lg:opacity-30 lg:scale-100"}
          `}>
            <div className={`
              rounded-3xl transition-all duration-500
              ${activeSection === "Recordatorios" ? "lg:bg-white/30 lg:p-6 lg:shadow-2xl lg:backdrop-blur-md lg:ring-1 lg:ring-black/5" : ""}
            `}>
              <RemindersPanel reminders={fbReminders} />
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default UserPage;