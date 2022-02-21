import {
  db,
  onSnapshot,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  addDoc,
} from "./firebase.js";

export class Habilidad {
  constructor(tit = "") {
    this.titulo = tit;
  }
  obtenerHabilidades() {
    onSnapshot(collection(db, "habilidades"), (query) => {
      let li = "";
      console.log(query);
      query.forEach((doc) => {
        const {
          descripcion
        } = doc.data();
        li += `
        <li class="skills-skill">${descripcion}</li>
        `;
      });
      document.querySelector(".skills-list").innerHTML = li;
    });
  }

  obtenerHabilidadesTabla(funcionObtener) {
    onSnapshot(collection(db, "habilidades"), funcionObtener);
  }

  eliminarHabilidades(id) {
    deleteDoc(doc(db, "habilidades", id));
  }

  actualizarHabilidades(id, habilidad) {
    updateDoc(doc(db, "habilidades", id), habilidad);
  }

  obtenerHabilidad(id) {
    return getDoc(doc(db, "habilidades", id));
  }

  grabarHabilidades(descrip) {
    addDoc(collection(db, "habilidades"), {
      descripcion: descrip
    });
  }
}