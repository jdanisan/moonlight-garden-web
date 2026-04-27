// import { useContext, useState } from "react";
// import { NavBar } from "../templates/NavBar";
// import { ProductList } from "../organism/ProductList";
// import { Filters } from "../organism/Filters";
// import { GoTopBTN } from "../atoms/GoTopBTN";
// import "../../index.css";
// import VerdantSlider from "../atoms/VerdantSlider";

// export default function HomePage() {
//   const [filters, setFilters] = useState({
//     atentionLvl: 5,
//     maxDuration: "",
//     typeProduct: "",
//   });
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFilters((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const resetFilters = () => {
//     setFilters({
//       atentionLvl: 5,
//       maxDuration: "",
//       typeProduct: "",
//     });
//   };
//   return (
//     <>
//       <div className="flex items-center justify-center pt-20">
//         <VerdantSlider />
//       </div>

//       <div id="productosDestacados" className="p-5">
//         {/* \//TODO: tarjetas báscias sobre los productos, obtenidos de Firebase que sigue con la base de datos de la app pública
//          \//TODO: añadir funcionalidad para que esto sea automatico; es decir, que dependa del numero de pulsaciones en el boton lo plantaré en el modal  */}
//         <h2 className="text-2xl font-bold text-green-900 mb-6">
//           Featured Products
//         </h2>
//         <ProductList />
//       </div>

//       <div id="productosRecomendados" className="p-5">
//         <h2 className="text-2xl font-bold text-green-900 mb-6">
//           Recommendations
//         </h2>
//         <Filters
//           filterType="recommendations"
//           filters={filters}
//           handleChange={handleChange}
//           resetFilters={resetFilters}
//         />
//         <ProductList filters={Filters} />
//       </div>
//       <GoTopBTN />
//     </>
//   );
// }

// {
//   /* <Image src={img} alt="Rick & Morty" />
//       </div>
//       <div className="w-2/3 h-52.5 border-4 border-blue-900 p-5 m-auto rounded-xl block justify-center font-bold text-blue-900">
//         <p>
//           The series follows the bizarre misadventures of the brilliant but
//           reckless scientist Rick Sanchez and his easily influenced grandson
//           Morty, as they navigate domestic life while embarking on chaotic
//           adventures across space and other dimensions
//         </p>
//         <p>Do you want to know more?</p> */
// }

import { useState } from "react";
import { ProductList } from "../organism/ProductList";
import { Filters } from "../organism/Filters";
import VerdantSlider from "../atoms/VerdantSlider";

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
          Featured Products
        </h2>

        <ProductList />
      </div>

      {/* ===================== */}
      {/* RECOMENDACIONES (CON FILTROS) */}
      {/* ===================== */}
      <div id="productosRecomendados" className="p-5">
        <h2 className="text-2xl font-bold text-green-900 mb-6">
          Recommendations
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
    </>
  );
}
