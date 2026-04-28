import { ArticleHeader } from "../molecules/articleModal/ArticleHeader";
import { ArticleContent } from "../molecules/articleModal/ArticleContent";
import { ArticleSidebar } from "../molecules/articleModal/ArticleSidebar";

export function ArticleModal({ article }) {
  return (
    <div className="relative w-full max-w-5xl bg-[#faf3dd] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

      <ArticleHeader
        image={article.image}
        category={article.category}
        readTime={article.readTime}
        title={article.title}
      />

      <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          <div className="lg:col-span-7">
            <ArticleContent content={article.content} />
          </div>

          <div className="lg:col-span-5">
            <ArticleSidebar
              takeaways={article.key_takeaways}
              author={article.author}
            />
          </div>

        </div>
      </div>


    </div>
  );
}