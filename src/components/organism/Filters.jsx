import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { InputLabel } from "../molecules/InputLabel";
import DualRangeSlider from "./DualRangeSlider";
import { useState } from "react";
import {
  Search,
  Bell,
  User,
  BookOpen,
  Clock,
  ChevronRight,
  Mail,
  Globe,
  Share2,
} from "lucide-react";

export function Filters({
  filters = {},
  handleChange,
  options = {},
  filterType = "recommendations",
  resetFilters,
  setFilters,
  selectedCategory,
  setSelectedCategory,
}) {
  //Categorias en documentation
  const categories = [
    "Propagación",
    "Plagas y Enfermedades",
    "Ciencia del suelo",
    "Riego",
    "Luz",
  ];

  // Opciones de duración (semanas)
  const durationOptions = [
    { label: "1 semana", value: "1" },
    { label: "2 semanas", value: "2" },
    { label: "3 semanas", value: "3" },
    { label: "4 semanas", value: "4" },
    { label: "5 semanas", value: "5" },
    { label: "6 semanas", value: "6" },
    { label: "7 semanas", value: "7" },
    { label: "8 semanas", value: "8" },
    { label: "9 semanas", value: "9" },
    { label: "10 semanas", value: "10" },
    { label: "11 semanas", value: "11" },
    { label: "12 semanas", value: "12" },
    { label: "13 semanas", value: "13" },
    { label: "14 semanas", value: "14" },
    { label: "+14 semanas", value: "+14" },
  ];

  const handleAtentionChange = ({ min, max }) => {
    setFilters((prev) => ({
      ...prev,
      atentionLvl: { min, max },
    }));
  };

  return (
    <section className="w-full max-w-5xl mx-auto p-6 mb-2.5 flex flex-wrap gap-6 justify-center items-center bg-primary-500 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.4)] text-accent-600 md:w-3/4">
      <form className="flex flex-wrap gap-6 justify-center items-center">
        {/* =========================
            RECOMMENDATIONS
        ========================== */}
        {filterType === "recommendations" && (
          <>
            {/* RANGE: atención */}
            <div className="flex flex-col items-center gap-2 w-full">
              <DualRangeSlider
                initialMin={filters.atentionLvl?.min ?? 1}
                initialMax={filters.atentionLvl?.max ?? 10}
                onChange={handleAtentionChange}
              />
            </div>

            {/* MAX DURATION */}
            <InputLabel
              label="Espera máxima"
              type="select"
              name="maxDuration"
              value={filters.maxDuration || ""}
              onChange={handleChange}
              placeholder="Selecciona nº semanas"
              options={durationOptions}
            />

            {/* TYPE PRODUCT */}
            <InputLabel
              label="Tipo de producto"
              type="select"
              name="typeProduct"
              value={filters.typeProduct || ""}
              onChange={handleChange}
              placeholder="Selecciona un tipo"
              options={[
                { label: "Hortaliza", value: "hortaliza" },
                { label: "Fruta", value: "fruta" },
              ]}
            />
            {/* =========================
                        RESET
            ========================== */}
            <Button
              label="Reset filters"
              type="button"
              variant="removeFilters"
              onClick={resetFilters}
            />
          </>
        )}
        {/* =========================
            STATISTICS
        ========================== */}
        {filterType === "statistics" && (
          <>
            <InputLabel
              label="Periodo"
              type="select"
              name="period"
              value={filters.period || "week"}
              onChange={handleChange}
              placeholder="Selecciona periodo"
              options={[
                { label: "Semana", value: "week" },
                { label: "Mes", value: "month" },
                { label: "Año", value: "year" },
              ]}
            />

            <InputLabel
              label="Agrupar por"
              type="select"
              name="groupBy"
              value={filters.groupBy || "day"}
              onChange={handleChange}
              placeholder="Agrupación"
              options={[
                { label: "Día", value: "day" },
                { label: "Semana", value: "week" },
                { label: "Mes", value: "month" },
              ]}
            />
            {/* =========================
                        RESET
            ========================== */}
            <Button
              label="Reset filters"
              type="button"
              variant="removeFilters"
              onClick={resetFilters}
            />
          </>
        )}
        {/* =========================
            DENEGATE LOCATION
        ========================== */}
        {filterType === "denegateLocation" && (
          <>
            <Input
              label="Ciudad"
              id="city"
              name="city"
              value={filters.city || ""}
              onChange={handleChange}
              list="cities"
            />

            <datalist id="cities">
              <option value="Madrid" />
              <option value="Barcelona" />
              <option value="Valencia" />
              <option value="Sevilla" />
            </datalist>
          </>
        )}

        {/* =========================
           Categories
        ========================== */}
        {filterType === "categoriesBlog" && (
          <div className="flex w-full flex-wrap gap-3 sm:justify-between border-b border-[#c8d5b9] pb-4">
            <nav className="flex flex-col lg:flex-row w-full gap-3 md:gap-5 text-sm font-bold text-[#4a7c59]/60">
              {/* TODOS */}
              <button
                type="button"
                onClick={() => setSelectedCategory("Todos")}
                className={`whitespace-nowrap transition-colors hover:text-[#4a7c59] ${selectedCategory === "Todos" ? "text-[#4a7c59]" : ""
                  }`}
              >
                Todos los artículos
              </button>

              {/* CATEGORÍAS */}
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap transition-colors hover:text-[#4a7c59] ${selectedCategory === cat ? "text-[#4a7c59]" : ""
                    }`}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </div>
        )}
        {/* =========================
           Search Categories
        ========================== */}
        {filterType === "categoriesSearch" && (
          <div className="flex flex-col gap-3">
            <span className="text-white/80 text-sm font-medium ml-1">
              Tipo de producto
            </span>

            <div className="flex flex-wrap gap-2">
              {[
                { label: "Todo", value: "" },
                { label: "Hortaliza", value: "hortaliza" },
                { label: "Fruta", value: "fruta" },
              ].map((option) => {
                const isActive = filters.typeProduct === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      // Simulamos el evento de onChange para no romper tu lógica actual
                      handleChange({
                        target: { name: "typeProduct", value: option.value }
                      });
                    }}
                    className={`
              px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-200
              ${isActive
                        ? "bg-white text-[#4a7c59] shadow-md"
                        : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/10"
                      }
            `}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </form>
    </section>
  );
}
