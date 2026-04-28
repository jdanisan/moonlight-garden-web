import { useContext, useState, useEffect } from "react";
import { NavBar } from "../templates/NavBar";
import { ProductList } from "../organism/ProductList";
import "../../index.css";
import { GoTopBTN } from "../atoms/GoTopBTN";
import { NewsLetter } from "../atoms/NewsLetter";
import { Filters } from "../organism/Filters";
import Articles from "../molecules/Articles";

import { db } from "../../services/firebase";
import { ref, onValue } from "firebase/database";

export default function DocumentationPage() {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const filteredArticles =
    selectedCategory === "Todos"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);
  useEffect(() => {
    const articlesRef = ref(db, "/articles");

    const unsubscribe = onValue(articlesRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const formatted = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        setArticles(formatted);
      } else {
        setArticles([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <h1 className="flex items-center justify-center mt-8 font-['Segoe_UI','Arial','sans-serif']  font-bold sm:text-4xl text-2xl m-2.5">
        Documentación
      </h1>

      <Filters
        filterType="categoriesBlog"
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 ml-3.5 mr-3.5 mt-5 mb-5">
        {filteredArticles.map((article, index) => (
          <Articles
            key={article.id}
            articles={[article]}
            variant={index % 2 === 0 ? "default" : "image-left"}
          />
        ))}
      </section>
      <NewsLetter />

      <GoTopBTN />
    </>
  );
}
