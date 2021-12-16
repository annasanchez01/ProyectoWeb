// @ts-nocheck
import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  cod,
  muestraError
} from "../lib/util.js";
import {
  tieneRol
} from "./seguridad.js";

/** @type {HTMLUListElement} */
const lista = document.querySelector("#lista");
const daoAlumno =getFirestore().collection("Alumno");

getAuth().onAuthStateChanged(protege, muestraError);

/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
async function protege(usuario) {
  if (tieneRol(usuario,["Administrador"])) {
    consulta();
  }
}

function consulta() {
  daoAlumno.orderBy("nombre").onSnapshot(htmlLista, errConsulta);
}

function htmlLista(snap) {
  let html = "";
  if (snap.size > 0) {
    snap.forEach(doc =>html += htmlFila(doc));
  } 
  lista.innerHTML = html;
}

function htmlFila(doc) {
  const data = doc.data();

  const nombre = cod(data.nombre);
  const matricula = cod(data.matricula);
  const checar = cod(data.checar);
  const hora = cod(data.hora);
  var fsf= cod(data.fecha);
  var fecha = new Date(fsf);
  var dformat = [fecha.getDate()+1, fecha.getMonth()+1, fecha.getFullYear()].join('/');
  const parámetros = new URLSearchParams();
  parámetros.append("id", doc.id);
  return ( /* html */
    `<li>
        <strong class="primario">  ${nombre} ${matricula}${checar}${dformat}${hora}
        </strong>
   
    </li>`);
}

/** @param {Error} e */
function errConsulta(e) {
  muestraError(e);
  consulta();
}

