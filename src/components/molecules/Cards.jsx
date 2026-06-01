import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Button } from "../atoms/Button";
import { t } from "../utils/translations";

const VARIANTS = {
  default: "",
  horizontal: "flex-row",
  modal: "flex-col md:flex-row",
  garden: "flex-col",
};

export function Cards({ product, variant = "default", season }) {
  if (!product) return null;

  const { openModal, onRemoveFromPlanning, onAddToPlanning, plannedPlants } = useContext(AppContext);
  const isPlanned = plannedPlants?.includes(product.id);
  const isInSeason = (product, currentSeason) => {
    if (!currentSeason || !product?.food_season) return false;
    const seasonsArray = Array.isArray(product.food_season)
      ? product.food_season
      : product.food_season.split(',').map(s => s.trim());
    return seasonsArray.some(
      (s) => s.toLowerCase() === currentSeason.toLowerCase()
    );
  };

  const active = isInSeason(product, season);

  if (variant === "garden") {
    return (
      <div className="group rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col h-full relative">

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (typeof onRemoveFromPlanning === "function") {
              onRemoveFromPlanning(product.id);
            }
          }}
          className="absolute top-2 left-2 z-10 bg-white/90 hover:bg-red-50 text-red-500 p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity border border-red-100"
          title="Quitar de mi jungla"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>

        <div className="relative overflow-hidden">
          <img
            src={product.food_image_url}
            alt={product.food_name}
            className={`h-36 w-full object-cover transition-transform duration-500 group-hover:scale-110 ${!active ? "grayscale opacity-80" : ""
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

          {product.food_moonPhase && (
            <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-md text-white text-[9px] px-2 py-0.5 rounded-md flex items-center gap-1">
              <span>🌙</span> {t(product.food_moonPhase)}
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-1">
          <h4 className="font-bold text-gray-800 text-sm mb-1 line-clamp-1">
            {t(product.food_name)}
          </h4>
          <p className="text-[11px] text-gray-500 mb-4 capitalize">
            {t(product.food_type) || "Cultivo"}
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

  return (
    <div className={`bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col relative ${VARIANTS[variant]}`}>
      <div className="relative">
        <img
          src={product.food_image_url}
          alt={product.food_name}
          className={`${variant === "modal" ? "h-64 md:h-full md:w-1/2" : "h-44 w-full"} object-cover`}
        />
      </div>

      <div className={`p-4 flex flex-col gap-2 flex-1 ${variant === "modal" ? "md:w-1/2" : "bg-primary-200"}`}>
        <h3 className="font-semibold text-center text-gray-800">
          {t(product.food_name)}
        </h3>

        {product.category && (
          <p className="text-sm text-gray-500 text-center">
            {t(product.category)}
          </p>
        )}

        {variant === "default" && (
          <div className="mt-auto">
            <Button
              variant="loadMore"
              label={isPlanned ? "En mi huerto ✓" : "Ver producto →"}
              fullWidth
              disabled={isPlanned}
              onClick={() => {
                if (!isPlanned) openModal("product", product);
              }}
              className={isPlanned ? "opacity-60 grayscale cursor-default" : ""}
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
              <p className="text-sm"><strong>Fase ideal:</strong> {t(product.food_moonPhase)}</p>
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