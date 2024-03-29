const boom = require('@hapi/boom')

function logErrors(err, req, res, next) {
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
      errorName: err.name,
      message:err.message,
      stack:err.stack,
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    return res.status(output.statusCode).json(output.payload)
  }
  next(err);
}

module.exports = {logErrors, errorHandler, boomErrorHandler }