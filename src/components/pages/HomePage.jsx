import { useContext, useState } from "react";
import { NavBar } from "../templates/NavBar";
import { Image } from "../atoms/Image";
import img from "../../assets/rick-and-morty.jpg";
import "../../index.css";

export default function HomePage() {
  return (
    <>
      <div className="flex justify-center p-5 h-160">
        <Image src={img} alt="Rick & Morty" />
      </div>
      <div className="w-2/3 h-52.5 border-4 border-blue-900 p-5 m-auto rounded-xl block justify-center font-bold text-blue-900">
        <p>
          The series follows the bizarre misadventures of the brilliant but
          reckless scientist Rick Sanchez and his easily influenced grandson
          Morty, as they navigate domestic life while embarking on chaotic
          adventures across space and other dimensions
        </p>
        <p>Do you want to know more?</p>
      </div>
    </>
  );
}
