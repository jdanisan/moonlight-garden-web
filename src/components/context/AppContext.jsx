import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();
const API_BASE = "https://rickandmortyapi.com/api";

export const ContextProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [locations, setLocations] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [nextIndex, setNextIndex] = useState(50);
  const [loading, setLoading] = useState(false);

  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [genderOptions, setGenderOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);

  const [filters, setFilters] = useState({
    species: "",
    status: "",
    gender: "",
    type: "",
  });

  // ---------------- FETCH ITEMS ----------------
  const fetchItems = async (item) => {
    if (!item) return;

    setLoading(true);
    let url = `${API_BASE}/${item}`;
    const allElements = [];

    try {
      while (url) {
        const res = await fetch(url);
        const data = await res.json();

        allElements.push(...data.results);
        url = data.info.next;
      }

      if (item === "character") setCharacters(allElements);
      if (item === "location") setLocations(allElements);
      if (item === "episode") setEpisodes(allElements);
    } catch (err) {
      console.error(`Error fetching ${item}:`, err);
    } finally {
      setLoading(false);
    }

    setNextIndex(50);
  };

  // ---------------- FETCH FILTERS ----------------
  const fetchAllFilters = async (item) => {
    if (!item) return;

    let url = `${API_BASE}/${item}`;

    const speciesSet = new Set();
    const statusSet = new Set();
    const genderSet = new Set();
    const typeSet = new Set();

    try {
      while (url) {
        const res = await fetch(url);
        const data = await res.json();

        data.results.forEach((c) => {
          if (item === "character") {
            speciesSet.add(c.species);
            statusSet.add(c.status);
            genderSet.add(c.gender);
          }

          if (item === "location") {
            typeSet.add(c.type);
          }
        });

        url = data.info.next;
      }

      if (item === "character") {
        setSpeciesOptions(
          [...speciesSet].map((s) => ({
            value: s,
            label: s.toUpperCase(),
          })),
        );

        setStatusOptions(
          [...statusSet].map((s) => ({
            value: s,
            label: s.toUpperCase(),
          })),
        );

        setGenderOptions(
          [...genderSet].map((g) => ({
            value: g,
            label: g.toUpperCase(),
          })),
        );
      }

      if (item === "location") {
        setLocationOptions(
          [...typeSet].filter(Boolean).map((t) => ({
            value: t,
            label: t.toUpperCase(),
          })),
        );
      }
    } catch (err) {
      console.error("Error fetching filters:", err);
    }
  };

  // ---------------- EFFECT ----------------
  useEffect(() => {
    fetchItems("character");
    fetchItems("location");
    fetchItems("episode");

    fetchAllFilters("character");
    fetchAllFilters("location");
  }, []);
  const filteredLocations = locations.filter((loc) => {
    return !filters.type || loc.type === filters.type;
  });
  return (
    <AppContext.Provider
      value={{
        characters,
        locations: filteredLocations,
        episodes,
        speciesOptions,
        statusOptions,
        genderOptions,
        locationOptions,
        loading,
        filters,
        setFilters,
        loadMore: () => setNextIndex((prev) => prev + 50),
        nextIndex,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
