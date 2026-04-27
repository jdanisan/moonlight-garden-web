import { useEffect, useState } from "react";
import { Input } from "../atoms/Input";
import { getMoonPhase } from "../utils/getMoonPhase";

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

// lógica de recomendaciones
const getRecommendation = ({ phase, rainProbability } = {}) => {
  if (!phase) {
    return {
      message: "Cargando datos...",
      color: "#eee",
    };
  }

  if (rainProbability > 70) {
    return {
      message: "Alta probabilidad de lluvia, evita riego",
      color: "#87CEFA",
    };
  }

  if (rainProbability > 50) {
    return {
      message: "Probabilidad de lluvia, evita riego",
      color: "#87CEFF",
    };
  }

  if (phase === "New Moon") {
    return {
      message: "Buen momento para raíces",
      color: "#4CAF50",
    };
  }

  if (phase === "Waxing Crescent") {
    return {
      message: "Ideal para hojas y hierbas",
      color: "#8BC34A",
    };
  }

  return {
    message: "Actividad ligera recomendada",
    color: "#ccc",
  };
};

export default function CalendarView() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [monthData, setMonthData] = useState({});
  const [events, setEvents] = useState([]);
  const [showLocation, setShowLocation] = useState(false);
  const [manualCity, setManualCity] = useState("");

  // estado de mes y año
  const [currentMonth, setCurrentMonth] = useState(3);
  const [currentYear, setCurrentYear] = useState(2026);

  // generar días del mes actual
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const day = String(i + 1).padStart(2, "0");
    const month = String(currentMonth + 1).padStart(2, "0");
    return `${currentYear}-${month}-${day}`;
  });

  const fetchWeather = async (city) => {
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`,
      );
      const geoData = await geoRes.json();

      const place = geoData.results?.[0];
      if (!place) throw new Error("Ciudad no encontrada");

      const { latitude, longitude } = place;

      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=precipitation_probability_max&timezone=auto`,
        // https://api.weatherapi.com/v1/forecast.json?key=6fb0876a5d8144f6b30100754252205&q=${query}&days=30
      );

      const data = await res.json();

      const formatted = {};

      days.forEach((date) => {
        const i = data?.daily?.time?.indexOf(date);

        formatted[date] = {
          phase: getMoonPhase(date),
          rainProbability:
            i !== -1 ? data.daily.precipitation_probability_max[i] : null,
        };
      });

      setMonthData(formatted);
      setSelectedDate(days[0]);
    } catch (err) {
      console.error("Error cargando clima:", err);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      () => fetchWeather("Madrid"),
      () => setShowLocation(true),
    );
  }, []);

  // recargar datos cuando cambia el mes o año
  useEffect(() => {
    if (manualCity) fetchWeather(manualCity);
  }, [currentMonth, currentYear]);

  const selectedData = monthData[selectedDate] || {};
  const recommendation = getRecommendation(selectedData);

  const dayEvents = events.filter((e) => e.date === selectedDate);

  return (
    <div className="min-h-screen bg-[#f5f1e8] px-4">
      <div className="w-full max-w-6xl mx-auto py-6 flex flex-col gap-6 lg:flex-row">
        {/* calendario */}
        <div className="flex-1 ">
          <h2 className="text-xl lg:text-2xl font-semibold mb-4">
            Calendario lunar
          </h2>

          {/* input ciudad */}
          <div className="mb-5  flex flex-col lg:flex-row gap-3">
            <Input
              label="Ciudad"
              id="city"
              name="city"
              value={manualCity}
              onChange={(e) => setManualCity(e.target.value)}
              list="cities"
            />

            <datalist id="cities">
              <option value="Madrid" />
              <option value="Barcelona" />
              <option value="Valencia" />
              <option value="Sevilla" />
              <option value="Bilbao" />
              <option value="Zaragoza" />
              <option value="Logroño" />
            </datalist>

            <button
              onClick={() => manualCity && fetchWeather(manualCity)}
              className=" px-4 py-2 rounded-md border border-green-700 text-green-900 hover:bg-green-50 transition"
            >
              Usar ubicación
            </button>
          </div>

          {/* navegación de mes */}
          <div className="flex justify-between items-center mb-3">
            <button
              onClick={() => {
                setCurrentMonth((m) => {
                  if (m === 0) {
                    setCurrentYear((y) => y - 1);
                    return 11;
                  }
                  return m - 1;
                });
              }}
            >
              ←
            </button>

            <h3 className="font-semibold capitalize">
              {new Date(currentYear, currentMonth).toLocaleString("es-ES", {
                month: "long",
                year: "numeric",
              })}
            </h3>

            <button
              onClick={() => {
                setCurrentMonth((m) => {
                  if (m === 11) {
                    setCurrentYear((y) => y + 1);
                    return 0;
                  }
                  return m + 1;
                });
              }}
            >
              →
            </button>
          </div>

          {/* DÍAS SEMANA */}
          <div className="grid grid-cols-7 text-center text-xs text-gray-500 mb-2">
            {["X", "J", "V", "S", "D", "L", "M"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* calendario */}
          <div className="grid grid-cols-7 gap-2.5">
            {days.map((date) => {
              const data = monthData[date];

              return (
                <div
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`p-2.5 border border-gray-200 rounded-md cursor-pointer transition
                    ${date === selectedDate ? "bg-gray-200" : "bg-white hover:bg-gray-50"}
                  `}
                >
                  <div>{date.split("-")[2]}</div>
                  <div className="text-xs opacity-70">{phaseIcon[data?.phase]}</div>

                  <div
                    className="h-1 w-full mt-1 rounded"
                    style={{
                      background: getRecommendation(data).color,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* sidebar */}
        <div className="w-full lg:w-80 lg:shrink-0">
          <div className="bg-linear-to-br from-[#68b0ab] to-[#4a7c59] rounded-3xl p-8 text-white relative overflow-hidden shadow-lg">
            <h3 className="text-lg font-semibold mb-3">{selectedDate}</h3>

            <p className="mb-1">🌙 Fase Lunar: {selectedData.phase}</p>

            <p className="mb-3">
              🌧️ Clima: {selectedData.rainProbability}% lluvia
            </p>

            <div
              className="p-3 rounded-md mb-4"
              style={{ background: recommendation.color }}
            >
              {recommendation.message}
            </div>

            <h4 className="font-medium mb-2">Eventos</h4>

            <div className="space-y-1 mb-4">
              {dayEvents.map((event) => (
                <div key={event.id}>• {event.title}</div>
              ))}
            </div>

            <button
              onClick={() =>
                setEvents([
                  ...events,
                  {
                    id: Date.now(),
                    date: selectedDate,
                    title: "Regar plantas",
                  },
                ])
              }
              className="w-full rounded-full bg-green-800 text-white py-2 hover:bg-green-700 transition"
            >
              + Añadir evento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
