require('dotenv').config();
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

// Conectar a la base de datos
connectDB().catch(err => {
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

// Manejador de rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({ error: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
});

// Manejador de errores centralizado: captura errores propagados desde las rutas
// (incluidos los lanzados en middlewares) para que no queden sin respuesta.
app.use((err, req, res, next) => {
  console.error('Error no controlado en una petición:', err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500).json({ error: err.message || 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

// Evitar que rechazos o excepciones no controladas terminen el proceso de forma
// silenciosa: los registramos explícitamente antes de salir.
process.on('unhandledRejection', (reason) => {
  console.error('Promesa rechazada sin manejar:', reason);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Excepción no capturada:', err);
  process.exit(1);
});

