import { useContext, useMemo, useState } from "react";
import { AppContext } from "../context/AppContext";
import { GoTopBTN } from "../atoms/GoTopBTN";
import CalendarView from "../molecules/CalendarView";
import { ProductList } from "../organism/ProductList";

const getSeason = () => {
  const date = new Date();
  const month = date.getMonth(); // 0-11
  const day = date.getDate();

  // Primavera: 20 de marzo hasta 20 de junio
  if ((month === 2 && day >= 20) || month === 3 || month === 4 || (month === 5 && day <= 20)) {
    return "primavera";
  }
  // Verano: 21 de junio hasta 21 de septiembre
  if ((month === 5 && day >= 21) || month === 6 || month === 7 || (month === 8 && day <= 21)) {
    return "verano";
  }
  // Otoño: 22 de septiembre hasta 20 de diciembre
  if ((month === 8 && day >= 22) || month === 9 || month === 10 || (month === 11 && day <= 20)) {
    return "otoño";
  }
  // Invierno: Resto del año
  return "invierno";
};



export default function CalendarPage() {
  const { filters, setFilters } = useContext(AppContext);
  const { plannedPlants } = useContext(AppContext);

  const [selectedMoonPhase, setSelectedMoonPhase] = useState(null);

  const currentSeason = getSeason();

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