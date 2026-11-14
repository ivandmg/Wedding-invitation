"""Genera las invitaciones de ejemplo del catálogo.
Uso: python3 generar.py   (desde la carpeta catalogo/demos)
Cada ejemplo queda en su carpeta con un index.html editable.
"""
import json, os

MARCA = {"marca": "Brindis · Invitaciones web", "link": "../../index.html"}
WHATSAPP = "59165060795"
MUSICA = {"youtube": "JvNQLJ1_HQ0", "inicio": 0}  # Canon en Re, Pachelbel (dominio público)
DEMO = {"texto": "Invitación de ejemplo · datos inventados", "volver": "../../index.html#disenos"}

PLANTILLA = """<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{titulo}</title>
<meta name="description" content="{descripcion}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?{fuentes}&display=swap">
<link rel="stylesheet" href="../motor/invitacion.css">
<style>
:root {{
{vars}
}}
{css}
</style>
</head>
<body>
<script>
/* ====== DATOS DE LA INVITACIÓN (edita aquí) ====== */
window.INV = {config};
</script>
<script src="../motor/invitacion.js"></script>
</body>
</html>
"""

def escribir(carpeta, titulo, descripcion, fuentes, vars_, config, css=""):
    os.makedirs(carpeta, exist_ok=True)
    config.setdefault("credito", MARCA)
    config.setdefault("demo", DEMO)
    with open(os.path.join(carpeta, "index.html"), "w", encoding="utf-8") as f:
        f.write(PLANTILLA.format(
            titulo=titulo, descripcion=descripcion, fuentes=fuentes,
            vars="\n".join(f"  --{k}: {v};" for k, v in vars_.items()),
            css=css,
            config=json.dumps(config, ensure_ascii=False, indent=2),
        ))

