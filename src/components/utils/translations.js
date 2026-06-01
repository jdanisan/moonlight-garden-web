export const TRANSLATIONS = {
  // Estadísticas (AgriDashboard) - Nombres Originales en Inglés
  "Ex-packaging station price": "Precio salida empaquetado",
  "Farmgate price": "Precio en origen (Granja)",
  "Wholesale price": "Precio mayorista",
  "Retail buying price": "Precio minorista",
  "Apples - All types and varieties": "Manzanas",
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
  "Apples - Conference": "Peras Conference",

  // Nombres de Productos (Base de Datos)
  "Acelga": "Acelga",
  "Pera agua": "Pera de agua",
  "Pimiento verde": "Pimiento verde",
  "Platano": "Plátano",
  "Tomate": "Tomate",
  "Zanahoria": "Zanahoria",
  "Lechuga romana": "Lechuga romana",
  "Manzanas - Fuji": "Manzana Fuji",
  "Manzanas - Gala": "Manzana Gala",
  "Manzanas  - Granny smith": "Manzana Granny Smith",
  "Albaricoques - All types": "Albaricoque",
  "Calabacin": "Calabacín",
  "Aguacate - Hass": "Aguacate Hass",
  "Coliflores - All types": "Coliflor",
  "Pepinos - Smooth": "Pepino liso",
  "Champiñoñes": "Champiñones",
  "Ajo morado": "Ajo morado",
  "Ajo blanco": "Ajo blanco",
  "Puerros": "Puerro",
  "Naranjas - Lanelate": "Naranja Lanelate",
  "Naranjas - Navelate": "Naranja Navelate",
  "Naranjas - Valencia late": "Naranja Valencia Late",
  "Cebolla": "Cebolla",
  "Melocotón - Yellow flesh": "Melocotón (Pulpa amarilla)",
  "Pera - Blanquilla": "Pera Blanquilla",
  "Pera - Conference": "Pera Conference",
  "Fresas - All types": "Fresas",
  "Tomates - Cherry": "Tomate Cherry",
  "Tomates - Trusses": "Tomate en rama",
  "Naranjas - Salustiana": "Naranja Salustiana",
  "Naranjas - Tarocco": "Naranja Tarocco",
  "Bananas": "Plátano",
  "Nectarinas - White flesh": "Nectarina (Pulpa blanca)",
  "Clementina": "Clementina",
  "Melocotones - Selection A/B": "Melocotón",
  "Pera - Williams": "Pera Williams",
  "Uvas - Con semillas": "Uvas con semillas",
  "Albaricoques - Large packaging": "Albaricoque",
  "Coliflores - Todas las variedades": "Coliflor",
  "Champiñones - Cerrados": "Champiñón cerrado",
  "Nectarinas - National average": "Nectarina",
  "Manzanas - Fuji National": "Manzana Fuji",
  "Judia Verde": "Judía verde",
  "Limon": "Limón",
  "Manzana golden": "Manzana Golden",
  "Naranja navel": "Naranja Navel",
  "Patata": "Patata",

  // Tipos genéricos
  "fruit": "Fruta",
  "vegetable": "Verdura",
  "herb": "Hierba aromática",
  "Fruta": "Fruta",
  "Hortaliza": "Hortaliza",
  "Hongo": "Hongo",

  // Fases lunares
  "Full Moon": "Luna Llena",
  "New Moon": "Luna Nueva",
  "First Quarter": "Cuarto Creciente",
  "Last Quarter": "Cuarto Menguante",
  "Luna Creciente": "Luna Creciente",
  "Luna Llena": "Luna Llena",
  "Luna Menguante": "Luna Menguante",
  "Luna Nueva": "Luna Nueva",
  "Cuarto Creciente": "Cuarto Creciente",
  "Cuarto Menguante": "Cuarto Menguante",

  // Temporadas
  "primavera": "Primavera",
  "verano": "Verano",
  "otoño": "Otoño",
  "invierno": "Invierno",
  "todo el año": "Todo el año"
};

export const t = (text) => {
  if (!text) return text;
  
  // Limpiar espacios en blanco adicionales al principio y al final (evita fallos por 'Luna Creciente ')
  const cleanText = String(text).trim();

  // Coincidencia exacta
  if (TRANSLATIONS[cleanText]) return TRANSLATIONS[cleanText];
  
  // Coincidencia en minúsculas
  const lowerText = cleanText.toLowerCase();
  if (TRANSLATIONS[lowerText]) return TRANSLATIONS[lowerText];

  // Coincidencia capitalizada (por si acaso)
  const capitalized = lowerText.charAt(0).toUpperCase() + lowerText.slice(1);
  if (TRANSLATIONS[capitalized]) return TRANSLATIONS[capitalized];

  // Si no está en el diccionario, intentamos quitar guiones bajos
  if (typeof text === 'string' && text.includes('_')) {
    return text.replaceAll('_', ' ');
  }

  return cleanText;
};
