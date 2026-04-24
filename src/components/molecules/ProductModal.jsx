export function ProductModal({ product, onClose }) {
  if (!product) return null;
//TODO: Upgrade the BBDD with new files with the new fields (season, category, moon phase, description).
  return (
    <div className="bg-[#E9E3CE] rounded-3xl shadow-2xl overflow-hidden max-w-4xl flex">

      {/* Imagen izquierda */}
      <div className="w-1/2 bg-white">
        <img
          src={product.food_image_url}
          alt={product.food_name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Contenido derecho */}
      <div className="w-1/2 p-8 flex flex-col gap-6 relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-xl text-green-700"
        >
          ✕
        </button>

        {/* Title */}
        <div>
          <h2 className="text-3xl font-bold text-green-800">
            {product.food_name.replaceAll("_", " ")}
          </h2>
          <p className="text-sm text-green-600">
            {product.food_moonPhase}
            Meguante, nueva, vacia hola creciente, llena, menguante, nueva
          </p>
        </div>

        {/* Info cards */}
        <div className="flex gap-4">

          <div className="bg-[#F2ECD8] rounded-xl p-4 flex-1">
            <p className="text-xs text-green-700 font-semibold">
              TEMPORADA
            </p>
            <p className="font-medium text-green-900">
              {product.food_season}
            </p>
          </div>

          <div className="bg-[#F2ECD8] rounded-xl p-4 flex-1">
            <p className="text-xs text-green-700 font-semibold">
              TIPO
            </p>
            <p className="font-medium text-green-900">
              {product.food_category}
            </p>
          </div>

        </div>

        {/* Description */}
        <div>
          <h4 className="text-sm font-bold text-green-700 mb-2">
            DESCRIPCIÓN
          </h4>
          <p className="text-sm text-green-800 leading-relaxed">
            {product.food_description}
          </p>
        </div>

        
        <button className="mt-auto bg-green-700 text-white rounded-xl py-3 font-semibold hover:bg-green-800 transition">
          Vamos a sembrarlo
        </button>

      </div>
    </div>
  );
}