// src/context/CharactersContext.js
import { createContext, useState, useEffect } from "react";

export const CharactersContext = createContext();

export const CharactersProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [nextPage, setNextPage] = useState('https://rickandmortyapi.com/api/character');
  const [loading, setLoading] = useState(false);
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [genderOptions, setGenderOptions] = useState([]);

  const fetchCharacters = async () => {
    if (!nextPage) return;
    setLoading(true);
    try {
      const res = await fetch(nextPage);
      const data = await res.json();
      setCharacters(prev => [...prev, ...data.results]);
      setNextPage(data.info.next);

      const species = [...new Set([...characters, ...data.results].map(c => c.species))].map(s => ({ value: s, label: s.toUpperCase() }));
      setSpeciesOptions(species);
      const status = [...new Set([...characters, ...data.results].map(c => c.status))].map(s => ({ value: s, label: s.toUpperCase() }));
      setStatusOptions(status);
      const gender = [...new Set([...characters, ...data.results].map(c => c.gender))].map(g => ({ value: g, label: g.toUpperCase() }));
      setGenderOptions(gender);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <CharactersContext.Provider value={{
      characters,
      speciesOptions,
      statusOptions,
      genderOptions,
      fetchCharacters,
      loading,
      nextPage
    }}>
      {children}
    </CharactersContext.Provider>
  );
};