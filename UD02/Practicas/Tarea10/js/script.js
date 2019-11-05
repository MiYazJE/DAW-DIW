'use strict';

let press = false;

const cajas = document.querySelectorAll('.caja');
cajas.forEach(caja => insertarPropiedad(caja));

document.querySelector('button').addEventListener('click', () => iniciarTransiciones());

function insertarPropiedad(caja) {
    let value = caja.classList[caja.classList.length - 1];
    caja.style.transitionTimingFunction = value;
}

function iniciarTransiciones() {
    console.log(press);
    press = !press;
    cajas.forEach(caja => {
        let end = (press) ? caja.parentNode.offsetWidth - caja.offsetWidth + "px": "0%";
        caja.style.transform = `translateX(${end})`;
    });
}
