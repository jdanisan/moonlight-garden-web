// MainLayout.jsx
import { NavBar } from "./NavBar";

export function MainLayout({ children }) {
  return (
    <>
      <NavBar />
      <main>
        {children}  {/* <- Esto es clave */}
      </main>
      <footer>That's all, folks</footer>
    </>
  );
}