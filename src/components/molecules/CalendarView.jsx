import { useEffect, useState } from "react";
import { Input } from "../atoms/Input";
import { getMoonPhase } from "../utils/getMoonPhase";

// Diccionario de iconos para las fases lunares
const phaseIcon = {
  "New Moon": "🌑",
  "Waxing Crescent": "🌒",
  "First Quarter": "🌓",
  "Waxing Gibbous": "🌔",
  "Full Moon": "🌕",
  "Waning Gibbous": "🌖",
  "Last Quarter": "🌗",
  "Waning Crescent": "🌘",
};

// Lógica para determinar el mensaje y color de recomendación según clima y luna
const getRecommendation = ({ phase, rainProbability } = {}) => {
  if (!phase) return { message: "Cargando datos...", color: "#eee" };
  
  if (rainProbability > 70) return { message: "Alta probabilidad de lluvia, evita riego", color: "#87CEFA" };
  if (rainProbability > 50) return { message: "Probabilidad de lluvia, evita riego", color: "#87CEFF" };
  
  if (phase === "New Moon") return { message: "Buen momento para raíces", color: "#4CAF50" };
  if (phase === "Waxing Crescent") return { message: "Ideal para hojas y hierbas", color: "#8BC34A" };
  
  return { message: "Actividad ligera recomendada", color: "#ccc" };
};

