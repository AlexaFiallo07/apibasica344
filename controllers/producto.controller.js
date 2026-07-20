const Producto = require('../models/producto.model');
const createCrudController = require('./crud.controller');

module.exports = createCrudController(Producto, 'Producto');
