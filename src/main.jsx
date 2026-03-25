import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Cards } from "./components/molecules/Cards.jsx";
// import { FiltersCharacter } from "../src/components/organism/FiltersCharacter.jsx";
import { GoTopBTN } from "./components/atoms/GoTopBTN.jsx";
import { Favorite } from "./components/atoms/Favorite.jsx";
import { NavBar } from "./components/organism/NavBar.jsx";
import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";
// import App from './App.jsx'

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <div className="cards">
    {/* //TODO: Function to call the API and get the Information */}
  <Cards character={1}/>
    {/* <Favorite idCharacter={1}/> */}
    {/* <FiltersCharacter />
    <NavBar />
    <GoTopBTN /> */}
  </div>
);
