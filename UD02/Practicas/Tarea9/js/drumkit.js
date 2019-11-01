
const keys = document.querySelectorAll('.key');
keys.forEach(key => {
    key.addEventListener('transitionend', removeTransition);
    key.addEventListener('click', () => playSound(key.getAttribute('data-key')));
});

window.addEventListener('keydown', (e) => playSound(e.keyCode));

function removeTransition() {
    this.classList.remove('playing');
}

function playSound(keyCode) {

    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    
    if (!audio) return;

    const key = document.querySelector(`.key[data-key="${keyCode}"]`);
    key.classList.add('playing');

    audio.currentTime = 0;
    audio.play();
}
