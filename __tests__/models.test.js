const Cliente = require('../models/cliente.model');
const Producto = require('../models/producto.model');
const Servicio = require('../models/servicio.model');

// These tests exercise the schema definitions via Mongoose's synchronous
// validation, so no database connection is required.

describe('Cliente model', () => {
  it('requires nombre and email', () => {
    const errors = new Cliente({}).validateSync().errors;
    expect(errors.nombre).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.telefono).toBeUndefined();
  });

  it('is valid with required fields', () => {
    const error = new Cliente({ nombre: 'Ana', email: 'ana@example.com' }).validateSync();
    expect(error).toBeUndefined();
  });
});

describe('Producto model', () => {
  it('requires nombre and precio', () => {
    const errors = new Producto({}).validateSync().errors;
    expect(errors.nombre).toBeDefined();
    expect(errors.precio).toBeDefined();
  });

  it('defaults stock to 0', () => {
    const producto = new Producto({ nombre: 'Shampoo', precio: 100 });
    expect(producto.stock).toBe(0);
    expect(producto.validateSync()).toBeUndefined();
  });
});

describe('Servicio model', () => {
  it('requires nombre, duracionMinutos, precio and categoria', () => {
    const errors = new Servicio({}).validateSync().errors;
    expect(errors.nombre).toBeDefined();
    expect(errors.duracionMinutos).toBeDefined();
    expect(errors.precio).toBeDefined();
    expect(errors.categoria).toBeDefined();
  });

  it('rejects categoria outside the enum', () => {
    const servicio = new Servicio({
      nombre: 'Corte',
      duracionMinutos: 30,
      precio: 100,
      categoria: 'invalida',
    });
    expect(servicio.validateSync().errors.categoria).toBeDefined();
  });

  it('accepts a valid categoria and defaults activo to true', () => {
    const servicio = new Servicio({
      nombre: 'Corte',
      duracionMinutos: 30,
      precio: 100,
      categoria: 'corte',
    });
    expect(servicio.activo).toBe(true);
    expect(servicio.validateSync()).toBeUndefined();
  });
});
