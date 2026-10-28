const galeria = document.getElementById("galeria");
const track = document.querySelector(".galeria-track");
const ventanas = document.querySelectorAll(".ventana");

if (galeria && track) {
  let offset = 0;
  const maxScroll = () => Math.max(0, track.scrollWidth - galeria.clientWidth);

  galeria.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();
      const delta = event.deltaY || event.deltaX;
      offset = Math.min(maxScroll(), Math.max(0, offset + delta * 0.85));
      track.style.transform = `translateX(${-offset}px)`;
    },
    { passive: false }
  );
}

ventanas.forEach((ventana) => {
  ventana.addEventListener("click", function (event) {
    if (this.classList.contains("activa")) {
      return;
    }

    event.preventDefault();

    ventanas.forEach((v) => v.classList.remove("activa"));
    this.classList.add("activa");
  });
});
