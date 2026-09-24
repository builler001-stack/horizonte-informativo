/* =========================================================
   componentes.js — Header y footer compartidos
   Responsable: Builler.
   Todas las páginas tienen <header id="header"></header> y
   <footer id="footer"></footer>; este archivo los llena.
   Así el menú se cambia en UN solo lugar.
   ========================================================= */

// Secciones del menú principal (igual que en el mockup de Figma)
const SECCIONES = ["Política", "Economía", "Mundo", "Cultura", "Deportes", "Opinión"];

// Páginas propias del aplicativo (mínimo 5 páginas exigido)
const PAGINAS = [
  { texto: "Noticias", url: "noticias.html" },
  { texto: "Mis favoritos", url: "favoritos.html" },
  { texto: "Contacto", url: "contacto.html" },
  { texto: "Administrar noticias", url: "admin.html" }
];

/** Devuelve la fecha de hoy en formato "lunes 14 de septiembre de 2026" */
function fechaDeHoy() {
  return new Date().toLocaleDateString("es-CO", {
    weekday: "long", day: "numeric", month: "long", year: "numeric"
  });
}

/** Nombre del archivo actual, para marcar el enlace activo del menú */
function paginaActual() {
  return location.pathname.split("/").pop() || "index.html";
}

function crearHeader() {
  const actual = paginaActual();
  const categoriaUrl = new URLSearchParams(location.search).get("categoria");

  const enlacesSecciones = SECCIONES.map(sec => {
    const activo = actual === "noticias.html" && categoriaUrl === sec ? ' aria-current="page"' : "";
    return `<li><a href="noticias.html?categoria=${encodeURIComponent(sec)}"${activo}>${sec}</a></li>`;
  }).join("");

  const enlacesPaginas = PAGINAS.map(p => {
    const activo = actual === p.url && !categoriaUrl ? ' aria-current="page"' : "";
    return `<a href="${p.url}"${activo}>${p.texto}</a>`;
  }).join("");

  document.getElementById("header").innerHTML = `
    <div class="contenedor header">
      <div class="header__meta">
        <span>${fechaDeHoy()}</span>
        <span>Edición nacional</span>
        <span>N.º 4.218</span>
      </div>
      <a class="header__marca" href="index.html">Horizonte Informativo</a>
      <nav class="nav" aria-label="Secciones">
        <button class="btn btn--borde menu-btn" aria-expanded="false" aria-controls="menu">Menú</button>
        <ul class="nav__lista" id="menu">
          <li><a href="index.html"${actual === "index.html" ? ' aria-current="page"' : ""}>Portada</a></li>
          ${enlacesSecciones}
        </ul>
        <form class="nav__acciones" action="noticias.html" role="search">
          <input class="campo" type="search" name="buscar" placeholder="Buscar en la edición" aria-label="Buscar noticias">
          <a class="btn" href="index.html#boletin">Suscribirse</a>
        </form>
      </nav>
      <div class="nav__secundaria">${enlacesPaginas}</div>
    </div>`;

  // Menú hamburguesa (móvil)
  const boton = document.querySelector(".menu-btn");
  const lista = document.getElementById("menu");
  boton.addEventListener("click", () => {
    const abierto = lista.classList.toggle("abierto");
    boton.setAttribute("aria-expanded", abierto);
  });
}

function crearFooter() {
  document.getElementById("footer").innerHTML = `
    <div class="contenedor footer">
      <p class="footer__marca">Horizonte Informativo</p>
      <p>Calle 39 № 12-41, piso 4, Bogotá, Colombia · (601) 742 1180 · redaccion@horizonteinformativo.co</p>
      <p>Proyecto académico — Grupo 22, Desarrollo de Front-end, Politécnico Grancolombiano, 2026.</p>
    </div>`;
}

crearHeader();
crearFooter();
