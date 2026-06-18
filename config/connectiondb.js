const mongoose = require("mongoose");

const URI = process.env.MONGOURI ='mongodb+srv://Alexfialloc:2RvkNysQr6JFTPoM@cluster0.gj3ljbb.mongodb.net/'
'mongodb+srv://Alexfialloc:2RvkNysQr6JFTPoM@cluster0.gj3ljbb.mongodb.net/'
const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("MongoDB conectado");
  } catch (err) {
    console.log("Error de conexión a MongoDB:", err.message);
  }
};

module.exports = connectDB;