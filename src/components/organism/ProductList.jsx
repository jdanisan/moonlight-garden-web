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
  const date = new Date();
  const month = date.getMonth(); // 0-11
  const day = date.getDate();

  // Primavera: 20 de marzo hasta 20 de junio
  if ((month === 2 && day >= 20) || month === 3 || month === 4 || (month === 5 && day <= 20)) {
    return "primavera";
  }
  // Verano: 21 de junio hasta 21 de septiembre
  if ((month === 5 && day >= 21) || month === 6 || month === 7 || (month === 8 && day <= 21)) {
    return "verano";
  }
  // Otoño: 22 de septiembre hasta 20 de diciembre
  if ((month === 8 && day >= 22) || month === 9 || month === 10 || (month === 11 && day <= 20)) {
    return "otoño";
  }
  // Invierno: Resto del año
  return "invierno";
};

export function ProductList({ filters = null }) {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);

  const currentSeason = useMemo(() => {
    return filters?.season || getSystemSeason();
  }, [filters?.season]);

  // Suscripción a Firebase
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

  // Lógica de filtrado completa
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (!filters) return true;

      // 1. Filtro de Búsqueda por Texto
      const searchTerm = filters.search?.toLowerCase() || "";
      if (searchTerm && !product.food_name?.toLowerCase().includes(searchTerm)) {
        return false;
      }

      // 2. Filtro por Tipo de Producto
      const type = filters.typeProduct;
      if (type && type !== "" && product.food_type?.toLowerCase() !== type.toLowerCase()) {
        return false;
      }

      // 3. Filtro por Nivel de Atención (Slider)
      const attentionMin = filters.atentionLvl?.min ?? 1;
      const attentionMax = filters.atentionLvl?.max ?? 10;
      if (product.food_atention < attentionMin || product.food_atention > attentionMax) {
        return false;
      }

      // 4. Filtro por Duración Máxima
      const maxWeeks = parseMaxWeeks(filters.maxDuration);
      const [minWeeksInProduct] = product.food_maturation || [0];
      if (maxWeeks !== null && minWeeksInProduct > maxWeeks) {
        return false;
      }

      // 5. Filtro por Fase Lunar (si existe en tu app)
      const moonPhase = filters.moonPhase;
      if (moonPhase && moonPhase !== "index" && product.food_moonPhase !== moonPhase) {
        return false;
      }

      return true;
    });
  }, [products, filters]);

  // Clasificación por Temporada
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

        {/* SECCIÓN: EN TEMPORADA */}
        {displayedInSeason.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-6 text-emerald-900 border-b border-emerald-200 pb-2 flex justify-between items-center">
              <span>En temporada ({currentSeason}) 🌱</span>
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

        {/* SECCIÓN: FUERA DE TEMPORADA */}
        {displayedOutSeason.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-400 border-b border-gray-200 pb-2">
              Fuera de temporada
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 opacity-60 grayscale-30">
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

        {/* BOTÓN: CARGAR MÁS */}
        {visibleCount < filteredProducts.length && (
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setVisibleCount(prev => prev + 12)}
              className="bg-emerald-700 text-white px-8 py-3 rounded-xl font-medium hover:bg-emerald-800 transition-all shadow-md active:scale-95"
            >
              Ver más productos
            </button>
          </div>
        )}

        {/* ESTADO VACÍO */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-white/50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 font-medium">
              No se han encontrado productos con estos filtros.
            </p>
            <p className="text-sm text-gray-400 mt-2">Intenta ajustar los criterios de búsqueda.</p>
          </div>
        )}
      </div>
    </section>
  );
}