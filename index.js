const galeria = document.getElementById("galeria");
const track = document.querySelector(".galeria-track");
const ventanas = document.querySelectorAll(".ventana");

// En pantallas estrechas la galería se apila en columna y no hay scroll horizontal
const mobile = window.matchMedia("(max-width: 700px)");

if (galeria && track) {
  let offset = 0;
  const maxScroll = () => Math.max(0, track.scrollWidth - galeria.clientWidth);

  const setOffset = (value) => {
    offset = Math.min(maxScroll(), Math.max(0, value));
    track.style.transform = `translateX(${-offset}px)`;
  };

  // Rueda del ratón -> desplazamiento horizontal
  galeria.addEventListener(
    "wheel",
    (event) => {
      if (mobile.matches) return;
      const delta = event.deltaY || event.deltaX;
      const next = Math.min(maxScroll(), Math.max(0, offset + delta * 0.85));
      // Si ya estamos en un extremo, dejamos que la página haga scroll normal
      if (next === offset) return;
      event.preventDefault();
      setOffset(next);
    },
    { passive: false }
  );

  // Arrastre táctil (tablets) -> desplazamiento horizontal
  let startX = 0;
  let startOffset = 0;
  let dragging = false;

  galeria.addEventListener(
    "touchstart",
    (event) => {
      if (mobile.matches) return;
      dragging = true;
      startX = event.touches[0].clientX;
      startOffset = offset;
      track.style.transition = "none";
    },
    { passive: true }
  );

  galeria.addEventListener(
    "touchmove",
    (event) => {
      if (!dragging) return;
      setOffset(startOffset + (startX - event.touches[0].clientX));
    },
    { passive: true }
  );

  const endDrag = () => {
    dragging = false;
    track.style.transition = "";
  };
  galeria.addEventListener("touchend", endDrag);
  galeria.addEventListener("touchcancel", endDrag);

  // Al redimensionar, recolocar dentro de los límites (o resetear en móvil)
  window.addEventListener("resize", () => {
    if (mobile.matches) {
      offset = 0;
      track.style.transform = "";
    } else {
      setOffset(offset);
    }
  });
}

// Pasar el ratón por encima activa la ventana (se amplía y muestra el gif).
// Un solo clic/toque navega directamente a la página del proyecto.
const hoverCapaz = window.matchMedia("(hover: hover) and (pointer: fine)");

ventanas.forEach((ventana) => {
  ventana.addEventListener("mouseenter", function () {
    if (!hoverCapaz.matches) return;
    ventanas.forEach((v) => v.classList.toggle("activa", v === this));
  });
});
