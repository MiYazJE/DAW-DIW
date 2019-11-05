'use strict';

document.querySelector('button').addEventListener('click', () => document.querySelectorAll('.caja').forEach(caja => caja.classList.toggle('mover')));

// Tarea 11
// document.querySelector('button').addEventListener('click', () => document.querySelectorAll('.caja').forEach(caja => caja.classList.toggle('bezier')));