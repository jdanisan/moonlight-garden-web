import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Button } from "../atoms/Button";

const VARIANTS = {
  default: "",
  horizontal: "flex-row",
  modal: "flex-col md:flex-row",
  garden: "flex-col",
};

export function Cards({ product, variant = "default", season }) {
  if (!product) return null;

  const { openModal } = useContext(AppContext);

  // Función para determinar si el producto está en temporada
  const isInSeason = (product, currentSeason) => {
    if (!currentSeason || !product.food_season) return false;
    return product.food_season.includes(currentSeason.toLowerCase());
  };

  const active = isInSeason(product, season);

  // --- VARIANTE GARDEN (Para el Calendario) ---
  if (variant === "garden") {
    return (
      <div className="group rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col h-full">
        <div className="relative overflow-hidden">
          <img
            src={product.food_image_url}
            alt={product.food_name}
            className={`h-36 w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
              !active ? "grayscale opacity-80" : ""
            }`}
          />

          <span
            className={`
            absolute top-2 right-2 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm
            ${active ? "bg-emerald-500 text-white" : "bg-gray-400 text-white"}
          `}
          >
            {active ? "TEMPORADA" : "FUERA"}
          </span>
          
          {/* Badge de Fase Lunar (Opcional, para reforzar por qué aparece) */}
          {product.food_moonPhase && (
             <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-md text-white text-[9px] px-2 py-0.5 rounded-md flex items-center gap-1">
               <span>🌙</span> {product.food_moonPhase}
             </div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-1">
          <h4 className="font-bold text-gray-800 text-sm mb-1 line-clamp-1">
            {product.food_name}
          </h4>
          <p className="text-[11px] text-gray-500 mb-4 capitalize">
            {product.food_type || "Cultivo"}
          </p>

          <div className="mt-auto">
            <Button
              label="Ver ficha →"
              variant="loadMore"
              fullWidth
              onClick={() => openModal("product", product)}
            />
          </div>
        </div>
      </div>
    );
  }

  // --- VARIANTE DEFAULT / MODAL ---
  return (
    <div className={`bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col relative ${VARIANTS[variant]}`}>
      {/* Imagen */}
      <div className="relative">
        <img
          src={product.food_image_url}
          alt={product.food_name}
          className={`${variant === "modal" ? "h-64 md:h-full md:w-1/2" : "h-44 w-full"} object-cover`}
        />
      </div>

      {/* Contenido */}
      <div className={`p-4 flex flex-col gap-2 flex-1 ${variant === "modal" ? "md:w-1/2" : "bg-primary-200"}`}>
        <h3 className="font-semibold text-center text-gray-800">
          {product.food_name}
        </h3>

        {product.category && (
          <p className="text-sm text-gray-500 text-center">
            {product.category}
          </p>
        )}

        {variant === "default" && (
          <div className="mt-auto">
            <Button
              variant="loadMore"
              label={"Ver producto →"}
              fullWidth
              onClick={() => openModal("product", product)}
            />
          </div>
        )}

        {variant === "modal" && (
          <div className="mt-4">
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              {product.food_description ||
                "No hay descripción disponible para este producto."}
            </p>
            <div className="flex flex-col gap-2 border-t pt-4">
               <p className="text-sm"><strong>Fase ideal:</strong> {product.food_moonPhase}</p>
               <p className={`text-sm font-bold ${active ? "text-emerald-600" : "text-red-500"}`}>
                 {active ? "✓ Disponible en esta temporada" : "✕ No es la mejor temporada"}
               </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}