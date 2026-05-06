import { useEffect, useState } from "react";
import { Input } from "../atoms/Input";
import { getMoonPhase } from "../utils/getMoonPhase";
import { useAuth } from "../hook/useAuth";
import { Modal } from "../organism/Modal";

const phaseIcon = {
  "Luna Nueva": "🌑",
  "Luna Creciente": "🌒",
  "Cuarto Creciente": "🌓",
  "Luna Gibosa Creciente": "🌔",
  "Luna Llena": "🌕",
  "Luna Gibosa Menguante": "🌖",
  "Cuarto Menguante": "🌗",
  "Luna Menguante": "🌘",
};

const getRecommendation = ({ phase, rainProbability } = {}) => {
  if (!phase) return { message: "Cargando datos...", color: "#eee" };
  if (rainProbability > 70) return { message: "Alta probabilidad de lluvia, evita riego", color: "#87CEFA" };
  if (rainProbability > 50) return { message: "Probabilidad de lluvia, evita riego", color: "#87CEFF" };
  if (phase === "Luna Nueva") return { message: "Buen momento para raíces", color: "#4CAF50" };
  if (phase === "Luna Creciente") return { message: "Ideal para hojas y hierbas", color: "#8BC34A" };
  return { message: "Actividad ligera recomendada", color: "#ccc" };
};

export default function CalendarView() {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");

  const now = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [monthData, setMonthData] = useState({});
  const [events, setEvents] = useState([]);
  const [manualCity, setManualCity] = useState("");
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const offset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const day = String(i + 1).padStart(2, "0");
    const month = String(currentMonth + 1).padStart(2, "0");
    return `${currentYear}-${month}-${day}`;
  });

  // ✅ FUNCIÓN CORREGIDA
  const handleAddEvent = async () => {
    if (!user || !user.email) {
      setShowAuthModal(true);
      return;
    }

    if (!newEventTitle.trim() || !selectedDate) return;

    const newEvent = {
      id: Date.now(),
      date: selectedDate,
      title: newEventTitle,
    };

    setEvents([...events, newEvent]);
    setNewEventTitle("");

    //Definimos variables correctamente
    const email = user.email;
    const subject = `🌱 Tarea: ${newEvent.title}`;
    const message = `Recordatorio para el ${selectedDate}: ${newEvent.title}`;

    try {
      console.log("Enviando recordatorio...", { email, subject, message });

      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          subject,
          message,
        }),
      });

      const data = await res.json();
      console.log("Respuesta del servidor:", data);

    } catch (err) {
      console.error("Error enviando email:", err);
    }
  };

  const fetchWeather = async (city) => {
    try {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
      const geoData = await geoRes.json();
      const place = geoData.results?.[0];
      if (!place) throw new Error("Ciudad no encontrada");

      const { latitude, longitude } = place;
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=precipitation_probability_max&timezone=auto&forecast_days=16`
      );
      const data = await res.json();

      const formatted = {};
      days.forEach((date) => {
        const i = data?.daily?.time?.indexOf(date);
        formatted[date] = {
          phase: getMoonPhase(date),
          rainProbability: i !== -1 ? data.daily.precipitation_probability_max[i] : null,
        };
      });

      setMonthData(formatted);
      if (!selectedDate) setSelectedDate(days[0]);
    } catch (err) {
      console.error("Error cargando clima:", err);
    }
  };

  useEffect(() => {
    fetchWeather(manualCity || "Madrid");
  }, [currentMonth, currentYear]);

  const selectedData = monthData[selectedDate] || {};
  const recommendation = getRecommendation(selectedData);
  const dayEvents = events.filter((e) => e.date === selectedDate);

  return (
    <div className="min-h-screen bg-[#f5f1e8] px-4">
      {showAuthModal && (
        <Modal type="form-user" onClose={() => setShowAuthModal(false)} />
      )}

      <div className="w-full max-w-6xl mx-auto py-6 flex flex-col gap-6 lg:flex-row">

        {/* CALENDARIO */}
        <div className="flex-1">
          <h2 className="text-xl lg:text-2xl font-semibold mb-4">Calendario lunar</h2>

          <div className="mb-5 flex flex-col lg:flex-row gap-3">
            <Input
              label="Ciudad"
              id="city"
              value={manualCity}
              onChange={(e) => setManualCity(e.target.value)}
              list="cities"
            />
            <datalist id="cities">
              <option value="Madrid" /><option value="Barcelona" /><option value="Valencia" />
              <option value="Sevilla" /><option value="Bilbao" /><option value="Zaragoza" />
            </datalist>

            <button
              onClick={() => fetchWeather(manualCity || "Madrid")}
              className="mt-6 px-4 py-2 rounded-md border border-green-700 text-green-900 hover:bg-green-50 transition h-fit"
            >
              Actualizar Clima
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2.5">
            {Array.from({ length: offset }).map((_, i) => (
              <div key={`empty-${i}`} className="p-2.5 border border-transparent" />
            ))}

            {days.map((date) => {
              const data = monthData[date];
              const isSelected = date === selectedDate;
              return (
                <div
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`p-2.5 border rounded-md cursor-pointer transition flex flex-col items-center
                    ${isSelected ? "bg-green-100 border-green-400" : "bg-white hover:bg-gray-50 border-gray-200"}
                  `}
                >
                  <div className="text-sm font-medium">{date.split("-")[2]}</div>
                  <div className="text-lg my-1">{phaseIcon[data?.phase] || "·"}</div>
                  <div className="h-1 w-full mt-1 rounded" style={{ background: getRecommendation(data).color }} />
                </div>
              );
            })}
          </div>
        </div>

        {/* PANEL DERECHO */}
        <div className="w-full lg:w-80">
          <div className="bg-gradient-to-br from-[#68b0ab] to-[#4a7c59] rounded-3xl p-8 text-white shadow-lg">

            <h3 className="text-lg font-semibold mb-3">{selectedDate || "Selecciona un día"}</h3>

            <div className="space-y-1 mb-4 text-sm opacity-90">
              <p>🌙 Fase: {selectedData.phase || "Sin datos"}</p>
              <p>🌧️ Lluvia: {selectedData.rainProbability ?? "--"}%</p>
            </div>

            <div className="p-3 rounded-md mb-4 text-gray-800 text-xs font-bold text-center"
              style={{ background: recommendation.color }}>
              {recommendation.message}
            </div>

            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Nombre del evento..."
                className="bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-xs"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
              />
              <button
                onClick={handleAddEvent}
                className="w-full rounded-full bg-green-900 text-white py-2 text-sm font-bold hover:bg-green-950"
              >
                + Añadir recordatorio
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}