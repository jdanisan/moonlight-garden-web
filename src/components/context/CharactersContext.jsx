import { createContext, useState, useEffect } from "react";

export const CharactersContext = createContext();

export const CharactersProvider = ({ children }) => {
  const [allCharacters, setAllCharacters] = useState([]);
  const [nextIndex, setNextIndex] = useState(50);
  const [loading, setLoading] = useState(false);

  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [genderOptions, setGenderOptions] = useState([]);

  const [filters, setFilters] = useState({
    species: "",
    status: "",
    gender: "",
  });

  const fetchCharacters = async () => {
    setLoading(true);
    let url = "https://rickandmortyapi.com/api/character";
    const allChars = [];

    try {
      while (url) {
        const res = await fetch(url);
        const data = await res.json();
        allChars.push(...data.results);
        url = data.info.next;
      }
      setAllCharacters(allChars);
      setNextIndex(50); 
    } catch (err) {
      console.error("Error fetching characters:", err);
      setAllCharacters([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => setNextIndex((prev) => prev + 50);

  const fetchAllFilters = async () => {
    let url = "https://rickandmortyapi.com/api/character";
    const speciesSet = new Set();
    const statusSet = new Set();
    const genderSet = new Set();

    try {
      while (url) {
        const res = await fetch(url);
        const data = await res.json();
        data.results.forEach((c) => {
          speciesSet.add(c.species);
          statusSet.add(c.status);
          genderSet.add(c.gender);
        });
        url = data.info.next;
      }

      setSpeciesOptions([...speciesSet].map((s) => ({ value: s, label: s.toUpperCase() })));
      setStatusOptions([...statusSet].map((s) => ({ value: s, label: s.toUpperCase() })));
      setGenderOptions([...genderSet].map((g) => ({ value: g, label: g.toUpperCase() })));
    } catch (err) {
      console.error("Error fetching filters:", err);
    }
  };

  useEffect(() => {
    fetchAllFilters();
    fetchCharacters();
  }, []);

  return (
    <CharactersContext.Provider
      value={{
        allCharacters,
        speciesOptions,
        statusOptions,
        genderOptions,
        loading,
        filters,
        setFilters,
        loadMore,
        nextIndex,
      }}
    >
      {children}
    </CharactersContext.Provider>
  );
};