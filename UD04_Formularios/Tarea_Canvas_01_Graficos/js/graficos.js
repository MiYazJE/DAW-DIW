
let canvas;
let ctx;
const colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
                '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
                '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
                '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
                '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
                '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
                '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
                '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
                '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
                '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const clearCanvas = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

const calcularPoderTotal = (data) => data.reduce((sum, {poder}) => sum + poder, 0);

const getMaxPoder = (data) => {
    let max = 0;
    data.forEach(dios => max = Math.max(max, dios.poder));
    return max;
}

const mostrarGraficoLineas = (data) => {

    let maxPoder = getMaxPoder(data);
    
    let width = (canvas.width - 40) / 3;
    let scaleY = canvas.height / maxPoder;
    let actualX = 10;
    let actualY = canvas.height - data[0].poder * scaleY;

    ctx.lineWidth = 3;

    for (let i = 1; i < data.length; i++) {

        ctx.strokeStyle = getRandomColor();
        let y = canvas.height - scaleY * data[i].poder;

        ctx.beginPath();
        ctx.moveTo(actualX, actualY);
        ctx.lineTo(actualX + width, y);
        ctx.stroke();

        actualX += width;
        actualY = y;
    }    

}

const mostrarGraficoRectangulos = (data) => {

    let maxPoder = getMaxPoder(data);
    
    let width = (canvas.width - 40) / 4;
    let scaleY = canvas.height / maxPoder;
    let actualX = 10;

    for (let persona of data) {
        ctx.beginPath();
        ctx.fillStyle = getRandomColor();
        let height = scaleY * persona.poder;
        ctx.rect(actualX, canvas.height - height, width, height);        
        ctx.fill();
        actualX += width + 10;
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
        ctx.arc(canvas.width / 2, canvas.height / 2, 100, angulo, angulo + anguloActual);
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

const mostrarGrafico = () => {

    clearCanvas();
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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