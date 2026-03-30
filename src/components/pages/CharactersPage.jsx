import { useEffect, useState } from "react";
import { NavBar } from "../templates/NavBar";
import { Filters } from "../organism/Filters";
import { Cards } from "../molecules/Cards";
import { GoTopBTN } from "../atoms/GoTopBTN";

const API_URL = "https://rickandmortyapi.com/api/character";

export default function CharactersPage() {
  const [characters, setCharacters] = useState([]);
  const [nextPage, setNextPage] = useState(API_URL);
  const [loading, setLoading] = useState(false);
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [genderOptions, setGenderOptions] = useState([]);

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

  const fetchCharacters = async () => {
    if (!nextPage) return;
    setLoading(true);

    try {
      const res = await fetch(nextPage);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();

      setCharacters((prev) => [...prev, ...data.results]);
      setNextPage(data.info.next);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCharacters();
  }, []);
  useEffect(() => {
    if (characters.length === 0) return;

    // Species
    const species = [...new Set(characters.map((c) => c.species))].map((s) => ({
      value: s,
      label: s.toUpperCase(),
    }));
    setSpeciesOptions(species);

    // Status
    const status = [...new Set(characters.map((c) => c.status))].map((s) => ({
      value: s,
      label: s.toUpperCase(),
    }));
    setStatusOptions(status);

    // Gender
    const gender = [...new Set(characters.map((c) => c.gender))].map((g) => ({
      value: g,
      label: g.toUpperCase(),
    }));
    setGenderOptions(gender);
  }, [characters]);

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
