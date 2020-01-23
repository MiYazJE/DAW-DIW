
const canvas = document.querySelector('#draw');
const ctx    = canvas.getContext('2d');

const initCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let background = new Image();
    background.src = 'unicorn.jpg';
    background.onload = () => ctx.drawImage(background, 0, 0);
    ctx.lineCap = 'round';
}

initCanvas();

let draw  = false;
let x = 0;
let y = 0;
let lineWidth = 2;
let grow = true;
let hue = 0;

const paint = (e) => {

    if (!draw) return;

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = `hsl(${hue},100%,50%)`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    x = e.offsetX;
    y = e.offsetY;

    hue = (hue < 360) ? hue += 10 : 0;

    if (grow) {
        lineWidth++;
        grow = lineWidth < 80;
    }
    else {
        lineWidth--;
        grow = lineWidth < 2;
    }

}

canvas.onmousedown = (e) => {
    draw = true;
    x = e.offsetX;
    y = e.offsetY;
}
canvas.onmousemove = paint;
canvas.onmouseup   = () => draw = false;