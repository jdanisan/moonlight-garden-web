import React, { useState, useEffect, useMemo } from "react";
import { Search, X, Leaf } from "lucide-react";
import clsx from "clsx";

export default function HeroSearch({
  title = "Grow your urban jungle.",
  placeholder = "Busca patatas, fresas, calabacín...",
  filters = {},
  onSearchChange,
  onTypeChange,
  categories: propCategories,
  totalResults = 0, // Nueva prop para dar feedback
}) {
  const categories = useMemo(
    () => propCategories || [
      { label: "Todo", value: "" },
      { label: "Huerto", value: "indoor" },
      { label: "Frutas", value: "outdoor" },
      { label: "Herramientas", value: "tools" },
      { label: "Semillas", value: "seeds" },
    ],
    [propCategories]
  );

  const [localSearch, setLocalSearch] = useState(filters.search || "");

  // Debounce optimizado
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (onSearchChange) onSearchChange(localSearch);
    }, 400); // 400ms es el "sweet spot" para escritura manual
    return () => clearTimeout(timeout);
  }, [localSearch, onSearchChange]);

  // Tags rápidos de búsqueda sugerida
  const quickTags = ["Patatas", "Calabacín", "Fresas", "Champiñones"];

  return (
    <section className="w-full bg-gradient-to-br from-[#5f8d77] to-[#4a7c59] py-16 px-4 rounded-b-[50px] shadow-2xl flex flex-col items-center justify-center text-center transition-all">
      
      {/* Título con Icono sutil */}
      <div className="flex items-center gap-3 mb-6">
        <Leaf className="text-white/40 w-8 h-8 rotate-12" />
        <h1 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight">
          {title}
        </h1>
      </div>

      {/* Input de Búsqueda */}
      <div className="relative w-full max-w-2xl group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <Search className={clsx(
            "h-5 w-5 transition-colors",
            localSearch ? "text-[#3a5a40]" : "text-gray-400"
          )} />
        </div>

        <input
          type="text"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="w-full py-5 pl-14 pr-14 rounded-2xl bg-white/95 backdrop-blur-sm text-gray-800 text-lg shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/20 transition-all placeholder:text-gray-400"
          placeholder={placeholder}
        />

        {localSearch && (
          <button
            onClick={() => setLocalSearch("")}
            className="absolute right-5 top-1/2 -translate-y-1/2 p-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        )}
      </div>

      {/* Sugerencias Rápidas (Especial para tu caso de uso) */}
      <div className="mt-4 flex gap-2 text-white/60 text-xs items-center">
        <span>Prueba con:</span>
        {quickTags.map(tag => (
          <button
            key={tag}
            onClick={() => setLocalSearch(tag.toLowerCase())}
            className="hover:text-white underline decoration-white/30 transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Feedback de resultados (Smooth) */}
      {localSearch && (
        <p className="mt-4 text-white/80 text-sm animate-pulse">
          Mostrando {totalResults} resultados para "{localSearch}"
        </p>
      )}

      {/* Categorías (Pills) */}
      <div className="flex flex-wrap justify-center gap-3 mt-10">
        {categories.map((option) => {
          const isActive = filters?.typeProduct === option.value;
          return (
            <button
              key={option.value}
              onClick={() => onTypeChange?.(option.value)}
              className={clsx(
                "px-7 py-2.5 rounded-full text-sm font-bold transition-all duration-300 transform",
                isActive
                  ? "bg-[#2d4a34] text-white shadow-inner scale-105"
                  : "bg-white/10 text-white hover:bg-white/25 border border-white/10 backdrop-blur-sm hover:-translate-y-1"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}