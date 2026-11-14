/* =========================================================
   CATÁLOGO · datos editables
   Cambia aquí precios, diseños, funciones y preguntas.
   ========================================================= */
const WHATSAPP = "59165060795";

const DISENOS = [
  { id: "boda-valeria-mateo", cat: "boda", catTxt: "Boda", nombre: "Olivo", ejemplo: "Valeria & Mateo", texto: "Elegante y natural, con ramas verdes y letra caligráfica.", invitado: true },
  { id: "xv-isabella", cat: "xv", catTxt: "XV años", nombre: "Rosa Brillo", ejemplo: "Isabella", texto: "Rosado y dorado con destellos, para una noche de gala.", invitado: true },
  { id: "graduacion-sebastian", cat: "grado", catTxt: "Graduación", nombre: "Medianoche", ejemplo: "Sebastián Rojas", texto: "Azul noche y dorado, sobrio y moderno." },
  { id: "bautizo-emilia", cat: "bautizo", catTxt: "Bautizo", nombre: "Cielo", ejemplo: "Emilia", texto: "Celeste suave con nubes, tierno y delicado." },
  { id: "cumple-tomas", cat: "cumple", catTxt: "Cumpleaños", nombre: "Fiesta", ejemplo: "Tomás cumple 5", texto: "Colorido y con globos. Ideal para cumpleaños y fiestas." },
  { id: "save-the-date", cat: "std", catTxt: "Save the date", nombre: "Lino", ejemplo: "Andrea & Lucas", texto: "Minimalista, para anunciar la fecha antes de la invitación." },
];

const ic = {
  sobre: '<path d="M3 7l9 6 9-6M3 7v10h18V7z"/>',
  musica: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  reloj: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9 2h6"/>',
  mapa: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  lista: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  ropa: '<path d="M8 3l4 3 4-3 5 4-3 3v11H6V10L3 7z"/>',
  regalo: '<rect x="3" y="8" width="18" height="5" rx="1"/><path d="M5 13v8h14v-8M12 8v13"/>',
  wa: '<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/>',
  persona: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  ticket: '<path d="M3 8a2 2 0 0 0 0 4v4h18v-4a2 2 0 0 1 0-4V4H3z"/><path d="M13 4v16"/>',
  qr: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 20v.01"/>',
  pregunta: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14M12 17h.01"/>',
  foto: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M21 16l-5-5-8 8"/>',
  cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  cama: '<path d="M3 19V7M3 15h18v4M21 15v-3a3 3 0 0 0-3-3h-7v6"/>',
  camara: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  planilla: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M4 9h16M4 15h16M10 3v18"/>',
  paleta: '<circle cx="12" cy="12" r="9"/><circle cx="8" cy="10" r="1.2"/><circle cx="12" cy="7.5" r="1.2"/><circle cx="16" cy="10" r="1.2"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h10"/>',
  corazon: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
};

const FUNCIONES = [
  ["sobre", "Apertura tipo sobre", "La invitación se abre como una carta, con el nombre del invitado."],
  ["musica", "Música de fondo", "La canción que elijas suena al abrir la invitación."],
  ["reloj", "Cuenta regresiva", "Días, horas y minutos para el gran día."],
  ["mapa", "Ubicación en Google Maps", "Un toque y tus invitados llegan sin perderse."],
  ["cal", "Agendar en Google Calendar", "Guardan la fecha en su calendario con un botón."],
  ["lista", "Itinerario", "Ceremonia, cena, vals y fiesta, hora por hora."],
  ["ropa", "Código de vestimenta", "Con paleta de colores sugeridos."],
  ["corazon", "Padres, padrinos e historia", "Mensaje especial y la historia de la pareja."],
  ["foto", "Galería de fotos", "Hasta 20 fotos de tu sesión."],
  ["regalo", "Sugerencia de regalos", "Mesa de regalos, cuenta bancaria y QR de pago."],
  ["cama", "Sugerencia de hospedaje", "Hoteles cercanos para quienes viajan."],
  ["camara", "Compartir fotos y videos", "Botón al álbum compartido y hashtag del evento."],
  ["persona", "Nombre de cada invitado", "Link personal con nombre, pases y mesa."],
  ["ticket", "Pases y número de mesa", "Controla cuántas personas confirma cada invitado."],
  ["qr", "Pase con código QR", "Cada invitado recibe su pase para la entrada."],
  ["pregunta", "Cuestionario divertido", "Preguntas a tu medida y el botón \"No\" que se escapa.", "Exclusivo"],
  ["wa", "Confirmación por WhatsApp", "Te llega un mensaje listo con los datos del invitado."],
  ["planilla", "Confirmación en planilla", "Las respuestas se guardan solas en tu Google Sheets."],
  ["paleta", "Colores a tu gusto", "Adaptamos el diseño a la paleta de tu evento."],
  ["menu", "Menú de navegación", "Secciones claras: evento, fotos, regalos, confirmar."],
];

