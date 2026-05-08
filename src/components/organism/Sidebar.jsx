import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useAuth } from "../hook/useAuth";

const Sidebar = () => {
  const { openModal } = useContext(AppContext);
  const { logout } = useAuth();

  const menuItems = [
    { name: "My Jungle", icon: "🌿" },
    { name: "Reminders", icon: "⏰" },
    { name: "Collections", icon: "📚" },
    { name: "Settings", icon: "⚙️" },
  ];

  return (
    <aside className="w-64 bg-[#e9e6d8] p-6 flex flex-col h-screen sticky top-0 border-r border-gray-200/50">
      <div className="flex items-center gap-2 mb-10">
        <h2 className="font-bold text-2xl text-green-900 tracking-tight">MoonLight</h2>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-3 p-3 rounded-xl text-green-800 hover:bg-white/50 cursor-pointer transition-all font-medium text-sm group"
          >
            <span className="text-lg">{item.icon}</span>
            {item.name}
          </div>
        ))}
      </nav>

      <div className="mt-auto space-y-4">
        <button 
          onClick={() => openModal("plant-search")}
          className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-bold shadow-lg shadow-green-900/20 transition-all active:scale-95"
        >
          + Add New Plant
        </button>

        <button 
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 text-red-600 py-2 text-sm font-semibold hover:bg-red-50 rounded-lg transition-colors"
        >
          <span>🚪</span>
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;