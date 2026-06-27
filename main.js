//  Codigo para cambiar la imagen principal al hacer clic en una miniatura

const imagenPrincipal = document.getElementById("imagenPrincipal");
document.querySelectorAll(".miniatura").forEach(function (mini) {
  mini.addEventListener("click", function () {
    imagenPrincipal.src = mini.src;
    imagenPrincipal.alt = mini.alt;
  });
});

const btnFavorito = document.getElementById("btnFavorito");
btnFavorito.addEventListener("click", function () {
  btnFavorito.classList.toggle("btn-outline-danger");
  btnFavorito.classList.toggle("btn-danger");
  btnFavorito.classList.toggle("text-white");
  const corazon = btnFavorito.querySelector("i");
  corazon.classList.toggle("bi-heart");
  corazon.classList.toggle("bi-heart-fill");
});
