require('dotenv').config(); 
const mongoose = require('mongoose');

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Error de conexion:', error.message);
    process.exit(1);
  }
};

module.exports = conectarDB;