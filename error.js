const chalk = require('chalk');

module.exports = function error(msg) {
    console.log(chalk.red('Error!') + ' ' + msg);
    process.exit(1);
}