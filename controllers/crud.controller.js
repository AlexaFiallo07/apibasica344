// Fábrica de controladores CRUD reutilizable para modelos de Mongoose.
// Genera los manejadores estándar (consultar, obtener, crear, actualizar,
// eliminar) para cualquier modelo, evitando duplicar la misma lógica en cada
// controlador. `label` se usa en los mensajes de respuesta (p. ej. "Producto").
function createCrudController(Model, label) {
  return {
    consultar: async (req, res) => {
      try {
        const registros = await Model.find();
        res.json(registros);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },

    obtener: async (req, res) => {
      try {
        const registro = await Model.findById(req.params.id);
        if (!registro) return res.status(404).json({ mensaje: `${label} no encontrado` });
        res.json(registro);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },

    crear: async (req, res) => {
      try {
        const nuevo = new Model(req.body);
        const guardado = await nuevo.save();
        res.status(201).json(guardado);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    },

    actualizar: async (req, res) => {
      try {
        const actualizado = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!actualizado) return res.status(404).json({ mensaje: `${label} no encontrado` });
        res.json(actualizado);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    },

    eliminar: async (req, res) => {
      try {
        const eliminado = await Model.findByIdAndDelete(req.params.id);
        if (!eliminado) return res.status(404).json({ mensaje: `${label} no encontrado` });
        res.json({ mensaje: `${label} eliminado` });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  };
}

module.exports = createCrudController;