# ---------------------------------------------------------------- BODA
escribir(
    "boda-valeria-mateo", "Valeria & Mateo", "Invitación de boda de ejemplo",
    "family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Pinyon+Script&family=Jost:wght@400;500;600;700",
    {"bg": "#f7f4ec", "surface": "#fffdf8", "ink": "#2f3327", "muted": "#6f735f", "accent": "#5f6f4a",
     "accent-ink": "#fffdf8", "soft": "#ebeadb", "line": "#dcdac7", "hero-bg": "#f7f4ec", "hero-ink": "#2f3327",
     "font-display": "'Cormorant Garamond', Georgia, serif", "font-script": "'Pinyon Script', cursive",
     "font-body": "'Jost', system-ui, sans-serif"},
    {
        "nombres": "Valeria & Mateo", "iniciales": "V&M",
        "fecha": "2027-06-19T16:00", "fechaTexto": "Sábado 19 de junio de 2027",
        "tituloCalendario": "Boda de Valeria & Mateo",
        "hero": {"pre": "Nos casamos", "tituloHTML": "Valeria <span class='amp'>&amp;</span> Mateo", "sub": "Y queremos celebrarlo contigo"},
        "arte": {"tipo": "floral", "colores": ["#7d8c63", "#a9b48f", "#e7d9c0"]},
        "menu": True, "agendar": True, "pase": True, "musica": MUSICA,
        "sobre": {"texto": "Una pequeña invitación"},
        "textoBienvenida": "Hemos reservado un lugar especial para ustedes en nuestra boda.",
        "mensaje": {"etiqueta": "Con la bendición de", "texto": "“El amor no se mira, se siente; y más aún cuando está a tu lado.”",
                    "personas": [{"rol": "Padres de la novia", "nombres": ["Ricardo Salazar", "Mónica Rivero"]},
                                 {"rol": "Padres del novio", "nombres": ["Jorge Antelo", "Patricia Suárez"]}]},
        "historia": {"titulo": "Cómo empezó todo", "items": [
            {"anio": "2018", "titulo": "Nos conocimos", "texto": "En la universidad, haciendo un trabajo en grupo que ninguno quería hacer."},
            {"anio": "2020", "titulo": "Primer viaje", "texto": "Samaipata, una carpa y mucha lluvia. Ahí supimos que era en serio."},
            {"anio": "2026", "titulo": "La propuesta", "texto": "Al atardecer, frente al lago. Ella dijo que sí antes de que él terminara la frase."}]},
        "galeria": {"titulo": "Nuestros momentos", "vacias": 6},
        "eventos": [
            {"tipo": "Ceremonia religiosa", "icono": "iglesia", "lugar": "Parroquia San Rafael", "hora": "4:00 PM", "direccion": "Av. Las Palmas 120, Santa Cruz", "inicio": "2027-06-19T16:00", "duracionHoras": 1},
            {"tipo": "Recepción", "icono": "copa", "lugar": "Jardín Los Almendros", "hora": "6:30 PM", "direccion": "Km 9 carretera al Norte, Santa Cruz", "inicio": "2027-06-19T18:30", "duracionHoras": 7}],
        "itinerario": [
            {"hora": "4:00 PM", "evento": "Ceremonia religiosa"}, {"hora": "6:30 PM", "evento": "Cóctel de bienvenida"},
            {"hora": "7:30 PM", "evento": "Entrada de los novios"}, {"hora": "8:00 PM", "evento": "Cena"},
            {"hora": "9:30 PM", "evento": "Primer baile y vals"}, {"hora": "10:00 PM", "evento": "¡Fiesta!"}],
        "vestimenta": {"tipo": "Formal", "texto": "Te sugerimos tonos tierra, verdes y neutros.",
                       "colores": ["#5f6f4a", "#a9b48f", "#c8a97e", "#8b6f5a", "#2f3327"],
                       "nota": "El color blanco está reservado para la novia."},
        "regalos": {"titulo": "Mesa de regalos", "texto": "Tu presencia es nuestro mejor regalo. Si deseas tener un detalle con nosotros:", "opciones": [
            {"icono": "regalo", "nombre": "Lista de regalos", "detalle": "Tienda Casa Bella, a nombre de Valeria & Mateo."},
            {"icono": "qr", "nombre": "Regalo en efectivo", "detalle": "Escanea el QR desde la app de tu banco.", "qrTexto": "Ejemplo de QR para regalo en efectivo", "cuenta": "1234567890"}]},
        "hospedaje": [
            {"nombre": "Hotel Cielo Alto", "estrellas": 4, "detalle": "A 10 minutos del salón. Tarifa especial para invitados.", "codigo": "BODAVM", "ciudad": "Santa Cruz"},
            {"nombre": "Casa Jardín Suites", "estrellas": 3, "detalle": "Opción económica, a 15 minutos.", "ciudad": "Santa Cruz"}],
        "compartirFotos": {"texto": "Sube tus fotos y videos de la boda a nuestro álbum compartido.", "hashtag": "#ValeYMateoParaSiempre", "link": "#"},
        "confirmar": {"limite": "1 de mayo de 2027", "whatsapp": WHATSAPP, "camposExtra": ["Alergias o restricciones"],
            "cuestionario": {"pregunta": "¿Quieres venir a nuestra boda? 💍", "preguntas": [
                {"q": "¿Qué tanto te emociona nuestra boda? 💌", "opciones": ["¡¡Muchísimo!!", "No puedo esperar", "Lo que más me emociona es la comida", "¿Habrá barra libre?", "Se me olvidó que se casaban."]},
                {"q": "¿Vas a llorar en la ceremonia? 🥹", "opciones": ["Obviamente", "A mares", "Intentaré contenerme", "Solo si los demás lloran", "No ❤️"]},
                {"q": "¿De qué color será tu ropa? 👗", "opciones": ["Blanco", "Verde oliva", "Negro", "Rosa intenso", "Del color que ustedes digan"],
                 "trampa": {"opcion": 0, "titulo": "❌ Vestido blanco", "texto": "Tu invitación queda cancelada. ¡¿Blanco?! ¡¿En NUESTRA boda?!"},
                 "comentarios": [None, "Combinas con la decoración. 🌿", "Elegante, sin dramas. 🖤", "Vas a brillar en la pista. 💖", "Respuesta perfecta. 🥹"]}]}},
        "confeti": ["#5f6f4a", "#c8a97e", "#ffffff"],
        "pie": "Gracias por ser parte de nuestra historia",
    })

