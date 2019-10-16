import Character from './Character.js';


let totalMomias = 10;
let mapa = [];
// Contiene por donde se ha pasado en el mapa
let pisadas = [];
// Lista de momias
let momias = [];

// Creación del mapa con las celdas
inicializarMapa();

// De momento el personaje aparecera en la primera celda
// TODO mover a otra posicion [0][8]
mapa[0][0].classList.add('personaje');

let personaje = new Character(0, 0);

crearMomias(totalMomias);
mostrarMomias();

// setInterval(moverMomias, 300);

function inicializarMapa() {

    let tablero = document.querySelector('.tablero');

    for (let i = 0; i < 13; i++) {
        mapa[i] = [];
        pisadas[i] = new Array(13).fill(false);
        for (let j = 0; j < 21; j++) {

            let divCelda = document.createElement('div');

            divCelda.classList.add('celda');
            if (i % 3 == 0 || i == 0 || j == 0 || j % 4 == 0) {

            }
            else {
                divCelda.classList.add('caja');
            }

            mapa[i][j] = divCelda;
            tablero.appendChild(divCelda);
        }
    }
}

document.addEventListener('keydown', (key) => {
    switch (key.key) {
        case 'ArrowUp':    move(-1, 0); break;
        case 'ArrowLeft':  move(0, -1); break;
        case 'ArrowRight': move(0, 1);  break;
        case 'ArrowDown':  move(1, 0);
    }
    comprobarCajas();
})

function move(Y, X) {
    let posX = personaje.x + X;
    let posY = personaje.y + Y;

    // Salir si la posicion del personaje esta fuera del mapa o si su direccion esta 
    // ocupada por una caja
    if (!isValid(posY, posX)) return;

    // Eliminar anterior posicion del personaje
    mapa[personaje.y][personaje.x].classList = ['celda'];
    // Agregamos la clase pisado para que se visualize por donde ha pasado

    let clase = 'pisada-';
    if (X == 1) clase += 'derecha';
    if (X == -1) clase += 'izquierda';
    if (Y == 1) clase += 'abajo';
    if (Y == -1) clase += 'arriba';

    mapa[personaje.y][personaje.x].classList.add(clase);
    pisadas[personaje.y][personaje.x] = true;

    // Actualizar la posicion
    personaje.y = posY;
    personaje.x = posX;

    // Comprobar que el personaje invada la posicion de una momia
    // si es asi hay que restarle una vida
    if (mapa[personaje.y][personaje.x].classList.contains('momia')) {
        personaje.vidas--;
        eliminarMomia(personaje.y, personaje.x);
        console.log('vidas: ' + personaje.vidas);
    }

    // Actualizar la nueva posicion del personaje en el mapa
    mapa[personaje.y][personaje.x].classList = [];
    mapa[personaje.y][personaje.x].classList.add('celda');
    mapa[personaje.y][personaje.x].classList.add('personaje');
}

function isValid(posY, posX) {
    return (posX < mapa[0].length && posX >= 0 && posY < mapa.length && posY >= 0 &&
        !mapa[posY][posX].classList.contains('caja')) &&
        !mapa[posY][posX].classList.contains('personaje');
}

// Comprueba si las cajas estan totalmente cubierto de pisadas
function comprobarCajas() {

    for (let i = 1; i < mapa.length; i += 3)
        for (let j = 1; j < mapa[0].length; j += 4)
            if (mapa[i][j].classList.contains('caja'))
                if (test(i, j))
                    descubrirCaja(i, j);

}

function test(posY, posX) {

    // Comprobar esquinas
    if (!pisadas[posY - 1][posX - 1] ||
        !pisadas[posY - 1][posX + 3] ||
        !pisadas[posY + 2][posX - 1] ||
        !pisadas[posY + 2][posX + 3]) {
        return false;
    }

    // console.log('extremos completos');

    // comprobar parte de arriba y de abajo
    for (let i = posX; i < posX + 3; i++) {
        if (!pisadas[posY - 1][i])
            return false;
        if (!pisadas[posY + 2][i])
            return false;
    }

    // console.log('parte de arriba y abajo completa')

    // comprobar parte izq y der
    for (let i = posY; i < posY + 2; i++) {
        if (!pisadas[i][posX - 1])
            return false;
        // console.log(i + '-' + (posX-1) + ': ' + mapa[i][posX - 1].classList);
        if (!pisadas[i][posX + 3])
            return false;
        // console.log(i + '-' + (posX+3) + ': ' + mapa[i][posX + 3].classList);
    }

    // console.log('izq y der completos');

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
        if (!mapa[posY][posX].classList.contains('caja') && !mapa[posY][posX].classList.contains('personaje')) {
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

        if (momia.y < personaje.y && isOk((momia.y + 1), momia.x)) {
            posY = 1;
        }   
        else if (momia.y > personaje.y && isOk((momia.y - 1), momia.x)) {
            posY = -1;
        }
        else if (momia.x < personaje.x && isOk(momia.y, (momia.x + 1))) {
            posX = 1;
        }
        else if ( isOk(momia.y, (momia.x - 1)) ) {
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
                salir = isOk(momia.y + posY, momia.x + posX);
            }
        }

        momia.y += posY;
        momia.x += posX;

        // La momia le ha quitado una vida al personaje
        if (mapa[momia.y][momia.x].classList.contains('personaje')) {
            momias.splice(i, 1);    
            personaje.vidas--;
            console.log('Vidas: ' +personaje.vidas);    
        }
        else {
            mapa[momia.y][momia.x].classList.add('momia');
        }

    }
}

function isOk(y, x) {
    return (x >= 0 && x < mapa[0].length &&
            y >= 0 && y < mapa.length && 
            !mapa[y][x].classList.contains('caja'));
}

function eliminarMomia(x, y) {
    for (let i = 0; i < momias.length; i++) {
        if (x == momias[i].x && y == momias[i].y) {
            momias.splice(i, 1); 
            return;
        }
    } 
}
