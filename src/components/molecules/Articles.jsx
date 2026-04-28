import { ChevronRight } from "lucide-react";
import { Button } from "../atoms/Button";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const baseCard =
  "bg-[#faf3dd] rounded-3xl overflow-hidden border border-[#c8d5b9] shadow-sm hover:shadow-md transition-all group";

export default function Articles({ articles = [], variant = "default" }) {
  if (!articles || articles.length === 0) return null;

  const article = articles?.[0];
  const { openModal } = useContext(AppContext);

  if (!article) return null;

  // WIDE (imagen derecha - original)
  if (variant === "default") {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-[#e8e3d5] overflow-hidden flex flex-col md:flex-row hover:shadow-md transition">
        {/* CONTENIDO (izquierda en desktop) */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between order-2 md:order-1">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest bg-[#e7efe3] text-[#4a7c59] px-3 py-1 rounded-full w-fit">
              {article.category}
            </span>

            <h3 className="text-lg font-bold text-primary-950 leading-snug mt-2">
              {article.title}
            </h3>

            <p className="text-sm text-[#4a7c59]/70 mt-2 line-clamp-3">
              {article.excerpt}
            </p>
          </div>

          <div className="mt-4">
            <div className="text-xs text-[#4a7c59]/60 flex gap-3">
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>

            <Button
              variant="articles"
              label="Leer más →"
              onClick={() => openModal("article", article)}
            />
          </div>
        </div>

        {/* IMAGEN (derecha en desktop) */}
        <div className="w-full md:w-1/2 h-56 md:h-72 overflow-hidden order-1 md:order-2">
          <img
            src={article.image}
            className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    );
  }

  // WIDE (imagen izquierda)
  if (variant === "image-left") {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-[#e8e3d5] overflow-hidden flex flex-col md:flex-row hover:shadow-md transition">
        {/* IMAGEN (izquierda en desktop) */}
        <div className="w-full md:w-1/2 h-56 md:h-72 overflow-hidden order-1">
          <img
            src={article.image}
            className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* CONTENIDO (derecha en desktop) */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between order-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest bg-[#e7efe3] text-[#4a7c59] px-3 py-1 rounded-full w-fit">
              {article.category}
            </span>

            <h3 className="text-lg font-bold text-primary-950 leading-snug mt-2">
              {article.title}
            </h3>

            <p className="text-sm text-[#4a7c59]/70 mt-2 line-clamp-3">
              {article.excerpt}
            </p>
          </div>

          <div className="mt-4">
            <div className="text-xs text-[#4a7c59]/60 flex gap-3">
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>

            <Button
              variant="articles"
              label="Leer más →"
              onClick={() => openModal("article", article)}
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
}
