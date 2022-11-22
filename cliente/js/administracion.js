import { crearTabla } from "./tablaDinamica.js";
import { Anuncio_Mascota } from "./clase.js";
//import { actualizarItem, borrarItem, insertarItem, listado } from "./localStorage.js";

import {obtenerElementosAJAX} from "./ajax.js";

import {eliminarElementoPorIdASYNCFETCH, insertarElementoASYNCFETCH} from "./fetch.js";

import {obtenerElementoPorIdAXIOS,actualizarElementoAXIOS } from "./axios.js";

import { cargarValidacionesEnFormulario, validarLongitudMaxima,limpiarFormularioDeErroresDeValidacion, existenInputsInvalidos } from "./validaciones.js";

let hayModificacion = false;
let sePuedeOperar = true;

const URL = "http://localhost:3000/mascotas";

const $spinner = document.getElementById("spinner");
const $tabla = document.getElementById("tablaDinamica");
const filterSelect = document.getElementById("filter");
const $inputPromedio = document.getElementById("promedio");
const tituloForm = document.getElementById("tituloForm");
const $chkTitulo = document.getElementById("chkTitulo");
const $chkDescripcion = document.getElementById("chkDescripcion");
const $chkAnimal = document.getElementById("chkAnimal");
const $chkPrecio = document.getElementById("chkPrecio");
const $chkRaza = document.getElementById("chkRaza");
const $chkFecha = document.getElementById("chkFecha");
const $chkVacuna = document.getElementById("chkVacuna");
const $formulario = document.forms[0];
const checkBoxList = document.querySelectorAll(".chk");
const { id, agregar, limpiar, eliminar, titulo, descripcion, gato, perro, precio, raza, fecha, inyeccion } = $formulario;

filterSelect.addEventListener("change", ()=>{
    actualizarTabla();
});

checkBoxList.forEach(x =>{
    x.addEventListener("change", ()=>{
        actualizarTabla();
    });
});

actualizarTabla();
cargarValidacionesEnFormulario($formulario);

titulo.addEventListener("change", ()=>{hayModificacion = true;});
descripcion.addEventListener("change", ()=>{hayModificacion = true;});
precio.addEventListener("change", ()=>{hayModificacion = true;});
gato.addEventListener("change", ()=>{hayModificacion = true;});
perro.addEventListener("change", ()=>{hayModificacion = true;});
raza.addEventListener("change", ()=>{hayModificacion = true;});
fecha.addEventListener("change", ()=>{hayModificacion = true;});
inyeccion.addEventListener("change", ()=>{hayModificacion = true;});
descripcion.addEventListener("blur", (e)=>{validarLongitudMaxima(e.target, 25);});
titulo.addEventListener("blur",  (e)=>{validarLongitudMaxima(e.target, 25);});

$formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    if(hayModificacion){ 
        if(!existenInputsInvalidos(e.target.elements) && inyeccion.value && (gato.checked || perro.checked)){
            
            let idItem = id.dataset.id || 0;
            let animal = perro.checked ? "perro" : "gato";

            let item = new Anuncio_Mascota(idItem, titulo.value, descripcion.value, animal, precio.value, raza.value, fecha.value, inyeccion.value);
        
            if (!idItem) {
                if(sePuedeOperar){
                    limpiarTabla();
                    sePuedeOperar = false;
                    setSpinner();

                    //1) USO DE ASYNC-AWAIT PARA INSERTAR UN ELEMENTO.
                    insertarElementoASYNCFETCH(URL, item)                      
                    .then(x => actualizarTabla())
                    .catch(error => console.error(error))
                    .finally(x =>{
                        sePuedeOperar = true;
                        removeSpinner();
                    });                    
                }
            } else {
                if(confirm("Realmente desea modificar la mascota?")){   
                    if(sePuedeOperar){
                        limpiarTabla();
                        sePuedeOperar = false;
                        setSpinner();
                       
                        actualizarElementoAXIOS(URL, item)                       
                        .then(x => actualizarTabla())
                        .catch(error => console.error(error))
                        .finally(X =>{
                          sePuedeOperar = true;
                          removeSpinner();
                        });
                    }
                }
            }
            limpiarFormulario();
        }else{
            alert("Faltan completar campos o hay datos invalidos.");
        }
    }else{
        alert("No se han realizado modificaciones para guardar.");
    }
});

