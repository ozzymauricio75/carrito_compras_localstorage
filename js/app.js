// Variables
const carrito           = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn  = document.querySelector('#vaciar-carrito');
const listaCursos       = document.querySelector('#lista-cursos');
let articulosCarrito    = [];

cargarEventListeners();

//Se agregar un curso cuando presiona "Agregar Carrito"
function cargarEventListeners(){
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina articulos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Mostramos los articulos que estan en el LocalStorage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse( localStorage.getItem('carrito') ) || []  ;
    // console.log(articulosCarrito);
        carritoHTML();
    });

    //Vaciar articulos del carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //Reseteamos el arreglo
        limpiarHTML();//Eliminamos todo el HTML
    });
}

// Funciones 
function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatosCurso(cursoSeleccionado);
    }
}

// Elimina articulos del carrito
function eliminarCurso(e){
    console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Eliminar con filter del arreglo articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        
        carritoHTML(); //Volvemos a iterar sobre el carrito y actualizamos el HTML

    }
}

// Lee el contenido del Html al que le dimos y extrae la informacion del curso
function leerDatosCurso(curso){
    //console.log(curso);

    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio').textContent,
        id:     curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elmento del carrito ya existe en el carrito para sumarlo
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; // Este retorma el objeto actualizado
            } else {
                return curso; // Este retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    } else{
        //Agregamos el articulo al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log(articulosCarrito);

    carritoHTML();
}

// Muestra el carrito de compras en el HTMl
function carritoHTML(){

    vaciarCarrito();

    //Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </t>    
            <td>
                ${titulo}
            </t>
            <td>
                ${precio}
            </t>
            <td>
                ${cantidad}
            </t>
            <td>
                <a href"#" class="borrar-curso" data-id="${curso.id}"> X </a>
            </t>
        `;
        
        //Agrega el HTML deL carrito al tbody
        contenedorCarrito.appendChild(row);
    });

    sincronizarStorage();
}

//Agregar los Tweets al localStorage
function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
    // forma rapida (recomendada)
    while(contenedorCarrito.firstChild) {
         contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }
}

//Elimina los cursos del tbody
function limpiarHTML() {
    /* //Forma lenta de limpiar un HTML
    contenedorCarrito.innerHTML = ''; */

    //Forma rapida de limpiar un HTML
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}
