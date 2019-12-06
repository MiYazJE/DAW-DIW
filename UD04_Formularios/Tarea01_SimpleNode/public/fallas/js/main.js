
const insertarFalla = (nombreFalla, srcFoto) => {
    contenedorFallas.innerHTML += `
        <div class="falla">
            <p class="nombreFalla">${nombreFalla}</p>
            <img class="fotoFalla" src="${srcFoto}" alt="Foto de la falla ${nombreFalla}">
        </div>`;
}

const buscarFalla = (busqueda) => {

    let fallasFiltradas = fallas.filter(falla => falla.nombre.toLowerCase().includes(busqueda));

    // Limpiamos las anteriores busquedas
    contenedorFallas.innerHTML = '';

    fallasFiltradas.map(falla => insertarFalla(falla.nombre, falla.boceto));
}

const obtenerFallas = async () => {
    const response = await fetch(URL);
    const json     = await response.json();
    
    // Obtener todas las propiedades del objeto
    fallas = json.features.map(element => element.properties);

    
    let buscar = document.querySelector('input[name="inputFalla"]');
    document.querySelector('.btnMostrarFallas').onclick = () => buscarFalla(buscar.value.toLowerCase());
}

const init = async () => { await obtenerFallas(); console.log(fallas)}

const URL = "http://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON";
let fallas;
const contenedorFallas = document.querySelector('#contenedorFallas');

window.onload = init;