# ---------------------------------------------------------------- XV AÑOS
escribir(
    "xv-isabella", "Mis XV · Isabella", "Invitación de XV años de ejemplo",
    "family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=Great+Vibes&family=Montserrat:wght@400;500;600;700",
    {"bg": "#fbf3f2", "surface": "#ffffff", "ink": "#3a2630", "muted": "#8a6f78", "accent": "#b5577a",
     "accent-ink": "#ffffff", "soft": "#f6e1e6", "line": "#efd3da",
     "hero-bg": "radial-gradient(circle at 50% 30%, #fff 0%, #f8dfe5 55%, #eec3cf 100%)", "hero-ink": "#3a2630",
     "font-display": "'Playfair Display', Georgia, serif", "font-script": "'Great Vibes', cursive",
     "font-body": "'Montserrat', system-ui, sans-serif"},
    {
        "nombres": "Isabella", "iniciales": "XV",
        "fecha": "2027-08-14T20:00", "fechaTexto": "Sábado 14 de agosto de 2027",
        "tituloCalendario": "Mis XV · Isabella",
        "hero": {"pre": "Mis XV años", "tituloHTML": "Isabella", "sub": "Un sueño hecho realidad", "boton": "¿Vienes a mi fiesta?"},
        "arte": {"tipo": "estrellas", "colores": ["#d9a5b3", "#c9a46c", "#ffffff"]},
        "menu": True, "agendar": True, "pase": True, "musica": MUSICA,
        "sobre": {"texto": "Estás invitado(a) a mis XV"},
        "textoBienvenida": "Me encantaría que me acompañes en una de las noches más especiales de mi vida.",
        "mensaje": {"etiqueta": "Con amor", "texto": "“Hay momentos que se viven una sola vez. Quiero vivir este contigo.”",
                    "personas": [{"rol": "Mis padres", "nombres": ["Carlos Méndez", "Lorena Vaca"]},
                                 {"rol": "Mis padrinos", "nombres": ["Andrés Rojas", "Silvia Paredes"]}]},
        "galeria": {"titulo": "Sesión de fotos", "vacias": 6},
        "eventos": [
            {"tipo": "Misa de acción de gracias", "icono": "iglesia", "lugar": "Capilla Santa Rosa", "hora": "7:00 PM", "direccion": "Calle Sucre 45, Cochabamba", "inicio": "2027-08-14T19:00", "duracionHoras": 1},
            {"tipo": "Fiesta", "icono": "corona", "lugar": "Salón Cristal", "hora": "8:30 PM", "direccion": "Av. América 880, Cochabamba", "inicio": "2027-08-14T20:30", "duracionHoras": 6}],
        "itinerario": [
            {"hora": "8:30 PM", "evento": "Recepción de invitados"}, {"hora": "9:00 PM", "evento": "Entrada de la quinceañera"},
            {"hora": "9:15 PM", "evento": "Vals con papá y chambelanes"}, {"hora": "9:45 PM", "evento": "Brindis y cena"},
            {"hora": "10:30 PM", "evento": "Baile sorpresa"}, {"hora": "11:00 PM", "evento": "¡A bailar!"}],
        "vestimenta": {"tipo": "Gala", "texto": "Vestido largo y traje oscuro.",
                       "colores": ["#c9a46c", "#3a2630", "#8a6f78", "#e9e3dc"],
                       "nota": "El rosa está reservado para la quinceañera."},
        "regalos": {"titulo": "Lluvia de sobres", "texto": "Habrá un cofre especial en la fiesta para tus buenos deseos.", "opciones": [
            {"icono": "regalo", "nombre": "Lluvia de sobres", "detalle": "El día de la fiesta, en el cofre de la entrada."},
            {"icono": "qr", "nombre": "Transferencia", "detalle": "También puedes usar este QR.", "qrTexto": "Ejemplo de QR para regalo"}]},
        "compartirFotos": {"texto": "¡Comparte tus fotos de la noche!", "hashtag": "#LosXVdeIsa", "link": "#"},
        "confirmar": {"limite": "30 de julio de 2027", "whatsapp": WHATSAPP,
            "cuestionario": {"pregunta": "¿Vienes a mis XV? 👑", "preguntas": [
                {"q": "¿Vas a bailar toda la noche? 💃", "opciones": ["Hasta que cierren", "Solo el vals", "Si ponen reggaetón, sí", "Yo vengo a comer", "Depende de quién me saque"]},
                {"q": "¿Qué vas a llevar puesto? 👗", "opciones": ["Algo rosado", "Dorado brillante", "Negro elegante", "Lo primero que encuentre", "Lo que Isa me diga"],
                 "trampa": {"opcion": 0, "titulo": "❌ Rosado", "texto": "¡El rosa es SOLO para la quinceañera! Inténtalo de nuevo."},
                 "comentarios": [None, "¡Vas a brillar! ✨", "Clásico y elegante. 🖤", "Valiente… pero aprobado. 😅", "Respuesta correcta. 👑"]}]}},
        "confeti": ["#b5577a", "#c9a46c", "#ffffff"],
        "pie": "¡Te espero!",
    })

