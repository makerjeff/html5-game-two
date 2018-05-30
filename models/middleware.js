// middleware.js

const chalk     = require('chalk');

// log to console
function log_to_console(req, res, next) {
  console.log(`${chalk.yellow(req.ip)} requested '${chalk.yellow(req.url)}' at ${chalk.yellow(new Date().toLocaleString())}`);
  next();
}


// --- output ---
module.exports.log_to_console = log_to_console;