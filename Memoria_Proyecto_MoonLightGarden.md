# Memoria del Proyecto: MoonLight Garden

## 1. Introducción y Justificación del Proyecto
**MoonLight Garden** es una aplicación web integral diseñada para revolucionar la forma en que los usuarios planifican y gestionan sus actividades de jardinería y agricultura. El proyecto nace de la necesidad de unificar conocimientos ancestrales (la influencia de las fases lunares en los cultivos) con datos meteorológicos en tiempo real y una experiencia de usuario moderna. 

A diferencia de los calendarios agrícolas tradicionales en formato papel o aplicaciones meteorológicas genéricas, MoonLight Garden ofrece una **visión novedosa y original (Originalidad)**: un sistema inteligente que procesa datos astronómicos y meteorológicos para generar recomendaciones específicas (qué plantar, qué evitar, cuándo regar), solucionando un problema real de organización para agricultores aficionados y profesionales.

## 2. Análisis de Alternativas y Decisiones Tecnológicas
A lo largo de las diferentes fases del proyecto, se evaluaron diversas **alternativas tecnológicas (Alternativas presentadas)** para garantizar que la solución final fuese óptima, escalable y estuviese alineada con las demandas actuales del sector informático **(Actualidad)**.

### 2.1. Frontend y UI
*   **Alternativas valoradas:** Angular, Vue.js, y React.
*   **Decisión adoptada:** Se optó por **React 19** junto con **Vite**. Esta decisión se basó en el rendimiento superior del compilador de Vite frente a Webpack, y las nuevas capacidades de React 19. Para el estilizado, en lugar de CSS puro o frameworks pesados como Bootstrap, se implementó **Tailwind CSS v4** por su enfoque de utilidades y su integración perfecta con componentes de React.

### 2.2. Backend y Gestión de Datos
*   **Alternativas valoradas:** Desarrollo de una API REST propia con Node.js/Express y MongoDB, frente a plataformas Backend-as-a-Service (BaaS) como Supabase o Firebase.
*   **Decisión adoptada:** Se seleccionó **Firebase (v12)** debido a su ecosistema unificado. Permite la autenticación segura, base de datos en tiempo real (Firestore), y el despliegue de lógica de servidor mediante **Firebase Cloud Functions** (usado para tareas automatizadas como el envío de emails con **Resend / SendGrid**).

### 2.3. APIs de Datos Astronómicos y Meteorológicos
*   **Alternativas valoradas:** NASA APIs (precisas pero complejas y sin datos meteorológicos integrados), APIs exclusivas lunares (Aztro),  WeatherAPI y open-meteo.
*   **Decisión adoptada:** Se optó por **Open-meteo** dado que su endpoint de astronomía proporciona exactamente los datos requeridos (fase lunar, iluminación, salida/puesta) junto con la previsión meteorológica, optimizando el número de peticiones HTTP necesarias.

## 3. Complejidad y Alcance Técnico
El proyecto presenta un **grado de dificultad alto (Dificultad)**, acorde a las exigencias de un Ciclo Formativo de Grado Superior, ampliando sustancialmente los conocimientos adquiridos en los módulos de Desarrollo Web en Entorno Cliente y Servidor, así como en Diseño de Interfaces Web.

La arquitectura del sistema incluye:
*   **Sistema de Enrutamiento Complejo:** Implementado con `react-router-dom`, gestionando layouts anidados (`MainLayout`) y protegiendo rutas. La aplicación cuenta con módulos de Búsqueda, Calendario Interactivo, Estadísticas (usando `recharts`), Foro de la comunidad y Perfil de Usuario.
*   **Consumo y Sincronización de APIs:** Lógica asíncrona avanzada para cruzar datos del usuario con información de APIs externas de clima y astronomía.
*   **Automatización y Background Jobs:** Uso de funciones Cloud y Cron Jobs para el sistema de alertas y recordatorios vía email, delegando la carga del cliente al servidor.
*   **Virtualización y Rendimiento:** Implementación de técnicas para renderizar eficientemente listas largas de productos o días del calendario, asegurando una experiencia fluida.

## 4. Grado de Resolución de la Propuesta
El proyecto **cumple totalmente con los requerimientos establecidos inicialmente (Grado de resolución)**. 
Se ha logrado construir un ecosistema donde:
1.  El usuario puede visualizar un calendario interactivo con información lunar y climática integrada.
2.  El motor de recomendaciones procesa las fases ("Waxing Crescent", "New Moon", etc.) y cruza esta información con la época del año para sugerir acciones de siembra o poda.
3.  El sistema de eventos permite programar recordatorios que son procesados en el backend y notificados por correo electrónico.

## 5. Resultados Obtenidos y Líneas de Trabajo Futuro
La aplicación ha alcanzado una fase estable de producción, **cumpliendo con solvencia las propuestas planteadas (Resultados obtenidos)** y ofreciendo una interfaz de usuario atractiva, funcional y responsive.

A partir de los resultados obtenidos, se plantean las siguientes **líneas de trabajo futuro**:
1.  **Aplicación Móvil Nativa:** Migración del frontend a React Native para aprovechar capacidades del hardware (notificaciones push nativas, uso offline de caché, ubicación GPS precisa para el clima).
2.  **Machine Learning para Recomendaciones:** Implementar un modelo que aprenda del éxito de las cosechas de los usuarios en el foro para refinar las recomendaciones de siembra.
3.  **Integración IoT:** Permitir la conexión con sensores de humedad del suelo de bajo coste para complementar los datos climáticos de la API con datos reales del terreno del usuario.
