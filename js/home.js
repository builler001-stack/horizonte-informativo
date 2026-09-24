/* =========================================================
   home.js — Portada (Pantalla 01)
   Responsable: Estefanía
   Ya funciona: informe especial y tarjetas destacadas.
   TODO:
   - "Lo más leído" (ranking de 5 noticias)
   - Cita destacada del editorial
   - Boletín de la mañana (formulario con id="boletin", validar correo)
   - Maquetar en columnas como el Figma (estilos en css, bloque "Home")
   ========================================================= */

async function iniciarHome() {
  try {
    const noticias = await obtenerNoticias();
    const destacadas = noticias.filter(n => n.destacada);
    const principal = destacadas[0];

    if (principal) {
      document.getElementById("destacada").innerHTML = `
        <span class="categoria" style="color:var(--magenta)">Informe especial</span>
        <h1><a href="detalle.html?id=${principal.id}">${escaparHTML(principal.titulo)}</a></h1>
        <p class="bajada">${escaparHTML(principal.resumen)}</p>
        <p class="meta">Por ${escaparHTML(principal.autor)}, ${principal.lecturaMin} min de lectura</p>`;
    }

    document.getElementById("destacadas-seccion").innerHTML =
      destacadas.slice(1).map(crearTarjeta).join("");
  } catch (error) {
    document.getElementById("destacada").innerHTML =
      `<p class="mensaje-error">No se pudieron cargar las noticias. Abre el sitio con Live Server o en GitHub Pages.</p>`;
    console.error(error);
  }
}

iniciarHome();
