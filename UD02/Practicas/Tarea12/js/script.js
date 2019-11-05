'use strict';

const gridContainter = document.querySelector('container');

const setEventEvolution = (box) => {
    
    let state = parseInt( box.getAttribute('state') );
    if (state > 2) return;

    switch (state) {
        case 0: 
            box.classList.add('evoluciona'); 
            break;
        case 1:  
            box.classList.remove('evoluciona'); 
            break;
        case 2:
            box.classList.add('ultimate');
    }

    box.setAttribute('state', ++state);
}

const crearCaja = () => {
    let box = document.createElement('box');
    box.setAttribute('state', 0);
    box.addEventListener('click', () => setEventEvolution(box));
    gridContainter.appendChild(box);
}

const init = () => document.querySelector('button').addEventListener('click', crearCaja);

window.onload = init;
