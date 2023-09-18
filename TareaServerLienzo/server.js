const express = require('express');
const { createServer } = require('http');
const { join } = require('path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

// Configuración para servir el archivo main.js
app.get('/main.js', (req, res) => {
    res.type('application/javascript');
    res.sendFile(__dirname + '/main.js');
  });

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
  
  // Aquí puedes asignar un color único al usuario y enviarlo a través del socket.
  const userColor = {
    r: Math.random() * 255,
    g: Math.random() * 255,
    b: Math.random() * 255,
  };
  
  socket.emit('user color', userColor);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // Puedes manejar la lógica del lienzo interactivo aquí.
  socket.on('canvas action', (data) => {
    // Aquí puedes recibir datos del lienzo y emitirlos a todos los usuarios.
    io.emit('canvas action', data);
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
