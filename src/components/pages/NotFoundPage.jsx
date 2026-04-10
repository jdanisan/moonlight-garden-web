import { useContext, useState } from "react";
import { NavBar } from "../templates/NavBar";
import { Image } from "../atoms/Image";
import img from "../../assets/rick-and-morty.jpg";

export default function NotFoundPage() {
  return (
    <>
      <h1>404 page not found</h1>
      <div className="front-seasson">
        <Image src={img} alt="Rick & Morty" />
      </div>
      <h3>Please return home</h3>
    </>
  );
}
