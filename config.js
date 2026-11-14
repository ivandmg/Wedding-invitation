/* =========================================================
   CONFIGURACIÓN DE LA INVITACIÓN
   Cambia aquí todos los datos de la boda. No hace falta tocar
   el resto de los archivos.
   ========================================================= */
window.BODA = {
  novia: "Carolina",
  novio: "Iván",

  // Fecha y hora de la ceremonia (formato: AAAA-MM-DDTHH:MM, hora local)
  fecha: "2027-04-10T17:00",
  fechaTexto: "Sábado 10 de abril de 2027",

  // Frase de portada
  frase: "Dos caminos que se encuentran para volverse uno solo.",

  // Fotos: pon tus imágenes en la carpeta /fotos y escribe aquí sus nombres.
  // Si una foto no existe, se mostrará un recuadro elegante de reemplazo.
  fotoPortada: "fotos/portada.jpg",
  // Cada foto puede ser "ruta.jpg" o { src: "ruta.jpg", pos: "30% center" } para elegir qué parte se ve
  galeria: [
    "fotos/beso.jpg",
    { src: "fotos/mirada.jpg", pos: "30% center" },
    "fotos/anillo.jpg",
    "fotos/portada.jpg",
    "fotos/casual.jpg",
    "fotos/propuesta.jpg",
  ],

  // "foto" es opcional en cada momento
  historia: [
    { anio: "2019", titulo: "Nos conocimos", texto: "Y desde entonces, todo fue más bonito (y más divertido).", foto: "fotos/casual.jpg" },
    { anio: "2021", titulo: "Nuestro día a día", texto: "Risas, comida y planes que siempre terminan en algo nuevo.", foto: "fotos/mirada.jpg", pos: "30% center" },
    { anio: "2026", titulo: "La propuesta", texto: "Bajo los árboles, entre velas y flores. Dijo que sí (y sin necesidad de cuestionario).", foto: "fotos/propuesta.jpg" },
    { anio: "2027", titulo: "¡Nos casamos!", texto: "Y queremos que estés ahí.", foto: "fotos/anillo.jpg" },
  ],

  ceremonia: {
    lugar: "Local Volare",
    direccion: "Dirección por confirmar",
    hora: "5:00 PM",
    mapa: "https://maps.google.com/?q=Local+Volare",
  },
  recepcion: {
    lugar: "Local Volare",
    direccion: "Dirección por confirmar",
    hora: "7:00 PM",
    mapa: "https://maps.google.com/?q=Local+Volare",
  },

  itinerario: [
    { hora: "5:00 PM", evento: "Ceremonia religiosa" },
    { hora: "6:30 PM", evento: "Cóctel de bienvenida" },
    { hora: "7:30 PM", evento: "Recepción y cena" },
    { hora: "9:00 PM", evento: "Primer baile" },
    { hora: "9:30 PM", evento: "¡A bailar!" },
  ],

  vestimenta: "Formal / Etiqueta. Por favor evita el color blanco (sí, lo vamos a preguntar 👀).",

  regalos: {
    texto: "Tu presencia es nuestro mejor regalo, pero si deseas tener un detalle con nosotros:",
    opciones: [
      { icono: "🎁", nombre: "Mesa de regalos", detalle: "En Multicenter, a nombre de Iván & Carolina.", link: "" },
      {
        icono: "💸",
        nombre: "Regalo en efectivo",
        detalle: "Escanea el QR desde la app de tu banco.",
        qr: "fotos/qr-bnb.png",
        titular: "Ivan Daniel Melgar Gumucio",
        banco: "Banco Nacional de Bolivia (BNB)",
        cuenta: "2503033073",
      },
    ],
  },

  // Música de fondo (video de YouTube). Empieza al tocar "Abrir invitación".
  // youtube: el código que va después de "watch?v=" en el link del video.
  musica: {
    titulo: "Ordinary · Alex Warren",
    youtube: "Q2NePVoGxYg",
    inicio: 0, // segundo en el que empieza la canción
  },

  // Fecha límite para confirmar
  confirmarAntes: "1 de marzo de 2027",

  // A dónde llegan las confirmaciones:
  // - whatsapp: número con código de país, sin + ni espacios (ej. 5215512345678)
  // - formspree: (opcional) URL de un formulario de https://formspree.io para recibirlas por correo.
  //   Si lo llenas, se usa en lugar de WhatsApp.
  whatsapp: "59165060795",
  formspree: "",
};
