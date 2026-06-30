require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./config/connectiondb");
const Cliente = require("./models/cliente.model");
const Producto = require("./models/producto.model");
const Servicio = require("./models/servicio.model");

const clientes = [
  { nombre: "María González", email: "maria@email.com", telefono: "612345678" },
  { nombre: "Carlos Rodríguez", email: "carlos@email.com", telefono: "623456789" },
  { nombre: "Ana Martínez", email: "ana@email.com", telefono: "634567890" },
  { nombre: "Luis Hernández", email: "luis@email.com", telefono: "645678901" },
  { nombre: "Elena Sánchez", email: "elena@email.com", telefono: "656789012" }
];

const productos = [
  { consecutivo: 1, nombre: "Camiseta básica algodón", precio: 331360, stock: 10 },
  { consecutivo: 2, nombre: "Camiseta polo manga corta", precio: 309593, stock: 10 },
  { consecutivo: 3, nombre: "Camisa formal manga larga", precio: 311300, stock: 10 },
  { consecutivo: 4, nombre: "Camisa oxford casual", precio: 135316, stock: 10 },
  { consecutivo: 5, nombre: "Pantalón jean clásico", precio: 211350, stock: 10 },
  { consecutivo: 6, nombre: "Pantalón chino slim fit", precio: 292722, stock: 10 },
  { consecutivo: 7, nombre: "Pantalón de vestir", precio: 288396, stock: 10 },
  { consecutivo: 8, nombre: "Short deportivo", precio: 330436, stock: 10 },
  { consecutivo: 9, nombre: "Bermuda de lino", precio: 92165, stock: 10 },
  { consecutivo: 10, nombre: "Chaqueta denim", precio: 51664, stock: 10 },
  { consecutivo: 11, nombre: "Chaqueta bomber", precio: 128899, stock: 10 },
  { consecutivo: 12, nombre: "Suéter tejido cuello V", precio: 74649, stock: 10 },
  { consecutivo: 13, nombre: "Hoodie con capucha", precio: 344091, stock: 10 },
  { consecutivo: 14, nombre: "Chaleco acolchado", precio: 29446, stock: 10 },
  { consecutivo: 15, nombre: "Vestido casual verano", precio: 172656, stock: 10 },
  { consecutivo: 16, nombre: "Vestido de noche elegante", precio: 216967, stock: 10 },
  { consecutivo: 17, nombre: "Falda plisada midi", precio: 45327, stock: 10 },
  { consecutivo: 18, nombre: "Blusa seda estampada", precio: 210861, stock: 10 },
  { consecutivo: 19, nombre: "Overol denim", precio: 323771, stock: 10 },
  { consecutivo: 20, nombre: "Traje de baño una pieza", precio: 217155, stock: 10 }
];

const servicios = [
  {
    nombre: "Corte de pelo mujer",
    descripcion: "Corte, lavado y peinado completo para mujer",
    duracionMinutos: 60,
    precio: 35,
    categoria: "corte",
    activo: true,
    imagen: "corte-mujer.jpg"
  },
  {
    nombre: "Tintura completa",
    descripcion: "Aplicación de tintura en todo el cabello con productos premium",
    duracionMinutos: 120,
    precio: 65,
    categoria: "tintura",
    activo: true,
    imagen: "tintura-completa.jpg"
  },
  {
    nombre: "Afeitado clásico",
    descripcion: "Afeitado tradicional con toalla caliente y navaja",
    duracionMinutos: 45,
    precio: 25,
    categoria: "barberia",
    activo: true,
    imagen: "afeitado-clasico.jpg"
  },
  {
    nombre: "Tratamiento hidratante",
    descripcion: "Hidratación profunda con keratina y aceites naturales",
    duracionMinutos: 90,
    precio: 55,
    categoria: "tratamiento",
    activo: true,
    imagen: "tratamiento-hidratante.jpg"
  },
  {
    nombre: "Peinado evento",
    descripcion: "Peinado elegante para bodas, fiestas y eventos especiales",
    duracionMinutos: 75,
    precio: 50,
    categoria: "peinado",
    activo: true,
    imagen: "peinado-evento.jpg"
  }
];

async function run() {
  try {
    await connectDB();
    await Promise.all([
      Cliente.deleteMany({}),
      Producto.deleteMany({}),
      Servicio.deleteMany({})
    ]);
    await Promise.all([
      Cliente.insertMany(clientes),
      Producto.insertMany(productos),
      Servicio.insertMany(servicios)
    ]);
    console.log("Datos insertados correctamente");
  } catch (error) {
    console.error("Error insertando datos:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

run();
