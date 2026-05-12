import React, { useEffect, useState, useMemo } from "react";
import { db } from "../../services/firebase";
import { ref, onValue } from "firebase/database";
import { Cards } from "../molecules/Cards";

const MyJungle = ({ plannedIds = [] }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productsRef = ref(db, "/food");
    const unsubscribe = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formatted = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setAllProducts(formatted);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const currentSeasonName = useMemo(() => {
    const month = new Date().getMonth(); 

    if (month >= 2 && month <= 4) return "Primavera";
    if (month >= 5 && month <= 7) return "Verano";    
    if (month >= 8 && month <= 10) return "Otoño";  
    return "Invierno";                               
  }, []);

  const myPlannedPlants = useMemo(() => {
    if (!allProducts.length || !plannedIds.length) return [];

    return allProducts.filter((product) => plannedIds.includes(product.id));
  }, [allProducts, plannedIds]);

  if (loading) {
    return (
      <div className="p-10 text-center text-emerald-800 animate-pulse font-medium">
        🌿 Preparando tu huerto...
      </div>
    );
  }

  if (myPlannedPlants.length === 0) {
    return (
      <div className="p-12 border-2 border-dashed border-emerald-200 rounded-3xl text-center bg-white/40 shadow-inner">
        <div className="text-4xl mb-4">🌱</div>
        <p className="text-emerald-900 font-bold text-lg">Tu jungla está vacía</p>
        <p className="text-emerald-700/60 text-sm mt-1">
          Aún no has sembrado nada. Ve al mercado y elige tus plantas favoritas.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 transition-all">
      {myPlannedPlants.map((product) => (
        <Cards
          key={product.id}
          product={product}
          variant="garden"
          season={currentSeasonName}
        />
      ))}
    </div>
  );
};

export default MyJungle;