jest.mock('../models/producto.model');

const Producto = require('../models/producto.model');
const productoController = require('../controllers/producto.controller');
const { mockRequest, mockResponse } = require('./helpers/mockHttp');

describe('producto.controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('consultar', () => {
    it('returns all products as JSON', async () => {
      const productos = [{ nombre: 'Shampoo' }];
      Producto.find.mockResolvedValue(productos);
      const req = mockRequest();
      const res = mockResponse();
      await productoController.consultar(req, res);
      expect(Producto.find).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(productos);
    });

    it('responds 500 on error', async () => {
      Producto.find.mockRejectedValue(new Error('boom'));
      const req = mockRequest();
      const res = mockResponse();
      await productoController.consultar(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'boom' });
    });
  });

  describe('obtener', () => {
    it('returns a product by id', async () => {
      const producto = { _id: '1', nombre: 'Shampoo' };
      Producto.findById.mockResolvedValue(producto);
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();
      await productoController.obtener(req, res);
      expect(Producto.findById).toHaveBeenCalledWith('1');
      expect(res.json).toHaveBeenCalledWith(producto);
    });

    it('responds 404 when not found', async () => {
      Producto.findById.mockResolvedValue(null);
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();
      await productoController.obtener(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Producto no encontrado' });
    });

    it('responds 500 on error', async () => {
      Producto.findById.mockRejectedValue(new Error('boom'));
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();
      await productoController.obtener(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'boom' });
    });
  });

  describe('crear', () => {
    it('creates a product and returns 201', async () => {
      const guardado = { _id: '1', nombre: 'Shampoo' };
      const save = jest.fn().mockResolvedValue(guardado);
      Producto.mockImplementation(() => ({ save }));
      const req = mockRequest({ body: { nombre: 'Shampoo' } });
      const res = mockResponse();
      await productoController.crear(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(guardado);
    });

    it('responds 400 on validation error', async () => {
      const save = jest.fn().mockRejectedValue(new Error('invalid'));
      Producto.mockImplementation(() => ({ save }));
      const req = mockRequest({ body: {} });
      const res = mockResponse();
      await productoController.crear(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'invalid' });
    });
  });

  describe('actualizar', () => {
    it('updates and returns the product', async () => {
      const actualizado = { _id: '1', nombre: 'Shampoo XL' };
      Producto.findByIdAndUpdate.mockResolvedValue(actualizado);
      const req = mockRequest({ params: { id: '1' }, body: { nombre: 'Shampoo XL' } });
      const res = mockResponse();
      await productoController.actualizar(req, res);
      expect(Producto.findByIdAndUpdate).toHaveBeenCalledWith('1', { nombre: 'Shampoo XL' }, { new: true, runValidators: true });
      expect(res.json).toHaveBeenCalledWith(actualizado);
    });

    it('responds 404 when not found', async () => {
      Producto.findByIdAndUpdate.mockResolvedValue(null);
      const req = mockRequest({ params: { id: '1' }, body: {} });
      const res = mockResponse();
      await productoController.actualizar(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Producto no encontrado' });
    });

    it('responds 400 on error', async () => {
      Producto.findByIdAndUpdate.mockRejectedValue(new Error('bad'));
      const req = mockRequest({ params: { id: '1' }, body: {} });
      const res = mockResponse();
      await productoController.actualizar(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'bad' });
    });
  });

  describe('eliminar', () => {
    it('deletes a product', async () => {
      Producto.findByIdAndDelete.mockResolvedValue({ _id: '1' });
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();
      await productoController.eliminar(req, res);
      expect(Producto.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Producto eliminado' });
    });

    it('responds 404 when not found', async () => {
      Producto.findByIdAndDelete.mockResolvedValue(null);
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();
      await productoController.eliminar(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Producto no encontrado' });
    });

    it('responds 500 on error', async () => {
      Producto.findByIdAndDelete.mockRejectedValue(new Error('boom'));
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();
      await productoController.eliminar(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'boom' });
    });
  });
});
