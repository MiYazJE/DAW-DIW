function Celda() {
    this.estilo = 'celda';
}

function Caja() {
    this.estilo = 'caja';
}

function Personaje() {
    this.posX = 0;
    this.posY = 0;
    this.estilo = 'personaje';
}

function Tablero() {
    this.mapa = [];
}

function moverse(personaje, x, y) {

}

function inicializarMapa() {
    let mapa = [];
    for (let i = 0; i < 13; i++) {
        mapa[i] = new Array(21).fill(new Celda());
    }
    return mapa;
}

function removeChildren(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function pintarTablero(mapa) {
    let tablero = document.querySelector('.tablero');
    removeChildren(tablero);
    for (let i = 0; i < mapa.length; i++) {
        for (let j = 0; j < mapa[0].length; j++) {
            let divCelda = document.createElement('div');
            if (mapa[i][j] instanceof Personaje) {
                
            }
            else if (i % 3 == 0 || i == 0 || j == 0 || j % 4 == 0) {
                mapa[i][j] = new Celda();
            }
            else mapa[i][j] = new Caja();
            divCelda.classList.add(mapa[i][j].estilo);
            tablero.appendChild(divCelda);
        }
    }
}

// Creación del mapa con las celdas
var tablero = new Tablero();
tablero.mapa = inicializarMapa();

// Creacion del personaje
var personaje = Personaje();

window.addEventListener('load', () => {
    tablero.mapa[0][0] = new Personaje();
    pintarTablero(tablero.mapa);
})

document.addEventListener('keydown', (key) => {
    console.log(key.key);
    switch (key.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
        case 'ArrowRight':
        case 'ArrowDown':
    }
    pintarTablero(tablero.mapa);
})