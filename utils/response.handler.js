const { ERROR_MESSAGES: { INTERNAL_SERVER_ERROR } } = require('./constants');

const STATUS_CODES = {
  STATUS_CODE_SUCCESS: 200,
  STATUS_CODE_UNAUTHORIZED: 401,
  STATUS_CODE_FAILURE: 500,
  STATUS_CODE_VALIDATION_FAILED: 422
};

const successResponse = ({
  req,
  res,
  data = {},
  code = STATUS_CODES.STATUS_CODE_SUCCESS,
  message = '',
}) => res.status(code).send({ message, data });

const errorResponse = ({
  req,
  res,
  data = {},
  code = STATUS_CODES.STATUS_CODE_FAILURE,
  message = INTERNAL_SERVER_ERROR
}) => res.status(code).send({ message, data });

module.exports = {
  STATUS_CODES,
  successResponse,
  errorResponse
};
