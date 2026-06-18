const prompt = require('prompt-sync')();

function sumar(a, b) {
    return a + b;
}

const num1 = parseFloat(prompt('Primer numero:'));
const num2 = parseFloat(prompt('segundo numero:'));

console.log('Resultado:', sumar(num1, num2));