# ---------------------------------------------------------------- GRADUACIÓN
escribir(
    "graduacion-sebastian", "Graduación · Sebastián Rojas", "Invitación de graduación de ejemplo",
    "family=Bodoni+Moda:ital,wght@0,500;0,700;1,500&family=Manrope:wght@400;500;600;700",
    {"bg": "#0f1a2e", "surface": "#16243d", "ink": "#eef1f6", "muted": "#9fb0c8", "accent": "#d4af6a",
     "accent-ink": "#0f1a2e", "soft": "#1c2c48", "line": "#2a3c5c", "hero-bg": "#0f1a2e", "hero-ink": "#eef1f6",
     "font-display": "'Bodoni Moda', Georgia, serif", "font-script": "'Bodoni Moda', Georgia, serif",
     "font-body": "'Manrope', system-ui, sans-serif"},
    {
        "nombres": "Sebastián Rojas", "iniciales": "SR",
        "fecha": "2027-12-10T19:00", "fechaTexto": "Viernes 10 de diciembre de 2027",
        "tituloCalendario": "Graduación de Sebastián Rojas",
        "hero": {"pre": "Promoción 2027 · Ingeniería Civil", "tituloHTML": "Sebastián <em class='amp'>Rojas</em>", "sub": "¡Lo logré! Y quiero celebrarlo contigo"},
        "arte": {"tipo": "geometrico", "colores": ["#d4af6a", "#3b5a8c", "#ffffff"]},
        "agendar": True, "sobre": {"texto": "Invitación de graduación"},
        "mensaje": {"etiqueta": "Gracias", "texto": "“Cinco años, muchas noches sin dormir y una familia que nunca dejó de creer en mí.”"},
        "eventos": [
            {"tipo": "Acto de colación", "icono": "birrete", "lugar": "Auditorio Central UMSA", "hora": "7:00 PM", "direccion": "Av. Villazón 1995, La Paz", "inicio": "2027-12-10T19:00", "duracionHoras": 2},
            {"tipo": "Cena de celebración", "icono": "copa", "lugar": "Restaurante Mirador 360", "hora": "9:30 PM", "direccion": "Calle 21 de Calacoto, La Paz", "inicio": "2027-12-10T21:30", "duracionHoras": 4}],
        "itinerario": [{"hora": "7:00 PM", "evento": "Acto de colación"}, {"hora": "9:00 PM", "evento": "Fotos con la familia"},
                       {"hora": "9:30 PM", "evento": "Cena y brindis"}, {"hora": "11:00 PM", "evento": "Fiesta"}],
        "vestimenta": {"tipo": "Formal", "texto": "Traje oscuro o vestido de cóctel.", "colores": ["#0f1a2e", "#d4af6a", "#6b7c95"]},
        "confirmar": {"limite": "1 de diciembre de 2027", "whatsapp": WHATSAPP, "maxPersonas": 3},
        "confeti": ["#d4af6a", "#ffffff", "#3b5a8c"],
        "pie": "¡Nos vemos para celebrar!",
    },
    css=".hero h1 em { font-style: italic; } .quiz-card, .tarjeta, .bienvenida { box-shadow: none; }")

