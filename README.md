# Invitación de boda 💍

Página web de invitación con portada, cuenta regresiva, historia, galería de fotos, detalles del evento, itinerario, código de vestimenta, mesa de regalos y una **confirmación de asistencia en forma de cuestionario** (el botón "No" huye del mouse 😈 y si eligen vestido blanco… la invitación queda revocada).

## Personalizar
Todo se edita en **`config.js`**: nombres, fecha, lugares, mapas, itinerario, regalos, número de WhatsApp, etc.

### Fotos
Pon tus fotos en la carpeta `fotos/` con estos nombres (o cambia los nombres en `config.js`):
- `portada.jpg` → fondo de la portada
- `1.jpg` … `6.jpg` → galería

Si una foto no existe se muestra un recuadro "Tu foto aquí".

### Confirmaciones
- Por defecto, al enviar el formulario se abre **WhatsApp** con un mensaje ya escrito (datos + respuestas del cuestionario) hacia el número en `whatsapp`.
- Opcional: crea un formulario gratis en https://formspree.io y pega su URL en `formspree` para recibirlas por correo.

## Probar en tu computadora
Abre `index.html` en el navegador, o ejecuta `python3 -m http.server` y entra a http://localhost:8000

## Publicar gratis (GitHub Pages)
En GitHub: **Settings → Pages → Source: Deploy from a branch → rama `main` / carpeta `/ (root)`**. Tu invitación quedará en `https://<usuario>.github.io/<repositorio>/`.
