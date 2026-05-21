import fs from 'fs';
import path from 'path';

// Cargar .env.local
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
  console.log("✅ Variables de entorno cargadas desde .env.local");
} else {
  console.error("❌ No se encontró .env.local en la raíz del proyecto");
  process.exit(1);
}

//Ejecutar el handler
(async () => {
  const { default: handler } = await import('./api/cron-prices.js');
  console.log("🚀 Iniciando volcado de datos en Supabase...");
  const mockRes = {
    status: (code) => ({
      json: (data) => {
        console.log(`✅ [HTTP ${code}]`, data);
        return data;
      }
    })
  };
  await handler({}, mockRes);
  console.log("🎉 Proceso finalizado.");
})();