'use strict';

let press = false;

const cajas = document.querySelectorAll('.caja');
cajas.forEach(caja => setBezierCurve(caja));

document.querySelector('button').addEventListener('click', () => iniciarTransiciones());

function insertarPropiedad(caja) {
    let value = caja.classList[caja.classList.length - 1];
    caja.style.transitionTimingFunction = value;
}

function setBezierCurve(caja) {
    caja.style.transitionTimingFunction = 'cubic-bezier(0, 1.0186, 0.8458, 0.2695);'
}

function iniciarTransiciones() {
    press = !press;
    cajas.forEach(caja => {
        let end = (press) ? caja.parentNode.offsetWidth - caja.offsetWidth + "px": "0%";
        caja.style.transform = `translateX(${end})`;
    });
}
