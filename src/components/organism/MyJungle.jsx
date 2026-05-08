import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Cards } from "../molecules/Cards";

const MyJungle = ({ plannedIds }) => {
  // Asumiendo que 'allPlants' está en tu Contexto (la lista de Rick & Morty o de plantas real)
  const { allPlants = [] } = useContext(AppContext); 

  const myPlants = allPlants.filter(p => plannedIds.includes(p.id));

  if (myPlants.length === 0) {
    return (
      <div className="p-10 border-2 border-dashed border-gray-300 rounded-2xl text-center">
        <p className="text-gray-500 italic">Aún no has sembrado nada.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      {myPlants.map((plant) => (
        <Cards key={plant.id} plant={plant} />
      ))}
    </div>
  );
};

export default MyJungle;