export function Footer() {
  return (
    <footer className="bg-primary-900 border-t border-green-900/10 text-primary-300 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h3 className="text-primary-300 font-bold text-lg">
            MoonLight Garden
          </h3>
          <p className="text-sm text-primary-300 mt-2">
            Una forma de conectar a quienes cultivan la tierra —en el campo, en casa o en la terraza— con quienes valoran lo que ella produce
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2 text-sm text-primary-300">
          <a className="hover:opacity-70" href="/">Inicio</a>
          <a className="hover:opacity-70"href="/documentation">Documentación</a>
          <a className="hover:opacity-70"href="/statistics">Estadísticas</a>
          <a className="hover:opacity-70" href="/search">Búsqueda</a>
          <a className="hover:opacity-70"href="/calendar">Calendario</a>
          <a className="hover:opacity-70" href="/forum">Foro</a>
        </div>

        {/* Contacto */}
        <div className="text-sm text-primary-300">
          <p className="font-semibold">Contacto</p>
          <p className="mt-2">moonlight.garden0000@gmail.com</p>
          <p>+34 600 000 000</p>
        </div>

      </div>

      <div className="text-center text-xstext-primary-300 py-4 border-t border-primary-600/10">
        © {new Date().getFullYear()} Moonlight Garden. Todos los derechos reservados.
      </div>
    </footer>
  );
}