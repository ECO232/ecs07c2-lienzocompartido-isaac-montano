const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Estatic public 
app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('enviar-elemento', (elemento) => {
    io.emit('elemento-recibido', elemento);
  });

  socket.on('enviar-cursor', (elemento) => {
    io.emit('cursor-recibido', elemento);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
