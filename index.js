require('dotenv').config();
const express = require('express');
const connectDB = require('./config/connectiondb');
const clienteController = require('./controllers/cliente.controller');
const servicioController = require('./controllers/servicio.controller');
const productoController = require('./controllers/producto.controller');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Conectar a la base de datos
connectDB().catch(err => {
  console.error('No se pudo conectar a la base de datos, saliendo...', err.message);
  process.exit(1);
});

// Rutas Clientes
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

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
