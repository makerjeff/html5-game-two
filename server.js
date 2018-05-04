// SERVER.JS 2018.05.03
const express     = require('express');
const app         = express();
const http        = require('http').Server(app);
const io          = require('socket.io')(http);
const chalk       = require('chalk');
const clear       = require('clear');

const server_name = "Super Amazing Awesome Server!";

// NOTE: leaving out all socket.io code for now

app.get('/', (req, res) => {
  res.send(`<h3 style="font-family: 'Arial', sans-serif;">Welcome to ${server_name}</h3>`);
});

app.use(express.static('public/'));

http.listen(3000, () => {
  clear();
  console.log(`Server started on ${chalk.green('3000')}`);
});