# ---------------------------------------------------------------- BAUTIZO
escribir(
    "bautizo-emilia", "Bautizo de Emilia", "Invitación de bautizo de ejemplo",
    "family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400&family=Dancing+Script:wght@500&family=Nunito:wght@400;600;700",
    {"bg": "#f3f8fc", "surface": "#ffffff", "ink": "#2d3e50", "muted": "#6e8297", "accent": "#5b8db8",
     "accent-ink": "#ffffff", "soft": "#e2eef8", "line": "#d4e3ef",
     "hero-bg": "linear-gradient(180deg, #dcecf8 0%, #f3f8fc 100%)", "hero-ink": "#2d3e50",
     "font-display": "'Fraunces', Georgia, serif", "font-script": "'Dancing Script', cursive",
     "font-body": "'Nunito', system-ui, sans-serif"},
    {
        "nombres": "Emilia", "iniciales": "E",
        "fecha": "2027-03-21T10:00", "fechaTexto": "Domingo 21 de marzo de 2027",
        "tituloCalendario": "Bautizo de Emilia",
        "hero": {"pre": "Mi bautizo", "tituloHTML": "Emilia", "sub": "Bienvenida a la familia de Dios"},
        "arte": {"tipo": "nubes", "colores": ["#ffffff", "#eaf3fb", "#9cc3e4"]},
        "agendar": True, "musica": MUSICA, "sobre": {"texto": "Con mucho amor te invitamos"},
        "mensaje": {"etiqueta": "Con cariño", "texto": "“Te esperamos con amor, te recibimos con fe.”",
                    "personas": [{"rol": "Mis papás", "nombres": ["Diego Aguilera", "Carla Montaño"]},
                                 {"rol": "Mis padrinos", "nombres": ["Luis Fernández", "Ana Belén Torrico"]}]},
        "galeria": {"titulo": "Mis primeros meses", "vacias": 3},
        "eventos": [
            {"tipo": "Ceremonia", "icono": "paloma", "lugar": "Parroquia Nuestra Señora de la Paz", "hora": "10:00 AM", "direccion": "Calle Bolívar 210, Tarija", "inicio": "2027-03-21T10:00", "duracionHoras": 1},
            {"tipo": "Almuerzo", "icono": "copa", "lugar": "Casa de la familia Aguilera", "hora": "12:30 PM", "direccion": "Barrio Las Panosas, Tarija", "inicio": "2027-03-21T12:30", "duracionHoras": 4}],
        "confirmar": {"limite": "10 de marzo de 2027", "whatsapp": WHATSAPP, "camposExtra": ["Niños que asistirán"]},
        "confeti": ["#5b8db8", "#ffffff", "#f3d27a"],
        "pie": "Gracias por acompañarnos en este día",
    })

