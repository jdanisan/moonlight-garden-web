import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { AppRouter } from "./components/router/AppRouter";
import "./index.css";
import {ContextProvider} from "./components/context/AppContext";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode >
    <ContextProvider>
      <AppRouter />
    </ContextProvider>
  </StrictMode>
  //TODO: Make a context to englobe all the pages and get all the info{charcaters, locations}
  // When we have to call the residents we can browse by id from characters
  // <ContextProvider>
  //   <SearchPage/>
  // </ContextProvider>
  
  //   {/* //TODO: Function to call the API and get the Information */}
);
