import { useContext, useState } from "react";
import { NavBar } from "../templates/NavBar";
import { Image } from "../atoms/Image";
import img from "../../assets/rick-and-morty.jpg";
import "../../index.css";

export default function HomePage() {
  return (
    <>
      <div className="front-seasson">
        <Image src={img} alt="Rick & Morty" />
      </div>
      <div className="content">
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
