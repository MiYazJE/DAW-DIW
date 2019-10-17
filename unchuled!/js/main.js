import Character from './Character.js';

let totalMomias = 2;
let mapa    = [];
let pisadas = [];
let momias  = [];
let cajasDescubiertas = [];
let personaje = new Character(0, 8);
let puntos = 0;
let vidas  = 5; 

// Creación del mapa con las celdas
inicializarMapa();

actualizarPuntuacion(puntos);
crearContenedorVidas();

// Creacion aleatoriamente de las momias
crearMomias(totalMomias);
mostrarMomias();

setInterval(moverMomias, 500);

function inicializarMapa() {

    let tablero = document.querySelector('.tablero');

    mapa[0] = [];
    pisadas[0] = new Array(21).fill(false);
    cajasDescubiertas = new Array(20).fill(false);

    for (let i = 0; i < 21; i++) {
        let div = document.createElement('div');
        div.classList.add('nada');
        mapa[0][i] = div;
        tablero.appendChild(div);
    }

    // Celda de inicio del personaje
    mapa[personaje.y][personaje.x].classList = ['celda'];

    for (let i = 1; i < 14; i++) {
        mapa[i] = [];
        pisadas[i] = new Array(21).fill(false);
        for (let j = 0; j < 21; j++) {

            let divCelda = document.createElement('div');

            divCelda.classList.add('celda');
            if (i % 3 == 1 || j == 0 || j % 4 == 0) {

            }
            else {
                divCelda.classList.add('caja');
            }

            mapa[i][j] = divCelda;
            tablero.appendChild(divCelda);
        }
    }

    mapa[personaje.y][personaje.x].classList.add('personaje');
}

document.addEventListener('keydown', (key) => {
    switch (key.key) {
        case 'ArrowUp':     
        case 'w': move(-1, 0); break;
        case 'ArrowLeft':  
        case 'a': move(0, -1); break;
        case 'ArrowRight': 
        case 'd': move(0, 1);  break;
        case 'ArrowDown':  
        case 's': move(1, 0);
    }
    comprobarCajas();
})

function move(Y, X) {
    let posX = personaje.x + X;
    let posY = personaje.y + Y;

    // Salir si la posicion del personaje esta fuera del mapa o si su direccion esta 
    // ocupada por una caja
    if (!isValidCharPosition(posY, posX)) return;

    // Eliminar anterior posicion del personaje
    mapa[personaje.y][personaje.x].classList = ['celda'];
    
    let clase = 'pisada-';
    if (X == 1) clase += 'derecha';
    if (X == -1) clase += 'izquierda';
    if (Y == 1) clase += 'abajo';
    if (Y == -1) clase += 'arriba';
    
    // Agregamos la clase pisado para que se visualize por donde ha pasado
    mapa[personaje.y][personaje.x].classList.add(clase);

    // Marcamos que el personaje ya ha pasado por aqui
    pisadas[personaje.y][personaje.x] = true;

    // Actualizar la posicion
    personaje.y = posY;
    personaje.x = posX;

    // Comprobar que el personaje invada la posicion de una momia
    // si es asi hay que restarle una vida y matar a la momia
    if (mapa[personaje.y][personaje.x].classList.contains('momia')) {
        personaje.vidas--;
        actualizarVidas();
        eliminarMomia(personaje.y, personaje.x);
        console.log('vidas: ' + personaje.vidas);
    }

    // Actualizar la nueva posicion del personaje en el mapa
    mapa[personaje.y][personaje.x].classList = [];
    mapa[personaje.y][personaje.x].classList.add('celda');
    mapa[personaje.y][personaje.x].classList.add('personaje');
}

function isValidCharPosition(posY, posX) {
    return (posX < mapa[0].length && posX >= 0 && posY < mapa.length && posY >= 0 &&
        !mapa[posY][posX].classList.contains('caja')) &&
        !mapa[posY][posX].classList.contains('nada');
}

// Comprueba si las cajas estan totalmente cubiertas de pisadas
function comprobarCajas() {

    for (let i = 2, posCaja = 0; i < mapa.length; i += 3, posCaja++)
        for (let j = 1; j < mapa[0].length; j += 4, posCaja++)
            if (!cajasDescubiertas[posCaja] && mapa[i][j].classList.contains('caja'))
                if (test(i, j)) {
                    cajasDescubiertas[posCaja] = true;
                    descubrirCaja(i, j);
                    actualizarPuntuacion(200);
                }

}

