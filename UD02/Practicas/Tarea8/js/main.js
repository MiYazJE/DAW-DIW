const audio = new Audio();
document.addEventListener('keypress', (key) => setPlaySound(""+key.key.toLowerCase()));
let cajasSonido = document.querySelectorAll('.cajaSonido');

for (let cajaSonido of cajasSonido) {
    cajaSonido.addEventListener('click', () => setPlaySound(cajaSonido.getAttribute('tipoLlave')));
    cajaSonido.addEventListener('transitionend', () => cajaSonido.classList.remove('transicion'));
}

function setPlaySound(key) {

    if (!/^[wqre]$/.test(key)) return;

    let src = `/media/ornn_${key}.mp3`;

    document.querySelector(`.cajaSonido[tipoLlave=${key}]`).classList.add('transicion');

    audio.currentTime = 0;
    audio.src = src;
    audio.play();
}