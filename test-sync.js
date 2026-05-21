import fs from 'fs';
import path from 'path';

// 1. Cargar .env.local
const envPath = path.resolve('.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf-8').split('\n');
  envConfig.forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let val = match[2].trim();
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
      process.env[key] = val;
    }
  });
}

// 2. Ejecutar la función
(async () => {
  // Importamos dinámicamente el handler DESPUÉS de cargar las variables
  const { default: handler } = await import('./api/cron-prices.js');
  console.log("🚀 Iniciando volcado de datos inicial en Supabase...");
  const mockRes = {
    status: (code) => ({
      json: (data) => {
        console.log(`✅ [HTTP ${code}] Respuesta de la función:`, data);
        return data;
      }
    })
  };
  await handler({}, mockRes);
  console.log("🎉 Proceso finalizado.");
})();
