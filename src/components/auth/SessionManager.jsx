import { useSessionTimer } from "../hook/useSessionTimer";

export const SessionManager = ({ children }) => {
  useSessionTimer(10); // 10 minutos de inactividad
  return children;
};