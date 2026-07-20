describe('config/connectiondb', () => {
  const MODULE_PATH = '../config/connectiondb';
  let logSpy;

  beforeEach(() => {
    jest.resetModules();
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  const loadWithConnect = (connectImpl) => {
    jest.doMock('mongoose', () => ({ connect: jest.fn(connectImpl) }));
    // eslint-disable-next-line global-require
    const mongoose = require('mongoose');
    // eslint-disable-next-line global-require
    const connectDB = require(MODULE_PATH);
    return { mongoose, connectDB };
  };

  it('connects to MongoDB and logs success', async () => {
    const { mongoose, connectDB } = loadWithConnect(() => Promise.resolve());
    await connectDB();
    expect(mongoose.connect).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith('MongoDB conectado');
  });

  it('logs an error message when the connection fails', async () => {
    const { connectDB } = loadWithConnect(() => Promise.reject(new Error('no reachable')));
    await connectDB();
    expect(logSpy).toHaveBeenCalledWith('Error de conexión a MongoDB:', 'no reachable');
  });

  it('exports a function', () => {
    const { connectDB } = loadWithConnect(() => Promise.resolve());
    expect(typeof connectDB).toBe('function');
  });
});
