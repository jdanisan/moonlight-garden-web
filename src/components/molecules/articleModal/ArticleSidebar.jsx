import { Lightbulb, User } from "lucide-react";

export function ArticleSidebar({ takeaways = [], author }) {
  return (
    <div className="space-y-6">
      
      {/* 🟢 Takeaways */}
      {takeaways.length > 0 && (
        <div className="bg-emerald-100/50 border border-emerald-200 rounded-2xl p-6 space-y-4">
          
          <div className="flex items-center gap-2 text-emerald-800 font-bold uppercase tracking-wider text-sm">
            <Lightbulb size={18} className="text-[#4a7c59]" />
            Puntos clave
          </div>

          <ul className="space-y-3">
            {takeaways.map((item, idx) => (
              <li
                key={idx}
                className="flex gap-3 text-sm text-emerald-900/70 leading-snug"
              >
                <div className="mt-1 w-4 h-4 shrink-0 rounded-full border border-[#4a7c59] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#4a7c59] rounded-full" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 👤 Autor */}
      {author && (
        <div className="bg-white/40 border border-emerald-100 rounded-2xl p-6 flex items-center gap-4">
          
          <div className="w-12 h-12 bg-emerald-200 rounded-full flex items-center justify-center text-emerald-700">
            <User size={24} />
          </div>

          <div>
            <h4 className="font-bold text-emerald-950">
              {author.name}
            </h4>
            <p className="text-xs text-emerald-700 font-medium">
              {author.specialty}
            </p>
          </div>

        </div>
      )}

    </div>
  );
}