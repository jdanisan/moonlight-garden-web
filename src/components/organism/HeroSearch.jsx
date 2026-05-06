import React, { useState, useEffect } from "react";
import { Search, X, Leaf } from "lucide-react";
import clsx from "clsx";
import { Input } from "../atoms/Input";

export default function HeroSearch({
    title = "¿Cuál es tu próximo proyecto de cultivo?",
    placeholder = "Busca patatas, fresas, calabacín...",
    filters = {},
    onSearchChange,
    handleChange, 
    filterType = "categoriesSearch",
    totalResults = 0,
}) {
    const [localSearch, setLocalSearch] = useState(filters.search || "");

    // Debounce para la búsqueda de texto
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (onSearchChange) onSearchChange(localSearch);
        }, 400);
        return () => clearTimeout(timeout);
    }, [localSearch, onSearchChange]);

    

    return (
        <section className="relative w-full lg:w-[85%]  mt-10 mx-auto bg-linear-to-br from-[#5f8d77] to-[#4a7c59] shadow-[0_20px_50px_rgba(0,0,0,0.15)] py-20 px-6 rounded-4xl flex flex-col items-center justify-center text-center transition-all duration-500 ease-in-out">

            <div className="w-full max-w-4xl flex flex-col items-center gap-8">
                {/* 1. TITULO CON ICONO */}
                <div className="flex items-center gap-3 mb-8">
                    <Leaf className="text-white/40 w-8 h-8 rotate-12" />
                    <h1 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight">
                        {title}
                    </h1>
                </div>

                {/* 2. BARRA DE BÚSQUEDA (Usando tu lógica de localSearch + Iconos) */}
                <div className="relative w-full max-w-2xl mb-4 group">
                    {/* Icono de búsqueda */}
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none z-10">
                        <Search
                            className={clsx(
                                "h-5 w-5 transition-colors",
                                localSearch ? "text-[#3a5a40]" : "text-gray-400"
                            )}
                        />
                    </div>

                    <input
                        type="text"
                        id="floating_search"
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                        placeholder=" " // Importante: dejar un espacio para que el peer-placeholder-shown funcione
                        className="peer w-full pt-8 pb-3 pl-14 pr-14 rounded-2xl bg-white/95 backdrop-blur-sm text-gray-800 text-lg shadow-2xl border-none focus:ring-4 focus:ring-white/20 transition-all outline-none"
                    />

                    {/* Floating Label */}
                    <label
                        htmlFor="floating_search"
                        className={clsx(
                            "absolute text-gray-400 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-left left-14",
                            "peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0",
                            "peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-[#3a5a40]"
                        )}
                    >
                        {placeholder}
                    </label>
                </div>

             

                {/* 4. CATEGORIES SEARCH (Integrando tu componente de filtros) */}
                {filterType === "categoriesSearch" && (
                    <div className="flex flex-col items-center gap-4 animate-in fade-in duration-700">
                        <span className="text-white/80 text-sm font-semibold tracking-wide uppercase">
                            Tipo de producto
                        </span>

                        <div className="flex flex-wrap justify-center gap-3">
                            {[
                                { label: "Todo", value: "" },
                                { label: "Hortaliza", value: "hortaliza" },
                                { label: "Fruta", value: "fruta" },
                            ].map((option) => {
                                const isActive = filters.typeProduct === option.value;

                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => {
                                            // Usamos tu función handleChange original
                                            handleChange({
                                                target: { name: "typeProduct", value: option.value }
                                            });
                                        }}
                                        className={clsx(
                                            "px-7 py-2.5 rounded-full text-sm font-bold transition-all duration-300 transform",
                                            isActive
                                                ? "bg-white text-[#4a7c59] shadow-xl scale-105"
                                                : "bg-white/10 text-white hover:bg-white/25 border border-white/10 backdrop-blur-sm"
                                        )}
                                    >
                                        {option.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* 5. FEEDBACK DE RESULTADOS */}
                {localSearch && (
                    <p className="mt-6 text-white/90 text-sm font-medium bg-[#3a5a40]/30 px-4 py-1 rounded-full border border-white/10 animate-pulse">
                        Mostrando {totalResults} resultados para "{localSearch}"
                    </p>
                )}
            </div>
        </section>
    );
}