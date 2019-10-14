window.addEventListener('load', () => {

    let mapa = [];

    // Creación del mapa con las celdas
    inicializarMapa();
    mapa[0][0].classList.add('personaje');

    let personaje = {};
    personaje.x = 0;
    personaje.y = 0;

    function inicializarMapa() {

        let tablero = document.querySelector('.tablero');

        for (let i = 0; i < 13; i++) {
            mapa[i] = [];
            for (let j = 0; j < 21; j++) {

                let divCelda = document.createElement('div');

                if (i % 3 == 0 || i == 0 || j == 0 || j % 4 == 0) {
                    divCelda.classList.add('celda');
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
    })

    function move(Y, X) {
        let posX = personaje.x + X;
        let posY = personaje.y + Y;

        // Salir si la posicion del personaje esta fuera del mapa o si su direccion esta 
        // ocupada por una caja
        if (posX == mapa[0].length || posX == -1 || posY == mapa.length || posY == -1) return;
        if (mapa[posY][posX].classList.contains('caja')) return;

        // Eliminar anterior posicion del personaje
        mapa[personaje.y][personaje.x].classList.remove('personaje');

        personaje.x = posX;
        personaje.y = posY;

        // Actualizar la nueva posicion del personaje en el mapa
        mapa[personaje.y][personaje.x].classList.add('personaje');
    }

})