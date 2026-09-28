/* almacen.js — Guarda y lee los mensajes del buzón (localStorage) */
const CLAVE_BUZON = "horizonte_buzon";

function leerBuzon() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_BUZON)) || [];
  } catch {
    return [];
  }
}

function guardarMensaje(mensaje) {
  const buzon = leerBuzon();
  buzon.unshift(mensaje); // el más reciente primero
  localStorage.setItem(CLAVE_BUZON, JSON.stringify(buzon));
}

function eliminarMensaje(id) {
  const buzon = leerBuzon().filter(m => m.id !== id);
  localStorage.setItem(CLAVE_BUZON, JSON.stringify(buzon));
}

function vaciarBuzon() {
  localStorage.removeItem(CLAVE_BUZON);
}