import React from "react";
import { useSessionTimer } from "../hook/useSessionTimer";

export const SessionManager = ({ children }) => {
  // Activamos el Timer (ejemplo: 5 minutos)
  useSessionTimer(5); 

  return <>{children}</>;
};