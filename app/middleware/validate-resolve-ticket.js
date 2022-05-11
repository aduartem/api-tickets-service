const joi = require('joi');
const schema = require('../schemas/resolve-ticket').resolveTicket;
const logger = require('../config/winston');

module.exports.validateResolveTicket = (req, res, next) => {
  const method = 'validateResolveTicket';
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
