const Servicio = require('../models/servicio.model');
const createCrudController = require('./crud.controller');

module.exports = createCrudController(Servicio, 'Servicio');
