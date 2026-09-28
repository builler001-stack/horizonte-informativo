/* buzon.js — Muestra los mensajes guardados */
const lista = document.getElementById("lista-mensajes");
const resumen = document.getElementById("resumen");

function crear(etiqueta, texto, clase) {
  const el = document.createElement(etiqueta);
  el.textContent = texto;
  if (clase) el.className = clase;
  return el;
}

function pintarBuzon() {
  const mensajes = leerBuzon();
  lista.replaceChildren();
  resumen.textContent = mensajes.length
    ? `${mensajes.length} mensaje(s) recibido(s).`
    : "El buzón está vacío.";

  mensajes.forEach(m => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "grupo";
    tarjeta.append(
      crear("h2", m.asunto),
      crear("p", `${m.nombre} · ${m.correo} · ${m.motivo} · ${m.fecha}`, "nota"),
      crear("p", m.mensaje)
    );
    const borrar = crear("button", "Eliminar", "btn");
    borrar.type = "button";
    borrar.addEventListener("click", () => {
      eliminarMensaje(m.id);
      pintarBuzon();
    });
    tarjeta.append(borrar);
    lista.append(tarjeta);
  });
}

document.getElementById("btn-vaciar").addEventListener("click", () => {
  if (confirm("¿Borrar todos los mensajes?")) {
    vaciarBuzon();
    pintarBuzon();
  }
});

pintarBuzon();