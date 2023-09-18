const socket = io();

let size = 20;
let r = 0;
let g = 0;
let b = 0;
let identificador = 0;

let elementos = [];
let cursores = [];

function setup() {
    createCanvas(400, 400);
    r = int(Math.random()*255)
    g = int(Math.random()*255)
    b = int(Math.random()*255)
    identificador = int(random()*1000)
    console.log("identificador: " , identificador)
}

function draw() {
    background(220);
    
    // pintamos los items dentro de la lista de elementos.
    elementos.forEach((elemento)=>{
        fill(elemento.r, elemento.g, elemento.b);
        ellipse(elemento.x, elemento.y, elemento.size, elemento.size);
    });
    
    // pintamos los items dentro de la lista de cursores.
    cursores.forEach((elemento)=>{
        fill(0, 0, 0);
        ellipse(elemento.x, elemento.y, elemento.size, elemento.size);
    });
}

function mousePressed() {
    // Enviar la posición del clic al servidor.
    const elemento = {
        x: mouseX,
        y: mouseY,
        r: r,
        g: g,
        b: b,
        size
    };
    // se envía el elemento bajo el tag: 'enviar-elemento'
    socket.emit('enviar-elemento', elemento);
}

function mouseDragged() {
    // Enviar la posición del arrastre al servidor.
    const elemento = {
        x: mouseX,
        y: mouseY,
        r: r,
        g: g,
        b: b,
        size,
        id: identificador
    };
    // envíamos el elemento con el tag: 'enviar-cursor'
    socket.emit('enviar-cursor', elemento);
}

socket.on('elemento-recibido', (elemento) => {
    // Dibujar el elemento recibido en el otro cliente.
    console.log("recibiendo-elemento:", elemento)    
    elementos.push(elemento)
});

socket.on('cursor-recibido', (elemento) => {
    // Dibujar el elemento recibido en el otro cliente.
    console.log("recibiendo-cursor:", elemento)
    // Seleccionamos el elemento quie tiene el identificador
    let cursorIndex = cursores.findIndex((item) => elemento.id == item.id)
    // Si existe ya ese cursos con el identificador
    if(cursorIndex!=-1){
        // Reemplazamos el cursor con el nuevo (nueva posición)
        cursores[cursorIndex] = elemento;
    } else {
        // Si no existe, se agrega a la lista
        cursores.push(elemento)
    }
});


