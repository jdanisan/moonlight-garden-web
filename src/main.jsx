import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { AppRouter } from "./components/router/AppRouter";
import "./index.css";
import { CharactersProvider } from "./components/context/CharactersContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <CharactersProvider>
      <AppRouter />
    </CharactersProvider>
  </StrictMode>
  //TODO: Make a context to englobe all the pages and get all the info{charcaters, locations}
  // When we have to call the residents we can browse by id from characters
  // <CharactersProvider>
  //   <CharactersPage/>
  // </CharactersProvider>
  
  //   {/* //TODO: Function to call the API and get the Information */}
);
