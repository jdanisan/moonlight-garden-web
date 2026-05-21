import { useEffect, useState, useMemo } from "react";
import { supabase } from "../../services/supabase";
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
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        beginDate: "2026-01-01",
        endDate: "2026-12-31",
        productStage: "",
        variety: "",
    });

    const colors = {
        bgMain: "#e8f5e9",
        cardBg: "#fdf8e1",
        forestGreen: "#3a6351",
        sageGreen: "#95c0a9",
        softSage: "#e2e7d6",
        textMain: "#435d4e",
    };

    const parsePrice = (p) => {
        if (typeof p === "number") return p;
        return parseFloat(String(p ?? "0").replace(/[^0-9.]/g, "")) || 0;
    };

    // Fetch ALL rows usando paginación (Supabase)
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let allData = [];
                let from = 0;
                const PAGE_SIZE = 1000;

                while (true) {
                    const { data: json, error } = await supabase
                        .from("agricultural_prices")
                        .select("*")
                        .range(from, from + PAGE_SIZE - 1);

                    if (error) throw error;
                    if (!json || json.length === 0) break;

                    allData = [...allData, ...json];
                    if (json.length < PAGE_SIZE) break;
                    from += PAGE_SIZE;
                }

                const cleanData = allData.map((item) => ({
                    ...item,
                    beginDate: item.begin_date,
                    endDate: item.end_date,
                    productStage: item.product_stage,
                    // El precio ya se guardó parseado en Supabase, pero por si acaso:
                    numericPrice: parsePrice(item.price),
                }));

                setData(cleanData);
            } catch (err) {
                console.error("Error al obtener datos de Supabase:", err);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Solo al montar — los filtros de fecha los aplicamos en cliente

    // Filtrado en cliente
    useEffect(() => {
        // Convertir fechas del filtro (YYYY-MM-DD) a Date para comparar
        const startDate = new Date(filters.beginDate);
        const endDate = new Date(filters.endDate);

        const f = data.filter((d) => {
            // begin_date viene en formato "DD/MM/YYYY" desde la API europea
            const parts = (d.beginDate || "").split("/");
            const itemDate =
                parts.length === 3
                    ? new Date(`${parts[2]}-${parts[1]}-${parts[0]}`)
                    : null;

            const inDateRange =
                !itemDate ||
                (itemDate >= startDate && itemDate <= endDate);

            const matchStage =
                !filters.productStage ||
                d.productStage === filters.productStage;

            const matchVariety =
                !filters.variety || d.variety === filters.variety;

            return inDateRange && matchStage && matchVariety;
        });

        setFiltered(f);
    }, [filters, data]);

    const chartData = useMemo(
        () =>
            filtered.map((d) => ({
                name: d.beginDate,
                price: d.numericPrice,
                fullDate: d.beginDate,
            })),
        [filtered]
    );

    const avg =
        filtered.length > 0
            ? filtered.reduce((acc, d) => acc + d.numericPrice, 0) /
              filtered.length
            : 0;

    const varieties = [...new Set(data.map((d) => d.variety).filter(Boolean))].sort();
    const stages = [...new Set(data.map((d) => d.productStage).filter(Boolean))].sort();

    const TRANSLATIONS = {
        "Ex-packaging station price": "Precio salida empaquetado",
        "Farmgate price": "Precio en origen (Granja)",
        "Wholesale price": "Precio mayorista",
        "Retail buying price": "Precio minorista",
        "Apples - All types and varieties": "Manzanas - Todas",
        "Apples - Fuji": "Manzanas Fuji",
        "Apples - Golden Delicious": "Manzanas Golden",
        "Apples - Granny Smith": "Manzanas Granny Smith",
        "Apples - Red Delicious": "Manzanas Rojas",
        "Apples - Gala": "Manzanas Gala",
        "Apples - Braeburn": "Manzanas Braeburn",
        "Apples - Boskoop": "Manzanas Boskoop",
        "Apples - Elstar": "Manzanas Elstar",
        "Apples - Cox orange": "Manzanas Cox Orange",
        "Apples - Jonagold": "Manzanas Jonagold",
        "Apples - Jonagored": "Manzanas Jonagored",
        "Apples - Idared": "Manzanas Idared",
        "Apples - Pinova": "Manzanas Pinova",
        "Apples - Conference": "Peras Conference", // por si hay peras mezcladas
    };

    const t = (text) => TRANSLATIONS[text] || text;

    const variation =
        filtered.length > 1 && filtered[0]?.numericPrice
            ? (
                  ((filtered.at(-1).numericPrice - filtered[0].numericPrice) /
                      filtered[0].numericPrice) *
                  100
              ).toFixed(1)
            : 0;

    const dotColors = [colors.forestGreen, colors.sageGreen, colors.softSage];

    return (
        <div
            className="min-h-screen p-4 md:p-8"
            style={{ backgroundColor: colors.bgMain, color: colors.textMain }}
        >
            <div className="max-w-6xl mx-auto">

                {/* CABECERA */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold" style={{ color: colors.forestGreen }}>
                        Precios Agrícolas — España 🇪🇸
                    </h1>
                    <p className="text-sm opacity-50 mt-1">
                        Fuente: Agri-food Data Portal · Comisión Europea
                        {!loading && (
                            <span className="ml-2 font-semibold">
                                · {data.length} registros cargados
                            </span>
                        )}
                    </p>
                </div>

                {/* FILTROS */}
                <div className="flex flex-wrap gap-3 mb-6">

                    <div className="flex flex-col">
                        <span className="text-[10px] ml-2 mb-1 font-bold opacity-50 uppercase">Desde</span>
                        <input
                            type="date"
                            value={filters.beginDate}
                            onChange={(e) =>
                                setFilters({ ...filters, beginDate: e.target.value })
                            }
                            className="p-2 rounded-xl border-none shadow-sm text-sm"
                        />
                    </div>

                    <div className="flex flex-col">
                        <span className="text-[10px] ml-2 mb-1 font-bold opacity-50 uppercase">Hasta</span>
                        <input
                            type="date"
                            value={filters.endDate}
                            onChange={(e) =>
                                setFilters({ ...filters, endDate: e.target.value })
                            }
                            className="p-2 rounded-xl border-none shadow-sm text-sm"
                        />
                    </div>

                    <div className="flex flex-col">
                        <span className="text-[10px] ml-2 mb-1 font-bold opacity-50 uppercase">Etapa del producto</span>
                        <select
                            value={filters.productStage}
                            onChange={(e) =>
                                setFilters({ ...filters, productStage: e.target.value })
                            }
                            className="p-2 rounded-xl border-none shadow-sm text-sm bg-white"
                        >
                            <option value="">Todas las etapas</option>
                            {stages.map((s) => (
                                <option key={s} value={s}>{t(s)}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-[10px] ml-2 mb-1 font-bold opacity-50 uppercase">Variedad</span>
                        <select
                            value={filters.variety}
                            onChange={(e) =>
                                setFilters({ ...filters, variety: e.target.value })
                            }
                            className="p-2 rounded-xl border-none shadow-sm text-sm bg-white max-w-55"
                        >
                            <option value="">Todas las variedades</option>
                            {varieties.map((v) => (
                                <option key={v} value={v}>{t(v)}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* ESTADO DE CARGA */}
                {loading && (
                    <div className="flex items-center justify-center py-20 text-sm opacity-50">
                        Cargando datos desde Supabase…
                    </div>
                )}

                {!loading && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                        {/* GRÁFICO PRINCIPAL */}
                        <div
                            className="md:col-span-3 rounded-4x1 p-8 shadow-sm relative"
                            style={{ backgroundColor: colors.cardBg }}
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-bold opacity-80" style={{ color: colors.forestGreen }}>
                                    Evolución Precios (€/100kg)
                                </h2>
                                <div className="flex gap-2">
                                    <span className="text-[10px] px-3 py-1 bg-white rounded-full shadow-sm font-bold opacity-60">
                                        {filtered.length} registros
                                    </span>
                                </div>
                            </div>

                            <div className="h-75 w-full min-h-75">
                                {chartData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                                        <BarChart
                                            data={chartData}
                                            margin={{ top: 0, right: 0, left: -20, bottom: 25 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />

                                            <XAxis
                                                dataKey="fullDate"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fontSize: 9, fontWeight: "bold", fill: "#a5a5a5" }}
                                                dy={10}
                                                interval="preserveStartEnd"
                                            />

                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fontSize: 10, fontWeight: "bold", fill: "#a5a5a5" }}
                                                tickFormatter={(value) => `${value}€`}
                                            />

                                            <Tooltip
                                                cursor={{ fill: "transparent" }}
                                                formatter={(value) => [`${value.toFixed(2)} €/100kg`, "Precio"]}
                                                labelStyle={{ color: colors.forestGreen, fontWeight: "bold" }}
                                                contentStyle={{
                                                    borderRadius: "15px",
                                                    border: "none",
                                                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)",
                                                }}
                                            />

                                            <ReferenceLine
                                                y={avg}
                                                stroke={colors.forestGreen}
                                                strokeWidth={2}
                                                strokeDasharray="3 5"
                                                label={{
                                                    value: `Media: ${avg.toFixed(1)}€`,
                                                    position: "insideTopRight",
                                                    fontSize: 10,
                                                    fill: colors.forestGreen,
                                                    opacity: 0.7,
                                                }}
                                            />

                                            <Bar dataKey="price" radius={[10, 10, 10, 10]} barSize={45}>
                                                {chartData.map((entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={
                                                            index === chartData.length - 1
                                                                ? colors.sageGreen
                                                                : colors.softSage
                                                        }
                                                    />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="flex items-center justify-center h-full text-sm opacity-60">
                                        No hay datos disponibles para los filtros seleccionados
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* PANEL LATERAL — Precio medio */}
                        <div
                            className="rounded-4x1 p-8 text-white flex flex-col justify-between shadow-lg"
                            style={{ backgroundColor: colors.forestGreen }}
                        >
                            <div>
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-6 text-xl">
                                    €
                                </div>
                                <p className="text-xs uppercase tracking-widest opacity-70 mb-1">
                                    Precio Medio
                                </p>
                                {filtered.length > 0 ? (
                                    <h3 className="text-4xl font-bold flex items-baseline gap-1">
                                        {avg.toFixed(1)}
                                        <span className="text-lg opacity-60 font-normal">€/100kg</span>
                                    </h3>
                                ) : (
                                    <div className="mt-2">
                                        <h3 className="text-2xl font-bold opacity-90">Sin registros</h3>
                                        <p className="text-[10px] opacity-50 italic">
                                            Ajusta los filtros para ver datos
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="mt-8">
                                <div className="w-full bg-white/20 h-1.5 rounded-full mb-3">
                                    <div
                                        className="bg-white h-full rounded-full transition-all duration-500"
                                        style={{ width: filtered.length > 0 ? "65%" : "0%" }}
                                    />
                                </div>
                                <p className="text-[10px] opacity-60 leading-relaxed">
                                    {filtered.length > 0
                                        ? "Tendencia basada en los filtros actuales de España."
                                        : "No hay datos suficientes para calcular una tendencia."}
                                </p>
                            </div>
                        </div>

                        {/* DISTRIBUCIÓN por variedad */}
                        <div
                            className="md:col-span-2 rounded-4x1 p-8 shadow-sm"
                            style={{ backgroundColor: colors.cardBg }}
                        >
                            <h3 className="font-bold mb-6 opacity-70 text-lg">
                                Distribución por Variedad
                            </h3>

                            <div className="space-y-4">
                                {varieties.slice(0, 5).map((v, i) => {
                                    const count = filtered.filter((d) => d.variety === v).length;
                                    const percent = filtered.length
                                        ? ((count / filtered.length) * 100).toFixed(0)
                                        : 0;
                                    const dotColor = dotColors[i % dotColors.length];

                                    return (
                                        <div
                                            key={v}
                                            className="flex justify-between items-center text-sm font-bold opacity-80"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-2 h-2 rounded-full shrink-0"
                                                    style={{ backgroundColor: dotColor }}
                                                />
                                                <span className="truncate w-40 md:w-56">
                                                    {t(v)}
                                                </span>
                                            </div>
                                            <span className="ml-2 shrink-0">{percent}%</span>
                                        </div>
                                    );
                                })}

                                {varieties.length === 0 && (
                                    <p className="text-sm opacity-40 italic">Sin datos</p>
                                )}
                            </div>
                        </div>
                        {/* PERSPECTIVA */}
                        <div
                            className="md:col-span-2 rounded-4x1 p-8 shadow-sm flex flex-col justify-between"
                            style={{ backgroundColor: colors.cardBg }}
                        >
                            <div>
                                <h3 className="font-bold mb-2 opacity-70 text-lg">Perspectiva</h3>
                                <p className="text-sm opacity-60 leading-relaxed">
                                    Los precios en{" "}
                                    <strong>
                                        {filters.productStage
                                            ? t(filters.productStage)
                                            : "todas las etapas"}
                                    </strong>{" "}
                                    muestran una variación del{" "}
                                    <strong
                                        style={{
                                            color:
                                                Number(variation) >= 0
                                                    ? colors.forestGreen
                                                    : "#c0392b",
                                        }}
                                    >
                                        {variation > 0 ? "+" : ""}
                                        {variation}%
                                    </strong>{" "}
                                    respecto al inicio del periodo.
                                    {varieties[0] && (
                                        <>
                                            {" "}Se recomienda vigilar la variedad{" "}
                                            <strong>{t(varieties[0])}</strong>.
                                        </>
                                    )}
                                </p>
                            </div>

                            {/* Mini resumen numérico */}
                            {filtered.length > 0 && (
                                <div className="mt-6 flex gap-6">
                                    <div>
                                        <p className="text-[10px] uppercase opacity-40 font-bold">Mínimo</p>
                                        <p className="text-lg font-bold" style={{ color: colors.forestGreen }}>
                                            {Math.min(...filtered.map((d) => d.numericPrice)).toFixed(1)}€
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase opacity-40 font-bold">Máximo</p>
                                        <p className="text-lg font-bold" style={{ color: colors.forestGreen }}>
                                            {Math.max(...filtered.map((d) => d.numericPrice)).toFixed(1)}€
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase opacity-40 font-bold">Registros</p>
                                        <p className="text-lg font-bold" style={{ color: colors.forestGreen }}>
                                            {filtered.length}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}