const Cliente = require('../models/cliente.model');

exports.home = async (req, res) => {
  res.redirect('/listadoclientes');
};

exports.formulario = async (req, res) => {
  res.render('pages/registrarcliente');
};

exports.listar = async () => Cliente.find().sort({ nombre: 1 });

exports.listado = async (req, res) => {
  try {
    const clientes = await exports.listar();
    res.render('pages/index', { clientes });
  } catch (error) {
    res.status(500).send(`Error consultando clientes: ${error.message}`);
  }
};

exports.consultar = async (req, res) => {
  try {
    const clientes = await exports.listar();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtener = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
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

exports.actualizar = async (req, res) => {
  try {
    const actualizado = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!actualizado) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const eliminado = await Cliente.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    res.json({ mensaje: 'Cliente eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
