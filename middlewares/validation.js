const { STATUS_CODES, errorResponse } = require('../utils/response.handler');
const { ERROR_MESSAGES, MASTER_PASSWORD } = require('../utils/constants');

const validateFindBody = (req, res, next) => {
  try {
    const { allParty } = req.query;
    if (allParty && typeof allParty !== 'boolean') {
      throw {
        code: STATUS_CODES.STATUS_CODE_VALIDATION_FAILED,
        message: ERROR_MESSAGES.INVALID_PARAMS,
      };
    }
    return next();
  }
  catch (err) {
    return errorResponse({
      req,
      res,
      code: err.code,
      message: err.message,
    });
  }
}

const validateUpdateBody = (req, res, next) => {
  try {
    const { password } = req.body;
    const fileData = req.file;
    if (!password || password !== MASTER_PASSWORD) {
      throw {
        code: STATUS_CODES.STATUS_CODE_UNAUTHORIZED,
        message: ERROR_MESSAGES.INCORRECT_PASSWORD,
      };
    }
    if (!fileData) {
      throw {
        code: STATUS_CODES.STATUS_CODE_VALIDATION_FAILED,
        message: ERROR_MESSAGES.FILE_NOT_UPLOADED,
      };
    }
    return next();
  }
  catch (err) {
    return errorResponse({
      req,
      res,
      code: err.code,
      message: err.message,
    });
  }
}

module.exports = {
  validateFindBody,
  validateUpdateBody,
};
