import { Button } from "../atoms/Button";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export function ProductModal({ product, onClose }) {
  if (!product) return null;

  const { requireAuth, onAddToPlanning, plannedPlants } = useContext(AppContext);

  // Comprobar si este producto ya está en la lista del usuario
  const isAlreadyPlanned = plannedPlants?.includes(product.id);

  const format = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  return (
    <div className="bg-[#E9E3CE] rounded-3xl shadow-2xl overflow-hidden max-w-4xl flex w-full max-h-[90vh]">
      {/* Imagen izquierda */}
      <div className="w-1/2 bg-white hidden md:block">
        <img
          src={product.food_image_url}
          alt={product.food_name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Contenido derecho */}
      <div className="w-full md:w-1/2 p-8 flex flex-col gap-6 relative overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-xl text-green-700 hover:scale-110 transition-transform"
        >
          ✕
        </button>

        {/* Title */}
        <div>
          <h2 className="text-3xl font-bold text-green-800 leading-tight">
            {product.food_name.replaceAll("_", " ")}
          </h2>
          <p className="text-sm text-green-600 font-medium">
            Fase lunar ideal: {product.food_moonPhase}
          </p>
        </div>

        {/* Info cards */}
        <div className="flex gap-4">
          <div className="bg-[#F2ECD8] rounded-xl p-4 flex-1 shadow-sm">
            <p className="text-[10px] text-green-700 font-bold uppercase tracking-wider">Temporada</p>
            <p className="font-medium text-green-900 text-sm">
              {Array.isArray(product.food_season)
                ? product.food_season.map(format).join(" / ")
                : format(product.food_season)}
            </p>
          </div>

          <div className="bg-[#F2ECD8] rounded-xl p-4 flex-1 shadow-sm">
            <p className="text-[10px] text-green-700 font-bold uppercase tracking-wider">Tipo</p>
            <p className="font-medium text-green-900 text-sm">
              {format(product.food_type)}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="flex-1">
          <h4 className="text-xs font-bold text-green-700 mb-2 uppercase tracking-widest">
            Descripción
          </h4>
          <p className="text-sm text-green-800 leading-relaxed italic">
            "{product.food_description}"
          </p>
        </div>

        {/* Action Button */}
        <Button
          label={isAlreadyPlanned ? "En tu huerto ✓" : "Vamos a sembrarlo"}
          variant={isAlreadyPlanned ? "disabled" : "loadMore"}
          disabled={isAlreadyPlanned}
          className={`mt-4 py-4 rounded-2xl font-bold text-lg transition-all ${
            isAlreadyPlanned 
              ? "bg-gray-400 cursor-not-allowed text-white" 
              : "bg-green-700 text-white hover:bg-green-800 hover:shadow-lg"
          }`}
          onClick={() => {
            if (!isAlreadyPlanned) {
              requireAuth(() => onAddToPlanning(product.id));
            }
          }}
        />
      </div>
    </div>
  );
}