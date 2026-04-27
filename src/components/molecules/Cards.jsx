import { Favorite } from "../atoms/Favorite";
import { Button } from "../atoms/Button";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const VARIANTS = {
  default: "",
  horizontal: "flex-row",
  modal: "flex-col md:flex-row",
  garden: "",
};
export function Cards({ product, variant = "default", season }) {
  if (!product) return null;

  const { openModal } = useContext(AppContext);
  const isInSeason = (product, currentSeason) => {
    if (!currentSeason || !product.food_season) return false;
    return product.food_season.includes(currentSeason);
  };

  const active = isInSeason(product, season);

  if (variant === "garden") {
    return (
      <div className="rounded-2xl overflow-hidden bg-white shadow-sm">
        <div className="relative">
          <img
            src={product.food_image_url}
            alt={product.food_name}
            className={`h-32 w-full object-cover ${!active ? "grayscale" : ""}`}
          />

          <span
            className={`
            absolute top-2 right-2 text-xs px-2 py-1 rounded-full
            ${active ? "bg-green-600 text-white" : "bg-gray-400 text-white"}
          `}
          >
            {active ? "PLANT NOW" : "WAIT"}
          </span>
        </div>

        <div className="p-3">
          <p className="font-semibold text-gray-800">{product.food_name}</p>

          <p className="text-xs text-gray-500">
            {product.food_description || product.category}
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col relative">
      {/* Imagen */}
      <img
        src={product.food_image_url}
        alt={product.food_name}
        className="h-44 w-full object-cover"
      />

      {/* Contenido */}
      <div className="p-4 flex flex-col gap-2 flex-1 bg-primary-200">
        <h3 className="font-semibold text-center text-gray-800">
          {product.food_name}
        </h3>

        {product.category && (
          <p className="text-sm text-gray-500 text-center">
            {product.category}
          </p>
        )}

        {variant === "default" && (
          <>
            {/* Botón alineado abajo */}
            <div className="mt-auto">
              <Button
                variant="loadMore"
                label={"Ver producto →"}
                fullWidth
                onClick={() => openModal("product", product)}
              />
            </div>
          </>
        )}
        {variant === "modal" && (
          <div className="mt-4">
            <p className="text-xl text-gray-700 mb-4">
              {product.food_description ||
                "No hay descripción disponible para este producto."}
            </p>
          </div>
        )}
        {variant === "modal" && (
          <p
            className={`text-sm font-medium text-center ${
              isInSeason(product, season) ? "text-green-700" : "text-red-600"
            }`}
          >
            {isInSeason(product, season) ? "En temporada" : "No es temporada"}
          </p>
        )}
      </div>

      {/* Favorito */}
      <div className="absolute top-3 right-3">
        <Favorite idProduct={product.id} />
      </div>
    </div>
  );
}
