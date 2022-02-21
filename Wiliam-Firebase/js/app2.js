// Menu 
import {
    menuModal
} from "./menu.js"


// Experiencia
import {
    Experiencia
} from './experiencia.js'


const experiencia = new Experiencia("EXPERIENCIA")
let id = ""
let grabar = true
const $experienciaForm = document.getElementById("experiencia__form");

document.addEventListener("DOMContentLoaded", () => {
    menuModal();
    document.querySelector(".experiences-title").innerHTML = `${experiencia.titulo}
    <a href="#" id="abrir__experiencia" class="btnmas">+</a> `;
    experiencia.obtenerExperiencia();

    // trabajar con el  modal Experiencia
    let $openModal_E = document.getElementById("abrir__experiencia");
    const $closeModal_E = document.querySelector(".modal__close__experiencia");
    const $modal_E = document.querySelector(".modal__experiencia");
    $closeModal_E.addEventListener("click", (e) => {
        e.preventDefault();
        $modal_E.classList.remove("modal--show");
    });

    // activar el modal y cargar las experiencia desde firebase hacia el modal
    $openModal_E.addEventListener("click", (e) => {
        $modal_E.classList.add("modal--show");
    });

    // cargar las experiencia desde firebase hacia el modal
    experiencia.obtenerExperienciaTabla((query) => {
        let filas = "";
        query.forEach((doc) => {
            const {
                position
            } = doc.data();
            filas += `
            <tr>
              <td>${position}</td>
              <td>
                <button class="btn btn-edit" id="btn-edit" data-id="${doc.id}">✎</button>
                <button class="btn btn-delete" id="btn-delete" data-id="${doc.id}">x</button>
              </td>
            </tr>
            `;
        });
        document.getElementById("detalle-experiencia").innerHTML = filas;

        // eleminar
        const btnsDelete = document.querySelectorAll(".btn-delete");
        btnsDelete.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                // console.log(e.target.dataset.id);
                experiencia.eliminarExperiencia(e.target.dataset.id);
            });
        });

        // editar
        const $btnsExperienciaEdit = document.querySelectorAll(".btn-edit");
        $btnsExperienciaEdit.forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                // console.log(e.target.dataset.id);
                id = e.target.dataset.id;
                const doc = await experiencia.obtenerExperiencia(id);
                const experiencia = doc.data();
                // alert(experiencia.position);
                // console.log(experiencia);
                $experienciaForm["date"].value = experiencia.date;
                $experienciaForm["company"].value = experiencia.company;
                $experienciaForm["position"].value = experiencia.position;
                $experienciaForm["description"].value = experiencia.description;
                $experienciaForm["grabar__experiencia"].innerHTML = "Actualizar";
                grabar = false;
            })
        })
    });
    // fin de DOMContentLoaded
});

// Grabar de experiencia
$experienciaForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // //date
    // const date = $experienciaForm["date"].value;
    // if (date.trim().length < 1) {
    //     alert("Datos vacios o incompletos")
    // } else {
    //     if (grabar) {
    //         experiencia.grabarExperiencia(date);
    //         alert("Experiencia Insertada...");
    //     } else {
    //         experiencia.actualizarHabilidades(id, {
    //             date: date
    //         });
    //         alert("Experiencia Actualizada...");
    //         $experienciaForm["grabar__experiencia"].innerHTML = "Insertar";
    //         grabar = true;
    //     }
    //     $experienciaForm.reset();
    // }

    // // company
    // const company = $experienciaForm["company"].value;
    // if (company.trim().length < 1) {
    //     alert("Datos vacios o incompletos")
    // } else {
    //     if (grabar) {
    //         experiencia.grabarExperiencia(company);
    //         alert("Experiencia Insertada...");
    //     } else {
    //         experiencia.actualizarHabilidades(id, {
    //             company: company
    //         });
    //         alert("Experiencia Actualizada...");
    //         $experienciaForm["grabar__experiencia"].innerHTML = "Insertar";
    //         grabar = true;
    //     }
    //     $experienciaForm.reset();
    // }

    // // position
    // const position = $experienciaForm["position"].value;
    // if (position.trim().length < 1) {
    //     alert("Datos vacios o incompletos")
    // } else {
    //     if (grabar) {
    //         experiencia.grabarExperiencia(position);
    //         alert("Experiencia Insertada...");
    //     } else {
    //         experiencia.actualizarHabilidades(id, {
    //             position: position
    //         });
    //         alert("Experiencia Actualizada...");
    //         $experienciaForm["grabar__experiencia"].innerHTML = "Insertar";
    //         grabar = true;
    //     }
    //     $experienciaForm.reset();
    // }

    // // description
    // const description = $experienciaForm["description"].value;
    // if (description.trim().length < 1) {
    //     alert("Datos vacios o incompletos")
    // } else {
    //     if (grabar) {
    //         experiencia.grabarExperiencia(description);
    //         alert("Experiencia Insertada...");
    //     } else {
    //         experiencia.actualizarHabilidades(id, {
    //             description: description
    //         });
    //         alert("Experiencia Actualizada...");
    //         $experienciaForm["grabar__experiencia"].innerHTML = "Insertar";
    //         grabar = true;
    //     }
    //     $experienciaForm.reset();
    // }

});