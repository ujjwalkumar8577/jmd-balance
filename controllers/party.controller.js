const { STATUS_CODES, successResponse, errorResponse } = require('../utils/response.handler');
const { SUCCESS_MESSAGES, ERROR_MESSAGES } = require('../utils/constants');
const { readExcelFile } = require('../utils/excel.util');
const PartyModel = require('../models/Party');
const UpdateHistoryModel = require('../models/UpdateHistory');

const findData = async (req, res) => {
  try {
    const { allParty = false } = req.query;
    const findQuery = { isDeleted: false };
    const projections = { name: 1, balance: 1, area: 1, contact: 1 };
    if (!allParty) {
      findQuery.balance = { $gt: 0 };
    }
    const balances = await PartyModel.find(findQuery, projections).lean();
    let timestamp = new Date();
    const recentUpdate = await UpdateHistoryModel.findOne({}).sort({ _id: -1 }).lean();
    if (recentUpdate) {
      timestamp = recentUpdate.createdAt;
    }
    const data = {
      timestamp,
      count: balances.length,
      balances,
    };
    return successResponse({
      req,
      res,
      data,
      code: STATUS_CODES.STATUS_CODE_SUCCESS,
      message: SUCCESS_MESSAGES.DATA_FETCH,
    });
  }
  catch (err) {
    return errorResponse({
      req,
      res,
      code: err.code,
      message: err.message
    });
  }
}

const updateData = async (req, res) => {
  try {
    const fileData = req.file;
    const filePath = fileData.path;
    const sheetData = await readExcelFile({ filePath });
    const headers = Object.keys(sheetData[0]);
    if (!headers.includes('Party Name') || !headers.includes('Address') || !headers.includes('Receivable Balance')) {
      throw {
        code: STATUS_CODES.STATUS_CODE_VALIDATION_FAILED,
        message: ERROR_MESSAGES.INVALID_HEADERS,
      };
    }
    const parties = sheetData.map((data) => ({
      name: data['Party Name'] || '',
      contact: data['Number'] || '',
      area: data['Address'] || '',
      balance: data['Receivable Balance'] || 0,
    }));
    await PartyModel.updateMany(
      { name: { $nin: parties.map((party) => party.name) }, isDeleted: false },
      { balance: 0 },
    );
    const promises = parties.map((party) => {
      PartyModel.updateOne(
        { name: party.name, isDeleted: false },
        { $set: { ...party } },
        { upsert: true },
      );
    });
    promises.push(UpdateHistoryModel.create({
      user: { name: 'Ujjwal' },
      count: parties.length,
    }));
    await Promise.all(promises);
    return successResponse({
      req,
      res,
      data: {},
      code: STATUS_CODES.STATUS_CODE_SUCCESS,
      message: SUCCESS_MESSAGES.DATA_UPDATE,
    });
  }
  catch (err) {
    return errorResponse({
      req,
      res,
      code: err.code,
      message: err.message
    });
  }
}

module.exports = {
  findData,
  updateData,
};
