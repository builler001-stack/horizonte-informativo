/* =========================================================
   favoritos.js — Lista personalizada de favoritos
   Muestra las noticias guardadas y permite quitarlas.
   ========================================================= */

async function pintarFavoritos() {
  const lista = document.getElementById("lista-favoritos");
  const ids = obtenerFavoritos();
  const noticias = (await obtenerNoticias()).filter(n => ids.includes(n.id));

  if (!noticias.length) {
    lista.innerHTML = `<p class="vacio">Aún no tienes favoritos. Abre una noticia y pulsa “Agregar a favoritos”.
      <a href="noticias.html">Ir a las noticias</a></p>`;
    return;
  }
  lista.innerHTML = `<p class="meta">${noticias.length} guardada${noticias.length > 1 ? "s" : ""}</p>` +
    noticias.map(n => `<div class="favorito">
        ${crearTarjeta(n)}
        <button class="btn btn--borde btn--peque" data-quitar="${n.id}" type="button">Quitar de favoritos</button>
      </div>`).join("");
}

document.getElementById("lista-favoritos").addEventListener("click", e => {
  const id = e.target.dataset.quitar;
  if (id) { quitarFavorito(id); pintarFavoritos(); }
});

pintarFavoritos();
