import { Favorite } from "../atoms/Favorite";
import { Button } from "../atoms/Button";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const VARIANTS = {
  default: "",
  horizontal: "flex-row",
  modal: "flex-col md:flex-row",
};
export function Cards({ product, variant = "default" }) {
  if (!product) return null;

  const { openModal } = useContext(AppContext);

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col relative">
      
      {/* Imagen */}
      <img
        src={product.food_image_url}
        alt={product.food_name}
        className="h-44 w-full object-cover"
      />

      {/* Contenido */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        
        <h3 className="font-semibold text-center text-gray-800">
          {product.food_name}
        </h3>

        {product.category && (
          <p className="text-sm text-gray-500 text-center">
            {product.category}
          </p>
        )}

        {product.price && (
          <p className="text-sm font-medium text-center text-green-800">
            {product.price}€
          </p>
        )}

        {/* Botón alineado abajo */}
        <div className="mt-auto">
          <button
            onClick={() => openModal("product", product)}
            className="w-full bg-green-900 text-white py-2 rounded-full text-sm hover:bg-green-800 transition"
          >
            Ver producto →
          </button>
        </div>

      </div>

      {/* Favorito */}
      <div className="absolute top-3 right-3">
        <Favorite idProduct={product.id} />
      </div>

    </div>
  );
}