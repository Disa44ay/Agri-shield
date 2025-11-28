function success(res, code, message, data = null, status = 200) {
  const payload = { code, message };
  if (data !== null) payload.data = data;
  return res.status(status).json(payload);
}

function fail(res, code, message, errors = null, status = 400) {
  const payload = { code, message };
  if (errors !== null) payload.errors = errors;
  return res.status(status).json(payload);
}

module.exports = { success, fail };