export default function CalendarView() {
  // --- ESTADOS ---
  const now = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [monthData, setMonthData] = useState({});
  const [events, setEvents] = useState([]);
  const [manualCity, setManualCity] = useState("");
  
  // Inicializamos el calendario en el mes y año actual del sistema
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());

  // --- LÓGICA DE CALENDARIO ---
  
  // 1. Obtener cuántos días tiene el mes actual
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // 2. Calcular el desfase (en qué día de la semana empieza el día 1)
  // .getDay() da 0 para Domingo, lo ajustamos para que la semana empiece en Lunes (0)
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const offset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  // 3. Generar array de strings de fechas para el mes: ["2026-04-01", ...]
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const day = String(i + 1).padStart(2, "0");
    const month = String(currentMonth + 1).padStart(2, "0");
    return `${currentYear}-${month}-${day}`;
  });

  // --- LLAMADAS A API ---
  const fetchWeather = async (city) => {
    try {
      // Obtener coordenadas de la ciudad
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
      const geoData = await geoRes.json();
      const place = geoData.results?.[0];
      if (!place) throw new Error("Ciudad no encontrada");

      const { latitude, longitude } = place;

      // Obtener clima (forecast_days=16 permite el rango máximo gratuito)
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=precipitation_probability_max&timezone=auto&forecast_days=16`
      );
      const data = await res.json();

      const formatted = {};
      days.forEach((date) => {
        const i = data?.daily?.time?.indexOf(date);
        formatted[date] = {
          phase: getMoonPhase(date),
          // Si el día está fuera de los 16 días de la API, devolvemos null
          rainProbability: i !== -1 ? data.daily.precipitation_probability_max[i] : null,
        };
      });

      setMonthData(formatted);
      // Seleccionar por defecto el primer día si no hay uno seleccionado
      if (!selectedDate) setSelectedDate(days[0]);
    } catch (err) {
      console.error("Error cargando clima:", err);
    }
  };

  // --- EFECTOS ---
  
  // Al cargar el componente, intentamos geolocalizar o usamos Madrid por defecto
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      () => fetchWeather("Madrid"),
      () => fetchWeather("Madrid")
    );
  }, []);

  // Recargar datos cuando el usuario cambia de mes o año en las flechas
  useEffect(() => {
    if (manualCity) fetchWeather(manualCity);
    else fetchWeather("Madrid");
  }, [currentMonth, currentYear]);

  // Variables auxiliares para la UI lateral
  const selectedData = monthData[selectedDate] || {};
  const recommendation = getRecommendation(selectedData);
  const dayEvents = events.filter((e) => e.date === selectedDate);

  return (
    <div className="min-h-screen bg-[#f5f1e8] px-4">
      <div className="w-full max-w-6xl mx-auto py-6 flex flex-col gap-6 lg:flex-row">
        
        {/* SECCIÓN IZQUIERDA: CALENDARIO */}
        <div className="flex-1">
          <h2 className="text-xl lg:text-2xl font-semibold mb-4">Calendario lunar</h2>

          {/* Buscador de Ciudad con Datalist */}
          <div className="mb-5 flex flex-col lg:flex-row gap-3">
            <Input
              label="Ciudad"
              id="city"
              name="city"
              value={manualCity}
              onChange={(e) => setManualCity(e.target.value)}
              list="cities" 
            />
            <datalist id="cities">
              <option value="Madrid" /><option value="Barcelona" /><option value="Valencia" />
              <option value="Sevilla" /><option value="Bilbao" /><option value="Zaragoza" /><option value="Logroño" />
            </datalist>

            <button
              onClick={() => manualCity && fetchWeather(manualCity)}
              className="px-4 py-2 rounded-md border border-green-700 text-green-900 hover:bg-green-50 transition"
            >
              Actualizar Clima
            </button>
          </div>

          {/* Controles de Navegación de Mes */}
          <div className="flex justify-between items-center mb-3">
            <button onClick={() => {
              if (currentMonth === 0) { setCurrentYear(y => y - 1); setCurrentMonth(11); }
              else { setCurrentMonth(m => m - 1); }
            }}>←</button>
            
            <h3 className="font-semibold capitalize">
              {new Date(currentYear, currentMonth).toLocaleString("es-ES", { month: "long", year: "numeric" })}
            </h3>
            
            <button onClick={() => {
              if (currentMonth === 11) { setCurrentYear(y => y + 1); setCurrentMonth(0); }
              else { setCurrentMonth(m => m + 1); }
            }}>→</button>
          </div>

          {/* Cabecera de Días de la Semana */}
          <div className="grid grid-cols-7 text-center text-xs text-gray-500 mb-2">
            {["L", "M", "X", "J", "V", "S", "D"].map((d) => (
              <div key={d} className="font-bold">{d}</div>
            ))}
          </div>

          {/* Grid de Días del Mes */}
          <div className="grid grid-cols-7 gap-2.5">
            {/* Renderizamos cuadros vacíos para alinear el día 1 correctamente */}
            {Array.from({ length: offset }).map((_, i) => (
              <div key={`empty-${i}`} className="p-2.5 border border-transparent" />
            ))}

            {/* Renderizamos los días reales del mes */}
            {days.map((date) => {
              const data = monthData[date];
              return (
                <div
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`p-2.5 border border-gray-200 rounded-md cursor-pointer transition
                    ${date === selectedDate ? "bg-green-100 border-green-400" : "bg-white hover:bg-gray-50"}
                  `}
                >
                  <div className="text-sm">{date.split("-")[2]}</div>
                  <div className="text-lg">{phaseIcon[data?.phase] || "·"}</div>
                  {/* Barra de color según recomendación */}
                  <div
                    className="h-1 w-full mt-1 rounded"
                    style={{ background: getRecommendation(data).color }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* SECCIÓN DERECHA: BARRA LATERAL DE DETALLES */}
        <div className="w-full lg:w-80 lg:shrink-0">
          <div className="bg-gradient-to-br from-[#68b0ab] to-[#4a7c59] rounded-3xl p-8 text-white shadow-lg">
            <h3 className="text-lg font-semibold mb-3">{selectedDate}</h3>

            <p className="mb-1">🌙 Fase Lunar: {selectedData.phase || "Sin datos"}</p>
            <p className="mb-3">🌧️ Clima: {selectedData.rainProbability ?? "--"}% lluvia</p>

            <div
              className="p-3 rounded-md mb-4 text-gray-800 text-sm font-medium"
              style={{ background: recommendation.color }}
            >
              {recommendation.message}
            </div>

            <h4 className="font-medium mb-2 border-b border-white/20 pb-1">Eventos</h4>
            <div className="space-y-1 mb-4 min-h-[50px]">
              {dayEvents.map((event) => (
                <div key={event.id} className="text-sm">• {event.title}</div>
              ))}
              {dayEvents.length === 0 && <p className="text-xs opacity-60">No hay eventos para hoy</p>}
            </div>

            <button
              onClick={() => setSelectedDate && setEvents([...events, { id: Date.now(), date: selectedDate, title: "Tarea de riego" }])}
              className="w-full rounded-full bg-green-900/40 text-white py-2 border border-white/20 hover:bg-green-900/60 transition"
            >
              + Añadir evento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}