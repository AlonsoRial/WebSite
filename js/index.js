const ventanas = document.querySelectorAll(".ventana");

ventanas.forEach((ventana) => {
  ventana.addEventListener("click", function (event) {
    // Si esta ventana ya está ampliada, deja que el enlace funcione
    if (this.classList.contains("activa")) {
      return;
    }

    // Primer clic: evitar navegación
    event.preventDefault();

    // Quitar el tamaño grande a todas
    ventanas.forEach((v) => v.classList.remove("activa"));

    // Ampliar solo la clicada
    this.classList.add("activa");
  });
});