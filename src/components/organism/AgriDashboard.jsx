import { useEffect, useState, useMemo } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Cell,
    ReferenceLine,
} from "recharts";

export default function AgriDashboard() {
    const [data, setData] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [filters, setFilters] = useState({
        beginDate: "2026-01-01",
        endDate: "2026-12-31",
        productStage: "",
        variety: "",
    });

    // Colores del diseño 
    const colors = {
        bgMain: "#e8f5e9", // Fondo verde muy claro
        cardBg: "#fdf8e1", // Crema de las tarjetas
        forestGreen: "#3a6351", // Verde oscuro lateral
        sageGreen: "#95c0a9", // Verde de la barra resaltada
        softSage: "#e2e7d6", // Verde de barras normales
        textMain: "#435d4e", // Texto principal
    };

    const formatDate = (date) => {
        const d = new Date(date);
        return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
    };

    const parsePrice = (p) => (typeof p === "number" ? p : parseFloat(p?.replace("€", "").replace(",", ".") || 0));

    useEffect(() => {
        fetch(`/api/fruitAndVegetable/pricesSupplyChain?memberStateCodes=ES&beginDate=${formatDate(filters.beginDate)}&endDate=${formatDate(filters.endDate)}`)
            .then((res) => {
                if (!res.ok) throw new Error("Error en la red");
                return res.json();
            })
            .then((json) => {
                if (Array.isArray(json)) {
                    const cleanData = json.map((item) => ({
                        ...item,
                        numericPrice: parsePrice(item.price)
                    }));
                    setData(cleanData);
                } else {
                    console.error("La API no devolvió un array:", json);
                    setData([]);
                }
            })
            .catch(err => {
                console.error("Error al obtener datos:", err);
                setData([]);
            });
    }, [filters.beginDate, filters.endDate]);
    useEffect(() => {
        let f = data.filter((d) => (!filters.productStage || d.productStage === filters.productStage) && (!filters.variety || d.variety === filters.variety));
        setFiltered(f);
    }, [filters, data]);

    const chartData = useMemo(() => filtered.map((d) => ({ name: d.beginDate.split("/")[0], price: d.numericPrice, fullDate: d.beginDate })), [filtered]);

    const avg = filtered.length ? filtered.reduce((acc, d) => acc + d.numericPrice, 0) / filtered.length : 0;
    const varieties = [...new Set(data.map((d) => d.variety))];
    const stages = [...new Set(data.map((d) => d.productStage))];

    const TRANSLATIONS = {
        "Ex-packaging station price": "Precio salida empaquetado",
        "Farmgate price": "Precio en origen (Granja)",
        "Wholesale price": "Precio mayorista",
        "Apples - All types and varieties": "Manzanas - Todas",
        "Apples - Fuji": "Manzanas Fuji",
        "Apples - Golden Delicious": "Manzanas Golden",
        "Apples - Granny Smith": "Manzanas Granny Smith",
        "Apples - Red Delicious": "Manzanas Rojas"
    };

    const t = (text) => TRANSLATIONS[text] || text;

    return (
        <div className="min-h-screen p-4 md:p-8" style={{ backgroundColor: colors.bgMain, color: colors.textMain }}>
            <div className="max-w-6xl mx-auto">

                {/* FILTROS SUPERIORES */}
                <div className="flex flex-wrap gap-3 mb-6">
                    {/* Fecha de inicio */}
                    <div className="flex flex-col">
                        <span className="text-[10px] ml-2 mb-1 font-bold opacity-50 uppercase">Desde</span>
                        <input
                            type="date"
                            value={filters.beginDate}
                            onChange={(e) => setFilters({ ...filters, beginDate: e.target.value })}
                            className="p-2 rounded-xl border-none shadow-sm text-sm"
                        />
                    </div>

                    {/* Fecha de fin (Fija/Solo lectura para el usuario) */}
                    <div className="flex flex-col opacity-60">
                        <span className="text-[10px] ml-2 mb-1 font-bold opacity-50 uppercase">Hasta (Fijo)</span>
                        <div className="p-2 bg-white/50 rounded-xl text-sm font-medium">
                            {filters.endDate}
                        </div>
                    </div>

                    {/* Select de Etapa Traducido */}
                    <div className="flex flex-col">
                        <span className="text-[10px] ml-2 mb-1 font-bold opacity-50 uppercase">Etapa del producto</span>
                        <select
                            value={filters.productStage}
                            onChange={(e) => setFilters({ ...filters, productStage: e.target.value })}
                            className="p-2 rounded-xl border-none shadow-sm text-sm bg-white"
                        >
                            <option value="">Todas las etapas</option>
                            {stages.map((s) => (
                                <option key={s} value={s}>
                                    {t(s)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Select de Variedad Traducido */}
                    <div className="flex flex-col">
                        <span className="text-[10px] ml-2 mb-1 font-bold opacity-50 uppercase">Variedad</span>
                        <select
                            value={filters.variety}
                            onChange={(e) => setFilters({ ...filters, variety: e.target.value })}
                            className="p-2 rounded-xl border-none shadow-sm text-sm bg-white max-w-[200px]"
                        >
                            <option value="">Todas las variedades</option>
                            {/* {console.log("Lista completa de variedades:", varieties)} */}
                            {varieties.map((v) => (

                                <option key={v} value={v}>
                                    {t(v)}
                                </option>
                            ))};

                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                    <div className="md:col-span-3 rounded-[2rem] p-8 shadow-sm relative" style={{ backgroundColor: colors.cardBg }}>
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold opacity-80 text-[#3a6351]">Evolución Precios (€)</h2>
                            <div className="flex gap-2">
                                <span className="text-[10px] px-3 py-1 bg-white rounded-full shadow-sm font-bold opacity-60">Semanal</span>
                            </div>
                        </div>

                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={chartData}

                                    margin={{ top: 0, right: 0, left: -20, bottom: 25 }}
                                >
                                    <XAxis
                                        dataKey="fullDate"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{
                                            fontSize: 9,
                                            fontWeight: "bold",
                                            fill: "#a5a5a5"
                                        }}
                                        dy={10}
                                    />
                                    <YAxis
        axisLine={false}
        tickLine={false}
        tick={{
            fontSize: 10,
            fontWeight: "bold",
            fill: "#a5a5a5"
        }}
        tickFormatter={(value) => `${value}€`}
    />
                                    <Tooltip
                                        cursor={{ fill: "transparent" }}
                                        labelStyle={{ color: colors.forestGreen, fontWeight: 'bold' }}
                                        contentStyle={{
                                            borderRadius: "15px",
                                            border: "none",
                                            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)"
                                        }}
                                    />
                                    <ReferenceLine
                                        y={avg}
                                        stroke={colors.forestGreen}
                                        strokeWidth={2}
                                        strokeDasharray="3 5"
                                    />
                                    <Bar dataKey="price" radius={[10, 10, 10, 10]} barSize={45}>
                                        {chartData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={index === chartData.length - 1 ? colors.sageGreen : colors.softSage}
                                            />
                                        ))}

                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* PANEL LATERAL (Precio Promedio) */}
                    <div className="rounded-[2rem] p-8 text-white flex flex-col justify-between shadow-lg" style={{ backgroundColor: colors.forestGreen }}>
                        <div>
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-6 text-xl">€</div>
                            <p className="text-xs uppercase tracking-widest opacity-70 mb-1">Precio Medio</p>

                            {filtered.length > 0 ? (
                                <h3 className="text-4xl font-bold flex items-baseline gap-1">
                                    {avg.toFixed(1)} <span className="text-lg opacity-60 font-normal">€/100kg</span>
                                </h3>
                            ) : (
                                <div className="mt-2">
                                    <h3 className="text-2xl font-bold opacity-90">Sin registros</h3>
                                    <p className="text-[10px] opacity-50 italic">Ajusta los filtros para ver datos</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-8">
                            <div className="w-full bg-white/20 h-1.5 rounded-full mb-3">
                                <div
                                    className="bg-white h-full rounded-full transition-all duration-500"
                                    style={{ width: filtered.length > 0 ? '65%' : '0%' }}
                                ></div>
                            </div>
                            <p className="text-[10px] opacity-60 leading-relaxed">
                                {filtered.length > 0
                                    ? "Tendencia basada en los filtros actuales de España."
                                    : "No hay datos suficientes para calcular una tendencia."}
                            </p>
                        </div>
                    </div>

                    {/* DISTRIBUCIÓN (Abajo Izquierda) */}
                    <div className="md:col-span-2 rounded-[2rem] p-8 shadow-sm" style={{ backgroundColor: colors.cardBg }}>
                        <h3 className="font-bold mb-6 opacity-70 text-lg">Distribución por Variedad</h3>
                        <div className="space-y-4">
                            {varieties.slice(0, 3).map((v, i) => {
                                const count = filtered.filter((d) => d.variety === v).length;
                                const percent = filtered.length ? ((count / filtered.length) * 100).toFixed(0) : 0;
                                const dotColor = [colors.forestGreen, colors.sageGreen, colors.softSage][i] || colors.softSage;
                                return (
                                    <div key={v} className="flex justify-between items-center text-sm font-bold opacity-80">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: dotColor }}></div>
                                            <span className="truncate w-40 md:w-64">{v.replace("Apples - ", "")}</span>
                                        </div>
                                        <span>{percent}%</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* PERSPECTIVA (Abajo Derecha) */}
                    <div className="md:col-span-2 rounded-[2rem] p-8 shadow-sm flex flex-col justify-between" style={{ backgroundColor: colors.cardBg }}>
                        <div>
                            <h3 className="font-bold mb-2 opacity-70 text-lg">Perspectiva</h3>
                            <p className="text-sm opacity-60 leading-relaxed">
                                Los precios en <strong>{filters.productStage ? t(filters.productStage) : 'todas las etapas'}</strong> muestran una variación del
                                {" "}{filtered.length > 1 ? (((filtered.at(-1).numericPrice - filtered[0].numericPrice) / filtered[0].numericPrice) * 100).toFixed(1) : 0}%
                                respecto al inicio del periodo. Se recomienda vigilar la variedad {varieties[0]?.split("-")[1]}.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}