import { createContext, useState, useEffect } from "react";
import { useAuth } from "../hook/useAuth";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [filters, setFilters] = useState({
    moonPhase: null,
    season: null,
  });
  return (
    <AppContext.Provider value={{ filters, setFilters }}>
      {children}
    </AppContext.Provider>
  );
}

export const ContextProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [locations, setLocations] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [nextIndex, setNextIndex] = useState(50);
  const [loading, setLoading] = useState(false);

  const [plannedPlants, setPlannedPlants] = useState([]);

  const onAddToPlanning = (plantId) => {
    setPlannedPlants((prev) => {
      if (prev.includes(plantId)) return prev;
      return [...prev, plantId];
    });
  };

  const { isLogged } = useAuth();
  const requireAuth = (callback) => {
    if (isLogged) {
      callback();
    } else {
      openModal("new-user");
    }
  };

  // ---------------- MODAL STATE ----------------
  const fetchCharacter = async (url) => {
    const res = await fetch(url);
    return res.json();
  };
  const [modalStack, setModalStack] = useState([]);
  const currentModal = modalStack[modalStack.length - 1];

  const allButtons = document.documentElement.querySelectorAll("Button");
  const allLinks = document.documentElement.querySelectorAll("a");

  const openModal = async (type, data) => {
    const scrollY = window.scrollY;

    const tempModal = {
      type,
      data: null,
      loading: true,
      scrollY,
    };

    setModalStack((prev) => {
      if (prev.length === 0) {
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = "100%";
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        allButtons.forEach((btn) => (btn.disabled = true));
        allLinks.forEach((a) => (a.style.pointerEvents = "none"));
      }

      return [...prev, tempModal];
    });

    let resolvedData = data;

    setModalStack((prev) =>
      prev.map((modal, index) =>
        index === prev.length - 1
          ? { ...modal, data: resolvedData, loading: false }
          : modal,
      ),
    );

  };

  const closeModal = () => {
    setModalStack((prev) => {
      if (prev.length === 0) return prev;

      const lastModal = prev[prev.length - 1];
      const newStack = prev.slice(0, -1);

      if (newStack.length === 0) {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";

        window.scrollTo(0, lastModal.scrollY);
      } else {
        const previousModal = newStack[newStack.length - 1];
        document.body.style.top = `-${previousModal.scrollY}px`;
      }

      return newStack;
    });
  };
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      allButtons.forEach((btn) => (btn.disabled = false));
      allLinks.forEach((a) => (a.style.pointerEvents = "auto"));
    };
  }, [modalStack]);

  return (
    <AppContext.Provider
      value={{
        loading,
        loadMore: () => setNextIndex((prev) => prev + 50),
        nextIndex,
        openModal,
        closeModal,
        currentModal,
        requireAuth,
        plannedPlants,
        onAddToPlanning,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
