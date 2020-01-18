
const canvas = document.querySelector('canvas');

let ctx = canvas.getContext('2d');

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

