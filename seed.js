require('dotenv').config();
const connectDB = require('./config/connectiondb');
const Cliente = require('./models/cliente.model');
const Servicio = require('./models/servicio.model');

const servicios = [
    {
      nombre: "Corte de pelo mujer",
      descripcion: "Corte, lavado y peinado completo para mujer",
      duracionMinutos: 60,
      precio: 35.00,
      categoria: "corte",
      activo: true,
      imagen: "corte-mujer.jpg"
    },
    {
      nombre: "Tintura completa",
      descripcion: "Aplicación de tintura en todo el cabello con productos premium",
      duracionMinutos: 120,
      precio: 65.00,
      categoria: "tintura",
      activo: true,
      imagen: "tintura-completa.jpg"
    },
    {
      nombre: "Afeitado clásico",
      descripcion: "Afeitado tradicional con toalla caliente y navaja",
      duracionMinutos: 45,
      precio: 25.00,
      categoria: "barberia",
      activo: true,
      imagen: "afeitado-clasico.jpg"
    },
    {
      nombre: "Tratamiento hidratante",
      descripcion: "Hidratación profunda con keratina y aceites naturales",
      duracionMinutos: 90,
      precio: 55.00,
      categoria: "tratamiento",
      activo: true,
      imagen: "tratamiento-hidratante.jpg"
    },
    {
      nombre: "Peinado evento",
      descripcion: "Peinado elegante para bodas, fiestas y eventos especiales",
      duracionMinutos: 75,
      precio: 50.00,
      categoria: "peinado",
      activo: true,
      imagen: "peinado-evento.jpg"
    }
  ];

const clientes = [
    { nombre: "María González", email: "maria@email.com", telefono: "612345678" },
    { nombre: "Carlos Rodríguez", email: "carlos@email.com", telefono: "623456789" },
    { nombre: "Ana Martínez", email: "ana@email.com", telefono: "634567890" },
    { nombre: "Luis Hernández", email: "luis@email.com", telefono: "645678901" },
    { nombre: "Elena Sánchez", email: "elena@email.com", telefono: "656789012" }
  ];

async function runSeed() {
  try {
    await connectDB();

    // Servicios: limpiar y agregar
    await Servicio.deleteMany({});
    await Servicio.insertMany(servicios);
    console.log('Servicios insertados');

    // Clientes: limpiar y agregar
    await Cliente.deleteMany({});
    await Cliente.insertMany(clientes);
    console.log('Clientes insertados');

    process.exit(0);
  } catch (err) {
    console.error('Error en seed:', err.message);
    process.exit(1);
  }
}

runSeed();
