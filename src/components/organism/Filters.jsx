import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { InputLabel } from "../molecules/InputLabel";
import DualRangeSlider from "./DualRangeSlider";
import { useState } from "react";

export function Filters({
  filters = {},
  handleChange,
  options = {},
  filterType = "recommendations",
  resetFilters,
  setFilters, 
}) {
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
    <section className="w-3/4 max-w-5xl mx-auto p-6 mb-2.5 flex flex-wrap gap-6 justify-center items-center bg-primary-500 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.4)] text-accent-600">
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
            RESET
        ========================== */}
        <Button
          label="Reset filters"
          type="button"
          variant="removeFilters"
          onClick={resetFilters}
        />
      </form>
    </section>
  );
}