function test(posY, posX) {

    // Comprobar esquinas
    if (!pisadas[posY - 1][posX - 1] ||
        !pisadas[posY - 1][posX + 3] ||
        !pisadas[posY + 2][posX - 1] ||
        !pisadas[posY + 2][posX + 3]) {
        return false;
    }

    // comprobar parte de arriba y de abajo
    for (let i = posX; i < posX + 3; i++) {
        if (!pisadas[posY - 1][i])
            return false;
        if (!pisadas[posY + 2][i])
            return false;
    }

    // comprobar parte izq y der
    for (let i = posY; i < posY + 2; i++) {
        if (!pisadas[i][posX - 1])
            return false;
        if (!pisadas[i][posX + 3])
            return false;
    }

    return true;
}

function descubrirCaja(posY, posX) {
    for (let i = posY; i < posY + 2; i++) 
        for (let j = posX; j < posX + 3; j++) 
            mapa[i][j].classList.add('cajaDescubierta');
}

function crearMomias(max) {
    let momiasCreadas = 0;
    while (momiasCreadas < max) {
        let posY = Math.floor(Math.random() * 13);
        let posX = Math.floor(Math.random() * 21);
        if (!mapa[posY][posX].classList.contains('caja') && !mapa[posY][posX].classList.contains('personaje') && !mapa[posY][posX].classList.contains('nada')) {
            momiasCreadas++;
            momias.push(new Character(posY, posX));
        }
    }
}

function mostrarMomias() {
    for (let momia of momias)
        mapa[momia.y][momia.x].classList.add('momia');
}

function moverMomias() {

    for (let i = 0; i < momias.length; i++) {

        let posY = 0, posX = 0;
        let momia = momias[i];

        mapa[momia.y][momia.x].classList.remove('momia');

        if (momia.y < personaje.y && isValidMomiaPosition((momia.y + 1), momia.x)) {
            posY = 1;
        }   
        else if (momia.y > personaje.y && isValidMomiaPosition((momia.y - 1), momia.x)) {
            posY = -1;
        }
        else if (momia.x < personaje.x && isValidMomiaPosition(momia.y, (momia.x + 1))) {
            posX = 1;
        }
        else if ( isValidMomiaPosition(momia.y, (momia.x - 1)) ) {
            posX = -1;
        }
        else {
            let salir = false;
            let dirY = [-1, 0, 1, 0];
            let dirX = [0, -1, 0, 1];
            let pos;
            while (!salir) {
                pos = Math.floor(Math.random() * 4);
                posY = dirY[pos];
                posX = dirX[pos++];
                salir = isValidMomiaPosition(momia.y + posY, momia.x + posX);
            }
        }

        momia.y += posY;
        momia.x += posX;

        // La momia le ha quitado una vida al personaje
        if (mapa[momia.y][momia.x].classList.contains('personaje')) {
            momias.splice(i, 1);    
            personaje.vidas--;
            actualizarVidas();
            console.log('Vidas: ' + personaje.vidas);    
        }
        else {
            mapa[momia.y][momia.x].classList.add('momia');
        }

    }
}

function isValidMomiaPosition(y, x) {
    return (x >= 0 && x < mapa[0].length &&
            y >= 0 && y < mapa.length && 
            !mapa[y][x].classList.contains('caja') && 
            !mapa[y][x].classList.contains('nada'));
}

function eliminarMomia(y, x) {
    for (let i = 0; i < momias.length; i++) {
        if (x == momias[i].x && y == momias[i].y) {
            console.log(momias);
            momias.splice(i, 1); 
            console.log(momias);
            return;
        }
    } 
}

function actualizarPuntuacion(points) {
    let spanPuntos = document.querySelector('.puntos');
    puntos = String(Number(puntos) + points);
    if (puntos.length < 5)
        for (let i = puntos.length; i < 5; i++) puntos = '0' + puntos;
    spanPuntos.innerHTML = puntos;
}

function crearContenedorVidas() {
    let contenedorVidas = document.querySelector('.contenedor-cajaVidas');
    for (let i = 0; i < vidas; i++) {
        let cajaVida = document.createElement('div');
        cajaVida.classList.add('cajaVidas');
        contenedorVidas.appendChild(cajaVida);
    }
}

function actualizarVidas() {
    let cajaVidas = document.querySelector('.cajaVidas');
    if (cajaVidas && cajaVidas.parentNode)
        cajaVidas.parentNode.removeChild(cajaVidas);
}