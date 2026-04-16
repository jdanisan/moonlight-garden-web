import { useContext } from "react";
import { Filters } from "../organism/Filters";
import { AppContext } from "../context/AppContext";
import { GoTopBTN } from "../atoms/GoTopBTN";
import { LocationsList } from "../molecules/LocationList";

export default function LocationsPage() {
  const { locations, loading, filters, setFilters, locationOptions } =
    useContext(AppContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
  const handleResetFilters = () => {
    setFilters({
      species: "",
      status: "",
      gender: "",
      type: "",
    });
  };
  return (
    <>
    <h1>Stunning Locations</h1>
      <Filters
        filterType="locations"
        filters={filters}
        handleChange={handleChange}
        resetFilters={handleResetFilters} 
        options={{
          type: locationOptions || [],
        }}
      />
      <LocationsList locations={locations}></LocationsList>
      <GoTopBTN />
    </>
  );
}
