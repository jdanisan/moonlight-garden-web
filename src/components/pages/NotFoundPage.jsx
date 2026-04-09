import { useContext, useState } from "react";
import { NavBar } from "../templates/NavBar";
import { Image } from "../atoms/Image";
import img from "../../assets/rick-and-morty.jpg";

export default function NotFoundPage() {
  return (
    <>
      <Image src={img} alt="Rick & Morty" />

      <footer>That's all, folks</footer>
    </>
  );
}
