
let canvas;
let ctx;

const getRandomColor = () => '#' + Math.random().toString().slice(2, 8);

const clearCanvas = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

const calcularPoderTotal = (data) => data.reduce((sum, {poder}) => sum + poder, 0);

const getMaxPoder = (data) => {
    let max = 0;
    data.forEach(dios => max = Math.max(max, dios.poder));
    return max;
}

const mostrarGraficoLineas = (data) => {

    let maxPoder = getMaxPoder(data);
    createGrid(maxPoder, 3);
    
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = 'blue';
    ctx.font = "20px Georgia";

    let width = (canvas.width) / 4;
    let extra = (canvas.height / 4);
    let scaleY = (canvas.height - extra) / maxPoder;
    let actualX = width / 2;
    let actualY = (canvas.height - extra / 2) - data[0].poder * scaleY;

    for (let i = 1; i < data.length; i++) {

        ctx.beginPath();
        ctx.moveTo(actualX, actualY);
        let y = (canvas.height - extra / 2) - data[i].poder * scaleY;
        ctx.lineTo(actualX + width, y);
        ctx.stroke();

        ctx.fillText(data[i - 1].nombre, actualX, canvas.height - (extra / 4));

        actualX += width;
        actualY = y;
    }    

    ctx.fillText(data[data.length - 1].nombre, actualX, canvas.height - (extra / 4));

}

const mostrarGraficoRectangulos = (data) => {

    let maxPoder = getMaxPoder(data);
    createGrid(maxPoder, data.length);
    
    let width = canvas.width / 5 - 20;
    let y = canvas.height / 5;
    let scaleY = (canvas.height - y) / maxPoder;
    let actualX = canvas.width / 5 - (width / 2);

    ctx.font = "20px Georgia";

    for (let persona of data) {
        ctx.beginPath();
        ctx.fillStyle = getRandomColor();
        let height = scaleY * persona.poder;
        ctx.rect(actualX, (canvas.height - (y / 2)) - height, width, height);        
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.fillText(persona.nombre, actualX + (width / 3), canvas.height - (y / 4));
        actualX += canvas.width / 5;
    }

}

const mostrarGraficoTipoDonut = (data) => {
    
    let poderTotal = calcularPoderTotal(data);
    let angulo = 0;

    for (let dios of data) {
        ctx.fillStyle = getRandomColor();
        ctx.beginPath();
        ctx.lineTo(canvas.width / 2, canvas.height / 2);
        let anguloActual = (2 * Math.PI * dios.poder) / poderTotal;
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / (Math.PI * 2), angulo, angulo + anguloActual);
        ctx.fill();
        angulo += anguloActual;
    }

}

const recogerDatos = () => {

    let datos = [];
    const llaves  = document.querySelectorAll(`input[class="left"]`);   
    const valores = document.querySelectorAll(`input[class="right"]`);   

    for (let i = 0; i < llaves.length; i++) {
        let key = llaves[i].value;
        let val = valores[i].value;
        datos.push({nombre: key, poder: parseInt(val)});
    }

    return datos;
}

const createGrid = (max, cells) => {

    let height = canvas.height / (cells + 1);
    let width  = canvas.width / (cells + 1);
    let x = width / 2;
    let y = height / 2;
    let aux = parseInt(max / cells);

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.font = "14px Georgia";
    ctx.fillStyle = 'black';
    
    // Horizontal lines
    for (let i = 0; i < cells + 1; i++) {

        ctx.beginPath();
        ctx.moveTo(x - 15, y);
        
        max = (i == cells) ? 0 : max;
        ctx.fillText(max, x - 50, y + 5);
        
        ctx.lineTo(canvas.width - (width / 2), y);
        ctx.stroke();

        max -= aux;        
        y += height;
    }

    // Vertical line
    ctx.beginPath();
    ctx.moveTo(width / 2, height / 2);
    ctx.lineTo(width / 2, canvas.height - height / 2);
    ctx.stroke();

}

const mostrarGrafico = () => {

    clearCanvas();

    let datos = recogerDatos();

    let select = document.querySelector('select');
    switch (select.options[select.selectedIndex].value) {
        case 'Tarta': mostrarGraficoTipoDonut(datos); break;
        case 'Rectangulos': mostrarGraficoRectangulos(datos); break;
        case 'Lineas': mostrarGraficoLineas(datos); 
    }


}

const init = () => {

    canvas = document.querySelector('canvas');
    ctx    = canvas.getContext('2d');

    let btn = document.querySelector(`input[name="grafiqueame"]`);
    btn.onclick = mostrarGrafico;

}

window.onload = init;