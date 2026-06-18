const mongoose = require("mongoose");
require("dotenv").config();

const Cliente = require("./models/cliente.model");

mongoose.connect(process.env.MONGOURI);

const data = [
  { nombre: "María González", email: "maria@email.com", telefono: "612345678" },
  { nombre: "Carlos Rodríguez", email: "carlos@email.com", telefono: "623456789" },
  { nombre: "Ana Martínez", email: "ana@email.com", telefono: "634567890" },
  { nombre: "Luis Hernández", email: "luis@email.com", telefono: "645678901" },
  { nombre: "Elena Sánchez", email: "elena@email.com", telefono: "656789012" }
];

Cliente.insertMany(data).then(() => {
  console.log("Datos insertados");
  process.exit();
});
