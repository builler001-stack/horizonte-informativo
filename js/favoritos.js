/* =========================================================
   favoritos.js — Lista personalizada de favoritos
   Responsable: Andrés
   Ya funciona: muestra las noticias guardadas.
   TODO:
   - Botón "Quitar" en cada tarjeta
   - Diseño acorde al resto del sitio
   ========================================================= */

async function iniciarFavoritos() {
  const lista = document.getElementById("lista-favoritos");
  const ids = obtenerFavoritos();
  const noticias = (await obtenerNoticias()).filter(n => ids.includes(n.id));

  lista.innerHTML = noticias.length
    ? noticias.map(crearTarjeta).join("")
    : `<p>Aún no tienes favoritos. Abre una noticia y pulsa "Agregar a favoritos".
       <a href="noticias.html">Ir a las noticias</a></p>`;
}

iniciarFavoritos();
