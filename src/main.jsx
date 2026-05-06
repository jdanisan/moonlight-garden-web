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

);
