const Servicio = require('../models/servicio.model');

// Función para mostrar el formulario (requerida por el router como formularioS)
exports.formularioS = async (req, res) => {
  try {
    res.render('pages/registrarservicio'); // Ajusta la ruta de tu vista EJS si es distinta
  } catch (error) {
    res.status(500).send(`Error al cargar formulario: ${error.message}`);
  }
};

exports.consultar = async (req, res) => {
  try {
    const servicios = await Servicio.find();
    res.json(servicios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Renombrado de 'obtener' a 'consultarId' para coincidir con el router
exports.consultarId = async (req, res) => {
  try {
    const servicio = await Servicio.findById(req.params.id);
    if (!servicio) return res.status(404).json({ mensaje: 'Servicio no encontrado' });
    res.json(servicio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Renombrado de 'crear' a 'registrar' para coincidir con el router
exports.registrar = async (req, res) => {
  try {
    const nuevo = new Servicio(req.body);
    const guardado = await nuevo.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const actualizado = await Servicio.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!actualizado) return res.status(404).json({ mensaje: 'Servicio no encontrado' });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const eliminado = await Servicio.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: 'Servicio no encontrado' });
    res.json({ mensaje: 'Servicio eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};