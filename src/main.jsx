import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { Cards } from "./components/molecules/Cards.jsx";
// import { FiltersCharacter } from "../src/components/organism/FiltersCharacter.jsx";
// import { GoTopBTN } from "./components/atoms/GoTopBTN.jsx";
// import { Favorite } from "./components/atoms/Favorite.jsx";
// import { NavBar } from "./components/organism/NavBar.jsx";
import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";
import CharactersPage from "./components/pages/CharactersPage";
// import App from './App.jsx'

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <CharactersPage/>
  
  
  // <div className="cards">
  //   {/* <NavBar /> */}
  //   {/* <FiltersCharacter type={1}/> */}
  //   {/* //TODO: Function to call the API and get the Information */}
  //   <Cards character={1} />
    

  //   {/* <GoTopBTN /> */}
  // </div>,
);
