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
  galeria: [
    "fotos/1.jpg",
    "fotos/2.jpg",
    "fotos/3.jpg",
    "fotos/4.jpg",
    "fotos/5.jpg",
    "fotos/6.jpg",
  ],

  historia: [
    { anio: "2019", titulo: "Nos conocimos", texto: "Una fiesta a la que ninguno de los dos quería ir." },
    { anio: "2021", titulo: "Primer viaje juntos", texto: "Descubrimos que viajamos igual de bien que nos perdemos." },
    { anio: "2026", titulo: "La propuesta", texto: "Dijo que sí (y sin necesidad de cuestionario)." },
    { anio: "2027", titulo: "¡Nos casamos!", texto: "Y queremos que estés ahí." },
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
      { nombre: "Mesa de regalos Liverpool", detalle: "Evento #12345678", link: "" },
      { nombre: "Transferencia bancaria", detalle: "CLABE 000 000 0000 0000 0000", link: "" },
      { nombre: "Lluvia de sobres", detalle: "El día del evento", link: "" },
    ],
  },

  // Fecha límite para confirmar
  confirmarAntes: "1 de marzo de 2027",

  // A dónde llegan las confirmaciones:
  // - whatsapp: número con código de país, sin + ni espacios (ej. 5215512345678)
  // - formspree: (opcional) URL de un formulario de https://formspree.io para recibirlas por correo.
  //   Si lo llenas, se usa en lugar de WhatsApp.
  whatsapp: "5215500000000",
  formspree: "",
};
