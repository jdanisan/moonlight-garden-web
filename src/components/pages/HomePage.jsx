import { useState } from "react";
import { ProductList } from "../organism/ProductList";
import { Filters } from "../organism/Filters";
import VerdantSlider from "../atoms/VerdantSlider";
import {GoTopBTN} from "../atoms/GoTopBTN";

export default function HomePage() {
  const [filters, setFilters] = useState({
    atentionLvl: 5,
    maxDuration: "",
    typeProduct: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      atentionLvl: { min: 1, max: 10 },
      maxDuration: "",
      typeProduct: "",
    });
  };

  return (
    <>
      <div className="flex items-center justify-center pt-20">
        <VerdantSlider />
      </div>

      {/* ===================== */}
      {/* FEATURED (SIN FILTROS) */}
      {/* ===================== */}
      <div id="productosDestacados" className="p-5">
        <h2 className="text-2xl font-bold text-green-900 mb-6">
          Productos Destacados
        </h2>

        <ProductList />
      </div>

      {/* ===================== */}
      {/* RECOMENDACIONES (CON FILTROS) */}
      {/* ===================== */}
      <div id="productosRecomendados" className="p-5">
        <h2 className="text-2xl font-bold text-green-900 mb-6">
          Recomendaciones
        </h2>

        <Filters
          filterType="recommendations"
          filters={filters}
          setFilters={setFilters}
          handleChange={handleChange}
          resetFilters={resetFilters}
        />

        <ProductList filters={filters} />
      </div>
      <GoTopBTN/>
    </>
  );
}
