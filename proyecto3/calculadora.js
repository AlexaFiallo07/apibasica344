const chalk = require('chalk');

function sumar(a, b){
    return a + b;

}

console.log(chalk.green('Resultado:'), sumar(2, 3));