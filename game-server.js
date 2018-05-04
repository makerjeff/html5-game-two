// basic Express Server
const express = require('express');
const app     = express();
const http    = require('http').Server(app);
const io      = require('socket.io')(http);
const chalk   = require('chalk');
const clear   = require('clear');

const server_name = 'Super Atom Server!';

// let rooms = [];

let room_code = '123abc';

// basic routes
app.get('/', (req,res) => {
  res.send(`<h1>Welcome to ${server_name}!</h1>`);
});

// socket.io routes
io.on('connection', (socket) => {
  console.log(`User ${chalk.green(socket.id)} has connected. `);

  // ping!
  socket.on('_ping', (data) => {
    console.log(`${socket.id} has pinged!`);
    io.emit('message', data);
  });

  // join a room
  socket.on('room', (room)=> {

    // TODO: check to see if room is available.
    if (room === '123abc') {
      socket.join(room);
      console.log(`${socket.id} has joined room ${room}`);
      socket.emit(`message`, `You joined the room ${room}`);

      socket.broadcast.to('123abc').emit('message', socket.id + ' joined the room!');
    } else {
      console.log(`${socket.id} attempted to join room ${room} and failed.`);
      socket.emit(`message`, `You attempted to join room ${room} and failed.`);

      // socket.emit('error', `Error joining room ${room}`);
      // socket.broadcast.to(socket.id).emit('message', 'no room by that name!');
    }
  });

  socket.on('get rooms', (data) => {
    // console.log(data);
    console.log(socket.rooms);
  });

  socket.on('room message', (message) => {
    console.log(`${socket.id} is sending a message to room`);
    io.to('123abc').emit('room message', 'hello!');
  });

  // disconnect
  socket.on('disconnect', () => {
    console.log(`User ${chalk.red(socket.id)} disconnected. `);
  });
});

// use static routes
app.use(express.static('public/'));

// start server
http.listen(3000, function() {
  clear();
  console.log(`Game server started on ${chalk.green('3000')}`);
});
