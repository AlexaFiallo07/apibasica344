require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGOURI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'ejercicios';

app.use(express.json());

async function withClient(fn) {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    return await fn(db);
  } finally {
    await client.close();
  }
}

// Obtener todos los productos
app.get('/driver/productos', async (req, res) => {
  try {
    const productos = await withClient(db => db.collection('productos').find({}).toArray());
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener producto por consecutivo
app.get('/driver/productos/:consecutivo', async (req, res) => {
  try {
    const consecutivo = Number(req.params.consecutivo);
    const producto = await withClient(db => db.collection('productos').findOne({ consecutivo }));
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Insertar producto (body debe contener consecutivo, nombre, precio)
app.post('/driver/productos', async (req, res) => {
  try {
    const { consecutivo, nombre, precio } = req.body;
    if (!consecutivo || !nombre || !precio) return res.status(400).json({ mensaje: 'Faltan datos' });
    const resultado = await withClient(db => db.collection('productos').insertOne({ consecutivo: Number(consecutivo), nombre, precio: Number(precio) }));
    res.status(201).json(resultado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Driver app escuchando en http://localhost:${PORT}`));