// [nombre, esencial, completo, premium]  (true / false / texto)
const TABLA = [
  ["Diseño del catálogo con tus colores", true, true, true],
  ["Apertura tipo sobre", true, true, true],
  ["Cuenta regresiva", true, true, true],
  ["Ubicación en Google Maps", true, true, true],
  ["Itinerario y código de vestimenta", true, true, true],
  ["Sugerencia de regalos y QR de pago", true, true, true],
  ["Confirmación por WhatsApp", true, true, true],
  ["Envíos ilimitados", true, true, true],
  ["Galería de fotos", "6 fotos", "12 fotos", "20 fotos"],
  ["Música de fondo", false, true, true],
  ["Agendar en Google Calendar", false, true, true],
  ["Padres, padrinos e historia", false, true, true],
  ["Nombre de cada invitado (link personal)", false, true, true],
  ["Pases y número de mesa", false, true, true],
  ["Cuestionario divertido con botón \"No\"", false, false, true],
  ["Pase personal con código QR", false, false, true],
  ["Confirmación en planilla de Google", false, false, true],
  ["Sugerencia de hospedaje", false, false, true],
  ["Botón para compartir fotos y videos", false, false, true],
  ["Menú de navegación", false, false, true],
  ["Rondas de cambios antes de entregar", "2", "3", "Ilimitadas"],
  ["En línea después del evento", "30 días", "60 días", "90 días"],
];

const PLANES = [
  { nombre: "Esencial", bs: 480, usd: 69, texto: "Todo lo necesario para invitar con estilo.",
    puntos: ["Diseño del catálogo con tus colores", "Sobre, cuenta regresiva y ubicación", "Itinerario, vestimenta y regalos", "Confirmación por WhatsApp", "Galería de 6 fotos"] },
  { nombre: "Completo", bs: 690, usd: 99, texto: "Para que cada invitado se sienta especial.",
    puntos: ["Todo lo del Esencial", "Música de fondo", "Nombre de cada invitado, pases y mesa", "Padres, padrinos e historia", "Agendar en Google Calendar", "Galería de 12 fotos"] },
  { nombre: "Premium", bs: 890, usd: 128, destacado: true, badge: "El más divertido", texto: "La experiencia completa, con nuestro sello.",
    puntos: ["Todo lo del Completo", "Cuestionario con el botón \"No\" que se escapa", "Pase personal con código QR", "Confirmación en planilla de Google", "Hospedaje y álbum compartido", "Galería de 20 fotos y cambios ilimitados"] },
];

const EXTRAS = [
  ["Entrega express", 200, 29, "Tu invitación lista en 48 horas."],
  ["Save the date web", 200, 29, "Mini sitio para anunciar la fecha, con cuenta regresiva y pre-confirmación."],
  ["Versión adicional", 250, 36, "Otra versión de tu invitación: en inglés, solo recepción u otra adaptación."],
  ["Preguntas extra en el cuestionario", 40, 6, "Por cada pregunta adicional con sus respuestas."],
  ["Invitación en imagen", 60, 9, "Una imagen a juego para enviar por WhatsApp o subir a historias."],
  ["Invitación en PDF interactivo", 100, 15, "Versión PDF con botones a la ubicación y a WhatsApp."],
  ["Dominio propio", 450, 65, "Tu invitación en una dirección como www.anayluis.com, por un año."],
  ["Más tiempo en línea", 100, 15, "Tu invitación activa 3 meses más."],
  ["Ajustes después de entregar", 50, 8, "Cambios menores de textos, fechas o fotos ya entregada la invitación."],
  ["Diseño desde cero", 800, 115, "Un diseño exclusivo creado a partir de tus ideas y referencias."],
];

const FAQ = [
  ["¿Qué es una invitación web?", "Es una página web real, hecha solo para tu evento. Tus invitados la abren desde un link en el celular, sin descargar nada. A diferencia de una imagen o un PDF, tiene música, botones, cuenta regresiva, mapa y confirmación de asistencia."],
  ["¿Cómo la envío a mis invitados?", "Te entregamos un link que puedes enviar por WhatsApp, Instagram, Facebook o correo, a todas las personas que quieras. Los envíos son ilimitados."],
  ["¿Puede salir el nombre de cada invitado?", "Sí, en los paquetes Completo y Premium. Cada invitado recibe un link personal con su nombre, número de pases y mesa. Te entregamos la lista de links lista para enviar."],
  ["¿Cómo me llegan las confirmaciones?", "Por WhatsApp: el invitado llena el formulario y te llega un mensaje con todos sus datos y sus respuestas del cuestionario. En el Premium, además, se guardan en una planilla de Google para que lleves la cuenta."],
  ["¿Puedo poner mis propias preguntas en el cuestionario?", "¡Claro! Nos cuentas tus preguntas y respuestas graciosas, y cuáles son \"trampa\" (como el vestido blanco en una boda). Las escribimos con el estilo de tu invitación."],
  ["¿Qué música puedo poner?", "La canción que quieras que esté en YouTube. Suena cuando el invitado abre la invitación y tiene un botón para pausarla."],
  ["¿Cuánto tarda?", "De 3 a 5 días hábiles desde que nos envías todos los datos. Con entrega express, en 48 horas."],
  ["¿Puedo pedir cambios?", "Sí. Cada paquete incluye rondas de cambios antes de entregar. Después de entregada, los ajustes menores tienen un costo pequeño."],
  ["¿Cómo pago?", "Reservas con Bs 150 por QR o transferencia, y pagas el resto cuando tu invitación esté lista y aprobada."],
];

