'use strict';

const gridContainer = document.querySelector('container');

const setEventEvolution = (box) => {
    
    let state = parseInt( box.getAttribute('state') );

    if (state < 3) {

        switch (state) {
            case 0:  box.classList.add('evoluciona');    break;
            case 1:  box.classList.remove('evoluciona'); break;
            case 2:  box.classList.add('ultimate');
        }

        box.setAttribute('state', ++state);
    }
    else if (asignar != '-1') {
        if (asignar == '10') {
            box.classList.remove('chuluMove');
            box.classList.toggle('chuluSpin');
        }
        else {
            box.classList.remove('chuluSpin');    
            box.classList.toggle('chuluMove');
        }
    }
    
    asignar = -1;
}

const crearCaja = () => {
    let box = document.createElement('box');
    box.setAttribute('state', 0);
    box.addEventListener('click', () => setEventEvolution(box));
    gridContainer.appendChild(box);
}

const init = () => document.querySelector('button').addEventListener('click', crearCaja);

let asignar;

document.querySelectorAll('button').forEach(boton => boton.addEventListener('click', () => asignar = boton.getAttribute('state')));

window.onload = init;
