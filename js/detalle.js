/* =========================================================
   detalle.js — Detalle de noticia (Pantalla 03)
   Ruta de navegación, favoritos, compartir, cuerpo con
   cita destacada, panel "Las cifras" y noticias relacionadas.
   ========================================================= */

/** Recorta un texto largo para la ruta de navegación */
function recortar(texto, max = 40) {
  return texto.length > max ? texto.slice(0, max).trim() + "…" : texto;
}

/** Cuerpo del artículo: párrafos, con la cita después del segundo */
function crearCuerpo(n) {
  const parrafos = (n.cuerpo || [n.resumen]).map(p => `<p>${escaparHTML(p)}</p>`);
  if (n.cita) {
    const cita = `<blockquote class="cita-destacada">
        <p>“${escaparHTML(n.cita.texto)}”</p><footer>— ${escaparHTML(n.cita.autor)}</footer>
      </blockquote>`;
    parrafos.splice(Math.min(2, parrafos.length), 0, cita);
  }
  return parrafos.join("");
}

/** Panel lateral con indicadores numéricos */
function crearCifras(n) {
  if (!n.cifras || !n.cifras.length) return "";
  return `<aside class="cifras" aria-label="Las cifras">
      <p class="rotulo">Las cifras</p>
      ${n.cifras.map((c, i) => `<p class="cifra ${i === 0 ? "cifra--azul" : ""}">${escaparHTML(c.valor)}</p>
        <p class="cifra__texto">${escaparHTML(c.texto)}</p>`).join("")}
    </aside>`;
}

/** Tres noticias relacionadas: primero de la misma sección */
function crearRelacionadas(n, todas) {
  const otras = todas.filter(o => o.id !== n.id);
  const relacionadas = [...otras.filter(o => o.categoria === n.categoria),
                        ...otras.filter(o => o.categoria !== n.categoria)].slice(0, 3);
  return `<section class="relacionadas" aria-labelledby="t-rel">
      <h2 id="t-rel" class="rotulo">También en esta edición</h2>
      <div class="grid-secciones">
        ${relacionadas.map(r => `<article class="tarjeta-compacta">
          <a href="detalle.html?id=${r.id}" tabindex="-1" aria-hidden="true">
            <img src="${escaparHTML(r.imagen)}" alt="" loading="lazy">
          </a>
          <span class="categoria">${escaparHTML(r.categoria)}</span>
          <h3><a href="detalle.html?id=${r.id}">${escaparHTML(r.titulo)}</a></h3>
        </article>`).join("")}
      </div>
    </section>`;
}

/** Comparte con el menú del celular o copia el enlace */
async function compartir(n, boton) {
  const datos = { title: n.titulo, url: location.href };
  try {
    if (navigator.share) { await navigator.share(datos); return; }
    await navigator.clipboard.writeText(location.href);
    boton.textContent = "Enlace copiado";
  } catch {
    boton.textContent = "No se pudo compartir";
  }
  setTimeout(() => boton.textContent = "Compartir", 2000);
}

async function iniciarDetalle() {
  const contenedor = document.getElementById("articulo");
  const id = new URLSearchParams(location.search).get("id");
  let todas = [];
  try { todas = await obtenerNoticias(); } catch (e) { console.error(e); }
  const n = todas.find(x => x.id === Number(id));

  if (!n) {
    contenedor.innerHTML = `<h1>No encontramos esta noticia</h1>
      <p>Puede que haya sido eliminada. <a href="noticias.html">Volver al listado</a></p>`;
    return;
  }

  document.title = `${n.titulo} | Horizonte Informativo`;
  contenedor.innerHTML = `
    <nav class="migas" aria-label="Ruta de navegación">
      <a href="index.html">Portada</a> /
      <a href="noticias.html?categoria=${encodeURIComponent(n.categoria)}">${escaparHTML(n.categoria)}</a> /
      <span>${escaparHTML(recortar(n.titulo))}</span>
    </nav>
    <h1 class="titular">${escaparHTML(n.titulo)}</h1>
    <p class="bajada">${escaparHTML(n.resumen)}</p>
    <div class="detalle-meta">
      <span class="meta">Por ${escaparHTML(n.autor)} · ${formatearFecha(n.fecha)} · ${n.lecturaMin || 5} min</span>
      <button class="btn btn--borde btn--peque" id="btn-compartir" type="button">Compartir</button>
      <button class="btn btn--peque" id="btn-favorito" type="button"></button>
    </div>
    <figure class="foto">
      <img src="${escaparHTML(n.imagen)}" alt="" class="foto--2-1">
      ${n.pieFoto ? `<figcaption>${escaparHTML(n.pieFoto)}</figcaption>` : ""}
    </figure>
    <div class="detalle-cuerpo ${n.cifras ? "" : "detalle-cuerpo--solo"}">
      <div class="texto">${crearCuerpo(n)}</div>
      ${crearCifras(n)}
    </div>
    ${crearRelacionadas(n, todas)}`;

  // Botón agregar / quitar de favoritos (localStorage)
  const botonFav = document.getElementById("btn-favorito");
  const pintarFav = () => {
    const fav = esFavorito(n.id);
    botonFav.textContent = fav ? "★ Quitar de favoritos" : "☆ Agregar a favoritos";
    botonFav.setAttribute("aria-pressed", fav);
  };
  botonFav.addEventListener("click", () => { alternarFavorito(n.id); pintarFav(); });
  pintarFav();

  const botonCompartir = document.getElementById("btn-compartir");
  botonCompartir.addEventListener("click", () => compartir(n, botonCompartir));
}

iniciarDetalle();
