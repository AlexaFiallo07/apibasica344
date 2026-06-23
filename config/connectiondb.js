const mongoose = require("mongoose");

const URI = process.env.MongoDB_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("MongoDB conectado");
  } catch (err) {
    console.log("Error de conexión a MongoDB:", err.message);
  }
};

module.exports = connectDB;