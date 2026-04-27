import { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { ref, onValue } from "firebase/database";
import { Cards } from "../molecules/Cards";

const parseMaxWeeks = (value) => {
  if (!value || value === "index") return null;
  if (value === "+14") return Infinity;
  return Number(value);
};

const getSeason = (month) => {
  if ([2, 3, 4].includes(month)) return "primavera";
  if ([5, 6, 7].includes(month)) return "verano";
  if ([8, 9, 10].includes(month)) return "otoño";
  return "invierno";
};

const season = getSeason(new Date().getMonth());

export function ProductList({ filters = null }) {
  const [products, setProducts] = useState([]);

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

  const filteredProducts = products.filter((product) => {
    if (!filters) return true;

    const attentionMin = filters?.atentionLvl?.min ?? 0;
    const attentionMax = filters?.atentionLvl?.max ?? 10;

    const [minWeeks] = product.food_maturation || [];

    const moonPhase = filters?.moonPhase;
    const type = filters?.typeProduct;

    if (
      moonPhase &&
      moonPhase !== "index" &&
      product.food_moonPhase !== moonPhase
    ) {
      return false;
    }

    if (
      type &&
      type !== "index" &&
      product.food_type.toLowerCase() !== type.toLowerCase()
    ) {
      return false;
    }

    const maxWeeks = parseMaxWeeks(filters?.maxDuration);
    if (maxWeeks !== null && minWeeks > maxWeeks) {
      return false;
    }

    if (
      product.food_atention < attentionMin ||
      product.food_atention > attentionMax
    ) {
      return false;
    }

    return true;
  });

  const inSeasonProducts = filteredProducts.filter((p) =>
    p.food_season?.includes(season)
  );

  const outSeasonProducts = filteredProducts.filter(
    (p) => !p.food_season?.includes(season)
  );

  return (
    <section className="bg-[#f6f1e7] py-8">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        <div>
          <h3 className="font-semibold mb-4">En temporada</h3>

          <div className="grid grid-cols-2 gap-4">
            {inSeasonProducts.map((product) => (
              <Cards
                key={product.id}
                product={product}
                season={season}
                variant="garden"
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-gray-500">
            Fuera de temporada
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {outSeasonProducts.map((product) => (
              <Cards
                key={product.id}
                product={product}
                season={season}
                variant="garden"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}