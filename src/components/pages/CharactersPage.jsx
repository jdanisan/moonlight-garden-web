import { useContext, useState } from "react";
import { Filters } from "../organism/Filters";
import { Cards } from "../molecules/Cards";
import { GoTopBTN } from "../atoms/GoTopBTN";
import { CharactersContext } from "../context/CharactersContext";

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

  const filteredCharacters = allCharacters.filter((char) => {
    return (
      (!filters.species || char.species === filters.species) &&
      (!filters.status || char.status === filters.status) &&
      (!filters.gender || char.gender === filters.gender)
    );
  });

  const visibleCharacters = filteredCharacters.slice(0, nextIndex);

  return (
    <>
      <h1>Characters</h1>

      <Filters
        type="characters"
        filters={filters}
        handleChange={handleChange}
        options={{
          species: speciesOptions,
          status: statusOptions,
          gender: genderOptions,
        }}
      />

      <div className="cards">
        {visibleCharacters.map((char) => (
          <Cards key={char.id} character={char} />
        ))}
      </div>

      {visibleCharacters.length < filteredCharacters.length && (
        <button onClick={loadMore} disabled={loading}>
          {loading ? "Loading..." : "Load More"}
        </button>
      )}

      <GoTopBTN />
    </>
  );
}