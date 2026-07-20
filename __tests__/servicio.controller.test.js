jest.mock('../models/servicio.model');

const Servicio = require('../models/servicio.model');
const servicioController = require('../controllers/servicio.controller');
const { mockRequest, mockResponse } = require('./helpers/mockHttp');

describe('servicio.controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('consultar', () => {
    it('returns all services as JSON', async () => {
      const servicios = [{ nombre: 'Corte' }];
      Servicio.find.mockResolvedValue(servicios);
      const req = mockRequest();
      const res = mockResponse();
      await servicioController.consultar(req, res);
      expect(Servicio.find).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(servicios);
    });

    it('responds 500 on error', async () => {
      Servicio.find.mockRejectedValue(new Error('boom'));
      const req = mockRequest();
      const res = mockResponse();
      await servicioController.consultar(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'boom' });
    });
  });

  describe('obtener', () => {
    it('returns a service by id', async () => {
      const servicio = { _id: '1', nombre: 'Corte' };
      Servicio.findById.mockResolvedValue(servicio);
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();
      await servicioController.obtener(req, res);
      expect(Servicio.findById).toHaveBeenCalledWith('1');
      expect(res.json).toHaveBeenCalledWith(servicio);
    });

    it('responds 404 when not found', async () => {
      Servicio.findById.mockResolvedValue(null);
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();
      await servicioController.obtener(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Servicio no encontrado' });
    });

    it('responds 500 on error', async () => {
      Servicio.findById.mockRejectedValue(new Error('boom'));
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();
      await servicioController.obtener(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'boom' });
    });
  });

  describe('crear', () => {
    it('creates a service and returns 201', async () => {
      const guardado = { _id: '1', nombre: 'Corte' };
      const save = jest.fn().mockResolvedValue(guardado);
      Servicio.mockImplementation(() => ({ save }));
      const req = mockRequest({ body: { nombre: 'Corte' } });
      const res = mockResponse();
      await servicioController.crear(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(guardado);
    });

    it('responds 400 on validation error', async () => {
      const save = jest.fn().mockRejectedValue(new Error('invalid'));
      Servicio.mockImplementation(() => ({ save }));
      const req = mockRequest({ body: {} });
      const res = mockResponse();
      await servicioController.crear(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'invalid' });
    });
  });

  describe('actualizar', () => {
    it('updates and returns the service', async () => {
      const actualizado = { _id: '1', nombre: 'Corte Premium' };
      Servicio.findByIdAndUpdate.mockResolvedValue(actualizado);
      const req = mockRequest({ params: { id: '1' }, body: { nombre: 'Corte Premium' } });
      const res = mockResponse();
      await servicioController.actualizar(req, res);
      expect(Servicio.findByIdAndUpdate).toHaveBeenCalledWith('1', { nombre: 'Corte Premium' }, { new: true, runValidators: true });
      expect(res.json).toHaveBeenCalledWith(actualizado);
    });

    it('responds 404 when not found', async () => {
      Servicio.findByIdAndUpdate.mockResolvedValue(null);
      const req = mockRequest({ params: { id: '1' }, body: {} });
      const res = mockResponse();
      await servicioController.actualizar(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Servicio no encontrado' });
    });

    it('responds 400 on error', async () => {
      Servicio.findByIdAndUpdate.mockRejectedValue(new Error('bad'));
      const req = mockRequest({ params: { id: '1' }, body: {} });
      const res = mockResponse();
      await servicioController.actualizar(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'bad' });
    });
  });

  describe('eliminar', () => {
    it('deletes a service', async () => {
      Servicio.findByIdAndDelete.mockResolvedValue({ _id: '1' });
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();
      await servicioController.eliminar(req, res);
      expect(Servicio.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Servicio eliminado' });
    });

    it('responds 404 when not found', async () => {
      Servicio.findByIdAndDelete.mockResolvedValue(null);
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();
      await servicioController.eliminar(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Servicio no encontrado' });
    });

    it('responds 500 on error', async () => {
      Servicio.findByIdAndDelete.mockRejectedValue(new Error('boom'));
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();
      await servicioController.eliminar(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'boom' });
    });
  });
});
