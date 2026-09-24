/* =========================================================
   detalle.js — Detalle de noticia (Pantalla 03)
   Responsable: Andrés
   Ya funciona: lee ?id= de la URL, muestra la noticia y el botón de favoritos.
   TODO:
   - Ruta de navegación (Portada / Sección / Noticia)
   - Panel lateral "Las cifras" (n.cifras) y cita destacada (n.cita)
   - Sección "También en esta edición" con 3 noticias relacionadas
   - Botón "Compartir"
   ========================================================= */

async function iniciarDetalle() {
  const contenedor = document.getElementById("articulo");
  const id = new URLSearchParams(location.search).get("id");
  const n = await obtenerNoticiaPorId(id).catch(() => undefined);

  if (!n) {
    contenedor.innerHTML = `<h1>No encontramos esta noticia</h1>
      <p>Puede que haya sido eliminada. <a href="noticias.html">Volver al listado</a></p>`;
    return;
  }

  document.title = `${n.titulo} | Horizonte Informativo`;
  contenedor.innerHTML = `
    <span class="categoria">${escaparHTML(n.categoria)}</span>
    <h1>${escaparHTML(n.titulo)}</h1>
    <p class="bajada">${escaparHTML(n.resumen)}</p>
    <p class="meta">Por ${escaparHTML(n.autor)}, ${formatearFecha(n.fecha)}</p>
    <button class="btn" id="btn-favorito"></button>
    <img src="${escaparHTML(n.imagen)}" alt="" style="margin:20px 0">
    ${(n.cuerpo || []).map(p => `<p>${escaparHTML(p)}</p>`).join("")}`;

  // Botón agregar / quitar de favoritos (localStorage)
  const boton = document.getElementById("btn-favorito");
  const pintar = () => boton.textContent = esFavorito(n.id) ? "Quitar de favoritos" : "Agregar a favoritos";
  boton.addEventListener("click", () => { alternarFavorito(n.id); pintar(); });
  pintar();
}

iniciarDetalle();
