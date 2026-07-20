const mongoose = require('mongoose');

const URI = process.env.MONGO_URI || process.env.MONGODB_URI;

const connectDB = async () => {
  if (!URI) {
    throw new Error(
      'Falta la variable de entorno MONGO_URI (o MONGODB_URI) para conectar a MongoDB'
    );
  }

  try {
    // Conexión única (si ya existe, mongoose la reutiliza)
    await mongoose.connect(URI);
    console.log('MongoDB conectado');
  } catch (err) {
    console.error('Error de conexión a MongoDB:', err.message);
    // Propagar el error para que quien invoque decida cómo reaccionar
    // (por ejemplo, terminar el proceso) en lugar de continuar en un
    // estado inconsistente sin base de datos.
    throw err;
  }
};

module.exports = connectDB;
