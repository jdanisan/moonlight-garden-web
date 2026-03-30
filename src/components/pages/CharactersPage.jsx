import { useContext, useState } from "react";
import { NavBar } from "../templates/NavBar";
import { Filters } from "../organism/Filters";
import { Cards } from "../molecules/Cards";
import { GoTopBTN } from "../atoms/GoTopBTN";
import{CharactersContext} from "../context/CharactersContext"

export default function CharactersPage() {
  const {
    characters,
    speciesOptions,
    statusOptions,
    genderOptions,
    fetchCharacters,
    loading,
    nextPage,
  } = useContext(CharactersContext);

  const [filters, setFilters] = useState({
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <NavBar />
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
        {characters.map((char) => (
          <Cards key={char.id} character={char} />
        ))}
      </div>

      {nextPage && (
        <button onClick={fetchCharacters} disabled={loading}>
          {loading ? "Loading..." : "Load More"}
        </button>
      )}

      <GoTopBTN />

      <footer>Footer</footer>
    </>
  );
}