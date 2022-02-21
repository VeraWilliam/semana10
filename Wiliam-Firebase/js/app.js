// Menu 
import {
  menuModal
} from "./menu.js"


// Habilidad
import {
  Habilidad
} from './habilidades.js'


const habilidad = new Habilidad("HABILIDADES")
let id = ""
let grabar = true
const $habilidadesForm = document.getElementById("habilidades__form");

document.addEventListener("DOMContentLoaded", () => {
  menuModal();
  document.querySelector(".skills-title").innerHTML = `${habilidad.titulo}
  <a href="#" id="abrir__habilidades" class="btnmas">+</a> `;
  habilidad.obtenerHabilidades();

  // trabajar con el  modal habilidades
  let $openModal_H = document.getElementById("abrir__habilidades");
  const $closeModal_H = document.querySelector(".modal__close__habilidades");
  const $modal_H = document.querySelector(".modal__habilidades");
  $closeModal_H.addEventListener("click", (e) => {
    e.preventDefault();
    $modal_H.classList.remove("modal--show");
  });

  // activar el modal y cargar las habilidades desde firebase hacia el modal
  $openModal_H.addEventListener("click", (e) => {
    $modal_H.classList.add("modal--show");
  });

  // cargar las habilidades desde firebase hacia el modal
  habilidad.obtenerHabilidadesTabla((query) => {
    let filas = "";
    query.forEach((doc) => {
      const {
        descripcion
      } = doc.data();
      filas += `
            <tr>
              <td>${descripcion}</td>
              <td>
                <button class="btn btn-edit" id="btn-edit" data-id="${doc.id}">✎</button>
                <button class="btn btn-delete" id="btn-delete" data-id="${doc.id}">x</button>
              </td>
            </tr>
            `;
    });
    document.getElementById("detalle-habilidades").innerHTML = filas;

    // eleminar
    const btnsDelete = document.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        //console.log(e.target.dataset.id);
        habilidad.eliminarHabilidades(e.target.dataset.id);
      });
    });

    // editar
    const $btnsHabilidadesEdit = document.querySelectorAll(".btn-edit");
    $btnsHabilidadesEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        id = e.target.dataset.id;
        const doc = await habilidad.obtenerHabilidad(id);
        const habilidades = doc.data();

        $habilidadesForm["descripcion"].value = habilidades.descripcion;
        $habilidadesForm["grabar__habilidades"].innerHTML = "Actualizar";
        grabar = false;
      });
    });
  });
  // fin de DOMContentLoaded
});


// Grabar de habilidades
$habilidadesForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  //console.log("probando boton");
  const descripcion = $habilidadesForm["descripcion"].value;
  if (descripcion.trim().length < 1) {
    alert("Datos vacios o incompletos")
  } else {
    if (grabar) {
      habilidad.grabarHabilidades(descripcion);
      alert("Habilidad Insertada...");
    } else {
      habilidad.actualizarHabilidades(id, {
        descripcion: descripcion
      });
      alert("Habilidad Actualizada...");
      $habilidadesForm["grabar__habilidades"].innerHTML = "Insertar";
      grabar = true;
    }
    $habilidadesForm.reset();
  }
});