eliminar.addEventListener("click", (e) =>{
    let idItem = id.dataset.id;
  
    if(sePuedeOperar){
        limpiarTabla();
        sePuedeOperar = false;
        setSpinner();

        //2) USO DE ASYNC-AWAIT PARA ELIMINAR UN ELEMENTO.
        eliminarElementoPorIdASYNCFETCH(URL, idItem)
        .then(x => actualizarTabla())
        .catch(error => console.error(error))
        .finally(X =>{
        sePuedeOperar = true;
        removeSpinner();
        });
    }
   limpiarFormulario();
});

limpiar.addEventListener("click", (e)=>{
    limpiarFormulario();
});

$tabla.addEventListener("click", (e) => {
    const elemento = e.target;
    if (elemento.matches("td")) {
        limpiarFormularioDeErroresDeValidacion($formulario);
        let itemId = elemento.parentElement.dataset.id;
        
       if(sePuedeOperar){
        sePuedeOperar = false;
        setSpinner();
                
        obtenerElementoPorIdAXIOS(URL, itemId)     
        .then(data => cargarFormulario(data))
        .catch(error => console.error(error))
        .finally(x =>{
         sePuedeOperar = true;
         removeSpinner();
        });
       }
    }
});

function limpiarFormulario(){
    hayModificacion = false;
    $formulario.reset();

    const i = document.createElement("i");
    i.setAttribute("class", "fa-solid fa-floppy-disk");  
    agregar.innerHTML = "";
    agregar.appendChild(i);
    agregar.appendChild(document.createTextNode("Guardar"));

    limpiar.innerHTML = "Limpiar";
    tituloForm.innerHTML = "Formulario de Alta";
    eliminar.classList.add("d-none");
    id.dataset.id = "";
    limpiarFormularioDeErroresDeValidacion($formulario);
}

async function actualizarTabla() {
    limpiarTabla();
    setSpinner();
  
   await obtenerElementosAJAX(URL)
    .then(datos => cargarTablaConDatos(datos))
    .catch(error => console.error(error))
    .finally(x => removeSpinner());
};

function limpiarTabla(){
    while ($tabla.hasChildNodes()) {
        $tabla.removeChild($tabla.firstElementChild);
    }
}

function setSpinner () {
    if(!$spinner.hasChildNodes()){
        const i = document.createElement("i");
        $spinner.classList.add("m-5");
        i.setAttribute("class", "fas fa-paw fa-spin");
        $spinner.appendChild(i);
    }
}

function removeSpinner (){
    while($spinner.hasChildNodes()){
        $spinner.removeChild($spinner.firstElementChild);
    }
    $spinner.classList.remove("m-5");
}

function cargarTablaConDatos(datos){
    limpiarTabla();

    if(filterSelect.value == 2){
        datos = datos.filter(x  => x.animal.toLowerCase() == "perro");
    }else if(filterSelect.value == 3){
        datos = datos.filter(x  => x.animal.toLowerCase() == "gato");
    }
        
    if(filterSelect.value != -1){
        let totalPrecio = datos.reduce((p, v, i, array)=> (p + parseFloat(v.precio.replace("$","").replaceAll(".", ""))/(array.length)), 0);
        $inputPromedio.value = totalPrecio.toFixed(2);
    }
    else{
        $inputPromedio.value = "Seleccione un filtro";
    }
    if(!$chkAnimal.checked){
        datos = datos.map(x => {delete x.animal; return x;});
    }
    if(!$chkDescripcion.checked){
        datos = datos.map(x => {delete x.descripcion; return x;});
    }
    if(!$chkFecha.checked){
        datos = datos.map(x => {delete x.fecha; return x;});
    }
    if(!$chkPrecio.checked){
        datos = datos.map(x => {delete x.precio; return x;});
    }
    if(!$chkRaza.checked){
        datos = datos.map(x => {delete x.raza; return x;});
    }
    if(!$chkTitulo.checked){
        datos = datos.map(x => {delete x.titulo; return x;});
    }
    if(!$chkVacuna.checked){
        datos = datos.map(x => {delete x.vacuna; return x;});
    }    
    $tabla.appendChild(crearTabla(datos));
}

function cargarFormulario(item) {
    id.dataset.id = item.id;
    titulo.value = item.titulo;
    descripcion.value = item.descripcion;
    precio.value = item.precio.replace("$","").replaceAll(".", "");
    fecha.value = item.fecha;
    raza.value = item.raza;
    gato.checked = item.animal.toLowerCase() == "gato";
    perro.checked = item.animal.toLowerCase() == "perro";
    inyeccion.value = item.vacuna;
    
    agregar.innerHTML = "Actualizar";
    limpiar.innerHTML = "Cancelar";
    tituloForm.innerHTML = "Formulario de Modificacion";
    eliminar.classList.remove("d-none");
}