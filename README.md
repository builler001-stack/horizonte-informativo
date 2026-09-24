# Horizonte Informativo

Plataforma web de noticias – Grupo 22, Desarrollo de Front-end, Politécnico Grancolombiano (2026).
Tutor: John Olarte Ramos.

**Sitio publicado:** https://builler001-stack.github.io/horizonte-informativo/

## Integrantes y reparto de la Entrega 2

| Integrante | Responsabilidad | Archivos |
|---|---|---|
| Builler Tapia Sierra | Base del proyecto, estilos globales, header y footer, datos, revisión de Pull Requests | `css/estilos.css`, `js/componentes.js`, `js/datos.js`, `data/noticias.json` |
| Estefania Garcia Garzon | Portada (Pantalla 01) | `index.html`, `js/home.js` |
| Nicolas Bolivar Leon | Listado de noticias (Pantalla 02) | `noticias.html`, `js/listado.js` |
| Andres Felipe Bernal Rodriguez | Detalle (Pantalla 03) y favoritos | `detalle.html`, `js/detalle.js`, `favoritos.html`, `js/favoritos.js` |
| Pedro Armando Vallejo Varon | Contacto (Pantalla 04) y mini CRUD | `contacto.html`, `js/contacto.js`, `admin.html`, `js/admin.js` |

Cada archivo `.js` tiene al inicio una lista **TODO** con lo que falta.
Los estilos propios de cada página van en `css/estilos.css`, **solo en el bloque con tu nombre** (al final del archivo).

## Estructura

```
index.html          Portada
noticias.html       Listado (acepta ?categoria=Economía y ?buscar=texto)
detalle.html        Detalle (detalle.html?id=1)
favoritos.html      Mis favoritos
contacto.html       Contacto
admin.html          Administrar noticias (crear / eliminar)
css/estilos.css     Estilos globales + un bloque por integrante
js/componentes.js   Header y footer compartidos (no copiar el menú en cada HTML)
js/datos.js         Funciones compartidas: noticias, favoritos, tarjetas
js/*.js             Un archivo por página
data/noticias.json  Noticias de ejemplo (las del Figma)
img/                Imágenes
```

### Funciones de `js/datos.js` que pueden usar

- `await obtenerNoticias()` → todas las noticias (JSON + creadas − eliminadas)
- `await obtenerNoticiaPorId(id)`
- `crearNoticia({titulo, categoria, autor, resumen, cuerpo, fecha})` / `eliminarNoticia(id)`
- `obtenerFavoritos()`, `esFavorito(id)`, `alternarFavorito(id)`
- `crearTarjeta(noticia)` → HTML de una tarjeta igual al mockup
- `escaparHTML(texto)`, `formatearFecha("2026-09-14")`

## Cómo trabajar (sin instalar nada)

1. Acepta la invitación de colaborador que te llegó al correo.
2. En el repositorio pulsa **Code → Codespaces → Create codespace on main**. Se abre VS Code en el navegador.
3. En la terminal de abajo crea tu rama (cambia el nombre):
   ```
   git checkout -b feature/home
   ```
   Ramas sugeridas: `feature/home`, `feature/listado`, `feature/detalle`, `feature/contacto`.
4. Para ver la página: instala la extensión **Live Server**, clic derecho en `index.html` → **Open with Live Server**.
   ⚠️ No abras los HTML con doble clic: el JSON no carga sin servidor.
5. Guarda tu avance seguido:
   ```
   git add .
   git commit -m "Home: agrega sección lo más leído"
   git push -u origin feature/home
   ```
6. Cuando termines una parte, en GitHub pulsa **Compare & pull request** → **Create pull request**. Builler lo revisa y lo une a `main`.

La rama `main` está protegida: nadie sube cambios directamente, todo entra por Pull Request.
Los commits de cada uno son la evidencia de participación individual, así que **commitea con tu propia cuenta**.

## Tecnologías

HTML5, CSS3, JavaScript, localStorage, JSON local, GitHub Pages. En la Entrega 3 se migra a Angular.
