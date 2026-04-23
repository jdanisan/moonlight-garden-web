import { useContext, useState } from "react";
import { NavBar } from "../templates/NavBar";
import { ProductsList } from "../organism/ProductList";
import { Filters } from "../organism/Filters";
import Slider from "../atoms/Slider";
import { GoTopBTN } from "../atoms/GoTopBTN";
import "../../index.css";

export default function HomePage() {
  return (
    <>
      <div className="flex items-center justify-center pt-20">
        {/* //TODO:Inspect how to make justify correctly */}
        <div className="w-2/3 max-w-lg aspect-video bg-black flex">
          <Slider />
        </div>
      </div>

      <div id="productosDestacados"className="p-5">
        {/* \//TODO: tarjetas báscias sobre los productos, obtenidos de Firebase que sigue con la base de datos de la app pública
         \//TODO: añadir funcionalidad para que esto sea automatico; es decir, que dependa del numero de pulsaciones en el boton lo plantaré en el modal  */}
        <h2 className="text-2xl font-bold text-green-900 mb-6">Featured Products</h2>
        <ProductsList  titleSection="Featured Products"/>
      </div>

      <div id="productosRecomendados" className="p-5">
        <h2 className="text-2xl font-bold text-green-900 mb-6">Recommendations</h2>
        <Filters type="recommendations"/>
        <ProductsList   />
      </div>
      <GoTopBTN />
    </>
  );
}

{
  /* <Image src={img} alt="Rick & Morty" />
      </div>
      <div className="w-2/3 h-52.5 border-4 border-blue-900 p-5 m-auto rounded-xl block justify-center font-bold text-blue-900">
        <p>
          The series follows the bizarre misadventures of the brilliant but
          reckless scientist Rick Sanchez and his easily influenced grandson
          Morty, as they navigate domestic life while embarking on chaotic
          adventures across space and other dimensions
        </p>
        <p>Do you want to know more?</p> */
}
