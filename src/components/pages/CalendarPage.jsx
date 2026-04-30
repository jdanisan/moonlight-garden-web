import { useContext, useMemo, useState } from "react";
import { AppContext } from "../context/AppContext";
import { GoTopBTN } from "../atoms/GoTopBTN";
import CalendarView from "../molecules/CalendarView";
import { ProductList } from "../organism/ProductList";

const getSeason = (month) => {
  if ([2, 3, 4].includes(month)) return "primavera";
  if ([5, 6, 7].includes(month)) return "verano";
  if ([8, 9, 10].includes(month)) return "otoño";
  return "invierno";
};



export default function CalendarPage() {
  const { filters, setFilters } = useContext(AppContext);
  const { plannedPlants } = useContext(AppContext);

  const [selectedMoonPhase, setSelectedMoonPhase] = useState(null);

  const currentSeason = getSeason(new Date().getMonth());

  const handleMoonPhaseChange = (phase) => {
    setSelectedMoonPhase(phase);
  };
  const handleMoonClick = (phase) => {
    setFilters((prev) => ({
      ...prev,
      moonPhase: phase, 
    }));
  };

  const enhancedFilters = useMemo(() => {
    return {
      ...filters,
      moonPhase: selectedMoonPhase,
      season: currentSeason,
    };
  }, [filters, selectedMoonPhase, currentSeason]);

  return (
    <>
      <h1 className="flex items-center justify-center mt-8 font-['Segoe_UI','Arial','sans-serif']  font-bold sm:text-4xl text-2xl m-2.5">
        Calendario lunar y siembra
      </h1>

      <CalendarView onMoonPhaseChange={handleMoonClick} />

      <ProductList filters={enhancedFilters} variant="garden" />

      <GoTopBTN />
    </>
  );
}