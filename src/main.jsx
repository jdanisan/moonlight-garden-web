import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";
import CharactersPage from "./components/pages/CharactersPage";
import { CharactersProvider } from "./components/context/CharactersContext";
// import App from './App.jsx'

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  //TODO: Make a context to englobe all the pages and get all the info{charcaters, locations}
  // When we have to call the residents we can browse by id from characters
  <CharactersProvider>
    <CharactersPage/>
  </CharactersProvider>
  
  //   {/* //TODO: Function to call the API and get the Information */}
);
