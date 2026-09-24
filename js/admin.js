/* =========================================================
   admin.js — Mini CRUD de noticias
   Responsable: Pedro
   Ya funciona: lista las noticias con botón "Eliminar".
   TODO:
   - Crear en admin.html el formulario (título, categoría, autor, resumen, cuerpo)
   - Validar campos obligatorios y usar crearNoticia({...}) de datos.js
   - Volver a pintar la lista después de crear
   ========================================================= */

async function pintarTabla() {
  const zona = document.getElementById("tabla-noticias");
  const noticias = await obtenerNoticias();
  zona.innerHTML = noticias.map(n => `
    <div class="tarjeta" style="grid-template-columns:1fr auto">
      <div><span class="categoria">${escaparHTML(n.categoria)}</span>
        <h3>${escaparHTML(n.titulo)}</h3></div>
      <button class="btn btn--borde" data-eliminar="${n.id}">Eliminar</button>
    </div>`).join("");
}

document.getElementById("tabla-noticias").addEventListener("click", evento => {
  const id = evento.target.dataset.eliminar;
  if (id && confirm("¿Eliminar esta noticia?")) {
    eliminarNoticia(id);
    pintarTabla();
  }
});

pintarTabla();
