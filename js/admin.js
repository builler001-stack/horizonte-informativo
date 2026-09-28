/* =========================================================
   admin.js — Mini CRUD de noticias
   Crear (con validaciones) y eliminar noticias.
   Usa crearNoticia() y eliminarNoticia() de datos.js.
   ========================================================= */

const formNoticia = document.getElementById("form-noticia");
const campos = ["n-titulo", "n-categoria", "n-autor", "n-resumen", "n-cuerpo"];

/** Valida que todos los campos estén llenos */
function validarNoticia() {
  let valido = true;
  campos.forEach(id => {
    const campo = document.getElementById(id);
    const vacio = !campo.value.trim();
    document.getElementById("error-" + id).textContent = vacio ? "Este campo es obligatorio." : "";
    campo.classList.toggle("campo--error", vacio);
    if (vacio) valido = false;
  });
  return valido;
}

async function pintarTabla() {
  const noticias = await obtenerNoticias();
  document.getElementById("total-admin").textContent = noticias.length;
  document.getElementById("tabla-noticias").innerHTML = noticias.map(n => `
    <div class="fila-admin">
      <div>
        <span class="categoria">${escaparHTML(n.categoria)}</span>
        <p class="fila-admin__titulo"><a href="detalle.html?id=${n.id}">${escaparHTML(n.titulo)}</a></p>
        <p class="meta">${escaparHTML(n.autor)} · ${formatearFecha(n.fecha)}</p>
      </div>
      <button class="btn btn--borde btn--peque" data-eliminar="${n.id}" type="button">Eliminar</button>
    </div>`).join("");
}

formNoticia.addEventListener("submit", evento => {
  evento.preventDefault();
  if (!validarNoticia()) return;
  const valor = id => document.getElementById(id).value.trim();
  const nueva = crearNoticia({
    titulo: valor("n-titulo"),
    categoria: valor("n-categoria"),
    autor: valor("n-autor"),
    resumen: valor("n-resumen"),
    cuerpo: valor("n-cuerpo").split(/\n\s*\n/).filter(Boolean),
    fecha: new Date().toISOString().slice(0, 10),
    lecturaMin: Math.max(1, Math.round(valor("n-cuerpo").split(/\s+/).length / 200)),
    destacada: document.getElementById("n-destacada").checked
  });
  document.getElementById("admin-mensaje").innerHTML =
    `Noticia publicada. <a href="detalle.html?id=${nueva.id}">Verla</a>`;
  formNoticia.reset();
  pintarTabla();
});

document.getElementById("tabla-noticias").addEventListener("click", evento => {
  const id = evento.target.dataset.eliminar;
  if (id && confirm("¿Eliminar esta noticia?")) {
    eliminarNoticia(id);
    pintarTabla();
  }
});

// Deja todo como al principio (útil para pruebas y la sustentación)
document.getElementById("btn-restaurar").addEventListener("click", () => {
  if (!confirm("¿Borrar las noticias creadas y recuperar las eliminadas?")) return;
  localStorage.removeItem(CLAVE_CREADAS);
  localStorage.removeItem(CLAVE_ELIMINADAS);
  pintarTabla();
});

pintarTabla();
