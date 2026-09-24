/* =========================================================
   contacto.js — Formulario de contacto (Pantalla 04)
   Responsable: Pedro
   TODO:
   - Crear en contacto.html los campos: Nombre, Correo, Asunto,
     Motivo (Redacción / Publicidad / Suscripciones) y Mensaje
   - Validar: campos obligatorios y correo con formato válido
   - Mostrar errores junto a cada campo (clase .campo--error y .mensaje-error)
   - Al enviar bien: mostrar confirmación en #confirmacion y limpiar el formulario
   - Panel lateral con datos de la redacción y horario (como el Figma)
   ========================================================= */

/** Devuelve true si el texto tiene formato de correo */
function correoValido(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo);
}

const formContacto = document.getElementById("form-contacto");
formContacto.addEventListener("submit", evento => {
  evento.preventDefault();
  // TODO (Pedro): validar campos aquí
});
