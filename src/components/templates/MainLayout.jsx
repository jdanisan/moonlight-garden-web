import { NavBar } from "./NavBar";

export function MainLayout({ children }) {
  return (
    <>
      <NavBar />
      <main>
        {children}  
      </main>
      <footer>That's all, folks</footer>
    </>
  );
}