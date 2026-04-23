import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { InputLabel } from "../molecules/InputLabel";

export function Filters({
  filters = {},
  handleChange,
  options = {},
  filterType = "recommendations",
  resetFilters,
}) {
  // //TODO:Function onChange for make variant in the filters

  return (
    <section className="w-3/4 max-w-5xl mx-auto p-6 mb-2.5 flex flex-wrap gap-6 justify-center items-center bg-primary-500 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.4)] text-accent-600">
      <form className="flex flex-wrap gap-6 justify-center items-center">
        {/* =========================
            RECOMMENDATIONS
        ========================== */}
        {filterType === "recommendations" && (
          <>
            {/* RANGE: atención */}
            <div className="flex flex-col items-center gap-2">
              <label htmlFor="atentionLvl" className="text-sm font-bold">
                Nivel de atención: {filters.atentionLvl ?? 5}
              </label>

              <input
                type="range"
                id="atentionLvl"
                name="atentionLvl"
                min="0"
                max="10"
                step="1"
                value={filters.atentionLvl ?? 5}
                onChange={handleChange}
                className="w-40 accent-primary-700"
              />
            </div>

            {/* MAX DURATION */}
            <InputLabel
              label="Espera máxima"
              type="select"
              name="maxDuration"
              value={filters.maxDuration || "index"}
              onChange={handleChange}
              placeholder="Selecciona nº semanas"
              options={[
                { label: "1 semana", value: "1" },
                { label: "2 semanas", value: "2" },
                { label: "3 semanas", value: "3" },
                { label: "4 semanas", value: "4" },
                { label: "5 semanas", value: "5" },
                { label: "6 semanas", value: "6" },
              ]}
            />

            {/* TYPE PRODUCT */}
            <InputLabel
              label="Tipo de producto"
              type="select"
              name="typeProduct"
              value={filters.typeProduct || "index"}
              onChange={handleChange}
              placeholder="Selecciona un tipo"
              options={options.typeProduct || []}
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
            RESET (común)
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
