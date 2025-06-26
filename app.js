const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));

let socketsConnected = new Set();


io.on('connection', onConnected);

function onConnected(socket) {

    //console.log('A user connected:', socket.id);
    socketsConnected.add(socket.id);

    io.emit('clients-total', socketsConnected.size);

    socket.on('disconnect', () => {
        //console.log('A user disconnected:', socket.id);
        socketsConnected.delete(socket.id);
        io.emit('clients-total', socketsConnected.size);

    });

    socket.on('message', (data) => {
        //console.log('Message received:', data);
        socket.broadcast.emit('message', data);
    })

    socket.on('feedback', (data) => {
        //console.log('Feedback received:', data);
        socket.broadcast.emit('feedback', data);
    })

     socket.on('join-room', (roomId) => {
    socket.join(roomId);
  });

  socket.on('message', (data) => {
    // data should include roomId
    io.to(data.roomId).emit('message', data);
  });

}

