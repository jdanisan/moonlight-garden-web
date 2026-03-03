/* ---------------------------------------------------------------------------------------------------------------------------------- */
/* ---------------------------------------------Function for navbar and hamburger menu----------------------------------------------- */
/* ---------------------------------------------------------------------------------------------------------------------------------- */
function myFunction() {
  var x = document.getElementById("navMenu");
  if (x.className === "navbar") {
    x.className += " responsive";
  } else {
    x.className = "navbar";
  }
}

/* ---------------------------------------------------------------------------------------------------------------------------------- */
/* ---------------------------------------------Anuncios (Opción 2: Objeto centralizado)--------------------------------------------- */
/* ---------------------------------------------------------------------------------------------------------------------------------- */
//TODO: Arreglar que la imagen rompa el modal 
const anuncios = {
  anuncio1: {
    titulo: "Generador eléctrico",
    urlIMG:"https://cdn.wallapop.com/images/10420/ip/v7/__/c10420p1131837575/i5643468376.jpg?pictureSize=W640",
    descripcion: "Haz clic para ir al anuncio real:",
    url: "https://wallapop.com/item/generador-de-gasoil-1131837575"
  },
  anuncio2: {
    titulo: "Cisterna  1500lt",
    urlIMG:"https://cdn.wallapop.com/images/10420/kb/kf/__/c10420p1228752416/i6309806661.jpg?pictureSize=W640",
    descripcion: "Descripción del anuncio 2.",
    url: "https://es.wallapop.com/item/cisterna-para-tractor-1228752416"
  },
  anuncio3: {
    titulo: "Aperos",
    urlIMG:"https://cdn.wallapop.com/images/10420/ke/uj/__/c10420p1234262845/i6316983174.jpg?pictureSize=W640",
    descripcion: "Haz clic para ir a ver los aperos.",
    url: "https://es.wallapop.com/item/tractor-john-deere-1635-1234262845"
  },
  anuncio4: {
    titulo: "Ebro 160D",
    urlIMG:"https://cdn.wallapop.com/images/10420/kf/cp/__/c10420p1235110467/i6329881967.jpg?pictureSize=W640",
    descripcion: "Descripción del anuncio 4.",
    url: "https://es.wallapop.com/item/tractor-ebro-160d-1235110467"
  },
  anuncio5: {
    titulo: "John Deere 717",
    urlIMG:"https://cdn.wallapop.com/images/10420/kf/qu/__/c10420p1235770709/i6325819249.jpg?pictureSize=W640",
    descripcion: "Descripción del anuncio 5.",
    url: "https://es.wallapop.com/item/tractor-717-para-restaurar-1235770709"
  }
};

/* ---------------------------------------------------------------------------------------------------------------------------------- */
/* ---------------------------------------------Function for advertisement modal----------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------------------------------------------- */

function abrirModal(id) {
  const modal = document.getElementById("modalAnuncio");
  const contenido = document.getElementById("contenidoAnuncio");

  const anuncio = anuncios[id];

  contenido.innerHTML = `
    <h2>${anuncio.titulo}</h2>
    <img src="${anuncio.urlIMG}"></img>
    <p>${anuncio.descripcion}</p>
    <a href="${anuncio.url}" target="_blank">Ver anuncio</a>
  `;

  modal.style.display = "block";
}

function cerrarModal() {
  document.getElementById("modalAnuncio").style.display = "none";
}

// Cerrar modal al hacer clic fuera
window.onclick = function (event) {
  const modal = document.getElementById("modalAnuncio");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
