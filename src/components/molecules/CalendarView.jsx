import { useEffect, useState } from "react";
import { Input } from "../atoms/Input";
import { getMoonPhase } from "../utils/getMoonPhase";
import { useAuth } from "../hook/useAuth";
import { Modal } from "../organism/Modal";
// Firebase imports
import { db } from "../../services/firebase"; 
import { ref, update, onValue } from "firebase/database";

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
  const [events, setEvents] = useState([]); // Cargados de Firebase
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

  // --- PERSISTENCIA: CARGAR DE FIREBASE ---
  useEffect(() => {
    if (!user?.uid) return;
    const userRemindersRef = ref(db, `users/${user.uid}/remmindersItem`);
    const unsubscribe = onValue(userRemindersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedEvents = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setEvents(loadedEvents);
      } else { setEvents([]); }
    });
    return () => unsubscribe();
  }, [user]);

  // --- NAVEGACIÓN ---
  const handlePrevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); } 
    else { setCurrentMonth(currentMonth - 1); }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); } 
    else { setCurrentMonth(currentMonth + 1); }
  };

  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  // --- LLAMADA API ORIGINAL ---
  const fetchWeather = async (city) => {
    const targetCity = city.trim() || "Madrid";
    try {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${targetCity}`);
      const geoData = await geoRes.json();
      const place = geoData.results?.[0];
      if (!place) return;

      const { latitude, longitude } = place;
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=precipitation_probability_max&timezone=auto&forecast_days=16`);
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
    } catch (err) { console.error("Error cargando clima:", err); }
  };

  useEffect(() => { fetchWeather(manualCity); }, [currentMonth, currentYear]);

  // --- GUARDADO EN FIREBASE ---
  const handleAddEvent = async () => {
    if (!user) { setShowAuthModal(true); return; }
    if (!newEventTitle.trim() || !selectedDate) return;

    try {
      const eventId = Date.now();
      const updates = {};
      updates[`users/${user.uid}/remmindersItem/${eventId}`] = {
        date: selectedDate,
        title: newEventTitle,
        createdAt: eventId
      };
      await update(ref(db), updates);
      setNewEventTitle("");
    } catch (err) { console.error(err); }
  };

  const selectedData = monthData[selectedDate] || {};
  const recommendation = getRecommendation(selectedData);
  const dayEvents = events.filter((e) => e.date === selectedDate);

  return (
    <div className="min-h-fit bg-[#f5f1e8] px-4">
      {showAuthModal && <Modal type="form-user" onClose={() => setShowAuthModal(false)} />}

      <div className="w-full max-w-6xl mx-auto py-6 flex flex-col gap-6 lg:flex-row">
        
        {/* CALENDARIO (ESTILO ORIGINAL) */}
        <div className="flex-1 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{monthNames[currentMonth]}</h2>
              <span className="text-gray-400 font-medium">{currentYear}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded-full transition">⬅️</button>
              <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-full transition">➡️</button>
            </div>
          </div>

          <div className="mb-8 flex gap-3 items-end">
            <div className="flex-1">
              <Input
                label="Ciudad"
                id="city"
                placeholder="Ej: Madrid..."
                value={manualCity}
                onChange={(e) => setManualCity(e.target.value)}
                list="cities"
              />
              <datalist id="cities">
                <option value="Madrid" /><option value="Barcelona" /><option value="Valencia" />
              </datalist>
            </div>
            <button 
              onClick={() => fetchWeather(manualCity)}
              className="px-6 py-2.5 bg-green-700 text-white rounded-xl font-bold text-sm hover:bg-green-800 transition"
            >
              Buscar
            </button>
          </div>

          <div className="grid grid-cols-7 mb-4 border-b border-gray-100 pb-2">
            {["L", "M", "X", "J", "V", "S", "D"].map((d) => (
              <div key={d} className="text-center text-xs font-bold text-gray-400 tracking-widest">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: offset }).map((_, i) => <div key={`empty-${i}`} />)}
            {days.map((date) => {
              const data = monthData[date];
              const isSelected = date === selectedDate;
              const hasEvents = events.some(e => e.date === date);
              return (
                <div
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`p-3 border rounded-xl cursor-pointer transition-all flex flex-col items-center
                    ${isSelected ? "bg-green-50 border-green-500 ring-1 ring-green-500" : "bg-white hover:border-green-300 border-gray-100"}
                  `}
                >
                  <div className={`text-xs font-bold ${isSelected ? "text-green-700" : "text-gray-400"}`}>{date.split("-")[2]}</div>
                  <div className="text-xl my-1">{phaseIcon[data?.phase] || "·"}</div>
                  <div className="flex gap-1">
                    <div className="h-1 w-4 rounded-full" style={{ background: getRecommendation(data).color }} />
                    {hasEvents && <div className="h-1 w-1 bg-green-600 rounded-full" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PANEL LATERAL (ESTILO ORIGINAL RESTAURADO) */}
        <div className="w-full lg:w-80 flex flex-col gap-4">
          <div className="bg-gradient-to-br from-[#68b0ab] to-[#4a7c59] rounded-3xl p-6 text-white shadow-lg">
            <h3 className="text-lg font-bold mb-4">
              {selectedDate ? new Date(selectedDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }) : "Hoy"}
            </h3>
            
            <div className="bg-white/10 rounded-2xl p-4 mb-6 text-sm space-y-2">
              <p>🌙 {selectedData.phase || "Fase desconocida"}</p>
              <p>🌧️ Lluvia: {selectedData.rainProbability ?? "--"}%</p>
              <div className="mt-4 p-2 rounded-lg text-center text-[10px] font-bold uppercase" style={{ background: recommendation.color, color: '#1a3a2a' }}>
                {recommendation.message}
              </div>
            </div>

            {/* Listado de tareas del día */}
            <div className="mb-4 space-y-2 max-h-40 overflow-y-auto">
              {dayEvents.map(event => (
                <div key={event.id} className="bg-white/20 p-2 rounded-lg text-xs border border-white/10">
                  {event.title}
                </div>
              ))}
            </div>

            <input
              type="text"
              placeholder="Nueva tarea..."
              className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-2 text-sm mb-2 outline-none placeholder:text-white/50"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
            />
            <button onClick={handleAddEvent} className="w-full rounded-xl bg-green-900 py-3 text-sm font-bold shadow-md hover:bg-green-950 transition-all">
              + Recordatorio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}