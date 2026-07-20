// Minimal Express req/res mocks for unit-testing controllers.

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.redirect = jest.fn().mockReturnValue(res);
  res.render = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = ({ params = {}, body = {}, headers = {} } = {}) => ({
  params,
  body,
  headers,
});

module.exports = { mockResponse, mockRequest };
