import { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { ref, onValue } from "firebase/database";
import { Cards } from "../molecules/Cards";
export function ProductsList() {
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

  return (
    <section className="bg-[#f6f1e7] py-12">
      <div className="max-w-7xl mx-auto px-4">
        

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Cards key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}