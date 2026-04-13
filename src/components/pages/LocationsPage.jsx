import { useContext } from "react";
import { Filters } from "../organism/Filters";
import { AppContext } from "../context/AppContext";
import { List } from "../molecules/Lists";
import { GoTopBTN } from "../atoms/GoTopBTN";
import { LocationsList } from "../molecules/LocationList";

export default function LocationsPage() {
  const {
    locations,
    loading,
    filters,
    setFilters,
    locationOptions, 
  } = useContext(AppContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Filters
        filterType="locations"
        filters={filters}
        handleChange={handleChange}
        options={{
          type: locationOptions?.typeOptions || [],  
        }}
      />
      {/* //TODO: Add molecule list and render with the locations */}
      <LocationsList locations={locations}  ></LocationsList>
      <GoTopBTN />

    </>
  );
}