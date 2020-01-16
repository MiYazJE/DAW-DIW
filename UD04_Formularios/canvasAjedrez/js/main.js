
const canvas = document.querySelector('canvas');

let ctx = canvas.getContext('2d');

const dioses = [
    {nombre: 'pepe', poder: 10, color: 'green'},
    {nombre: 'alberto', poder: 80, color: 'purple'},
    {nombre: 'juan', poder: 10, color: 'blue'}
]

let poderTotal = dioses.reduce((total, dios) => total + dios.poder, 0);
let angulo = 0;

for (let dios of dioses) {
    ctx.fillStyle = dios.color;
    ctx.beginPath();
    ctx.lineTo(canvas.width / 2, canvas.height / 2);
    let anguloActual = (2 * Math.PI * dios.poder) / poderTotal;
    ctx.arc(canvas.width / 2, canvas.height / 2, 250, angulo, angulo + anguloActual);
    ctx.fill();
    angulo += anguloActual;
}

/*
let widthBox  = canvas.width / 8;
let heightBox = canvas.height / 8;

let white = "#F5FFDF";
let black = "#5D8010";
let color;

for (let i = 0; i < 8; i++) {
    color = (i % 2 == 0) ? black : white;
    for (let j = 0; j < 8; j++) {
        color = (color === white) ? black : white;
        ctx.fillStyle = color;
        ctx.fillRect(widthBox * j, heightBox * i, heightBox, widthBox);
    }
}
*/

