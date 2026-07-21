const Producto = require('../models/producto.model');

// Función para mostrar el formulario (requerida por el router como formularioP)
exports.formularioP = async (req, res) => {
  try {
    res.render('pages/registrarproducto'); // Ajusta la ruta de tu vista EJS si es distinta
  } catch (error) {
    res.status(500).send(`Error al cargar formulario: ${error.message}`);
  }
};

exports.consultar = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Renombrado de 'obtener' a 'consultarId' para coincidir con el router
exports.consultarId = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Renombrado de 'crear' a 'registrar' para coincidir con el router
exports.registrar = async (req, res) => {
  try {
    const nuevo = new Producto(req.body);
    const guardado = await nuevo.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const actualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!actualizado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const eliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json({ mensaje: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};