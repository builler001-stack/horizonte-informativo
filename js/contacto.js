/* =========================================================
   contacto.js — Formulario de contacto (Pantalla 04)
   Valida campos obligatorios y formato de correo, muestra
   los errores junto a cada campo y un mensaje de confirmación.
   ========================================================= */

const formContacto = document.getElementById("form-contacto");
const confirmacion = document.getElementById("confirmacion");

// Reglas de validación: campo -> función que devuelve el error o ""
const reglas = {
  nombre: v => v.length < 3 ? "Escriba su nombre y apellido." : "",
  correo: v => !v ? "El correo es obligatorio." : !correoValido(v) ? "El correo no tiene un formato válido." : "",
  asunto: v => !v ? "Escriba el asunto." : "",
  mensaje: v => v.length < 10 ? "El mensaje debe tener al menos 10 caracteres." : ""
};

/** Valida un campo, pinta su error y devuelve true si está bien */
function validarCampo(nombre) {
  const campo = document.getElementById(nombre);
  const error = reglas[nombre](campo.value.trim());
  document.getElementById("error-" + nombre).textContent = error;
  campo.classList.toggle("campo--error", !!error);
  campo.setAttribute("aria-invalid", !!error);
  return !error;
}

// Validar cada campo al salir de él
Object.keys(reglas).forEach(nombre =>
  document.getElementById(nombre).addEventListener("blur", () => validarCampo(nombre)));

formContacto.addEventListener("submit", evento => {
  evento.preventDefault();
  confirmacion.textContent = "";
  const resultados = Object.keys(reglas).map(validarCampo);
  if (resultados.includes(false)) {
    formContacto.querySelector(".campo--error").focus();
    return;
  }
   const nombreCompleto = document.getElementById("nombre").value.trim();
  const nombre = nombreCompleto.split(" ")[0];
  const motivo = formContacto.querySelector('input[name="motivo"]:checked').value;

  guardarMensaje({
    id: Date.now(),
    fecha: new Date().toLocaleString("es-CO"),
    nombre: nombreCompleto,
    correo: document.getElementById("correo").value.trim(),
    asunto: document.getElementById("asunto").value.trim(),
    motivo,
    mensaje: document.getElementById("mensaje").value.trim()
  });

  confirmacion.textContent = `Gracias, ${nombre}. Recibimos su mensaje para ${motivo}; le responderemos en menos de dos días hábiles.`;
  formContacto.reset();
});
