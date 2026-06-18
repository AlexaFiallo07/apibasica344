const fs = require('fs');
const http = require('http');
const path = require('path');

console.log('Directorio actual:', __dirname);
console.log('Archivos en esta carpeta:', fs.readdirSync('.'));

const colors = require('colors');
console.log('hola'.rainbow);