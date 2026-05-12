import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { AppRouter } from "./components/router/AppRouter";
import "./index.css";
import { ContextProvider } from "./components/context/AppContext";
import { SessionManager } from "./components/auth/SessionManager"; 

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <ContextProvider>
      <SessionManager>
        <AppRouter />
      </SessionManager>
    </ContextProvider>
  </StrictMode>
);