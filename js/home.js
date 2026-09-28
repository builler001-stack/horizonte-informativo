/* =========================================================
   home.js — Portada (Pantalla 01)
   Muestra: informe especial, "Lo más leído", noticias
   destacadas por sección y el formulario del boletín.
   ========================================================= */

/** Pinta el informe especial: la primera noticia destacada */
function pintarPrincipal(n) {
  document.getElementById("destacada").innerHTML = `
    <p class="rotulo rotulo--magenta">Informe especial</p>
    <h1 class="titular"><a href="detalle.html?id=${n.id}">${escaparHTML(n.titulo)}</a></h1>
    <p class="bajada">${escaparHTML(n.resumen)}</p>
    <p class="meta">Por ${escaparHTML(n.autor)} · ${n.lecturaMin || 5} min de lectura</p>
    <figure class="foto">
      <img src="${escaparHTML(n.imagen)}" alt="" class="foto--16-9">
      ${n.pieFoto ? `<figcaption>${escaparHTML(n.pieFoto)}</figcaption>` : ""}
    </figure>`;
}

/** Ranking de 5 noticias (las más recientes que no son la principal) */
function pintarMasLeido(noticias) {
  document.getElementById("mas-leido").innerHTML = noticias.slice(0, 5).map(n =>
    `<li><a href="detalle.html?id=${n.id}">${escaparHTML(n.titulo)}</a></li>`).join("");
}

/** Tarjetas compactas: una noticia por sección, como en el Figma */
function pintarPorSeccion(noticias) {
  const vistas = new Set();
  const unaPorSeccion = noticias.filter(n => {
    if (vistas.has(n.categoria)) return false;
    vistas.add(n.categoria);
    return true;
  }).slice(0, 3);

  document.getElementById("destacadas-seccion").innerHTML = unaPorSeccion.map(n => `
    <article class="tarjeta-compacta">
      <span class="categoria">${escaparHTML(n.categoria)}</span>
      <h3><a href="detalle.html?id=${n.id}">${escaparHTML(n.titulo)}</a></h3>
      <p>${escaparHTML(n.resumen)}</p>
      <a class="enlace-mas" href="detalle.html?id=${n.id}">Ver más →</a>
    </article>`).join("");
}

/** Boletín: valida el correo y muestra confirmación */
function activarBoletin() {
  const form = document.getElementById("form-boletin");
  const campo = document.getElementById("correo-boletin");
  const mensaje = document.getElementById("boletin-mensaje");

  form.addEventListener("submit", evento => {
    evento.preventDefault();
    const correo = campo.value.trim();
    if (!correoValido(correo)) {
      campo.classList.add("campo--error");
      mensaje.className = "mensaje-error";
      mensaje.textContent = "Escriba un correo válido, por ejemplo nombre@dominio.com.";
      return;
    }
    campo.classList.remove("campo--error");
    mensaje.className = "mensaje-exito";
    mensaje.textContent = `¡Listo! Enviaremos el boletín a ${correo}.`;
    form.reset();
  });
}

async function iniciarHome() {
  activarBoletin();
  try {
    const noticias = await obtenerNoticias();
    const principal = noticias.find(n => n.destacada) || noticias[0];
    const resto = noticias.filter(n => n !== principal);

    if (principal) pintarPrincipal(principal);
    pintarMasLeido(resto);
    pintarPorSeccion(resto.filter(n => n.destacada).concat(resto.filter(n => !n.destacada)));
  } catch (error) {
    document.getElementById("destacada").innerHTML =
      `<p class="mensaje-error">No se pudieron cargar las noticias. Abra el sitio con Live Server o en GitHub Pages.</p>`;
    console.error(error);
  }
}

iniciarHome();
