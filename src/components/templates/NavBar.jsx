import CharactersPage from "../pages/CharactersPage";

export function NavBar() {
  return (
    <header>
      <div className="nav-links">
        <a href="index.html">Home</a>
        <a href="/Ejercicio JS.pdf">Documentation</a>
        <a href="/statement.md">Statement</a>
        <a href="/locations.html">Locations</a>
        {/* //TODO: Investigar como se hacen este tipo de referencias */}
        <a href="<CharactersPage/>">Characters</a>
        <a href="/episodes.html">Episodes</a>
      </div>
      <img className="icon" id="icon-nav-bar" src="/img/icon-original.ico" />
    </header>
  );
}
