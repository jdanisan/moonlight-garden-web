import { useContext, useState } from "react";
import { NavBar } from "../templates/NavBar";
import { ProductList } from "../organism/ProductList";
import "../../index.css";
import { GoTopBTN } from "../atoms/GoTopBTN";

export default function DocumentationPage() {
  return (
      <>
        <h1 className="flex items-center justify-center mt-8 font-['Segoe_UI','Arial','sans-serif']  font-bold sm:text-4xl text-2xl m-2.5">
          Documentación
        </h1>
        <div className="w-11/12 p-5 bg-white m-auto rounded-xl grid gap-4 text-black">
         
        </div>
  
        <GoTopBTN />
      </>
    );
  }
