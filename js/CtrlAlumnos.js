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
const daoEmpleado =getFirestore().collection("Empleado");

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
  daoEmpleado.orderBy("nombre").onSnapshot(htmlLista, errConsulta);
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

  const nombre = cod (data.nombre);
  const matricula = cod(data.matricula);
  const checar = cod(data.checar);
  var hora = cod(data.hora);
  var hr = new Date (hr);
  var fsf= cod(data.fecha);
  var fecha = new Date(fsf);
  var dformat = [fecha.getDate()+1, fecha.getMonth()+1, fecha.getFullYear()].join('/');
  var hformat = [hr.getHours(), hr.getMinutes(), hr.getSeconds()].join('/');
  const parámetros = new URLSearchParams();
  parámetros.append("id", doc.id);
  return ( /* html */
    `<li>
        <strong class="primario">  ${nombre} ${checar}${dformat}${hformat}
        </strong>
    </li>`);
}

/** @param {Error} e */
function errConsulta(e) {
  muestraError(e);
  consulta();
}

