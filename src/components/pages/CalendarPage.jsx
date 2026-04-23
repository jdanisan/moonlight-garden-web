import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { GoTopBTN } from "../atoms/GoTopBTN";
import CalendarView from "../molecules/CalendarView";

export default function CalendarPage() {
  const { locations, loading, filters, setFilters, locationOptions } =
    useContext(AppContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <h1 className="flex items-center justify-center font-['Segoe_UI','Arial','sans-serif']  font-bold sm:text-4xl text-2xl m-2.5 mt-8">
        Calendario lunar y siembra
      </h1>
      <CalendarView/>
   
      <GoTopBTN />
    </>
  );
}
