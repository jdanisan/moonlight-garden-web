import { useEffect, useState, useMemo } from "react";
import { db } from "../../services/firebase";
import { ref, onValue } from "firebase/database";
import { Cards } from "../molecules/Cards";

const parseMaxWeeks = (value) => {
  if (!value || value === "index") return null;
  if (value === "+14") return Infinity;
  return Number(value);
};

const getSystemSeason = () => {
  const month = new Date().getMonth();
  if ([2, 3, 4].includes(month)) return "primavera";
  if ([5, 6, 7].includes(month)) return "verano";
  if ([8, 9, 10].includes(month)) return "otoño";
  return "invierno";
};

export function ProductList({ filters = null }) {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);

  const currentSeason = useMemo(() => {
    return filters?.season || getSystemSeason();
  }, [filters?.season]);

  useEffect(() => {
    const productsRef = ref(db, "/food");
    const unsubscribe = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formatted = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setProducts(formatted);
      } else {
        setProducts([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (!filters) return true;

      const attentionMin = filters?.atentionLvl?.min ?? 0;
      const attentionMax = filters?.atentionLvl?.max ?? 10;
      const [minWeeks] = product.food_maturation || [];
      
      // Filtro por Fase Lunar
      const moonPhase = filters?.moonPhase;
      if (moonPhase && moonPhase !== "index" && product.food_moonPhase !== moonPhase) {
        return false;
      }

      // Filtro por Tipo (Fruta, Verdura, etc)
      const type = filters?.typeProduct;
      if (type && type !== "index" && product.food_type?.toLowerCase() !== type.toLowerCase()) {
        return false;
      }

      // Filtro por Duración
      const maxWeeks = parseMaxWeeks(filters?.maxDuration);
      if (maxWeeks !== null && minWeeks > maxWeeks) return false;

      // Filtro por Nivel de Atención
      if (product.food_atention < attentionMin || product.food_atention > attentionMax) {
        return false;
      }

      return true;
    });
  }, [products, filters]);

  const inSeasonProducts = filteredProducts.filter((p) =>
    p.food_season?.includes(currentSeason)
  );
  const outSeasonProducts = filteredProducts.filter((p) =>
    !p.food_season?.includes(currentSeason)
  );

  const displayedInSeason = inSeasonProducts.slice(0, visibleCount);
  const remainingCount = Math.max(0, visibleCount - displayedInSeason.length);
  const displayedOutSeason = outSeasonProducts.slice(0, remainingCount);

  return (
    <section className="bg-[#f6f1e7] py-8">
      <div className="max-w-6xl mx-auto px-4 space-y-12">

        {/* Sección En Temporada */}
        {displayedInSeason.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-6 text-emerald-900 border-b border-emerald-200 pb-2 flex justify-between items-center">
              <span>En temporada ({currentSeason}) 🌱</span>
              <span className="text-xs font-normal bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full uppercase tracking-wider">
                Recomendado
              </span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {displayedInSeason.map((product) => (
                <Cards 
                  key={product.id} 
                  product={product} 
                  season={currentSeason} 
                  variant="garden" 
                />
              ))}
            </div>
          </div>
        )}

        {/* Sección Fuera de Temporada */}
        {displayedOutSeason.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-400 border-b border-gray-200 pb-2">
              Fuera de temporada
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 opacity-60 grayscale-[30%]">
              {displayedOutSeason.map((product) => (
                <Cards 
                  key={product.id} 
                  product={product} 
                  season={currentSeason} 
                  variant="garden" 
                />
              ))}
            </div>
          </div>
        )}

        {/* Botón Cargar Más */}
        {visibleCount < filteredProducts.length && (
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setVisibleCount(prev => prev + 12)}
              className="bg-emerald-700 text-white px-8 py-3 rounded-xl font-medium hover:bg-emerald-800 transition-all shadow-md active:scale-95"
            >
              Ver más productos →
            </button>
          </div>
        )}

        {/* Estado Vacío */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-white/50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 font-medium">
              No hay productos específicos para la fase <span className="text-emerald-700">"{filters?.moonPhase}"</span>.
            </p>
            <p className="text-sm text-gray-400 mt-2">Prueba a seleccionar otro día en el calendario.</p>
          </div>
        )}
      </div>
    </section>
  );
}