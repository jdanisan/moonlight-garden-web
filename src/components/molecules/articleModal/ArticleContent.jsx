export function ArticleContent({ content }) {
  if (!content) return null;

  return (
    <div className="space-y-8">
      
      {/* Texto principal con drop cap */}
      <p className="text-xl text-emerald-900 leading-relaxed font-medium">
        <span className="text-5xl font-bold text-[#4a7c59] float-left mr-3 mt-1 leading-none">
          {content.charAt(0)}
        </span>
        {content.slice(1)}
      </p>

    </div>
  );
}