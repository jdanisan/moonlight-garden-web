import { X } from "lucide-react";
import { Button } from "../../atoms/Button";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export function ArticleHeader({ image, category, readTime, title, onClose }) {
  
  
    const { closeModal } = useContext(AppContext);
  return (
    <div className="relative h-64 md:h-80 w-full shrink-0">
      
      {/* Imagen */}
      <img 
        src={image} 
        alt={title}
        className="w-full h-full object-cover"
      />

      {/* Gradiente */}
      <div className="absolute inset-0 bg-linear-to-t from-[#faf3dd] via-transparent to-black/20" />
      
      {/* Botón cerrar */}
      <Button label={"X"} onClick={closeModal} variant="close"/>

      {/* Info */}
      <div className="absolute bottom-6 left-8 space-y-2">
        <div className="flex items-center gap-4">
          
          {/* Categoría */}
          <span className="bg-[#4a7c59] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            {category}
          </span>

          {/* Read time */}
          <span className="text-emerald-900/60 text-xs font-bold flex items-center gap-1">
            <span className="w-4 h-4 rounded-full border border-emerald-900/20 flex items-center justify-center text-[8px]">
              i
            </span>
            {readTime}
          </span>
        </div>

        {/* Título */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-950 leading-tight">
          {title}
        </h2>
      </div>
    </div>
  );
}