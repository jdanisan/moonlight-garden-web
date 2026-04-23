import { useContext, useState } from "react";
import { NavBar } from "../templates/NavBar";
import { Image } from "../atoms/Image";
import img from "../../assets/iconTFG.ico";

export default function NotFoundPage() {
  return (
    <>
      <h1 className="flex items-center justify-center font-['Segoe_UI','Arial','sans-serif']  font-bold text-4xl m-2.5">
        404 page not found
      </h1>
      <div className="flex justify-center p-5 h-full">
        <Image src={img} alt="MoonLightGardenLogo" />
      </div>
      <h3>Please return home</h3>
    </>
  );
}