# ---------------------------------------------------------------- CUMPLEAÑOS
escribir(
    "cumple-tomas", "El cumple de Tomás", "Invitación de cumpleaños infantil de ejemplo",
    "family=Baloo+2:wght@500;700;800&family=Nunito:wght@400;600;700;800",
    {"bg": "#fffaf0", "surface": "#ffffff", "ink": "#2b2a3d", "muted": "#6b6880", "accent": "#ff6b4a",
     "accent-ink": "#ffffff", "soft": "#fff0d6", "line": "#f3e2c4", "hero-bg": "#fff3dd", "hero-ink": "#2b2a3d",
     "font-display": "'Baloo 2', system-ui, sans-serif", "font-script": "'Baloo 2', system-ui, sans-serif",
     "font-body": "'Nunito', system-ui, sans-serif", "radius": "24px"},
    {
        "nombres": "Tomás", "iniciales": "5",
        "fecha": "2027-05-08T15:00", "fechaTexto": "Sábado 8 de mayo · 3:00 PM",
        "tituloCalendario": "Cumpleaños de Tomás",
        "hero": {"pre": "¡Estás invitado!", "tituloHTML": "Tomás <span class='amp'>cumple 5</span>", "sub": "Fiesta de dinosaurios 🦖", "boton": "¡Quiero ir!"},
        "arte": {"tipo": "globos", "colores": ["#ff6b4a", "#4ab3ff", "#ffc93c"]},
        "agendar": True, "sobre": {"texto": "Tienes una invitación"},
        "eventos": [{"tipo": "La fiesta", "icono": "pastel", "lugar": "Salón Mundo Feliz", "hora": "3:00 PM a 7:00 PM", "direccion": "Av. Banzer 3er anillo, Santa Cruz", "inicio": "2027-05-08T15:00", "duracionHoras": 4}],
        "itinerario": [{"hora": "3:00 PM", "evento": "Juegos inflables"}, {"hora": "4:00 PM", "evento": "Show de dinosaurios"},
                       {"hora": "5:00 PM", "evento": "Piñata"}, {"hora": "5:30 PM", "evento": "Torta y cumpleaños feliz"}],
        "vestimenta": {"tipo": "¡Disfraz opcional!", "texto": "Si quieres, ven disfrazado de dinosaurio o explorador. 🦕"},
        "compartirFotos": {"texto": "Papás: compartan aquí las fotos de la fiesta.", "link": "#"},
        "confirmar": {"etiqueta": "Confirma si vienes", "limite": "1 de mayo", "whatsapp": WHATSAPP, "camposExtra": ["Nombre del papá o mamá"], "textoGracias": "¡Te esperamos para jugar!",
            "frasesNo": ["¡Ese botón es de mentira! 🦖", "¡Rawr! No se puede.", "Tomás dice que tienes que venir.", "¡Hay torta! Piénsalo mejor."],
            "cuestionario": {"pregunta": "¿Vienes a mi cumple? 🎈", "preguntas": [
                {"q": "¿Cuál es tu dinosaurio favorito? 🦕", "opciones": ["T-Rex", "Triceratops", "Velociraptor", "Diplodocus", "¡Todos!"]},
                {"q": "¿Qué vas a hacer en la fiesta? 🎉", "opciones": ["Saltar en los inflables", "Romper la piñata", "Comer torta", "Bailar", "¡Todo!"]}]}},
        "confeti": ["#ff6b4a", "#4ab3ff", "#ffc93c", "#7ed957"],
        "pie": "¡Gracias por venir!",
    },
    css=".hero h1 { font-weight: 800; } .hero h1 .amp { display:block; font-size:.5em; } .titulo { font-weight: 800; } .sello { font-family: var(--font-display); font-weight: 800; font-size: 3rem; }")

# ---------------------------------------------------------------- SAVE THE DATE
escribir(
    "save-the-date", "Save the date · Andrea & Lucas", "Save the date de ejemplo",
    "family=Italiana&family=Inter:wght@400;500;600;700",
    {"bg": "#efe9e1", "surface": "#f8f5f0", "ink": "#1e1c1a", "muted": "#6d665e", "accent": "#1e1c1a",
     "accent-ink": "#f8f5f0", "soft": "#e4dcd1", "line": "#d6ccbf", "hero-bg": "#efe9e1", "hero-ink": "#1e1c1a",
     "font-display": "'Italiana', Georgia, serif", "font-script": "'Italiana', Georgia, serif",
     "font-body": "'Inter', system-ui, sans-serif"},
    {
        "nombres": "Andrea & Lucas", "iniciales": "A&L",
        "fecha": "2028-02-12T17:00", "fechaTexto": "12 · 02 · 2028",
        "tituloCalendario": "Boda de Andrea & Lucas (save the date)",
        "hero": {"pre": "Save the date", "tituloHTML": "Andrea <span class='amp'>&amp;</span> Lucas", "sub": "Reserva la fecha. Invitación formal próximamente."},
        "arte": {"tipo": "geometrico", "colores": ["#c4b6a4", "#d6ccbf", "#1e1c1a"]},
        "sobre": False, "agendar": True,
        "eventos": [{"tipo": "Dónde", "icono": "anillos", "lugar": "Viña del Valle", "hora": "Sábado 12 de febrero de 2028", "direccion": "Valle de Concepción, Tarija", "inicio": "2028-02-12T17:00", "duracionHoras": 8}],
        "confirmar": {"etiqueta": "Pre-confirmación", "whatsapp": WHATSAPP, "maxPersonas": 2, "textoGracias": "¡Gracias! Pronto recibirás la invitación formal."},
        "confeti": ["#1e1c1a", "#c4b6a4", "#ffffff"],
    },
    css=".hero h1 { letter-spacing: .02em; } .hero .fecha { font-size: 1.4rem; letter-spacing: .4em; }")

print("Listo")
