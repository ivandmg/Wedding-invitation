(() => {
  const B = window.BODA;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------------- Rellenar datos ---------------- */
  document.title = `${B.novio} & ${B.novia} · Nuestra Boda`;
  $$("[data-novia]").forEach((e) => (e.textContent = B.novia));
  $$("[data-novio]").forEach((e) => (e.textContent = B.novio));
  $$("[data-nombres]").forEach((e) => (e.textContent = `${B.novio} & ${B.novia}`));
  $$("[data-iniciales]").forEach((e) => (e.textContent = `${B.novio[0]}&${B.novia[0]}`));
  $$("[data-fecha-texto]").forEach((e) => (e.textContent = B.fechaTexto));
  $$("[data-frase]").forEach((e) => (e.textContent = B.frase));
  $$("[data-vestimenta]").forEach((e) => (e.textContent = B.vestimenta));
  $$("[data-regalos-texto]").forEach((e) => (e.textContent = B.regalos.texto));
  $$("[data-confirmar-antes]").forEach((e) => (e.textContent = B.confirmarAntes));

  // Foto de portada (solo si existe)
  const portada = new Image();
  portada.onload = () => ($("#heroBg").style.backgroundImage = `url("${B.fotoPortada}")`);
  portada.src = B.fotoPortada;

  // Historia
  $("#timeline").innerHTML = B.historia
    .map(
      (h) => `<div class="tl-item reveal"><span class="tl-year">${esc(h.anio)}</span><h3>${esc(h.titulo)}</h3><p>${esc(h.texto)}</p>${
        h.foto ? `<img class="tl-foto" src="${esc(h.foto)}" alt="${esc(h.titulo)}" loading="lazy" style="object-position:${esc(h.pos || "center")}" onerror="this.remove()">` : ""
      }</div>`
    )
    .join("");

  // Galería
  const gallery = $("#gallery");
  B.galeria.forEach((item, i) => {
    const src = typeof item === "string" ? item : item.src;
    const fig = document.createElement("figure");
    fig.className = "reveal";
    const img = document.createElement("img");
    img.loading = "lazy";
    img.alt = `Foto ${i + 1}`;
    img.src = src;
    if (item.pos) img.style.objectPosition = item.pos;
    img.onerror = () => {
      fig.innerHTML = `<div class="foto-placeholder">Tu foto aquí</div>`;
      fig.style.cursor = "default";
      fig.onclick = null;
    };
    fig.appendChild(img);
    fig.onclick = () => abrirLightbox(src);
    gallery.appendChild(fig);
  });
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `<img alt="Foto ampliada">`;
  lightbox.onclick = () => lightbox.classList.remove("open");
  document.body.appendChild(lightbox);
  function abrirLightbox(src) {
    $("img", lightbox).src = src;
    lightbox.classList.add("open");
  }

  // Detalles
  const lugarCard = (icono, titulo, d) => `
    <div class="icon">${icono}</div>
    <p class="eyebrow">${titulo}</p>
    <h3>${esc(d.lugar)}</h3>
    <p class="hora">${esc(d.hora)}</p>
    <p>${esc(d.direccion)}</p>
    <a class="btn btn-outline" href="${esc(d.mapa)}" target="_blank" rel="noopener">Ver mapa</a>`;
  $("#card-ceremonia").innerHTML = lugarCard("⛪", "Ceremonia", B.ceremonia);
  $("#card-recepcion").innerHTML = lugarCard("🥂", "Recepción", B.recepcion);
  $$("#card-ceremonia, #card-recepcion").forEach((c) => c.classList.add("reveal"));

  $("#itinerary").innerHTML = B.itinerario.map((i) => `<li><span>${esc(i.hora)}</span><span>${esc(i.evento)}</span></li>`).join("");

  $("#gifts").innerHTML = B.regalos.opciones
    .map(
      (g) => `<article class="card gift reveal">
        <div class="icon">${esc(g.icono || "🎁")}</div>
        <h3>${esc(g.nombre)}</h3>
        <p>${esc(g.detalle)}</p>
        ${g.qr ? `<img class="qr" src="${esc(g.qr)}" alt="Código QR para regalo en efectivo">` : ""}
        ${g.titular ? `<p class="small-print">${esc(g.titular)}<br>${esc(g.banco || "")}</p>` : ""}
        ${g.cuenta ? `<p class="cuenta"><span>Cuenta</span> <strong>${esc(g.cuenta)}</strong></p>
          <button class="btn btn-outline copiar" data-copy="${esc(g.cuenta)}">Copiar número de cuenta</button>` : ""}
        ${g.link ? `<a class="btn btn-outline" href="${esc(g.link)}" target="_blank" rel="noopener">Ver</a>` : ""}
      </article>`
    )
    .join("");
  $$(".copiar").forEach((btn) => {
    btn.onclick = async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        btn.textContent = "¡Copiado!";
      } catch {
        const r = document.createRange();
        r.selectNodeContents(btn.previousElementSibling.querySelector("strong"));
        getSelection().removeAllRanges();
        getSelection().addRange(r);
        btn.textContent = "Número seleccionado";
      }
      setTimeout(() => (btn.textContent = "Copiar número de cuenta"), 2000);
    };
  });

  /* ---------------- Sobre de entrada ---------------- */
  document.body.classList.add("locked");
  $("#abrir").onclick = () => {
    $("#sobre").classList.add("abierto");
    document.body.classList.remove("locked");
  };

  /* ---------------- Cuenta regresiva ---------------- */
  const target = new Date(B.fecha).getTime();
  const pad = (n) => String(n).padStart(2, "0");
  function tick() {
    let diff = Math.max(0, target - Date.now()) / 1000;
    const d = Math.floor(diff / 86400); diff -= d * 86400;
    const h = Math.floor(diff / 3600); diff -= h * 3600;
    const m = Math.floor(diff / 60);
    const s = Math.floor(diff - m * 60);
    $("#cd-d").textContent = d;
    $("#cd-h").textContent = pad(h);
    $("#cd-m").textContent = pad(m);
    $("#cd-s").textContent = pad(s);
  }
  tick();
  setInterval(tick, 1000);

  /* ---------------- Animación al hacer scroll ---------------- */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("visible"), io.unobserve(e.target))),
    { threshold: 0.15 }
  );
  $$(".reveal, .title, .card").forEach((el) => { el.classList.add("reveal"); io.observe(el); });

  /* =========================================================
     CUESTIONARIO DE CONFIRMACIÓN
     ========================================================= */
  const preguntas = [
    {
      q: "¿Qué tanto te emociona mi boda? 💌",
      opciones: ["¡¡Muchísimo!!", "No puedo esperar", "Lo que más me emociona es la comida", "¿Habrá barra libre?", "Se me olvidó que te ibas a casar."],
    },
    {
      q: "¿Vas a llorar durante la ceremonia? 🥹",
      opciones: ["Obviamente", "Voy a llorar a mares", "Intentaré contener las lágrimas", "Solo si los demás lloran", "No ❤️."],
    },
    {
      q: "¿Qué vas a traer como regalo de boda? 🎁",
      opciones: ["Dinero, obviamente", "Algo de la mesa de regalos", "Algo lindo que encontré", "Compraré algo a última hora de camino", "Mi presencia es el regalo."],
    },
    {
      q: "¿De qué color será el vestido que usarás en mi boda? 👗",
      opciones: ["Blanco", "Rojo", "Negro", "Rosa intenso", "Del color que tú me digas."],
    },
  ];

  const card = $("#quizCard");
  const fill = $("#progressFill");
  const pL = $("#progressLeft");
  const pR = $("#progressRight");
  let respuestas = [];

  function progreso(pct, izq, der) {
    fill.style.width = pct + "%";
    pL.textContent = izq;
    pR.textContent = der;
  }

  /* ---- Paso 0: ¿Quieres venir a mi boda? ---- */
  const frasesNo = [
    "¿Segura(o)? 🤨",
    "Ese botón es decorativo.",
    "Inténtalo otra vez… o no.",
    "El botón “No” está de vacaciones.",
    "Esa no es una opción válida 💅",
    "Ya ríndete y dale al Sí.",
  ];

  function pasoInicial() {
    respuestas = [];
    progreso(0, "Confirma tu asistencia", "Responde con sinceridad");
    card.innerHTML = `
      <div class="quiz-step centered">
        <div class="quiz-icon">◡</div>
        <p class="eyebrow">Reserva la fecha</p>
        <h3 class="quiz-q">¿Quieres venir a mi boda? 💍</h3>
        <div class="yesno">
          <button class="btn btn-primary" id="btnSi">Sí</button>
          <button class="btn btn-outline" id="btnNo">No</button>
        </div>
        <p class="no-hint" id="noHint"></p>
      </div>`;

    const si = $("#btnSi");
    const no = $("#btnNo");
    const hint = $("#noHint");
    let intentos = 0;

    si.onclick = () => pregunta(0);

    function huir(px, py) {
      const c = card.getBoundingClientRect();
      const b = no.getBoundingClientRect();
      if (!no.classList.contains("huyendo")) {
        // Lo sacamos del flujo y lo dejamos donde estaba, relativo a la tarjeta
        no.style.left = b.left - c.left + "px";
        no.style.top = b.top - c.top + "px";
        no.classList.add("huyendo");
        card.appendChild(no);
        no.getBoundingClientRect(); // fuerza reflow para que la transición se vea
      }
      const margen = 16;
      const maxX = c.width - b.width - margen;
      const maxY = c.height - b.height - margen;
      let x, y, tries = 0;
      do {
        x = margen + Math.random() * (maxX - margen);
        y = margen + Math.random() * (maxY - margen);
        tries++;
      } while (tries < 30 && Math.hypot(c.left + x + b.width / 2 - px, c.top + y + b.height / 2 - py) < 180);
      no.style.left = x + "px";
      no.style.top = y + "px";

      intentos++;
      hint.textContent = frasesNo[(intentos - 1) % frasesNo.length];
      si.style.transform = `scale(${Math.min(1 + intentos * 0.08, 1.6)})`;
    }

    // Escritorio: huye cuando el mouse se acerca
    card.onmousemove = (e) => {
      if (!document.body.contains(no)) return;
      const b = no.getBoundingClientRect();
      const dist = Math.hypot(e.clientX - (b.left + b.width / 2), e.clientY - (b.top + b.height / 2));
      if (dist < Math.max(b.width, b.height) * 0.9) huir(e.clientX, e.clientY);
    };
    // Celular: huye al tocarlo
    no.addEventListener("touchstart", (e) => {
      e.preventDefault();
      const t = e.touches[0];
      huir(t.clientX, t.clientY);
    }, { passive: false });
    // Por si acaso logran hacer clic (teclado, etc.)
    no.onclick = (e) => {
      e.preventDefault();
      const b = no.getBoundingClientRect();
      huir(b.left + b.width / 2, b.top + b.height / 2);
    };
  }

  /* ---- Preguntas 1 a 4 ---- */
  function pregunta(i) {
    card.onmousemove = null;
    const p = preguntas[i];
    progreso(((i + 1) / (preguntas.length + 1)) * 100, `Pregunta ${i + 1}`, "Responde con sinceridad");
    card.innerHTML = `
      <div class="quiz-step">
        <p class="eyebrow">Pregunta ${i + 1} de ${preguntas.length}</p>
        <h3 class="quiz-q">${p.q}</h3>
        <div class="options">
          ${p.opciones.map((o, k) => `<button class="option" data-k="${k}">${o}</button>`).join("")}
        </div>
      </div>`;
    $$(".option", card).forEach((btn) => {
      btn.onclick = () => {
        respuestas[i] = p.opciones[btn.dataset.k];
        if (i + 1 < preguntas.length) pregunta(i + 1);
        else veredicto();
      };
    });
    if (i > 0) $("#confirmar").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ---- Veredicto ---- */
  const comentarios = {
    Rojo: "Atrevido… pero lo permitimos. 💃",
    Negro: "Elegante. Sin dramas. Aprobado. 🖤",
    "Rosa intenso": "Vas a brillar más que la pista de baile. 💖",
    "Del color que tú me digas.": "Respuesta perfecta. Eres nuestro invitado favorito. 🥹",
  };

  function veredicto() {
    const vestido = respuestas[3];
    if (vestido === "Blanco") {
      progreso(100, "El veredicto", "Respuesta final");
      card.innerHTML = `
        <div class="quiz-step centered">
          <div class="quiz-icon bad">✕</div>
          <h3 class="verdict-title">❌ Vestido blanco</h3>
          <p class="verdict-sub">NO APROBASTE.</p>
          <p class="verdict-text">Tu invitación queda cancelada.<br>¡¿Blanco?! ¡¿En MI boda?!</p>
          <div class="verdict-actions">
            <span class="pill">⦸ Estado de invitación: revocada</span>
            <button class="btn btn-outline" id="reintentar">Intentar de nuevo</button>
          </div>
        </div>`;
      $("#reintentar").onclick = pasoInicial;
      return;
    }

    progreso(100, "El veredicto", "Respuesta final");
    confeti();
    card.innerHTML = `
      <div class="quiz-step centered">
        <div class="quiz-icon good">✓</div>
        <h3 class="verdict-title good">¡Aprobado!</h3>
        <p class="verdict-text">${esc(comentarios[vestido] || "Pasaste la prueba.")}<br>Ahora sí, confirma tus datos:</p>
        <form class="rsvp" id="rsvp">
          <label>Nombre completo
            <input name="nombre" required placeholder="Tu nombre y apellido" />
          </label>
          <div class="row">
            <label>¿Asistirás?
              <select name="asiste">
                <option>Sí, ahí estaré</option>
                <option>Lo siento, no podré ir</option>
              </select>
            </label>
            <label>Número de personas
              <select name="personas">
                <option>1</option><option>2</option><option>3</option><option>4</option><option>5</option>
              </select>
            </label>
          </div>
          <label>Teléfono
            <input name="telefono" type="tel" placeholder="Opcional" />
          </label>
          <label>Alergias o restricciones alimentarias
            <input name="alergias" placeholder="Opcional" />
          </label>
          <label>Mensaje para los novios
            <textarea name="mensaje" rows="3" placeholder="Opcional"></textarea>
          </label>
          <button class="btn btn-primary" type="submit">Enviar confirmación</button>
        </form>
      </div>`;
    $("#rsvp").onsubmit = enviar;
  }

  /* ---- Envío ---- */
  async function enviar(e) {
    e.preventDefault();
    const datos = Object.fromEntries(new FormData(e.target));
    const quiz = preguntas.map((p, i) => `${p.q.replace(/\s*\S+$/u, "")} → ${respuestas[i]}`);

    if (B.formspree) {
      const btn = $("button[type=submit]", e.target);
      btn.disabled = true;
      btn.textContent = "Enviando…";
      try {
        const r = await fetch(B.formspree, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...datos, cuestionario: quiz.join("\n") }),
        });
        if (!r.ok) throw new Error();
        gracias(datos);
      } catch {
        btn.disabled = false;
        btn.textContent = "Enviar confirmación";
        alert("No se pudo enviar. Intenta de nuevo en un momento.");
      }
      return;
    }

    const texto = [
      `💍 *Confirmación de asistencia*`,
      ``,
      `*Nombre:* ${datos.nombre}`,
      `*¿Asiste?:* ${datos.asiste}`,
      `*Personas:* ${datos.personas}`,
      datos.telefono ? `*Teléfono:* ${datos.telefono}` : null,
      datos.alergias ? `*Alergias:* ${datos.alergias}` : null,
      datos.mensaje ? `*Mensaje:* ${datos.mensaje}` : null,
      ``,
      `*Cuestionario:*`,
      ...quiz.map((l) => `• ${l}`),
    ].filter((l) => l !== null).join("\n");

    // Último paso: un enlace real a WhatsApp (los navegadores bloquean ventanas abiertas por script)
    const url = `https://wa.me/${B.whatsapp}?text=${encodeURIComponent(texto)}`;
    card.innerHTML = `
      <div class="quiz-step centered">
        <div class="quiz-icon good">✉</div>
        <h3 class="quiz-q">Último paso</h3>
        <p class="verdict-text">Toca el botón para enviarnos tu confirmación por WhatsApp. El mensaje ya va escrito.</p>
        <a class="btn btn-primary" id="waLink" href="${url}" target="_blank" rel="noopener">Enviar por WhatsApp</a>
      </div>`;
    $("#waLink").addEventListener("click", () => setTimeout(() => gracias(datos), 400));
  }

  function gracias(datos) {
    const va = datos.asiste.startsWith("Sí");
    card.innerHTML = `
      <div class="quiz-step centered">
        <div class="quiz-icon good">${va ? "♥" : "✉"}</div>
        <h3 class="quiz-q">${va ? `¡Gracias, ${esc(datos.nombre.split(" ")[0])}!` : "Te vamos a extrañar"}</h3>
        <p class="verdict-text">${va ? "Tu lugar está apartado. Nos vemos en la pista de baile." : "Gracias por avisarnos. Te mandamos un abrazo enorme."}</p>
        <p class="eyebrow">${esc(B.fechaTexto)}</p>
      </div>`;
    if (va) confeti();
  }

  /* ---- Confeti ---- */
  function confeti() {
    const colores = ["#8b2e3f", "#b89a6a", "#f3e4e7", "#ffffff", "#d97a8c"];
    for (let i = 0; i < 90; i++) {
      const c = document.createElement("div");
      c.className = "confeti";
      c.style.left = Math.random() * 100 + "vw";
      c.style.background = colores[i % colores.length];
      c.style.animationDuration = 2.5 + Math.random() * 2.5 + "s";
      c.style.animationDelay = Math.random() * 0.6 + "s";
      c.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 6000);
    }
  }

  pasoInicial();
})();
