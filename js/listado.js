/* =========================================================
   listado.js — Listado de noticias (Pantalla 02)
   Responsable: Nicolás
   Ya funciona: pinta todas las tarjetas y filtra por ?categoria= y ?buscar=
   TODO:
   - Chips de filtro (Todas, Política, Economía...) dentro de #filtros
   - Selector "Ordenar por" (más recientes / más antiguas)
   - Paginación (Anterior, números, Siguiente) en #paginacion
   ========================================================= */

async function iniciarListado() {
  const lista = document.getElementById("lista-noticias");
  try {
    const parametros = new URLSearchParams(location.search);
    const categoria = parametros.get("categoria");
    const buscar = (parametros.get("buscar") || "").toLowerCase();

    let noticias = await obtenerNoticias();
    if (categoria) noticias = noticias.filter(n => n.categoria === categoria);
    if (buscar) noticias = noticias.filter(n =>
      (n.titulo + " " + n.resumen).toLowerCase().includes(buscar));

    document.getElementById("contador").textContent =
      `${noticias.length} artículos${categoria ? " en " + categoria : ""}.`;

    lista.innerHTML = noticias.length
      ? noticias.map(crearTarjeta).join("")
      : `<p>No hay noticias con ese filtro. <a href="noticias.html">Ver todas</a></p>`;
  } catch (error) {
    lista.innerHTML = `<p class="mensaje-error">No se pudieron cargar las noticias.</p>`;
    console.error(error);
  }
}

iniciarListado();
