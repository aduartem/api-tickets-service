const joi = require('joi');
const schema = require('../schemas/ticket').ticket;
const logger = require('../config/winston');

module.exports.validateTicket = (req, res, next) => {
  const method = 'validateTicket';
  logger.info(`[middleware][${method}] init`);
  const result = joi.validate(req.body, schema, { stripUnknown: true });

  if (result.error) {
    logger.error(`[middleware][${method}] error `, JSON.stringify(result.error));
    return res.status(400).json({
      message: 'Parámetros inválidos',
    });
  }
  logger.info(`[middleware][${method}] success`);
  return next();
};
