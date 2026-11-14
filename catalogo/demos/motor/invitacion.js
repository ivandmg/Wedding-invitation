/* =========================================================
   MOTOR DE INVITACIONES
   Lee window.INV (configuración del evento) y arma la página.
   Cada sección es opcional: si no está en la configuración, no aparece.

   Invitación personalizada por invitado (link único):
     ?para=Familia%20Pérez&pases=4&mesa=7
   ========================================================= */
(() => {
  const C = window.INV;
  const BASE = document.currentScript.src.replace(/[^/]*$/, "");
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Invitado (link personalizado) ---------- */
  const q = new URLSearchParams(location.search);
  const invitado = {
    nombre: q.get("para") || "",
    pases: parseInt(q.get("pases"), 10) || 0,
    mesa: q.get("mesa") || "",
  };

  /* ---------- Íconos ---------- */
  const I = {
    anillos: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="9" cy="14" r="5.5"/><circle cx="15" cy="14" r="5.5"/><path d="M10 4l2 2.5L14 4"/></svg>',
    copa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M7 3h10l-1 6a4 4 0 0 1-8 0z"/><path d="M12 13v7M8.5 21h7"/></svg>',
    iglesia: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 2v4M10 4h4M6 21V11l6-5 6 5v10z"/><path d="M10 21v-4a2 2 0 0 1 4 0v4"/></svg>',
    birrete: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5M22 9v6"/></svg>',
    pastel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 21h16M5 21v-7h14v7M5 17c2 1.5 4 1.5 7 0s5-1.5 7 0"/><path d="M12 14V9M12 6.5c-.8-.8-.8-1.8 0-3 .8 1.2.8 2.2 0 3z"/></svg>',
    corona: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z"/></svg>',
    estrella: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>',
    paloma: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M3 13c4 0 6-2 8-6 1 3 3 5 7 5l3-2-1 4c-1 4-5 6-9 6-3 0-6-2-8-7z"/><path d="M14 9l2-4"/></svg>',
    globo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M12 3a6 6 0 0 1 6 6c0 4-3 7-6 7s-6-3-6-7a6 6 0 0 1 6-6z"/><path d="M11 16l1 1.5 1-1.5M12 17.5c0 2-2 2-2 4"/></svg>',
    regalo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="3" y="8" width="18" height="5" rx="1"/><path d="M5 13v8h14v-8M12 8v13M12 8c-2-4-6-4-6-1.5S10 8 12 8zm0 0c2-4 6-4 6-1.5S14 8 12 8z"/></svg>',
    cama: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M3 19V7M3 15h18v4M21 15v-3a3 3 0 0 0-3-3h-7v6"/><circle cx="7" cy="11" r="2"/></svg>',
    qr: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 17h3v4"/></svg>',
    camara: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
    mapa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    nota: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm4.5 12.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3z"/></svg>',
  };
  const divisor = '<svg class="divisor" viewBox="0 0 120 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M2 12h44M74 12h44"/><path d="M60 4c-4 4-4 12 0 16 4-4 4-12 0-16zM52 12c3-3 13-3 16 0-3 3-13 3-16 0z"/></svg>';

  /* ---------- Arte decorativo (generado, sin imágenes) ---------- */
  let semilla = 7;
  const rnd = () => ((semilla = (semilla * 9301 + 49297) % 233280) / 233280);

  function rama(x, y, ang, largo, color, escala = 1) {
    // Tallo curvo con hojas a los lados
    const pasos = 9;
    let d = `M${x} ${y}`, hojas = "";
    let cx = x, cy = y, a = ang;
    for (let i = 1; i <= pasos; i++) {
      a += 0.09;
      const nx = cx + Math.cos(a) * (largo / pasos), ny = cy + Math.sin(a) * (largo / pasos);
      d += ` L${nx.toFixed(1)} ${ny.toFixed(1)}`;
      const t = 1 - i / (pasos + 2);
      const hl = 22 * escala * t + 6;
      for (const lado of [-1, 1]) {
        const ha = a + lado * 0.9;
        const hx = nx + Math.cos(ha) * hl / 2, hy = ny + Math.sin(ha) * hl / 2;
        hojas += `<ellipse cx="${hx.toFixed(1)}" cy="${hy.toFixed(1)}" rx="${(hl / 2).toFixed(1)}" ry="${(hl / 5).toFixed(1)}" transform="rotate(${((ha * 180) / Math.PI).toFixed(1)} ${hx.toFixed(1)} ${hy.toFixed(1)})" fill="${color}" opacity="${(0.55 + rnd() * 0.35).toFixed(2)}"/>`;
      }
      cx = nx; cy = ny;
    }
    return `<path d="${d}" stroke="${color}" stroke-width="1.6" fill="none"/>${hojas}`;
  }
  function flor(x, y, r, color, centro) {
    let p = "";
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      p += `<ellipse cx="${(x + Math.cos(a) * r * 0.55).toFixed(1)}" cy="${(y + Math.sin(a) * r * 0.55).toFixed(1)}" rx="${(r * 0.55).toFixed(1)}" ry="${(r * 0.33).toFixed(1)}" transform="rotate(${((a * 180) / Math.PI).toFixed(1)} ${(x + Math.cos(a) * r * 0.55).toFixed(1)} ${(y + Math.sin(a) * r * 0.55).toFixed(1)})" fill="${color}" opacity=".9"/>`;
    }
    return p + `<circle cx="${x}" cy="${y}" r="${(r * 0.22).toFixed(1)}" fill="${centro}"/>`;
  }
  function chispa(x, y, r, color) {
    return `<path d="M${x} ${y - r} Q${x} ${y} ${x + r} ${y} Q${x} ${y} ${x} ${y + r} Q${x} ${y} ${x - r} ${y} Q${x} ${y} ${x} ${y - r}z" fill="${color}"/>`;
  }

  function arte(tipo, colores) {
    const [c1, c2, c3] = colores;
    semilla = 11;
    let a = "", b = "";
    if (tipo === "floral") {
      a = rama(0, 40, 0.15, 260, c1) + rama(10, 0, 0.9, 200, c2, 0.8) + flor(70, 60, 26, c3, c1) + flor(130, 25, 16, c3, c1) + flor(30, 130, 18, c2, c1);
      return { esq: [a, a] };
    }
    if (tipo === "estrellas") {
      for (let i = 0; i < 40; i++) a += chispa((rnd() * 1000) | 0, (rnd() * 1000) | 0, 3 + rnd() * 9, [c1, c2, c3][i % 3]);
      return { lleno: a };
    }
    if (tipo === "globos") {
      const grupo = (lista) => lista.map(([x, y, r], i) => {
        const col = [c1, c2, c3][i % 3];
        return `<path d="M${x} ${y + r * 1.15} q-8 30 4 60 q-10 25 0 60" stroke="${col}" stroke-width="1.5" fill="none" opacity=".6"/>` +
          `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 1.15}" fill="${col}"/><path d="M${x - 4} ${y + r * 1.15} h8 l-4 7z" fill="${col}"/>` +
          `<ellipse cx="${x - r * 0.35}" cy="${y - r * 0.45}" rx="${r * 0.18}" ry="${r * 0.3}" fill="#fff" opacity=".45" transform="rotate(-25 ${x - r * 0.35} ${y - r * 0.45})"/>`;
      }).join("");
      let conf = "";
      for (let i = 0; i < 14; i++) conf += `<rect x="${(rnd() * 260) | 0}" y="${(rnd() * 260) | 0}" width="6" height="10" rx="2" fill="${[c1, c2, c3][i % 3]}" transform="rotate(${(rnd() * 90) | 0} 140 140)" opacity=".75"/>`;
      return { esq: [grupo([[60, 70, 36], [130, 45, 30], [105, 120, 26]]) + conf, grupo([[70, 80, 34], [140, 60, 28], [40, 140, 24]]) + conf] };
    }
    if (tipo === "nubes") {
      const nube = (x, y, s, col) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${col}"><circle cx="0" cy="0" r="40"/><circle cx="45" cy="-15" r="50"/><circle cx="95" cy="0" r="38"/><rect x="-10" y="0" width="115" height="38" rx="19"/></g>`;
      let ch = "";
      for (let i = 0; i < 10; i++) ch += chispa(((rnd() * 240) | 0) + 20, ((rnd() * 240) | 0) + 20, 3 + rnd() * 5, c3);
      return { esq: [nube(30, 70, 0.9, c1) + nube(110, 150, 0.6, c2) + ch, nube(40, 90, 0.8, c1) + nube(120, 170, 0.55, c2) + ch] };
    }
    if (tipo === "geometrico") {
      b = `<circle cx="880" cy="140" r="220" fill="none" stroke="${c1}" stroke-width="1.5"/><circle cx="880" cy="140" r="160" fill="none" stroke="${c2}" stroke-width="1"/><circle cx="120" cy="880" r="200" fill="none" stroke="${c1}" stroke-width="1.5"/>`;
      for (let i = 0; i < 26; i++) b += chispa((rnd() * 1000) | 0, (rnd() * 1000) | 0, 2 + rnd() * 6, [c1, c2, c3][i % 3]);
      return { lleno: b };
    }
    return {};
  }
  function pintarArte(contenedor, conf) {
    if (!conf) return;
    const r = arte(conf.tipo, conf.colores);
    if (r.esq) {
      contenedor.innerHTML =
        `<svg viewBox="0 0 280 280" style="left:0;top:0;width:min(46vw,340px)">${r.esq[0]}</svg>` +
        `<svg viewBox="0 0 280 280" style="right:0;bottom:0;width:min(46vw,340px);transform:rotate(${conf.tipo === "floral" ? 180 : 0}deg)">${r.esq[1]}</svg>`;
    } else if (r.lleno) {
      contenedor.innerHTML = `<svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" style="inset:0;width:100%;height:100%">${r.lleno}</svg>`;
    }
  }

  /* ---------- Fechas ---------- */
  const fecha = new Date(C.fecha);
  const gcal = (ev) => {
    const ini = new Date(ev.inicio || C.fecha), fin = new Date(ini.getTime() + (ev.duracionHoras || 5) * 3600e3);
    const f = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(C.tituloCalendario || C.nombres)}&dates=${f(ini)}/${f(fin)}&details=${encodeURIComponent(location.href.split("?")[0])}&location=${encodeURIComponent((ev.lugar || "") + " " + (ev.direccion || ""))}`;
  };

  /* =========================================================
     CONSTRUCCIÓN DE LA PÁGINA
     ========================================================= */
  const html = [];
  const navLinks = [];
  const seccion = (id, cls, etiqueta, titulo, cuerpo, nav) => {
    if (nav) navLinks.push([id, nav]);
    html.push(`<section id="${id}" class="seccion ${cls}"><div class="wrap anim">${divisor}${etiqueta ? `<p class="eyebrow">${esc(etiqueta)}</p>` : ""}${titulo ? `<h2 class="titulo">${esc(titulo)}</h2>` : ""}${cuerpo}</div></section>`);
  };

  // Hero
  const hero = C.hero || {};
  html.push(`
    <header class="hero" id="inicio">
      <div class="hero-arte" id="heroArte"></div>
      <div class="hero-content">
        <p class="pre">${esc(hero.pre || "")}</p>
        ${hero.foto ? `<img class="foto-hero" src="${esc(hero.foto)}" alt="">` : ""}
        <h1>${hero.tituloHTML || esc(C.nombres)}</h1>
        ${hero.sub ? `<p class="sub">${esc(hero.sub)}</p>` : ""}
        <p class="fecha">${esc(C.fechaTexto)}</p>
        ${C.cuentaRegresiva !== false ? `<div class="countdown" aria-label="Cuenta regresiva"><div><span id="cd-d">0</span><small>Días</small></div><div><span id="cd-h">00</span><small>Horas</small></div><div><span id="cd-m">00</span><small>Min</small></div><div><span id="cd-s">00</span><small>Seg</small></div></div>` : ""}
        ${C.confirmar ? `<a class="btn btn-primario" href="#confirmar">${esc(hero.boton || "Confirmar asistencia")}</a>` : ""}
      </div>
      <a href="#contenido" class="scroll-hint" aria-label="Bajar">⌄</a>
    </header>
    <div id="contenido"></div>`);

  // Bienvenida personalizada
  if (invitado.nombre) {
    html.push(`<section class="seccion"><div class="wrap anim"><div class="bienvenida">
      <p class="eyebrow">Esta invitación es para</p>
      <p class="nombre">${esc(invitado.nombre)}</p>
      <p>${esc(C.textoBienvenida || "Nos haría muy felices compartir este día contigo.")}</p>
      <div class="pases">${invitado.pases ? `<span class="chip">${invitado.pases} ${invitado.pases === 1 ? "pase" : "pases"}</span>` : ""}${invitado.mesa ? `<span class="chip">Mesa ${esc(invitado.mesa)}</span>` : ""}</div>
    </div></div></section>`);
  }

  // Mensaje + personas (padres, padrinos)
  if (C.mensaje) {
    seccion("mensaje", "alt mensaje", C.mensaje.etiqueta || "", "", `
      <blockquote>${esc(C.mensaje.texto)}</blockquote>
      ${C.mensaje.personas ? `<div class="personas">${C.mensaje.personas.map((p) => `<div><h4>${esc(p.rol)}</h4>${p.nombres.map((n) => `<p>${esc(n)}</p>`).join("")}</div>`).join("")}</div>` : ""}`);
  }

  // Historia
  if (C.historia) {
    seccion("historia", "", C.historia.etiqueta || "Nuestra historia", C.historia.titulo || "", `<div class="timeline">${C.historia.items.map((h) => `<div class="tl-item"><span class="anio">${esc(h.anio)}</span><h3>${esc(h.titulo)}</h3><p>${esc(h.texto)}</p></div>`).join("")}</div>`, "Historia");
  }

  // Galería
  if (C.galeria) {
    const items = C.galeria.fotos || Array.from({ length: C.galeria.vacias || 6 }, () => null);
    seccion("galeria", "alt", C.galeria.etiqueta || "Galería", C.galeria.titulo || "Momentos", `<div class="galeria">${items.map((f, i) => `<figure>${f ? `<img src="${esc(f)}" alt="Foto ${i + 1}" loading="lazy">` : `<div class="foto-vacia">${I.camara}<span>Tu foto aquí</span></div>`}</figure>`).join("")}</div>`, "Fotos");
  }

  // Eventos
  if (C.eventos) {
    seccion("eventos", "", "Cuándo y dónde", C.tituloEventos || "El gran día", `<div class="tarjetas">${C.eventos.map((e) => `
      <article class="tarjeta">
        <div class="icono">${I[e.icono] || I.copa}</div>
        <p class="eyebrow" style="margin:0">${esc(e.tipo)}</p>
        <h3>${esc(e.lugar)}</h3>
        <p class="hora">${esc(e.hora)}</p>
        <p>${esc(e.direccion)}</p>
        <div class="acciones">
          ${e.mapa !== false ? `<a class="btn btn-borde" href="${esc(e.mapa || "https://maps.google.com/?q=" + encodeURIComponent(e.lugar + " " + e.direccion))}" target="_blank" rel="noopener">${I.mapa} Cómo llegar</a>` : ""}
          ${C.agendar ? `<a class="btn btn-borde" href="${gcal(e)}" target="_blank" rel="noopener">${I.cal} Agendar</a>` : ""}
        </div>
      </article>`).join("")}</div>`, "Evento");
  }

  // Itinerario
  if (C.itinerario) {
    seccion("itinerario", "alt", "Itinerario", "Así será la celebración", `<ul class="itinerario">${C.itinerario.map((i) => `<li><span class="h">${esc(i.hora)}</span><span class="e">${esc(i.evento)}</span></li>`).join("")}</ul>`);
  }

  // Dress code
  if (C.vestimenta) {
    const v = C.vestimenta;
    seccion("vestimenta", "suave", "Código de vestimenta", "", `<div class="dress">
      <p class="tipo">${esc(v.tipo)}</p>
      <p>${esc(v.texto || "")}</p>
      ${v.colores ? `<div class="paleta">${v.colores.map((c) => `<span style="background:${esc(c)}"></span>`).join("")}</div>` : ""}
      ${v.nota ? `<p class="nota">${esc(v.nota)}</p>` : ""}
    </div>`);
  }

  // Regalos
  if (C.regalos) {
    seccion("regalos", "", "Sugerencia de regalos", C.regalos.titulo || "Un detalle", `
      ${C.regalos.texto ? `<p class="lead">${esc(C.regalos.texto)}</p>` : ""}
      <div class="tarjetas">${C.regalos.opciones.map((g, i) => `
        <article class="tarjeta regalo">
          <div class="icono">${I[g.icono] || I.regalo}</div>
          <h3>${esc(g.nombre)}</h3>
          <p>${esc(g.detalle)}</p>
          ${g.qrTexto ? `<div class="pase-qr" data-qr="${esc(g.qrTexto)}" style="margin:.75rem auto"></div><p style="font-size:.8rem">QR de ejemplo</p>` : ""}
          ${g.cuenta ? `<p class="cuenta">Cuenta: <strong>${esc(g.cuenta)}</strong></p><button class="btn btn-borde copiar" data-copiar="${esc(g.cuenta)}">Copiar número</button>` : ""}
        </article>`).join("")}</div>`, "Regalos");
  }

  // Hospedaje
  if (C.hospedaje) {
    seccion("hospedaje", "alt", "Hospedaje sugerido", "¿Vienes de otra ciudad?", `<div class="tarjetas">${C.hospedaje.map((h) => `
      <article class="tarjeta">
        <div class="icono">${I.cama}</div>
        <h3>${esc(h.nombre)}</h3>
        ${h.estrellas ? `<p class="estrellas">${"★".repeat(h.estrellas)}</p>` : ""}
        <p>${esc(h.detalle)}</p>
        ${h.codigo ? `<p class="chip">Código: ${esc(h.codigo)}</p>` : ""}
        <div class="acciones"><a class="btn btn-borde" href="https://maps.google.com/?q=${encodeURIComponent(h.nombre + " " + (h.ciudad || ""))}" target="_blank" rel="noopener">${I.mapa} Ver ubicación</a></div>
      </article>`).join("")}</div>`);
  }

  // Compartir fotos
  if (C.compartirFotos) {
    seccion("compartir", "suave", "Comparte tus fotos", "", `
      <p class="lead" style="margin-bottom:.5rem">${esc(C.compartirFotos.texto)}</p>
      ${C.compartirFotos.hashtag ? `<p class="hashtag">${esc(C.compartirFotos.hashtag)}</p>` : ""}
      <a class="btn btn-primario" href="${esc(C.compartirFotos.link || "#")}" target="_blank" rel="noopener">${I.camara} Subir fotos y videos</a>`);
  }

  // Pase personal con QR
  if (C.pase && invitado.nombre) {
    seccion("pase", "alt", "Tu pase de acceso", "Presenta este código en la entrada", `
      <div class="pase">
        <div class="pase-top"><p class="eyebrow" style="color:inherit;opacity:.8;margin:0">${esc(C.nombres)}</p><p class="n">${esc(invitado.nombre)}</p><p>${esc(C.fechaTexto)}</p></div>
        <div class="pase-corte"></div>
        <div class="pase-body">
          <div class="pase-datos"><div><small>Pases</small><strong>${invitado.pases || 1}</strong></div><div><small>Mesa</small><strong>${esc(invitado.mesa || "—")}</strong></div></div>
          <div class="pase-qr" data-qr="${esc(`${C.nombres} | ${invitado.nombre} | Pases: ${invitado.pases || 1} | Mesa: ${invitado.mesa || "-"}`)}"></div>
          <small class="nota">Guarda una captura de pantalla de este pase.</small>
        </div>
      </div>`, "Pase");
  }

  // Confirmación (cuestionario + formulario)
  if (C.confirmar) {
    navLinks.push(["confirmar", "Confirmar"]);
    html.push(`<section id="confirmar" class="seccion"><div class="wrap quiz-wrap">
      <p class="eyebrow">${esc(C.confirmar.etiqueta || "Confirma tu asistencia")}</p>
      <div class="progreso"><div class="progreso-barra"><span id="progreso"></span></div><div class="progreso-txt"><span id="progIzq"></span><span id="progDer"></span></div></div>
      <div class="quiz-card" id="quiz"></div>
      ${C.confirmar.limite ? `<p class="limite">Confirma antes del <strong>${esc(C.confirmar.limite)}</strong></p>` : ""}
    </div></section>`);
  }

  // Pie
  html.push(`<footer class="pie">
    <p class="n">${esc(C.nombres)}</p><p>${esc(C.fechaTexto)}</p>
    ${C.pie ? `<p>${esc(C.pie)}</p>` : ""}
    ${C.credito ? `<p class="credito">Invitación creada por <a href="${esc(C.credito.link)}">${esc(C.credito.marca)}</a></p>` : ""}
  </footer>`);

  // Sobre
  const iniciales = C.iniciales || C.nombres.split(/\s*&\s*/).map((n) => n.trim()[0]).join("&");
  const sobre = C.sobre !== false ? `
    <div class="sobre" id="sobre">
      <div class="sobre-arte" id="sobreArte"></div>
      <div class="sobre-inner">
        <p class="eyebrow">${esc((C.sobre && C.sobre.texto) || "Tienes una invitación")}</p>
        ${invitado.nombre ? `<p class="para"><small>Para</small>${esc(invitado.nombre)}</p>` : ""}
        <div class="sello">${esc(iniciales)}</div>
        <h2>${esc(C.nombres)}</h2>
        <button class="btn btn-primario" id="abrir">Abrir invitación</button>
      </div>
    </div>` : "";

  const nav = C.menu && navLinks.length ? `<nav class="nav">${navLinks.map(([id, t]) => `<a href="#${id}">${esc(t)}</a>`).join("")}</nav>` : "";
  const musica = C.musica ? `<div id="ytplayer" aria-hidden="true"></div><button class="musica-btn" id="musicaBtn" hidden aria-label="Pausar música">${I.nota}</button>` : "";
  const demo = C.demo && !q.has("captura") ? `<div class="demo-barra"><span>${esc(C.demo.texto || "Invitación de ejemplo")}</span><a href="${esc(C.demo.volver)}">← Catálogo</a></div>` : "";

  document.body.innerHTML = sobre + html[0] + nav + html.slice(1).join("") + musica + demo;
  pintarArte($("#heroArte"), C.arte);
  if ($("#sobreArte")) pintarArte($("#sobreArte"), C.arte);

  /* ---------- Sobre ---------- */
  if ($("#sobre")) {
    document.body.classList.add("bloqueado");
    $("#abrir").onclick = () => {
      $("#sobre").classList.add("abierto");
      document.body.classList.remove("bloqueado");
      reproductor.play();
    };
  }

  /* ---------- Cuenta regresiva ---------- */
  if ($("#cd-d")) {
    const pad = (n) => String(n).padStart(2, "0");
    const tick = () => {
      let s = Math.max(0, fecha - Date.now()) / 1000;
      const d = Math.floor(s / 86400); s -= d * 86400;
      const h = Math.floor(s / 3600); s -= h * 3600;
      const m = Math.floor(s / 60);
      $("#cd-d").textContent = d; $("#cd-h").textContent = pad(h);
      $("#cd-m").textContent = pad(m); $("#cd-s").textContent = pad(Math.floor(s - m * 60));
    };
    tick(); setInterval(tick, 1000);
  }

  /* ---------- Animación suave al bajar ---------- */
  const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("visible"), io.unobserve(e.target))), { threshold: 0.12 });
  $$(".anim").forEach((el) => io.observe(el));

  /* ---------- QR (generado en el navegador, sin servicios externos) ---------- */
  const qrs = $$("[data-qr]");
  if (qrs.length) {
    const s = document.createElement("script");
    s.src = BASE + "qrcode.js";
    s.onload = () => {
      qrcode.stringToBytes = qrcode.stringToBytesFuncs["UTF-8"];
      qrs.forEach((el) => {
        const qr = qrcode(0, "M");
        qr.addData(el.dataset.qr);
        qr.make();
        el.innerHTML = qr.createSvgTag({ cellSize: 4, margin: 0, scalable: true });
      });
    };
    document.head.appendChild(s);
  }

  /* ---------- Copiar ---------- */
  $$(".copiar").forEach((b) => (b.onclick = async () => {
    try { await navigator.clipboard.writeText(b.dataset.copiar); b.textContent = "¡Copiado!"; }
    catch { b.textContent = b.dataset.copiar; }
    setTimeout(() => (b.textContent = "Copiar número"), 2000);
  }));

  /* ---------- Música (YouTube) ---------- */
  const reproductor = (() => {
    if (!C.musica) return { play() {} };
    const btn = $("#musicaBtn");
    let p = null, listo = false, quiere = false, sonando = false;
    window.onYouTubeIframeAPIReady = () => {
      p = new YT.Player("ytplayer", {
        width: 1, height: 1, videoId: C.musica.youtube,
        playerVars: { controls: 0, disablekb: 1, playsinline: 1, start: C.musica.inicio || 0 },
        events: {
          onReady: () => { listo = true; btn.hidden = false; if (quiere) play(); },
          onStateChange: (e) => {
            if (e.data === YT.PlayerState.ENDED) { p.seekTo(C.musica.inicio || 0); p.playVideo(); }
            sonando = e.data === YT.PlayerState.PLAYING;
            btn.classList.toggle("on", sonando);
            btn.setAttribute("aria-label", sonando ? "Pausar música" : "Reproducir música");
          },
        },
      });
    };
    const s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(s);
    function play() { quiere = true; if (listo) { p.unMute(); p.setVolume(60); p.playVideo(); } }
    btn.onclick = () => (sonando ? p.pauseVideo() : play());
    return { play };
  })();

  /* =========================================================
     CUESTIONARIO + CONFIRMACIÓN
     ========================================================= */
  if (!C.confirmar) return;
  const R = C.confirmar;
  const card = $("#quiz");
  const preguntas = (R.cuestionario && R.cuestionario.preguntas) || [];
  let respuestas = [];
  const progreso = (pct, izq, der) => { $("#progreso").style.width = pct + "%"; $("#progIzq").textContent = izq; $("#progDer").textContent = der; };

  const frasesNo = R.frasesNo || ["¿Seguro? 🤨", "Ese botón es decorativo.", "Inténtalo otra vez… o no.", "El “No” está de vacaciones.", "Esa no es una opción válida 💅", "Ya ríndete y dale al Sí."];

  function inicio() {
    respuestas = [];
    card.onmousemove = null;
    if (!R.cuestionario) return formulario();
    progreso(0, "Paso 1", "Responde con sinceridad");
    card.innerHTML = `<div class="paso">
      <div class="quiz-icono">◡</div>
      <p class="eyebrow">Reserva la fecha</p>
      <h3 class="quiz-q">${esc(R.cuestionario.pregunta)}</h3>
      <div class="sino"><button class="btn btn-primario" id="btnSi">Sí</button><button class="btn btn-borde" id="btnNo">No</button></div>
      <p class="no-hint" id="noHint"></p></div>`;
    const si = $("#btnSi"), no = $("#btnNo"), hint = $("#noHint");
    let intentos = 0;
    si.onclick = () => (preguntas.length ? pregunta(0) : formulario());
    function huir(px, py) {
      const c = card.getBoundingClientRect(), b = no.getBoundingClientRect();
      if (!no.classList.contains("huye")) {
        no.style.left = b.left - c.left + "px"; no.style.top = b.top - c.top + "px";
        no.classList.add("huye"); card.appendChild(no); no.getBoundingClientRect();
      }
      const m = 16, maxX = c.width - b.width - m, maxY = c.height - b.height - m;
      let x, y, n = 0;
      do { x = m + Math.random() * (maxX - m); y = m + Math.random() * (maxY - m); n++; }
      while (n < 30 && Math.hypot(c.left + x + b.width / 2 - px, c.top + y + b.height / 2 - py) < 170);
      no.style.left = x + "px"; no.style.top = y + "px";
      intentos++;
      hint.textContent = frasesNo[(intentos - 1) % frasesNo.length];
      si.style.transform = `scale(${Math.min(1 + intentos * 0.08, 1.6)})`;
    }
    card.onmousemove = (e) => {
      if (!no.isConnected) return;
      const b = no.getBoundingClientRect();
      if (Math.hypot(e.clientX - (b.left + b.width / 2), e.clientY - (b.top + b.height / 2)) < Math.max(b.width, b.height) * 0.9) huir(e.clientX, e.clientY);
    };
    no.addEventListener("touchstart", (e) => { e.preventDefault(); huir(e.touches[0].clientX, e.touches[0].clientY); }, { passive: false });
    no.onclick = (e) => { e.preventDefault(); const b = no.getBoundingClientRect(); huir(b.left + b.width / 2, b.top + b.height / 2); };
  }

  function pregunta(i) {
    card.onmousemove = null;
    const p = preguntas[i];
    progreso(((i + 1) / (preguntas.length + 1)) * 100, `Pregunta ${i + 1}`, "Responde con sinceridad");
    card.innerHTML = `<div class="paso izq">
      <p class="eyebrow">Pregunta ${i + 1} de ${preguntas.length}</p>
      <h3 class="quiz-q">${esc(p.q)}</h3>
      <div class="opciones">${p.opciones.map((o, k) => `<button class="opcion" data-k="${k}">${esc(o)}</button>`).join("")}</div></div>`;
    $$(".opcion", card).forEach((b) => (b.onclick = () => {
      const k = +b.dataset.k;
      respuestas[i] = p.opciones[k];
      if (p.trampa && p.trampa.opcion === k) return revocada(p.trampa);
      i + 1 < preguntas.length ? pregunta(i + 1) : formulario(p.comentarios && p.comentarios[k]);
    }));
    $("#confirmar").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function revocada(t) {
    progreso(100, "El veredicto", "Respuesta final");
    card.innerHTML = `<div class="paso">
      <div class="quiz-icono mal">✕</div>
      <h3 class="veredicto">${esc(t.titulo)}</h3>
      <p><strong>NO APROBASTE.</strong></p>
      <p class="veredicto-txt">${esc(t.texto)}</p>
      <div class="acciones-v"><span class="pill">Estado de invitación: revocada</span><button class="btn btn-borde" id="otraVez">Intentar de nuevo</button></div></div>`;
    $("#otraVez").onclick = inicio;
  }

  function formulario(comentario) {
    card.onmousemove = null;
    progreso(100, R.cuestionario ? "El veredicto" : "Confirmación", R.cuestionario ? "Respuesta final" : "Un último paso");
    const maxP = invitado.pases || R.maxPersonas || 5;
    card.innerHTML = `<div class="paso">
      ${R.cuestionario ? `<div class="quiz-icono bien">✓</div><h3 class="veredicto bien">¡Aprobado!</h3><p class="veredicto-txt">${esc(comentario || "Pasaste la prueba.")} Ahora confirma tus datos:</p>` : `<h3 class="quiz-q">¿Nos acompañas?</h3>`}
      <form class="rsvp" id="rsvp">
        <label>Nombre completo<input name="nombre" required value="${esc(invitado.nombre)}" placeholder="Tu nombre y apellido"></label>
        <div class="fila">
          <label>¿Asistirás?<select name="asiste"><option>Sí, ahí estaré</option><option>No podré asistir</option></select></label>
          <label>Personas<select name="personas">${Array.from({ length: maxP }, (_, i) => `<option>${i + 1}</option>`).join("")}</select></label>
        </div>
        ${(R.camposExtra || []).map((c) => `<label>${esc(c)}<input name="${esc(c)}" placeholder="Opcional"></label>`).join("")}
        <label>Mensaje<textarea name="mensaje" rows="3" placeholder="Opcional"></textarea></label>
        <button class="btn btn-primario" type="submit">Enviar confirmación</button>
      </form></div>`;
    if (R.cuestionario) confeti();
    $("#rsvp").onsubmit = enviar;
  }

  async function enviar(e) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target));
    const lineas = [
      `*Confirmación · ${C.nombres}*`, "",
      ...Object.entries(d).filter(([, v]) => v).map(([k, v]) => `*${k[0].toUpperCase() + k.slice(1)}:* ${v}`),
      ...(invitado.mesa ? [`*Mesa:* ${invitado.mesa}`] : []),
      ...(respuestas.length ? ["", "*Cuestionario:*", ...preguntas.map((p, i) => `• ${p.q} → ${respuestas[i]}`)] : []),
    ];
    // Planilla de Google (opcional): las respuestas se guardan solas
    if (R.planilla) {
      try { await fetch(R.planilla, { method: "POST", mode: "no-cors", body: JSON.stringify({ ...d, mesa: invitado.mesa, cuestionario: respuestas.join(" | ") }) }); } catch {}
      if (!R.whatsapp) return gracias(d);
    }
    const url = `https://wa.me/${R.whatsapp}?text=${encodeURIComponent(lineas.join("\n"))}`;
    card.innerHTML = `<div class="paso">
      <div class="quiz-icono bien">✉</div>
      <h3 class="quiz-q">Último paso</h3>
      <p class="veredicto-txt">Toca el botón para enviarnos tu confirmación por WhatsApp. El mensaje ya va escrito.</p>
      <a class="btn btn-primario" id="waLink" href="${url}" target="_blank" rel="noopener">${I.wa} Enviar por WhatsApp</a></div>`;
    $("#waLink").addEventListener("click", () => setTimeout(() => gracias(d), 400));
  }

  function gracias(d) {
    const va = d.asiste.startsWith("Sí");
    card.innerHTML = `<div class="paso">
      <div class="quiz-icono bien">${va ? "♥" : "✉"}</div>
      <h3 class="quiz-q">${va ? `¡Gracias, ${esc(d.nombre.split(" ")[0])}!` : "Te vamos a extrañar"}</h3>
      <p class="veredicto-txt">${esc(va ? R.textoGracias || "Tu lugar está apartado. ¡Nos vemos pronto!" : "Gracias por avisarnos.")}</p>
      <p class="eyebrow">${esc(C.fechaTexto)}</p></div>`;
    if (va) confeti();
  }

  function confeti() {
    const col = C.confeti || ["#c9a46c", "#ffffff", "#e8c1c5"];
    for (let i = 0; i < 80; i++) {
      const c = document.createElement("div");
      c.className = "confeti";
      Object.assign(c.style, { left: Math.random() * 100 + "vw", background: col[i % col.length], animationDuration: 2.5 + Math.random() * 2.5 + "s", animationDelay: Math.random() * 0.6 + "s", borderRadius: Math.random() > 0.5 ? "50%" : "2px" });
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 6000);
    }
  }

  inicio();
})();
