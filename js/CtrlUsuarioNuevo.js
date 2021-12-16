import {
  getAuth
} from "../lib/fabrica.js";
import {
  getString,
  muestraError
} from "../lib/util.js";
import {
  tieneRol
} from "./seguridad.js";
import {
  checksRoles,
  guardaUsuario,
  selectAlumnos
} from "./usuarios.js";

/** @type {HTMLFormElement} */
const forma = document["forma"];
/** @type {HTMLUListElement} */
const listaRoles = document.
  querySelector("#listaRoles");

getAuth().onAuthStateChanged(
  protege, muestraError);

/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
async function protege(usuario) {
  if (tieneRol(usuario, ["Administrador"],["Cliente"])) {
    forma.addEventListener("submit", guarda);
    selectAlumnos(forma.alumnoId, "");
    checksRoles(listaRoles, []);
  }
}

/** @param {Event} evt */
async function guarda(evt) {
  const formData = new FormData(forma);
  const nombre = getString(formData, "nombre").trim();
  const id = getString(formData, "idempleado").trim();
  await guardaUsuario(evt,formData, nombre,id);
}
