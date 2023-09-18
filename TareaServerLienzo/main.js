let canvas;
let posicionesX = [];
let posicionesY = [];
let canalesB = [];
let canalesG = [];
let canalesR = [];

let cursorColor;

function setup() {
    frameRate(60);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');
    noStroke();

    // Conectar al servidor de sockets
    const socket = io.connect('http://localhost:3000');
    
    // Recibir el color asignado por el servidor
    socket.on('user color', (color) => {
        cursorColor = color;
    });

    if (localStorage.getItem('bolitasX')) {
        posicionesX = JSON.parse(localStorage.getItem('bolitasX'));
        posicionesY = JSON.parse(localStorage.getItem('bolitasY'));
        canalesR = JSON.parse(localStorage.getItem('bolitasR'));
        canalesG = JSON.parse(localStorage.getItem('bolitasG'));
        canalesB = JSON.parse(localStorage.getItem('bolitasB'));
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(220);
    for (let index = 0; index < posicionesX.length; index++) {
        fill(canalesR[index], canalesG[index], canalesB[index]);
        ellipse(posicionesX[index], posicionesY[index], 30, 30);
    }

    // Dibuja el cursor del mouse con el color asignado
    fill(cursorColor.r, cursorColor.g, cursorColor.b);
    ellipse(mouseX, mouseY, 30, 30);
}

function mousePressed() {
    posicionesX.push(mouseX);
    posicionesY.push(mouseY);
    canalesR.push(random(0, 255));
    canalesB.push(random(0, 255));
    canalesG.push(random(0, 255));

    localStorage.setItem('bolitasX', JSON.stringify(posicionesX));
    localStorage.setItem('bolitasY', JSON.stringify(posicionesY));
    localStorage.setItem('bolitasR', JSON.stringify(canalesR));
    localStorage.setItem('bolitasG', JSON.stringify(canalesG));
    localStorage.setItem('bolitasB', JSON.stringify(canalesB));
}
