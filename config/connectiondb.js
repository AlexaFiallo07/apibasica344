const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
  if (!URI) {
    throw new Error('Falta MONGODB_URI en las variables de entorno');
  }

  try {
    // Conexión única (si ya existe, mongoose la reutiliza)
    await mongoose.connect(URI);
    console.log('MongoDB conectado');
  } catch (err) {
    console.error('Error de conexión a MongoDB:', err.message);
    throw err;
  }
};

module.exports = connectDB;

