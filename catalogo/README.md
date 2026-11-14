# Brindis · Catálogo de invitaciones web

- `index.html`, `catalogo.css`, `catalogo.js`: página de ventas. Precios, diseños, funciones y preguntas se editan al inicio de `catalogo.js`.
- `demos/motor/`: el motor que arma cualquier invitación (`invitacion.js`, `invitacion.css`, `qrcode.js`).
- `demos/<ejemplo>/index.html`: cada invitación. Los datos están en `window.INV`.
- `demos/generar.py`: regenera los 6 ejemplos (`cd demos && python3 generar.py`).

## Hacer la invitación de un cliente
1. Copia la carpeta de un ejemplo (por ejemplo `demos/boda-valeria-mateo`) con otro nombre.
2. Cambia colores y fuentes en `:root` y los datos en `window.INV`. Quita `demo` y deja `credito`.
3. Si quieres fotos, ponlas en la carpeta y usa `galeria: { fotos: ["foto1.jpg", ...] }`.

## Link personal por invitado
`.../index.html?para=Familia%20Pérez&pases=4&mesa=7`
Muestra el nombre, limita las personas en el formulario y genera el pase con QR (si `pase: true`).

## Confirmaciones en Google Sheets (paquete Premium)
Pon en `confirmar.planilla` la URL de una Web App de Google Apps Script que reciba un POST con JSON y lo agregue como fila.
