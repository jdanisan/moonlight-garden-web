export const getMoonPhase = (dateInput) => {
  const date = new Date(dateInput);

  const lunarCycle = 29.53058867;
  const knownNewMoon = new Date("2000-01-06T18:14:00Z");

  const diff = date.getTime() - knownNewMoon.getTime();
  const days = diff / (1000 * 60 * 60 * 24);

  const phase = ((days % lunarCycle) + lunarCycle) % lunarCycle;

  if (phase < 1.84566) return "Luna Nueva";
  if (phase < 5.53699) return "Luna Creciente";
  if (phase < 9.22831) return "Cuarto Creciente";
  if (phase < 12.91963) return "Luna Gibosa Creciente";
  if (phase < 16.61096) return "Luna Llena";
  if (phase < 20.30228) return "Luna Gibosa Menguante";
  if (phase < 23.99361) return "Cuarto Menguante";
  return "Luna Menguante";
};