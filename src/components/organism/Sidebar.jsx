import React from "react";
import { useAuth } from "../hook/useAuth";

// Recibimos activeSection y setActiveSection desde UserPage.jsx
const Sidebar = ({ activeSection, setActiveSection }) => {
  const { logout } = useAuth();

  const menuItems = [
    { name: "Mi Jungla", icon: "🌿" },
    { name: "Recordatorios", icon: "⏰" },
    { name: "Configuración", icon: "⚙️" },
  ];

  return (
    <aside className="w-64 bg-[#e9e6d8] p-6 flex flex-col h-screen sticky top-0 border-r border-gray-200/50 transition-all">
      {/* Logo / Título */}
      <div className="flex items-center gap-2 mb-10">
        <h2 className="font-bold text-2xl text-green-900 tracking-tight">MoonLight</h2>
      </div>

      {/* Navegación */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          // Comparamos con la prop que viene del padre
          const isActive = activeSection === item.name;

          return (
            <div
              key={item.name}
              onClick={() => setActiveSection(item.name)} // Actualizamos el estado del padre
              className={`
                flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 font-medium text-sm group
                ${isActive 
                  ? "bg-white text-green-900 shadow-md translate-x-2" 
                  : "text-green-800 hover:bg-white/30 hover:translate-x-1"
                }
              `}
            >
              <span className={`text-lg transition-transform duration-300 ${isActive ? "scale-125" : "group-hover:scale-110"}`}>
                {item.icon}
              </span>
              
              <span className={isActive ? "font-bold" : ""}>
                {item.name}
              </span>
              
              {/* Indicador visual de foco (barra lateral derecha) */}
              {isActive && (
                <div className="ml-auto w-1.5 h-5 bg-green-600 rounded-full shadow-[0_0_8px_rgba(22,101,52,0.4)]" />
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer del Sidebar */}
      <div className="mt-auto pt-6 border-t border-green-900/5">
        <button 
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 text-red-600 py-3 text-sm font-bold hover:bg-red-50 rounded-xl transition-all active:scale-95"
        >
          <span>🚪</span>
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;