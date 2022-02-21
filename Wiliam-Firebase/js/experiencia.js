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

export class Experiencia {
    constructor(tit = "") {
        this.titulo = tit;
    }
    obtenerExperiencia() {
        onSnapshot(collection(db, "experiencia"), (query) => {
            let div = "";
            // console.log(query);
            query.forEach((doc) => {
                console.log(doc.data());
                const {
                    date,
                    company,
                    position,
                    description
                } = doc.data();
                div += `
                <div class = "experience-date">${date} </div>
                <div class = "experience-company">${company} </div>
                <div class = "experience-position">${position} </div>
                <div class = "experience-description">${description} </div>
                `;
            });
            // console.log(div);
            document.querySelector(".experience").innerHTML = div;
        });
    }
    obtenerExperienciaTabla(funcionObtener) {
        onSnapshot(collection(db, "experiencia"), funcionObtener);
    }

    eliminarExperiencia(id) {
        deleteDoc(doc(db, "experiencia", id));
    }

    actualizarExperiencia(id, experiencia) {
        updateDoc(doc(db, "experiencia", id), experiencia);
    }

    obtenerExperiencia(id) {
        return getDoc(doc(db, "experiencia"), id);
    }

    grabarExperiencia(date, comp, posi, desc) {
        addDoc(collection(db, "experiencia"), {
            date: date,
            company: comp,
            position: posi,
            description: desc
        });
    }
}