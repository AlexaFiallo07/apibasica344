const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  consecutivo: { type: Number, unique: true, sparse: true },
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, default: 0 }
});

module.exports = mongoose.model('Producto', productoSchema);
