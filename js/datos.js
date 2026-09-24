/* =========================================================
   datos.js — Funciones compartidas por todas las páginas
   Responsable: Builler.
   Aquí está TODO lo que toca datos: leer el JSON, noticias
   creadas/eliminadas (mini CRUD) y favoritos (localStorage).
   Úsenlas desde su página en vez de escribir las suyas.
   ========================================================= */

const CLAVE_CREADAS = "hi_noticias_creadas";     // noticias creadas en admin.html
const CLAVE_ELIMINADAS = "hi_noticias_eliminadas"; // ids eliminados
const CLAVE_FAVORITOS = "hi_favoritos";           // ids favoritos

/* ---------- Utilidades de localStorage ---------- */
function leerLista(clave) {
  try { return JSON.parse(localStorage.getItem(clave)) || []; }
  catch { return []; }
}
function guardarLista(clave, lista) {
  localStorage.setItem(clave, JSON.stringify(lista));
}

/* ---------- Noticias ---------- */

/**
 * Devuelve todas las noticias: las del JSON + las creadas por el
 * usuario, sin las eliminadas, ordenadas de la más reciente a la más antigua.
 * Uso:  const noticias = await obtenerNoticias();
 */
async function obtenerNoticias() {
  const respuesta = await fetch("data/noticias.json");
  if (!respuesta.ok) throw new Error("No se pudo cargar data/noticias.json");
  const base = await respuesta.json();
  const eliminadas = leerLista(CLAVE_ELIMINADAS);
  return [...base, ...leerLista(CLAVE_CREADAS)]
    .filter(n => !eliminadas.includes(n.id))
    .sort((a, b) => b.fecha.localeCompare(a.fecha));
}

/** Busca una noticia por su id (número). Devuelve undefined si no existe. */
async function obtenerNoticiaPorId(id) {
  const noticias = await obtenerNoticias();
  return noticias.find(n => n.id === Number(id));
}

/** Mini CRUD: crea una noticia nueva. Recibe un objeto sin id. */
function crearNoticia(datos) {
  const creadas = leerLista(CLAVE_CREADAS);
  const nueva = { ...datos, id: Date.now(), imagen: datos.imagen || "img/placeholder.svg" };
  creadas.push(nueva);
  guardarLista(CLAVE_CREADAS, creadas);
  return nueva;
}

/** Mini CRUD: elimina una noticia (del JSON o creada) por su id. */
function eliminarNoticia(id) {
  id = Number(id);
  guardarLista(CLAVE_CREADAS, leerLista(CLAVE_CREADAS).filter(n => n.id !== id));
  const eliminadas = leerLista(CLAVE_ELIMINADAS);
  if (!eliminadas.includes(id)) eliminadas.push(id);
  guardarLista(CLAVE_ELIMINADAS, eliminadas);
  quitarFavorito(id);
}

/* ---------- Favoritos ---------- */
function obtenerFavoritos() { return leerLista(CLAVE_FAVORITOS); }
function esFavorito(id) { return obtenerFavoritos().includes(Number(id)); }
function agregarFavorito(id) {
  const favs = obtenerFavoritos();
  if (!favs.includes(Number(id))) favs.push(Number(id));
  guardarLista(CLAVE_FAVORITOS, favs);
}
function quitarFavorito(id) {
  guardarLista(CLAVE_FAVORITOS, obtenerFavoritos().filter(f => f !== Number(id)));
}
/** Agrega o quita; devuelve true si quedó como favorito. */
function alternarFavorito(id) {
  if (esFavorito(id)) { quitarFavorito(id); return false; }
  agregarFavorito(id); return true;
}

/* ---------- Presentación ---------- */

/** Evita que texto escrito por el usuario se interprete como HTML */
function escaparHTML(texto = "") {
  return String(texto).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/** "2026-09-14" -> "14 de septiembre de 2026" */
function formatearFecha(fechaISO) {
  return new Date(fechaISO + "T12:00:00").toLocaleDateString("es-CO", {
    day: "numeric", month: "long", year: "numeric"
  });
}

/**
 * Devuelve el HTML de una tarjeta de noticia (imagen, categoría,
 * título como enlace "ver más", resumen y autor), igual al mockup.
 */
function crearTarjeta(n) {
  return `
    <article class="tarjeta">
      <a href="detalle.html?id=${n.id}" tabindex="-1" aria-hidden="true">
        <img src="${escaparHTML(n.imagen)}" alt="" loading="lazy">
      </a>
      <div>
        <span class="categoria">${escaparHTML(n.categoria)}</span>
        <h3><a href="detalle.html?id=${n.id}">${escaparHTML(n.titulo)}</a></h3>
        <p>${escaparHTML(n.resumen)}</p>
        <p class="meta">Por ${escaparHTML(n.autor)}, ${formatearFecha(n.fecha)}</p>
        <a class="btn btn--borde" href="detalle.html?id=${n.id}">Ver más</a>
      </div>
    </article>`;
}
