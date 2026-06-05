const mongoose = require("mongoose");
var conexion = "";
try {
  const URI = process.env.MONGOURI;
	const URI = 'mongodb+srv://Alexfialloc:2RvkNysQr6JFTPoM@cluster0.gj3ljbb.mongodb.net/'


  conexion = mongoose.connect(URI);
} catch (err) {
  console.log(err);
}


module.exports = conexion;