/* =========================================================
   RENDER
   ========================================================= */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const svg = (k) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ic[k]}</svg>`;
const wa = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
let moneda = "bs";

// Diseños
$("#listaDisenos").innerHTML = DISENOS.map((d) => `
  <article class="diseno" data-cat="${d.cat}">
    <a class="vista" href="demos/${d.id}/index.html"><img src="img/${d.id}.jpg" alt="Diseño ${d.nombre}: ${d.ejemplo}" loading="lazy"></a>
    <div class="info">
      <span class="cat">${d.catTxt}</span>
      <h3>${d.nombre}</h3>
      <p>${d.texto}</p>
    </div>
    <div class="acc">
      <a class="btn btn-primario" href="demos/${d.id}/index.html">Ver ejemplo</a>
      ${d.invitado ? `<a class="btn btn-borde" href="demos/${d.id}/index.html?para=Familia%20Guti%C3%A9rrez&pases=4&mesa=7">Como invitado</a>` : `<a class="btn btn-borde" href="${wa(`Hola, me interesa el diseño ${d.nombre} (${d.catTxt})`)}" target="_blank" rel="noopener">Lo quiero</a>`}
    </div>
  </article>`).join("");

$$(".filtro").forEach((b) => (b.onclick = () => {
  $$(".filtro").forEach((x) => x.classList.toggle("on", x === b));
  $$(".diseno").forEach((d) => (d.hidden = b.dataset.f !== "todos" && d.dataset.cat !== b.dataset.f));
}));

// Funciones
$("#listaFunciones").innerHTML = FUNCIONES.map(([k, t, p, tag]) => `
  <div class="funcion"><span class="ic">${svg(k)}</span><div><h3>${t}</h3><p>${p}</p>${tag ? `<span class="tag">${tag}</span>` : ""}</div></div>`).join("");

// Planes y precios
function precio(bs, usd) { return moneda === "bs" ? `<small>Bs</small>${bs.toLocaleString("es-BO")}` : `<small>USD</small>${usd}`; }
function render() {
  $("#planes").innerHTML = PLANES.map((p) => `
    <article class="plan ${p.destacado ? "destacado" : ""}">
      ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
      <h3>${p.nombre}</h3>
      <p class="gris">${p.texto}</p>
      <p class="precio">${precio(p.bs, p.usd)}</p>
      <ul>${p.puntos.map((x) => `<li>${x}</li>`).join("")}</ul>
      <a class="btn btn-primario" href="${wa(`Hola, quiero el paquete ${p.nombre} para mi invitación web`)}" target="_blank" rel="noopener">Quiero el ${p.nombre}</a>
    </article>`).join("");
  $("#listaExtras").innerHTML = EXTRAS.map(([t, bs, usd, p]) => `
    <div class="extra"><div class="fila"><h3>${t}</h3><span class="monto">+ ${moneda === "bs" ? `Bs ${bs}` : `$${usd}`}</span></div><p>${p}</p></div>`).join("");
  $$("[data-precio]").forEach((el) => { const [bs, usd] = el.dataset.precio.split("|"); el.textContent = moneda === "bs" ? `Bs ${bs}` : `USD ${usd}`; });
}
$$(".moneda button").forEach((b) => (b.onclick = () => {
  moneda = b.dataset.m;
  $$(".moneda button").forEach((x) => x.classList.toggle("on", x === b));
  render();
}));
render();

// Tabla comparativa
const celda = (v) => (v === true ? '<td class="si">✓</td>' : v === false ? '<td class="no">—</td>' : `<td>${v}</td>`);
$("#tabla").innerHTML = `<thead><tr><th>Incluye</th>${PLANES.map((p) => `<th>${p.nombre}</th>`).join("")}</tr></thead>
  <tbody>${TABLA.map(([n, ...v]) => `<tr><td>${n}</td>${v.map(celda).join("")}</tr>`).join("")}</tbody>`;

// Preguntas
$("#faq").innerHTML = FAQ.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("");

// Botones de WhatsApp
$$("[data-wa]").forEach((a) => { a.href = wa(a.dataset.wa); a.target = "_blank"; a.rel = "noopener"; });
