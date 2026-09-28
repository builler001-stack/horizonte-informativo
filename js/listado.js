/* =========================================================
   listado.js — Listado de noticias (Pantalla 02)
   Filtros por categoría (chips), búsqueda, orden y paginación.
   El estado se guarda en la URL (?categoria=&buscar=&pagina=)
   para que el menú y el buscador del header funcionen.
   ========================================================= */

const POR_PAGINA = 4;
const CATEGORIAS = ["Todas", "Política", "Economía", "Mundo", "Cultura", "Deportes", "Opinión", "Ciudad"];

// Estado del listado, leído de la URL
const parametros = new URLSearchParams(location.search);
const estado = {
  categoria: parametros.get("categoria") || "Todas",
  buscar: (parametros.get("buscar") || "").trim(),
  orden: "recientes",
  pagina: Number(parametros.get("pagina")) || 1
};
let todas = [];

/** Actualiza la URL sin recargar la página */
function guardarEnUrl() {
  const p = new URLSearchParams();
  if (estado.categoria !== "Todas") p.set("categoria", estado.categoria);
  if (estado.buscar) p.set("buscar", estado.buscar);
  if (estado.pagina > 1) p.set("pagina", estado.pagina);
  history.replaceState(null, "", "noticias.html" + (p.toString() ? "?" + p : ""));
}

/** Aplica filtros y orden sobre todas las noticias */
function filtrar() {
  let lista = todas;
  if (estado.categoria !== "Todas") lista = lista.filter(n => n.categoria === estado.categoria);
  if (estado.buscar) {
    const texto = estado.buscar.toLowerCase();
    lista = lista.filter(n => (n.titulo + " " + n.resumen + " " + n.autor).toLowerCase().includes(texto));
  }
  if (estado.orden === "antiguas") lista = [...lista].reverse();
  return lista;
}

function pintarChips() {
  document.getElementById("filtros").innerHTML = CATEGORIAS.map(c => `
    <button type="button" class="chip" data-categoria="${c}"
      aria-pressed="${c === estado.categoria}">${c}</button>`).join("");
}

function pintarPaginacion(totalPaginas) {
  const nav = document.getElementById("paginacion");
  if (totalPaginas <= 1) { nav.innerHTML = ""; return; }
  let html = `<button class="pag" data-pagina="${estado.pagina - 1}" ${estado.pagina === 1 ? "disabled" : ""}>Anterior</button>`;
  for (let i = 1; i <= totalPaginas; i++) {
    html += `<button class="pag" data-pagina="${i}" ${i === estado.pagina ? 'aria-current="page"' : ""}>${i}</button>`;
  }
  html += `<button class="pag" data-pagina="${estado.pagina + 1}" ${estado.pagina === totalPaginas ? "disabled" : ""}>Siguiente</button>`;
  nav.innerHTML = html;
}

/** Dibuja todo el listado según el estado actual */
function pintar() {
  const lista = filtrar();
  const totalPaginas = Math.max(1, Math.ceil(lista.length / POR_PAGINA));
  estado.pagina = Math.min(estado.pagina, totalPaginas);
  const pagina = lista.slice((estado.pagina - 1) * POR_PAGINA, estado.pagina * POR_PAGINA);

  document.getElementById("titulo-listado").textContent =
    estado.categoria === "Todas" ? "Noticias" : estado.categoria;
  document.getElementById("contador").textContent =
    `${lista.length} ${lista.length === 1 ? "artículo publicado" : "artículos publicados"}` +
    (estado.buscar ? ` con “${estado.buscar}”` : "") + ".";

  document.getElementById("lista-noticias").innerHTML = pagina.length
    ? pagina.map(crearTarjeta).join("")
    : `<p class="vacio">No hay noticias con ese filtro. <a href="noticias.html">Ver todas</a></p>`;

  pintarChips();
  pintarPaginacion(totalPaginas);
  guardarEnUrl();
}

async function iniciarListado() {
  // Si viene de una búsqueda, dejar el texto en el buscador del header
  const buscador = document.querySelector('input[name="buscar"]');
  if (buscador) buscador.value = estado.buscar;

  document.getElementById("filtros").addEventListener("click", e => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    estado.categoria = chip.dataset.categoria;
    estado.pagina = 1;
    pintar();
  });
  document.getElementById("orden").addEventListener("change", e => {
    estado.orden = e.target.value;
    estado.pagina = 1;
    pintar();
  });
  document.getElementById("paginacion").addEventListener("click", e => {
    const boton = e.target.closest(".pag");
    if (!boton || boton.disabled) return;
    estado.pagina = Number(boton.dataset.pagina);
    pintar();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  try {
    todas = await obtenerNoticias();
    pintar();
  } catch (error) {
    document.getElementById("lista-noticias").innerHTML =
      `<p class="mensaje-error">No se pudieron cargar las noticias.</p>`;
    console.error(error);
  }
}

iniciarListado();
