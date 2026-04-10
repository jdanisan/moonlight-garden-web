import { useContext } from "react";
import { Filters } from "../organism/Filters";
import { CharactersContext } from "../context/CharactersContext";

export default function LocationsPage() {
  const {
    filters,
    setFilters,
    options, 
  } = useContext(CharactersContext);

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
          type: options?.typeOptions || [],  
        }}
      />
      {/* //TODO: Add molecule list and render with the locations */}
    </>
  );
}