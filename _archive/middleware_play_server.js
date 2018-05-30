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

// -----------------
// --- VARIABLES ---
const server_version = '0.0.1';
const server_name = `Super Awesome Server ${server_version}`;

// NOTE: leaving out all socket.io code for now

// ------------------
// --- MIDDLEWARE ---
// ------------------

app.enable('trust proxy');

app.use(log_to_console);

// this should fire for all routes.
// app.use((req, res, next) => {
//   console.log(`${req.ip} requested '${req.url}'`);
//   next();
// });

// this should fire only when we visit the poop route.
app.use('/poop', (req, res, next) => {
  console.log(chalk.yellow('Pooped Route. '));
  next();
});

// --------------
// --- ROUTES ---
// --------------

// general route
app.get('/', (req, res) => {
  res.send(`<h3 style="font-family: 'Arial', sans-serif;">Welcome to ${server_name}</h3>`);
});

// middleware mounted on a route
app.get('/poop', (req, res) => {
  res.send(`You've reached the Poop route.`);
});

// using route-level middleware
app.get('/meedleware', meedle_ware, (req, res) => {
  res.send(`Meedle Ware!`);
});

// static routes
app.use(express.static('public/'));


// ----------------------
// --- RUNNNN  SERVER ---
// ----------------------
http.listen(3000, () => {
  clear();
  console.log(`"${chalk.blue(server_name)}" started on ${chalk.green('3000')}, started ${chalk.yellow(new Date().toLocaleString())}`);
});



// ---------- temp stuff ----------
function meedle_ware(req, res, next) {
  console.log(chalk.green('MeedleWare Ran from Meedleware Function!!'));
  next();
}

function log_to_console(req, res, next) {
  console.log(`${chalk.yellow(req.ip)} requested '${chalk.yellow(req.url)}' at ${chalk.yellow(new Date().toLocaleString())}`);
  next();
}