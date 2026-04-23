export const getMoonPhase = (dateInput) => {
  const date = new Date(dateInput);

  const lunarCycle = 29.53058867;
  const knownNewMoon = new Date("2000-01-06T18:14:00Z");

  const diff = date.getTime() - knownNewMoon.getTime();
  const days = diff / (1000 * 60 * 60 * 24);

  const phase = ((days % lunarCycle) + lunarCycle) % lunarCycle;

  if (phase < 1.84566) return "New Moon";
  if (phase < 5.53699) return "Waxing Crescent";
  if (phase < 9.22831) return "First Quarter";
  if (phase < 12.91963) return "Waxing Gibbous";
  if (phase < 16.61096) return "Full Moon";
  if (phase < 20.30228) return "Waning Gibbous";
  if (phase < 23.99361) return "Last Quarter";
  return "Waning Crescent";
};