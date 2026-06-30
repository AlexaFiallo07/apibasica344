const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const URI = process.env.MongoDB_URI || process.env.MONGO_URI || process.env.MONGOURI;

    if (!URI) {
      throw new Error("Falta configurar MongoDB_URI, MONGO_URI o MONGOURI en el archivo .env");
    }

    await mongoose.connect(URI);
    console.log("MongoDB conectado");
  } catch (err) {
    console.log("Error de conexión a MongoDB:", err.message);
    throw err;
  }
};

module.exports = connectDB;
