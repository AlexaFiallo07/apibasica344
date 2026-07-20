const Cliente = require('../models/cliente.model');
const createCrudController = require('./crud.controller');

const crud = createCrudController(Cliente, 'Cliente');

exports.obtener = crud.obtener;
exports.actualizar = crud.actualizar;
exports.eliminar = crud.eliminar;

exports.home = async (req, res) => {
  res.redirect('/listadoclientes');
};

exports.formulario = async (req, res) => {
  res.render('pages/registrarcliente');
};

exports.listar = async () => Cliente.find().sort({ nombre: 1 });

exports.consultar = async (req, res) => {
  try {
    const clientes = await exports.listar();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listado = async (req, res) => {
  try {
    const clientes = await exports.listar();
    res.render('pages/index', { clientes });
  } catch (error) {
    res.status(500).send(`Error consultando clientes: ${error.message}`);
  }
};

exports.crear = async (req, res) => {
  try {
    const nuevo = new Cliente(req.body);
    const guardado = await nuevo.save();
    if (req.headers.accept && req.headers.accept.includes('text/html')) {
      return res.redirect('/listadoclientes');
    }
    res.status(201).json(guardado);
  } catch (error) {
    if (req.headers.accept && req.headers.accept.includes('text/html')) {
      return res.status(400).send(`Error creando cliente: ${error.message}`);
    }
    res.status(400).json({ error: error.message });
  }
};
