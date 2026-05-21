import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// Petición con reintentos y cabeceras de navegador para que la API europea no bloquee
async function fetchWithRetry(url, maxRetries = 3, delayMs = 2000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Intento ${attempt}/${maxRetries}: ${url}`);
      const response = await fetch(url, {
        headers: {
          "Accept": "application/json, text/plain, */*",
          "Accept-Language": "es-ES,es;q=0.9",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          "Referer": "https://agridata.ec.europa.eu/",
          "Origin": "https://agridata.ec.europa.eu",
        },
        signal: AbortSignal.timeout(30000),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.warn(`Intento ${attempt} fallido:`, err.message);
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, delayMs * attempt));
      } else {
        throw err;
      }
    }
  }
}

export default async function handler(req, res) {
  const beginDate = "01/01/2024"; 
  const endDate = "31/12/2026";  

  const url = `https://api.tech.ec.europa.eu/agrifood/api/fruitAndVegetable/pricesSupplyChain?memberStateCodes=ES&beginDate=${beginDate}&endDate=${endDate}`;

  try {
    console.log("Obteniendo datos de la API Europea...");
    let apiData;

    try {
      apiData = await fetchWithRetry(url);
    } catch (fetchError) {
      console.error("❌ La API europea no respondió tras varios intentos:", fetchError.message);
      return res.status(502).json({
        error: "No se pudo conectar con la API europea.",
        detalle: fetchError.message,
      });
    }

    if (!Array.isArray(apiData)) {
      console.error("Respuesta inesperada de la API:", JSON.stringify(apiData).slice(0, 300));
      return res.status(502).json({ error: "La API devolvió un formato inesperado." });
    }

    if (apiData.length === 0) {
      return res.status(200).json({ message: "La API no devolvió datos para el período solicitado." });
    }

    console.log(`✅ Recibidos ${apiData.length} registros.`);

    const datosParaGuardar = apiData.map((item) => ({
      member_state_code: item.memberStateCode ?? null,
      member_state_name: item.memberStateName ?? null,
      begin_date:        item.beginDate ?? null,
      end_date:          item.endDate ?? null,
      price:             item.price != null
                           ? parseFloat(item.price.replace(/[^0-9.]/g, ""))
                           : null,
      unit:              item.unit ?? null,
      period_type:       item.periodType ?? null,
      period:            item.period ?? null,
      product_stage:     item.productStage ?? null,
      product:           item.product ?? null,
      variety:           item.variety ?? null,
      market:            item.market ?? null,
      is_calculated:     item.isCalculated ?? null,
      is_regulated:      item.isRegulated ?? null,
    }));

    const BATCH_SIZE = 500;
    let totalInsertados = 0;
    let errores = [];

    console.log("🗑️ Limpiando datos anteriores...");
    const { error: deleteError } = await supabase
      .from("agricultural_prices")
      .delete()
      .eq("member_state_code", "ES");

    if (deleteError) {
      console.warn("⚠️ Aviso al limpiar datos:", deleteError.message);
    }

    console.log("📥 Insertando datos en Supabase por lotes...");
    for (let i = 0; i < datosParaGuardar.length; i += BATCH_SIZE) {
      const lote = datosParaGuardar.slice(i, i + BATCH_SIZE);
      const { error: insertError } = await supabase
        .from("agricultural_prices")
        .insert(lote);

      if (insertError) {
        console.error(`Error en lote ${i / BATCH_SIZE + 1}:`, insertError.message);
        errores.push({ lote: i / BATCH_SIZE + 1, error: insertError.message });
      } else {
        totalInsertados += lote.length;
        console.log(`  ✓ Lote ${i / BATCH_SIZE + 1}: ${lote.length} registros insertados`);
      }
    }

    console.log(`🎉 Sincronización completada. ${totalInsertados}/${apiData.length} registros insertados.`);
    return res.status(200).json({
      message: "Sincronización completada",
      registros_recibidos: apiData.length,
      registros_insertados: totalInsertados,
      errores: errores.length > 0 ? errores : undefined,
    });

  } catch (error) {
    console.error("💥 Error inesperado en el cron job:", error);
    return res.status(500).json({ error: error.message });
  }
}