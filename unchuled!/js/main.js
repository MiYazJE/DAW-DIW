window.addEventListener('load', () => {

    let mapa  = [];
    let cajas = [];

    // Creación del mapa con las celdas
    inicializarMapa();
    // Recoger en un matriz todos los divs creados en la funcion inicializar mapa
    recogerCajas();
    cajas[0][0].classList.add('personaje');

    let personaje = {};
    personaje.x = 0;
    personaje.y = 0;
    personaje.move = function (Y, X) {
        let posX = personaje.x + X;
        let posY = personaje.y + Y;

        // Salir si la posicion del personaje esta fuera del mapa o si su direccion esta 
        // ocupada por una caja
        if (posX == mapa[0].length || posX == -1 || posY == mapa.length || posY == -1) return;
        if (mapa[posY][posX] == 'caja') return;

        // Eliminar anterior posicion del personaje
        mapa[personaje.y][personaje.x]  = 'celda';
        cajas[personaje.y][personaje.x].classList.remove('personaje');

        personaje.x = posX;
        personaje.y = posY;

        // Actualizar la nueva posicion del personaje en el mapa
        mapa[personaje.y][personaje.x] = 'personaje';
        cajas[personaje.y][personaje.x].classList.add('personaje');
    }

    function inicializarMapa() {

        for (let i = 0; i < 13; i++)
            mapa[i] = new Array(21).fill('celda');

        let tablero = document.querySelector('.tablero');

        for (let i = 0; i < mapa.length; i++) {
            for (let j = 0; j < mapa[0].length; j++) {

                let divCelda = document.createElement('div');

                if (i % 3 == 0 || i == 0 || j == 0 || j % 4 == 0) {
                    mapa[i][j] = 'celda';
                }
                else {
                    mapa[i][j] = 'caja';
                }

                divCelda.classList.add(mapa[i][j]);
                tablero.appendChild(divCelda);
            }
        }

        mapa[0][0] = 'personaje';
    }

    function recogerCajas() {
        let tablero = document.querySelector('.tablero');
        for (let i = 0; i < mapa.length; i++) {
            cajas[i] = [];
            for (let j = 0; j < mapa[0].length; j++) 
                cajas[i][j] = tablero.children[i * 21 + j];
        }
    }

    document.addEventListener('keydown', (key) => {
        switch (key.key) {
            case 'ArrowUp':    personaje.move(-1, 0); break;
            case 'ArrowLeft':  personaje.move(0, -1); break;
            case 'ArrowRight': personaje.move(0, 1);  break;
            case 'ArrowDown':  personaje.move(1, 0);
        }
    })

})