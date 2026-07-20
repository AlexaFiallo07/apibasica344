jest.mock('../models/cliente.model');

const Cliente = require('../models/cliente.model');
const clienteController = require('../controllers/cliente.controller');
const { mockRequest, mockResponse } = require('./helpers/mockHttp');

describe('cliente.controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('home', () => {
    it('redirects to the client list', async () => {
      const req = mockRequest();
      const res = mockResponse();
      await clienteController.home(req, res);
      expect(res.redirect).toHaveBeenCalledWith('/listadoclientes');
    });
  });

  describe('formulario', () => {
    it('renders the registration form', async () => {
      const req = mockRequest();
      const res = mockResponse();
      await clienteController.formulario(req, res);
      expect(res.render).toHaveBeenCalledWith('pages/registrarcliente');
    });
  });

  describe('listar', () => {
    it('queries clients sorted by name', async () => {
      const sort = jest.fn().mockResolvedValue([{ nombre: 'Ana' }]);
      Cliente.find.mockReturnValue({ sort });
      const result = await clienteController.listar();
      expect(Cliente.find).toHaveBeenCalledTimes(1);
      expect(sort).toHaveBeenCalledWith({ nombre: 1 });
      expect(result).toEqual([{ nombre: 'Ana' }]);
    });
  });

  describe('listado', () => {
    it('renders the index view with clients', async () => {
      const clientes = [{ nombre: 'Ana' }];
      Cliente.find.mockReturnValue({ sort: jest.fn().mockResolvedValue(clientes) });
      const req = mockRequest();
      const res = mockResponse();
      await clienteController.listado(req, res);
      expect(res.render).toHaveBeenCalledWith('pages/index', { clientes });
    });

    it('responds 500 when listing fails', async () => {
      Cliente.find.mockReturnValue({ sort: jest.fn().mockRejectedValue(new Error('db down')) });
      const req = mockRequest();
      const res = mockResponse();
      await clienteController.listado(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Error consultando clientes: db down');
    });
  });

  describe('consultar', () => {
    it('returns clients as JSON', async () => {
      const clientes = [{ nombre: 'Ana' }];
      Cliente.find.mockReturnValue({ sort: jest.fn().mockResolvedValue(clientes) });
      const req = mockRequest();
      const res = mockResponse();
      await clienteController.consultar(req, res);
      expect(res.json).toHaveBeenCalledWith(clientes);
    });

    it('responds 500 on error', async () => {
      Cliente.find.mockReturnValue({ sort: jest.fn().mockRejectedValue(new Error('boom')) });
      const req = mockRequest();
      const res = mockResponse();
      await clienteController.consultar(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'boom' });
    });
  });

  describe('obtener', () => {
    it('returns a client by id', async () => {
      const cliente = { _id: '1', nombre: 'Ana' };
      Cliente.findById.mockResolvedValue(cliente);
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();
      await clienteController.obtener(req, res);
      expect(Cliente.findById).toHaveBeenCalledWith('1');
      expect(res.json).toHaveBeenCalledWith(cliente);
    });

    it('responds 404 when not found', async () => {
      Cliente.findById.mockResolvedValue(null);
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();
      await clienteController.obtener(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Cliente no encontrado' });
    });

    it('responds 500 on error', async () => {
      Cliente.findById.mockRejectedValue(new Error('boom'));
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();
      await clienteController.obtener(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'boom' });
    });
  });

  describe('crear', () => {
    it('creates a client and returns 201 JSON', async () => {
      const guardado = { _id: '1', nombre: 'Ana' };
      const save = jest.fn().mockResolvedValue(guardado);
      Cliente.mockImplementation(() => ({ save }));
      const req = mockRequest({ body: { nombre: 'Ana' } });
      const res = mockResponse();
      await clienteController.crear(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(guardado);
    });

    it('redirects for HTML clients on success', async () => {
      const save = jest.fn().mockResolvedValue({});
      Cliente.mockImplementation(() => ({ save }));
      const req = mockRequest({ body: {}, headers: { accept: 'text/html' } });
      const res = mockResponse();
      await clienteController.crear(req, res);
      expect(res.redirect).toHaveBeenCalledWith('/listadoclientes');
    });

    it('responds 400 JSON on validation error', async () => {
      const save = jest.fn().mockRejectedValue(new Error('invalid'));
      Cliente.mockImplementation(() => ({ save }));
      const req = mockRequest({ body: {} });
      const res = mockResponse();
      await clienteController.crear(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'invalid' });
    });

    it('responds 400 HTML on error for HTML clients', async () => {
      const save = jest.fn().mockRejectedValue(new Error('invalid'));
      Cliente.mockImplementation(() => ({ save }));
      const req = mockRequest({ body: {}, headers: { accept: 'text/html' } });
      const res = mockResponse();
      await clienteController.crear(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith('Error creando cliente: invalid');
    });
  });

  describe('actualizar', () => {
    it('updates and returns the client', async () => {
      const actualizado = { _id: '1', nombre: 'Ana B' };
      Cliente.findByIdAndUpdate.mockResolvedValue(actualizado);
      const req = mockRequest({ params: { id: '1' }, body: { nombre: 'Ana B' } });
      const res = mockResponse();
      await clienteController.actualizar(req, res);
      expect(Cliente.findByIdAndUpdate).toHaveBeenCalledWith('1', { nombre: 'Ana B' }, { new: true, runValidators: true });
      expect(res.json).toHaveBeenCalledWith(actualizado);
    });

    it('responds 404 when not found', async () => {
      Cliente.findByIdAndUpdate.mockResolvedValue(null);
      const req = mockRequest({ params: { id: '1' }, body: {} });
      const res = mockResponse();
      await clienteController.actualizar(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Cliente no encontrado' });
    });

    it('responds 400 on error', async () => {
      Cliente.findByIdAndUpdate.mockRejectedValue(new Error('bad'));
      const req = mockRequest({ params: { id: '1' }, body: {} });
      const res = mockResponse();
      await clienteController.actualizar(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'bad' });
    });
  });

  describe('eliminar', () => {
    it('deletes a client', async () => {
      Cliente.findByIdAndDelete.mockResolvedValue({ _id: '1' });
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();
      await clienteController.eliminar(req, res);
      expect(Cliente.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Cliente eliminado' });
    });

    it('responds 404 when not found', async () => {
      Cliente.findByIdAndDelete.mockResolvedValue(null);
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();
      await clienteController.eliminar(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Cliente no encontrado' });
    });

    it('responds 500 on error', async () => {
      Cliente.findByIdAndDelete.mockRejectedValue(new Error('boom'));
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();
      await clienteController.eliminar(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'boom' });
    });
  });
});
