import { useContext, useState } from "react";
import { Filters } from "../organism/Filters";
import { Cards } from "../molecules/Cards";
import { GoTopBTN } from "../atoms/GoTopBTN";
import { CharactersContext } from "../context/CharactersContext";
import { Button } from "../atoms/Button";

const initialFilters = {
  name: "",
  species: "",
  status: "",
  gender: "",
  order: "",
};

export default function CharactersPage() {
  const {
    allCharacters,
    speciesOptions,
    statusOptions,
    genderOptions,
    loading,
    filters,
    setFilters,
    loadMore,
    nextIndex,
  } = useContext(CharactersContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredCharacters = allCharacters
    .filter((char) => {
      return (
        (!filters.name ||
          char.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (!filters.species || char.species === filters.species) &&
        (!filters.status || char.status === filters.status) &&
        (!filters.gender || char.gender === filters.gender)
      );
    })
    .sort((a, b) => {
      if (!filters.order) return 0;

      if (filters.order === "asc") {
        return a.name.localeCompare(b.name);
      }

      if (filters.order === "desc") {
        return b.name.localeCompare(a.name);
      }

      return 0;
    });

  const resetFilters = () => {
    setFilters(initialFilters);
  };
  const visibleCharacters = filteredCharacters.slice(0, nextIndex);

  return (
    <>
      <h1>Characters</h1>

      <Filters
        filterType="characters"
        filters={filters}
        handleChange={handleChange}
        resetFilters={resetFilters}
        options={{
          species: speciesOptions,
          status: statusOptions,
          gender: genderOptions,
          order: [
            { label: "Order A-Z", value: "asc" },
            { label: "Order Z-A", value: "desc" },
          ],
        }}
      />

      <div className="cards">
        {visibleCharacters.map((char) => (
          <Cards key={char.id} character={char} />
        ))}
      </div>

      {visibleCharacters.length < filteredCharacters.length && (
        <div className="center-load-div">
          <div className="center-button-load">
            <Button
              onClick={loadMore}
              disabled={loading}
              label={loading ? "Loading..." : "Load More"}
            />
          </div>
        </div>
      )}

      <GoTopBTN />
    </>
  );
}
