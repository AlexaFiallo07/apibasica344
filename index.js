require('dotenv').config();
console.log("Variables de entorno:", process.env);
const express = require('express');
const connectDB = require('./config/connectiondb');
const clienteController = require('./controllers/cliente.controller');
const servicioController = require('./controllers/servicio.controller');
const productoController = require('./controllers/producto.controller');

const app = express();
const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Conectar a la base de datos (antes de servir)
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor iniciado en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos, saliendo...', err.message);
    process.exit(1);
  });


// Rutas Clientes
app.get('/', clienteController.home);
app.get('/formulario', clienteController.formulario);
app.get('/listadoclientes', clienteController.listado);
app.get('/clientes', clienteController.consultar);
app.get('/clientes/:id', clienteController.obtener);
app.post('/clientes', clienteController.crear);
app.put('/clientes/:id', clienteController.actualizar);
app.delete('/clientes/:id', clienteController.eliminar);

// Rutas Servicios
app.get('/servicios', servicioController.consultar);
app.get('/servicios/:id', servicioController.obtener);
app.post('/servicios', servicioController.crear);
app.put('/servicios/:id', servicioController.actualizar);
app.delete('/servicios/:id', servicioController.eliminar);

// Rutas Productos
app.get('/productos', productoController.consultar);
app.get('/productos/:id', productoController.obtener);
app.post('/productos', productoController.crear);
app.put('/productos/:id', productoController.actualizar);
app.delete('/productos/:id', productoController.eliminar);



