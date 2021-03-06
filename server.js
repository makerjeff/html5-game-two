// SERVER.JS 2018.05.03

// ---------------
// --- MODULES ---
// ---------------
const express     = require('express');
const app         = express();
const http        = require('http').Server(app);
const io          = require('socket.io')(http);
const chalk       = require('chalk');
const clear       = require('clear');

const middleware  = require('./models/middleware');

// -----------------
// --- VARIABLES ---
const server_version = '0.1.0';
const server_name = `Super Awesome Server ${server_version}`;

// NOTE: leaving out all socket.io code for now

// ------------------
// --- MIDDLEWARE ---
// ------------------

app.enable('trust proxy');
app.use(middleware.log_to_console);


// --------------
// --- ROUTES ---
// --------------

// general route
app.get('/', (req, res) => {
  res.send(`<h3 style="font-family: 'Arial', sans-serif;">Welcome to ${server_name}</h3>`);
});


// static routes
app.use(express.static('public/'));

app.get('*', (req, res) => {
  res.status(404);
  res.send('<h1>Four Oh Four.</h1>');
});

// ----------------------
// --- RUNNNN  SERVER ---
// ----------------------
http.listen(3000, () => {
  clear();
  console.log(`"${chalk.blue(server_name)}" started on ${chalk.green('3000')}, started ${chalk.yellow(new Date().toLocaleString())}`);
});
