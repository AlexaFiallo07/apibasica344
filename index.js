require('dotenv').config();

const express = require('express');
const conectarDB = require('./config/connectiondb');
const methodOverride = require("method-override");



const PORT = 5000;

const clienteController = require('./controllers/cliente.controller');
const servicioController = require('./controllers/servicio.controller');
const productoController = require('./controllers/producto.controller');

const app = express();


const enrutamiento = require('./router/enrutamiento.router')
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json());

app.set('view engine', 'ejs');
app.use('/', enrutamiento);

// Conexión a MongoDB
conectarDB();

app.get('/cliente', function(req,res){
   fetch('https://apibasica344-ok7h.onrender.com')
   .then(response => response.json())
   .then(data => {
       res.render('pages/index2',
           {clientes:data}
       )
   });
});

app.get('/productos', function(req,res){
   fetch('https://apibasica344-ok7h.onrender.com')
   .then(response => response.json())
   .then(data => {
       res.render('pages/indexP',
           {clientes:data}
       )
   });
});

app.get('/servicios', function(req,res){
   fetch('https://apibasica344-ok7h.onrender.com')
   .then(response => response.json())
   .then(data => {
       res.render('pages/indexS',
           {clientes:data}
       )
   });
});

app.get('/', clienteController.home)





app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});